export interface Product {
  id: number;

  name: string;

  price: string;

  promoted: boolean;

  desc?: string;
}

export interface ProducatPage {
  totalPages: number;

  products: Product[];

  size: number;

  page: number;
}
