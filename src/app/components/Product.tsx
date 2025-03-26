import type { Dispatch, SetStateAction } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerPortal,
} from "@/components/ui/drawer";
import type { ProductPayload } from "./types";
import Loading from "./Loading";
import PriceCategory from "./PriceCategory";

interface ProductProps {
  id: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const QUERY_KEY = Symbol("PRODUCT");

export default function Product({ id, open, setOpen }: ProductProps) {
  const { data: product, isFetching } = useQuery<ProductPayload>({
    queryKey: [QUERY_KEY, id],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_HOST}/products/${id}`,
      );
      return await response.json();
    },
  });
  const router = useRouter();

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      router.push("/");
    }

    setOpen(open);
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={handleOpenChange}>
      <DrawerPortal>
        <DrawerContent>
          {isFetching ? (
            <Loading>Product loading ...</Loading>
          ) : (
            product && (
              <DrawerHeader className="flex items-center">
                <Image
                  src={product.images?.[0]}
                  alt="Product Image"
                  width={100}
                  height={100}
                />
                <DrawerTitle className="text-lg">{product.title}</DrawerTitle>
                <PriceCategory {...product} />
                <DrawerDescription>{product.description}</DrawerDescription>
              </DrawerHeader>
            )
          )}
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
}
