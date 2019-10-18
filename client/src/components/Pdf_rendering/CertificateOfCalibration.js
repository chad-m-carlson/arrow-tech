import React from 'react';
import Doc from './DocService';
import PdfContainer from './PdfContainer';
import {determineCalculatedDosimeterRange, convertValueReadToMr, } from '../HelperFunctions';
// import {Icon} from 'semantic-ui-react';
import styled from 'styled-components';

const CertificateOfCalibration = ({calData}) => {
  const createPdf = (html) => Doc.createPdf(html);

  const midScaleAccuracy = (accRead, isR, isMr, isSv, isMsv, range) => {
    let calculatedExposure = determineCalculatedDosimeterRange(range, isR, isMr, isMsv, isSv).replace(/\D/gm,"") / 2
    let difference =  Math.abs(accRead - calculatedExposure)
    return (((calculatedExposure - difference) / calculatedExposure) * 100).toFixed(2)
  };

  const printUnit = (isR, isMr, isSv, isMsv) => {
    if(isR) return "R"
    else if (isMr) return "mR"
    else if (isSv) return "sV"
    else return "mSv"
  };

  const printFinalDate = (dateToBePrinted) => {
    let date = new Date(dateToBePrinted)
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
  };

  return ( 
    // <PdfContainer createPdf={createPdf}>
    <div>
      <div style={{maxWidth: "7.5in", fontSize: "10pt"}}>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <div style={{border: "1px solid red", width: "100px", height: "80px"}}>LOGO</div>
          <div style={{fontSize: "10px", lineHeight: "13px"}}>
            <span>417 Main Avenue West</span><br />
            <span>P.O. Box 1240</span><br />
            <span>Rolla, ND 58367</span><br />
            <span>Phone: 701-477-6461</span><br />
            <span>Fax: 701-477-6464</span><br />
            <span>E-Mail: sales@dosimeter.com</span><br />
          </div>
        </div>
        <h1 style={{textAlign: "center", fontWeight: "900"}}>Certificate of Calibration</h1>
        <p>Certificate Number: <span style={{paddingLeft: "15px"}}>{calData[0].certificateNumber}</span></p>
        <p>Customer: <span style={{paddingLeft: "15px"}}>{calData[0].dosimeter.customer.name}</span></p>
        <p>
          <span style={{paddingLeft: "80px"}}>{calData[0].dosimeter.customer.streetAddress1}</span><br />
          {calData[0].dosimeter.customer.streetAddress2 &&
          <>
          <span style={{paddingLeft: "80px"}}>{calData[0].dosimeter.customer.streetAddress2}</span><br />
          </>
          }
          <span style={{paddingLeft: "80px"}}>{calData[0].dosimeter.customer.city},</span>
          <span style={{paddingLeft: "3px"}}>{calData[0].dosimeter.customer.state}</span>
          <span style={{paddingLeft: "3px"}}>{calData[0].dosimeter.customer.zip}</span><br />
          <span style={{paddingLeft: "80px"}}>{calData[0].dosimeter.customer.country}</span>
        </p>
        <div style={{display: "flex", justifyContent: "space-between"}}>
          <p>Instrument: <BaseCalDetails>_PLACEHOLDER_</BaseCalDetails></p>
          <p>Model: <BaseCalDetails>{calData[0].dosimeter.modelNumber}</BaseCalDetails></p>
          <p>Range: <BaseCalDetails>{determineCalculatedDosimeterRange(calData[0].dosimeter.range, calData[0].dosimeter.isR,  calData[0].dosimeter.isMr, calData[0].dosimeter.isSv, calData[0].dosimeter.isMsv,)}</BaseCalDetails></p>
        </div>
        <p>The referenced Direct-Reading Dosimeters have been tested for response in accordance with applicable American National Standard Institute (ANSI) Standards N13.5 and N322. Arrow-Tech, Inc. Radioactive Material License #33-16216.
        </p>
        <p>All instruments were tested on a J.L. Shepherd, _PLACEHOLDER_ Curie, Cesium 137, Carousel Calibrator, Serial Number _PLACEHOLDER_, using an exposure rate of _PLACEHOLDER_  mR/hr. All referenced Direct-Reading Dosimeters indicated exposure are within the {calData[0].tolerance !== 0.1 ? "customer defined limits" : "allowable limits"} of +/- {(calData[0].tolerance) * 100}% of true exposure.
        </p>
        <p>The above referenced Gamma Source is calibrated by utilizing Direct-Reading Dosimeter "Transfer Standards" certified for accuracy and with traceability to the National Institute of Standards and Technology by Battelle National Laboratories. TFN: _PLACEHOLDER_ dated _PLACEHOLDER_
        </p>
        <div style={{display: "flex", justifyContent: "space-between", padding: "0px 30px 0px 30px"}}>
          <p>Calibration Performed By: <BaseCalDetails>{calData[0].user.firstName} {calData[0].user.lastName}</BaseCalDetails></p>
          <p>Calibration Date: <BaseCalDetails>{printFinalDate(calData[0].finalDate)}</BaseCalDetails></p>
        </div>
        <div style={{display: "flex", justifyContent: "space-between", padding: "0px 30px 0px 30px"}}>
          <p>Calibration Technician:<BaseCalDetails>_PLACEHOLDER_</BaseCalDetails></p>
          <p>Calibration Due Date: <BaseCalDetails>{printFinalDate(calData[0].dueDate)}</BaseCalDetails> </p>
        </div>
        <div style={{margin: "0px 30px 30px 30px"}}>
          <p>Approved By: <BaseCalDetails>_PLACEHOLDER_</BaseCalDetails></p>
          <p>Radiation Safety Officer: <BaseCalDetails>_PLACEHOLDER_</BaseCalDetails></p>
        </div>
        <p>In accordance with Good Health Physics practices, Arrow-Tech, Inc. recommends an annual calibration check on the listed instruments. More frequent calibration maybe necessary should the User’s license require a shorter calibration interval.
        </p>
        <div style={{display: "flex", justifyContent: "space-around"}}>
          <table style={{maxWidth: "7in", fontSize: "8px", borderCollapse: "collapse"}}>
            <thead>
              <tr textAlign='center'>
                <TableHeader><span>Serial</span><br /><span> Number</span></TableHeader>
                <TableHeader><span>Exposed</span><br /><span>to:</span></TableHeader>
                <TableHeader>As Found Reading</TableHeader>
                <TableHeader><span>Mid-Scale</span><br /><span>Accuracy</span></TableHeader>
                <TableHeader>ACC Pass</TableHeader>
                <TableHeader><span>Visual</span><br /><span>Pass/Fail</span></TableHeader>
                <TableHeader>Electrical Leakage</TableHeader>
                <TableHeader><span>Hermetic</span><br /><span>Sealed</span></TableHeader>
                <TableHeader><span>Final</span><br /><span>Pass/Fail</span></TableHeader>
              </tr>
            </thead>
              {calData.filter( c => c.finalPass === true).map( c => {
                const {serialNumber, range, isR, isMr, isMsv, isSv} = c.dosimeter
                return(
                <tr key={c.id} style={{textAlign: "center"}}>
                <TableData>{serialNumber}</TableData>
                <TableData>{determineCalculatedDosimeterRange(range, isR, isMr, isMsv, isSv).replace(/\D/gm,"") / 2} {printUnit(isR, isMr, isSv, isMsv)} </TableData>
                <TableData>{c.accRead} {printUnit(isR, isMr, isSv, isMsv)}</TableData>
                <TableData>{midScaleAccuracy(c.accRead, isR, isMr, isSv, isMsv, range)}% </TableData>
                <TableData>
                  {/* <Icon name={c.accPass ? 'checkmark' : 'close'} color={c.accPass ? 'green' : 'red'}/> */}
                  <p>{c.accPass ? "Pass" : "Fail"}</p>
                </TableData>
                <TableData>
                  {/* <Icon name={c.vipPass ? 'checkmark' : 'close'} color={c.vipPass ? 'green' : 'red'}/> */}
                  <p>{c.vipPass ? "Pass" : "Fail"}</p>
                </TableData>
                <TableData>
                  {/* <Icon name={c.elPass ? 'checkmark' : 'close'} color={c.elPass ? 'green' : 'red'}/> */}
                  <p>{c.elPass ? "Pass" : "Fail"}</p>
                </TableData>
                <TableData>
                  {/* <Icon name={c.vacPass ? 'checkmark' : 'close'} color={c.vacPass ? 'green' : 'red'}/> */}
                  <p>{c.vacPass ? "Pass" : "Fail"}</p>
                </TableData>
                <TableData>
                  {/* <Icon name={c.finalPass ? 'checkmark' : 'close'} color={c.finalPass ? 'green' : 'red'}/> */}
                  <p>{c.finalPass ? "Pass" : "Fail"}</p>
                </TableData>
              </tr>
            )})}
          </table>
        </div>
    </div>
    </div>
   );
}

const TableData = styled.td `
  border: .1px solid black;
`;

const TableHeader = styled.th `
  width: 60px;
  border: .1px solid black;
  line-height: 10px;
`;

const BaseCalDetails = styled.span `
  padding-left: 15px;
  text-decoration: underline;
  font-weight: 700;
`;
 
export default CertificateOfCalibration;