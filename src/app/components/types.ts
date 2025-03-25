export interface ProductPayload {
  id: number;
  title: string;
  images: string[];
  category: {
    name: string;
  };
  price: number;
  description: string;
}