import Image from "next/image";
import { useQuery } from "@tanstack/react-query";

interface Product {
  id: number;
  title: string;
  images: string[];
  category: {
    name: string;
  };
  price: number;
}

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

export function Products() {
  const { data: products, isFetching } = useQuery<Product[]>({
    queryFn,
    queryKey: [QUERY_KEY],
  });

  return isFetching ? (
    <div className="absolute inset-0 flex justify-center items-center font-normal text-xl">
      Products loading ...
    </div>
  ) : (
    <ul>
      {products?.map(({ id, title, images, price, category }) => (
        <li
          key={id}
          className="flex mb-4 p-4 items-center cursor-pointer hover:bg-gray-200"
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
            <dl>
              <div className="flex gap-1">
                <dt className="font-medium">Price:</dt>
                <dd>{price}</dd>
              </div>
              <div className="flex gap-1">
                <dt className="font-medium">Category:</dt>
                <dd>{category.name}</dd>
              </div>
            </dl>
          </section>
        </li>
      ))}
    </ul>
  );
}
