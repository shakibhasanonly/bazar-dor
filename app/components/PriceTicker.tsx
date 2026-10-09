import Marquee from "react-fast-marquee";
import { getProducts } from "../lib/api";

function formatPrice(price: number) {
  return new Intl.NumberFormat("bn-BD").format(price);
}

export default async function PriceTicker() {
  const products = await getProducts();

  return (
    <div className="border-y border-green-200 bg-green-50 py-2">
      <Marquee
  speed={130}
  pauseOnHover
  gradient={false}
>
        {products.map((product) => (
          <div
            key={product.id}
            className="mx-8 flex items-center gap-2 text-sm font-medium whitespace-nowrap"
          >
            <span className="text-xl">
              {product.image}
            </span>

            <span className="font-medium text-gray-800">
              {product.nameBn}
            </span>

            <span className="font-semibold text-green-700">
              {formatPrice(product.today)} টাকা/{product.unit}
            </span>

            <span
              className={
                product.change.dir === "up"
                  ? "text-green-600"
                  : product.change.dir === "down"
                  ? "text-red-600"
                  : "text-gray-500"
              }
            >
              {product.change.dir === "up"
                ? `▲ ${product.change.pct}%`
                : product.change.dir === "down"
                ? `▼ ${Math.abs(product.change.pct)}%`
                : "— ০%"}
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
}