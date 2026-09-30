import SummaryForm from "./SummaryForm";
import { getProducts } from "@/lib/api/products";

export const metadata = { title: "Ringkasan Pesanan" };

export default async function SummaryPage() {
  const products = await getProducts({ orderable: true });
  return <SummaryForm products={products} />;
}
