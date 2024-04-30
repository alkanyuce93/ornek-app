interface Product {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
}

interface ProductListResponse {
  limit: number;
  products: Product[];
  skip: number;
  total: number;
  categoriesName: string;
}

export { Product, ProductListResponse };
