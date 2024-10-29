import { TaxOption } from "@/components/selectTax";
import { PersistState } from "redux-persist";

// Define a base interface for taxes
interface BaseTax {
  notax: number;
  gst: number;
  vat: number;
  igst: number;
  cgstigst: number;
}

// Define an index signature for additional dynamic tax types if needed
interface Tax extends BaseTax {
  [key: string]: number;
}
interface Tax {
  notax: number;
  gst: number;
  vat: number;
  igst: number;
  cgstigst: number;
}

export interface Item {
  sno: number;
  desc: string;
  qty: number;
  rate: number;
  taxes: Tax;
  amount: number;
  [key: string]: number | string | Tax; // Add an index signature
}

export interface Invoice {
  logo: string;
  base64String: string;
  loading: boolean;
  error: string | null;
  tableRows: number;
  initialRows: number;
  id: string;
  invoice_no: string;
  invoice_date: string;
  purchase_no: string;
  balance: string;
  //   company

  company: string;
  email: string;
  phone: string;
  address: string;
  state: string;
  gst_pan: string;
  //

  // Bank

  bankname: string;
  ifsc: string;
  accountnumber: string;
  // bill to

  b_company: string;
  b_email: string;
  b_phone: string;
  b_address: string;
  b_state: string;
  b_gst_pan: string;

  //
  //   ship to
  s_company: string;
  s_email: string;
  s_phone: string;
  s_address: string;
  s_state: string;
  s_gst_pan: string;

  //

  isIgst: boolean;
  round: boolean;
  taxType: TaxOption;

  trans_date: string;
  due_date: string;
  template: string;
  items: Item[];
  [key: string]: number | string | null | boolean | Item[] | PersistState; // Add an index signature
}
