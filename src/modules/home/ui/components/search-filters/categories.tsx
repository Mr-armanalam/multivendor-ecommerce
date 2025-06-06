"use client";
import React, { useEffect, useRef, useState } from "react";
import CategoryDropdown from "./category-dropdown";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ListFilterIcon } from "lucide-react";
import CategorySidebar from "./category-sidebar";
import { CategoriesGetManyOutput } from "@/modules/categories/type";
import { useParams } from "next/navigation";

interface CategoriesProps {
  data: CategoriesGetManyOutput;
}

const Categories = ({ data }: CategoriesProps) => {

  const params = useParams();

  const conatainerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const viewAllRef = useRef<HTMLDivElement>(null);

  const [visibleCount, setVisibleCount] = useState(data.length);
  const [isAnyHovered, setIsAnyHovered] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const categoryParam = params.category as string | undefined;
  const activeCategory = categoryParam || 'all'; // TODO: implement active category

  const activeCategoryIndex = data.findIndex(
    (cat) => cat.slug === activeCategory
  );
  const isActiveCategoryHidden =
    activeCategoryIndex >= visibleCount && activeCategoryIndex !== -1;

  useEffect(() => {
    const calculateVisible = () => {
      if (!conatainerRef.current || !measureRef.current || !viewAllRef.current) return;

      const containerWidth = conatainerRef.current.offsetWidth;
      const viewAllWidth = viewAllRef.current.offsetWidth;
      const availableWidth = containerWidth - viewAllWidth;

      const items = Array.from(
        conatainerRef.current.children
      ) as HTMLDivElement[];
      let totalWidth = 0;
      let visible = 0;

      for (const item of items) {
        const width = item.getBoundingClientRect().width;

        if (totalWidth + width > availableWidth) {
          break;
        }
        totalWidth += width;
        visible++;
      }
      setVisibleCount(visible);
    };

    const resizeObserver = new ResizeObserver(calculateVisible);
    resizeObserver.observe(conatainerRef.current!);

    return () => resizeObserver.disconnect();
  }, [data.length]);
  return (
    <div className="relative w-full">
    {/* category sidebar */}

    <CategorySidebar open={isSidebarOpen} onOpenChange={setIsSidebarOpen} />
      {/* hidden div to measure all items */}
      <div
        ref={measureRef}
        className="absolute opacity-0 pointer-events-none flex"
        style={{ position: "fixed", top: -9999, left: -9999 }}
      >
        {data.map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug} // TODO: implement active state
              isNavigationHovered={false}
            />
          </div>
        ))}
      </div>

      {/* visible items */}
      <div
        ref={conatainerRef}
        onMouseEnter={() => setIsAnyHovered(true)}
        onMouseLeave={() => setIsAnyHovered(false)}
        className="flex flex-nowrap items-center"
      >
        {data.slice(0, visibleCount).map((category) => (
          <div key={category.id}>
            <CategoryDropdown
              category={category}
              isActive={activeCategory === category.slug} // TODO: implement active state
              isNavigationHovered={isAnyHovered}
            />
          </div>
        ))}

        <div ref={viewAllRef} className="shrink-0">
          <Button
          variant={'elevated'}
            className={cn(
              "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg-white hover:border-primary text-black",
              isActiveCategoryHidden && !isAnyHovered && "bg-white border-primary",
            )}
            onClick={() => setIsSidebarOpen(true)}
          >
            View All
            <ListFilterIcon className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Categories;
