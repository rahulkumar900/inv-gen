export interface Item {
  sno: number;
  desc: string;
  qty: number;
  rate: number;
  cgst: number;
  sgst: number;
  igst: number;
  amount: number;
  [key: string]: number | string | null; // Add an index signature
}

export interface Invoice {
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

  trans_date: string;
  due_date: string;
  template: string;
  items: Item[];
  [key: string]: number | string | null | boolean | Item[]; // Add an index signature
}
