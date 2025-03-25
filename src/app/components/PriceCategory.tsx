import { Badge } from "@/components/ui/badge";
import type { ProductPayload } from "./types";

export default function PriceCategory({
  price,
  category: { name },
}: Pick<ProductPayload, "price" | "category">) {
  return (
    <>
      <div className="font-medium text-sm mb-0.5">{`Price: ${price}`}</div>
      <Badge>{name}</Badge>
    </>
  );
}
