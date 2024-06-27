

const invoiceData = {
  base64String: "",
  loading: false,
  error: null,
  initialRows: 12,
  tableRows: 12,
  id: "5df3180a09ea16dc4b95f910",
  invoice_no: "1",
  purchase_no: "",
  invoice_date: "",
  balance: "",
  //   company

  company: "",
  email: "",
  phone: "",
  address: "",
  gst_pan: "",
  state: "",
  //

  // bANK DETAILS

  bankname: "",
  ifsc : "",
  accountnumber:"",
  // bill to

  b_company: "",
  b_email: "",
  b_phone: "",
  b_address: "",
  b_gst_pan: "",
  b_state: "",

  //
  //   ship to
  s_company: "",
  s_email: "",
  s_phone: "",
  s_address: "",
  s_gst_pan: "",
  s_state: "",

  //

  trans_date: "",
  due_date: "",

  template : "zero",

  //
  isIgst: true,
  items: [
    {
      sno: 1,
      desc: "ad sunt culpa occaecat qui",
      qty: 0,
      rate: 0,
      cgst: 0,
      sgst: 0,
      igst: 0,
      amount: 0, // Calculation of Amount based on rate and qty
    },
  ],
};

export default invoiceData;
