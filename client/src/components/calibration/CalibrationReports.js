import React from 'react';
import CertificateOfCalibration from '../Pdf_rendering/CertificateOfCalibration';

const CalibrationReports = (props) => {
  return ( 
    <>
    <h1>Calibration Reports</h1>
    <CertificateOfCalibration calData={props.location.state.calData}/>
    </>
   );
}
 
export default CalibrationReports;