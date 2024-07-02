import { Item } from "@/lib/features/invoice/invoiceType";
import Row from "./row";

export default function Table({ items, tableSize }: { items: Item[]; tableSize: number }) {
    const itemsLenght = items.length;
    const ematyRows = tableSize - itemsLenght;
  
    return (
      <>
        {items &&
          items.length &&
          items.map((item, i) => <Row key={i} {...item} />)}
      </>
    );
  }