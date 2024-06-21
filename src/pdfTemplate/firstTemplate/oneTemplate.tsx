import React from "react";
import { Document, Text, View, Page } from "@react-pdf/renderer";
import { useTheme } from "@/pdfComponent/themeContext";

export default function One() {
  const styles = useTheme();
  return (
    <Document>
    <Page style={[styles.body,{color:"blue"}]}>
      
      <View style={{display:"flex",flexDirection: "row"}}>
      <View style={{width:"50%"}}>
        <View style={{width:60,height: 60,border:1,}}>q</View>
        <Text style={{ fontFamily: 'Courier-Bold',color:"blue",marginTop: 8,fontSize:16}}>NALANDA ENGICON PVT LTD</Text>
        </View>
      <View style={{width:"50%",paddingLeft:60}}>
        <Text style={{fontSize: 24,maxWidth:"80%", fontFamily:"Courier-Bold",}}>INVOICE</Text>
        <Text style={{fontSize:14}}>22-06-2024</Text>
        </View>
      </View>
      
      <View  style={{display:"flex",flexDirection: "row",marginTop: 12}}>
         <View style={{width:"50%"}}>
          
              <Text style={{fontSize:12,marginBottom:4,fontFamily:"Courier-Bold"}}>Office Address</Text>
           <Text style={{fontSize:12,maxWidth: "70%"}}>4th Floor N.P Tower 
             Kankarbagh Patna, 80020 bla bla
           </Text>
          
       
        </View>
      
       <View style={{width:"50%",paddingLeft:60}}>
        <Text style={{fontSize:12,marginBottom:4}}>To:</Text>
           <Text style={{fontSize:12,maxWidth: "70%"}}>4th Floor N.P Tower 
             Kankarbagh Patna 80020
           </Text>
        </View>
      </View>
        
     
      <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
        `${pageNumber} / ${totalPages}`
      )} fixed />
    </Page>
  </Document>
  );
}
