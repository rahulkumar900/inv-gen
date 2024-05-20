export interface Item {
  sno: number;
  desc: string;
  qty: number | string;
  rate: number | string;
  cgst: number | string;
  sgst: number | string;
  igst: number | string;
  amount: number;
  [key: string]: number | string | null; // Add an index signature
}

export interface Invoice {
  base64String: string | null;
  loading: boolean;
  error: string | null;
  tableRows: number;
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

  trans_date: string;
  due_date: string;
  items: Item[];
  [key: string]: number | string | null | boolean | Item[]; // Add an index signature
}
