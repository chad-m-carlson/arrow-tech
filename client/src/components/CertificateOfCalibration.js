import React from 'react';
import {PDFViewer} from '@react-pdf/renderer';
import Document from './Document';

const CertificateOfCalibration = (props) => {

  return ( 
    <PDFViewer style={{width: "100%", height: "100vh"}}>
      <Document 
        calData={props.location.state.calData}
      />
    </PDFViewer>
   );
}
 
export default CertificateOfCalibration;