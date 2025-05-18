import React from "react";

interface Props {
  params: Promise<{
    category: string;
  }>;
}

const Page = async ({params}:Props) => {
  const { category } = await params;
  return <div>category Page {category}</div>;
};

export default Page;
