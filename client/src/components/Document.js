import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font} from '@react-pdf/renderer';
// Create styles
Font.register({ family: 'Roboto', fonts: [
  { src: "https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap" }, // font-style: normal, font-weight: normal
  // { src: source2, fontStyle: 'italic' },
  // { src: source3, fontStyle: 'italic', fontWeight: 700 },
 ]});

const styles = StyleSheet.create({
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    fontSize: 8,
    alignItems: "flex-end",
    padding: 20,
    lineHeight: 1.3,
  },
  title: {
    fontSize: 18,
    fontWeight: 1000,
    textAlign: "center",
    fontFamily: "Roboto"
  },
  customerInfo: {
    padding: 20,
    fontSize: 12,
  },
  page: {
    // paddingHorizontal: 30,
    // margin: 30,
  },
  section: {
    // margin: 10,
    // padding: 10,
    // flexGrow: 1
  }
});


// Create Document Component
const MyDocument = ({calData}) => {

  return(
    <Document>
      <Page ruler  style={styles.page}>
        <View style={styles.header}>
          <Image style={{width: "50pt", height: "50pt"}} src="https://image.shutterstock.com/image-vector/ui-image-placeholder-wireframes-apps-260nw-1037719204.jpg"></Image>
          <View>
            <Text>417 Main Avenue West</Text>
            <Text>P.O. Box 1240</Text>
            <Text>Rolla, ND 58367</Text>
            <Text>Phone: 701-477-6461</Text>
            <Text>Fax: 701-477-6464</Text>
            <Text>Email: sales@dosimeter.com</Text>
          </View>
        </View>
        <View style={styles.title}>
          <Text>Certificate Of Calibration</Text>
        </View>
        <View style={styles.customerInfo}>
          <View style={{flexDirection: "row"}}>
            <Text>Certificate Number: </Text>
            <Text>{calData.calibrationsByBatch[0].certificateNumber}</Text>
          </View>
        </View>
        {/* <View style={{border: "1px solid black"}}>

            {calData.calibrationsByBatch.map( mn => (
              <Text style={{border: "1px solid black"}}>{mn.dosimeter.modelNumber}</Text>
              ))}
        </View> */}
      </Page>
    </Document>
  )
};

export default MyDocument;