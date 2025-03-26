import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import type { ProductPayload } from "./types";
import Loading from "./Loading";
import Product from "./Product";
import PriceCategory from "./PriceCategory";

const QUERY_KEY = Symbol("PRODUCTS");
const queryFn = async () => {
  const querystring = new URLSearchParams({
    offset: "0",
    limit: "10",
  }).toString();
  const response = await fetch(
    `${process.env.API_HOST}/products?${querystring}`,
  );
  return await response.json();
};

export default function Products() {
  const { data: products, isFetching } = useQuery<ProductPayload[]>({
    queryFn,
    queryKey: [QUERY_KEY],
  });
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedProductId = searchParams.get("id");
  const [productId, setProductId] = useState<string | null>(selectedProductId);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(!!selectedProductId);

  const handleClick = (id: string) => {
    setProductId(id);
    setDrawerOpen(true);
    router.push(`/?id=${id}`);
  };

  return isFetching ? (
    <Loading>Products loading ...</Loading>
  ) : (
    <>
      <ul>
        {products?.map(({ id, title, images, price, category }) => (
          <li
            key={id}
            className="flex mb-4 p-4 items-center cursor-pointer hover:bg-gray-200"
            onClick={() => {
              handleClick(String(id));
            }}
          >
            <Image
              src={images?.[0]}
              alt="Product Image"
              className="mr-2"
              width={100}
              height={100}
            />
            <section>
              <header className="text-lg font-semibold">{title}</header>
              <PriceCategory price={price} category={category} />
            </section>
          </li>
        ))}
      </ul>
      {productId && (
        <Product id={productId} open={drawerOpen} setOpen={setDrawerOpen} />
      )}
    </>
  );
}
