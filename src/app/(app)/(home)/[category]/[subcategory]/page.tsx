import React from "react";

interface Props {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

const Page = async ({params}:Props) => {
  const { subcategory, category } = await params;
  return <div>sub category Page{category} {subcategory}</div>;
};

export default Page;
