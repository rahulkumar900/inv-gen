interface Item {
  sno: number;
  desc: string;
  qty: number;
  rate: number;
}

export interface Invoice {
  base64String: string | null;
  loading: boolean;
  error: string | null;
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
  gst_pan: string;
  //
  // bill to

  b_company: string;
  b_email: string;
  b_phone: string;
  b_address: string;
  b_gst_pan: string;

  //
  //   ship to
  s_company: string;
  s_email: string;
  s_phone: string;
  s_address: string;
  s_gst_pan: string;

  //

  trans_date: string;
  due_date: string;
  items: Item[];
  [key: string]: string | null | boolean | Item[]; // Add an index signature
}
