const invoice = {
  base64String: "",
  loading: false,
  error: "",
  tableRows: 10,
  id: "5df3180a09ea16dc4b95f910",
  invoice_no: "201906-28",
  purchase_no: "1",
  invoice_date: "",
  balance: "$2,283.74",
  //   company

  company: "MANTRIX",
  email: "susanafuentes@mantrix.com",
  phone: "+1 (872) 588-3809",
  address: "922 Campus Road, Drytown, Wisconsin, 1986",
  gst_pan: "dyjpk3226a",
  state: '',
  //
  // bill to

  b_company: "MANTRIX",
  b_email: "susanafuentes@mantrix.com",
  b_phone: "+1 (872) 588-3809",
  b_address: "922 Campus Road, Drytown, Wisconsin, 1986",
  b_gst_pan: "dyjpk3226a",
  b_state:'',

  //
  //   ship to
  s_company: "MANTRIX",
  s_email: "susanafuentes@mantrix.com",
  s_phone: "+1 (872) 588-3809",
  s_address: "922 Campus Road, Drytown, Wisconsin, 1986",
  s_gst_pan: "dyjpk3226a",
  s_state:'',

  //

  trans_date: "2019-09-12",
  due_date: "2019-10-12",


  // 
  isIgst : true,
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

export default invoice;
