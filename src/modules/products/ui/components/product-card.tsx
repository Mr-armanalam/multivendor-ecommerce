import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  imageUrl?: string | null;
  authorUsername?: string | null;
  authorImageUrl?: string | null;
  reviewRating: number;
  reviewCount: number;
}

export function ProductCard({
  id,
  name,
  price,
  imageUrl,
  authorUsername,
  authorImageUrl,
  reviewRating,
  reviewCount,
}: ProductCardProps) {
  return (
    <Link href={'/'}
    >
      <div className="border rounded-md bg-white overflow-hidden h-full flex flex-col">
        <div className="relative aspect-square">
          <Image
            alt={name}
            src={imageUrl || "/placeholder.png"}
            fill
            className="object-cover"
          />
        </div>
      </div>

    </Link>
  );
}
