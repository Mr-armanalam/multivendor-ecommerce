import Link from "next/link";
import React from "react";
import { CategoriesGetManyOutput } from "@/modules/categories/type";

interface SubCategoryMenuProps {
  category: CategoriesGetManyOutput[1];
  isOpen: boolean;
}

const SubCategoryMenu = ({
  category,
  isOpen,
}: SubCategoryMenuProps) => {
  if (!isOpen || !category.subcategories || category.subcategories.length === 0)
    return null;

  const backgroundColor = category.color || "#f5f5f5";
  return (
    <div
      className="absolute z-100"
      style={{
        top: '100%',
        left: 0,
      }}
    >
      {/* Invisible bridge on top to maintain hover */}
      <div className="h-3 w-60" />
      <div
        className="w-60 text-black rounded-md overflow-hidden border shadow-[4px_4px_8px_rgba(0,0,0,0.1)] -translate-x-[2px] -translate-y-[2px]"
        style={{ backgroundColor }}
      >
        <div>
          {category.subcategories?.map((subcategory) => (
            <Link
              key={subcategory.slug}
              href={`/${category.slug}/${subcategory.slug}`}
              className="w-full text-left p-4 hover:bg-black hover:text-white flex justify-between items-center underline font-medium"
            >
              {subcategory.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SubCategoryMenu;
