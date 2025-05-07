'use client'
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";

export default function Home() {
  const trpc = useTRPC();
  const categories = useQuery(trpc.categories.getMany.queryOptions())
  return (
    <div>
      Home page
      <p>is loading: {categories.isLoading}</p>
      {JSON.stringify(categories.data)}
    </div>
  );
}
