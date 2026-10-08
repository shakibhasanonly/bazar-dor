const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

export interface Category {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  emoji: string;
  unit: string;
  price: number;
  change: number;
}

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch categories");
  }

  return res.json();
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${BASE_URL}/products`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  const res = await fetch(
    `${BASE_URL}/products?category=${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch category products");
  }

  return res.json();
}

export async function getProduct(id: string) {
  const res = await fetch(`${BASE_URL}/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Product not found");
  }

  return res.json();
}