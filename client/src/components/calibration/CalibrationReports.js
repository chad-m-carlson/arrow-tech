import React from 'react';
import CertificateOfCalibration from '../Pdf_rendering/CertificateOfCalibration';
import {Button, } from 'semantic-ui-react';
import {Link, } from 'react-router-dom';

const CalibrationReports = (props) => {

  const printCoc = () => {
    document.getElementById('navbar').style.display = 'none'
    document.getElementById('print-button').style.display = 'none'
    document.getElementById('page-container').style.margin = '0'
    window.print()
    document.getElementById('navbar').style.display = 'inline-flex'
    document.getElementById('print-button').style.display = 'inline'
    document.getElementById('page-container').style.margin = '4rem'
  };

  return ( 
    <>
      <div id='print-button'>
        <Button
          as={Link}
          to={{pathname: '/batchreport', state: {batch: props.location.state.calData[0].batch}}}
        >
          Back to Batch #{props.location.state.calData[0].batch} Report
        </Button>
        <Button 
          style={{marginLeft: "50px"}}
          onClick={printCoc}
          color='green'>
            Print this certificate
        </Button>
      </div>
      <br />
      <br />
      <CertificateOfCalibration calData={props.location.state.calData}/>
    </>
   );
}
 
export default CalibrationReports;