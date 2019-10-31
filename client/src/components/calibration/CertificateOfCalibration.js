import React from 'react';
import {determineCalculatedDosimeterRange, } from '../HelperFunctions';
import {TableData, TableHeader, BaseCalDetails, Header, PageHeader, Footer, PageFooter, Page, } from '../../Styles/CalibrationCertificateStyles';
import {printUnit, printDate, } from '../HelperFunctions';

const CertificateOfCalibration = ({calData, calibratorData}) => {

  const {range, isR, isMr, isSv, isMsv, customer} = calData[0].dosimeter

  return ( 
    <table>
      <div style={{maxWidth: "7.5in", fontSize: "10pt"}}>
        <thead>
          <tr>
            <td>
              <Header id='header'>
                <PageHeader>
                  <div style={{textAlign: "Center"}}>
                    <img src={require('../../logo.png')} alt='logo'></img>
                  </div>
                </PageHeader>
              </Header>
            </td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Page>
                <h1 style={{textAlign: "center", fontWeight: "900"}}>Certificate of Calibration</h1>
                <p>Certificate Number: <span style={{paddingLeft: "15px"}}>{calData[0].certificateNumber}</span></p>
                <p>Customer: <span style={{paddingLeft: "15px"}}>{customer.name}</span></p>
                <p>
                  <span style={{paddingLeft: "80px"}}>{customer.streetAddress1}</span><br />
                  {customer.streetAddress2 &&
                    <>
                      <span style={{paddingLeft: "80px"}}>{customer.streetAddress2}</span><br />
                    </>
                  }
                  <span style={{paddingLeft: "80px"}}>{customer.city},</span>
                  <span style={{paddingLeft: "3px"}}>{customer.state}</span>
                  <span style={{paddingLeft: "3px"}}>{customer.zip}</span><br />
                  <span style={{paddingLeft: "80px"}}>{customer.country}</span>
                </p>
                <div style={{display: "flex", justifyContent: "space-between"}}>
                  <p>Instrument: <BaseCalDetails>Direct Reading Dosimeter</BaseCalDetails></p>
                  <p>Model: <BaseCalDetails>{calData[0].dosimeter.modelNumber}</BaseCalDetails></p>
                  <p>Range: <BaseCalDetails>{determineCalculatedDosimeterRange(range, isR,  isMr, isSv, isMsv,)}</BaseCalDetails></p>
                </div>
                <p>The referenced Direct-Reading Dosimeters have been tested for response in accordance with applicable American National Standard Institute (ANSI) Standards N13.5 and N322. Arrow-Tech, Inc. Radioactive Material License #33-16216.</p>
                <p>All instruments were tested on a {calibratorData.id ? calibratorData.model : <span style={{backgroundColor: "yellow"}}>____________________</span>} Curie, Cesium 137 Carousel Calibrator, Serial Number {calibratorData.id ? calibratorData.serialNumber : <span style={{backgroundColor: "yellow"}}>____________________</span>}, using an exposure rate of {calibratorData.id ? calibratorData.exposureRate : <span style={{backgroundColor: "yellow"}}>____________________</span>}. All referenced Direct-Reading Dosimeters indicated exposure are within the {calData[0].tolerance !== 0.1 ? "customer defined limits" : "allowable limits"} of +/- {(calData[0].tolerance) * 100}% of true exposure.
                </p>
                <p>The above referenced Gamma Source is calibrated by utilizing Direct-Reading Dosimeter "Transfer Standards" certified for accuracy and with traceability to the National Institute of Standards and Technology by Battelle National Laboratories. TFN: {calibratorData.id ? calibratorData.tfn : <span style={{backgroundColor: "yellow"}}>____________________</span>} dated {calibratorData.id ? calibratorData.date : <span style={{backgroundColor: "yellow"}}>____________________</span>}
                </p>
                <div style={{display: "flex", justifyContent: "space-between", padding: "0px 30px 0px 30px"}}>
                <div style={{margin: "0px 30px 30px 30px"}}>
                  <p>Calibration Performed By: <BaseCalDetails>{calData[0].user.firstName} {calData[0].user.lastName}</BaseCalDetails></p>
                  <p style={{marginBottom: "0px"}}>Approved By: <BaseCalDetails>____________________________________________</BaseCalDetails></p>
                  <p style={{fontSize: "8px", marginLeft: "160px"}}>Radiation Safety Officer</p>
                </div>
                  <div>
                    <p>Calibration Date: <BaseCalDetails>{printDate(calData[0].finalDate)}</BaseCalDetails></p>
                    <p>Calibration Due Date: <BaseCalDetails>{printDate(calData[0].dueDate)}</BaseCalDetails> </p>
                  </div>
                </div>
                <p>In accordance with Good Health Physics practices, Arrow-Tech, Inc. recommends an annual calibration check on the listed instruments. More frequent calibration maybe necessary should the User’s license require a shorter calibration interval.
                </p>
                <div style={{display: "flex", justifyContent: "space-around"}}>
                <table style={{maxWidth: "7.5in", fontSize: "8px", borderCollapse: "collapse"}}>
                  <thead>
                    <tr>
                      <TableHeader><span>Serial</span><br /><span> Number</span></TableHeader>
                      <TableHeader><span>Exposed</span><br /><span>to:</span></TableHeader>
                      <TableHeader>As Found Reading</TableHeader>
                      <TableHeader><span>Mid-Scale</span><br /><span>Accuracy</span></TableHeader>
                      {/* <TableHeader>ACC Pass</TableHeader> */}
                      <TableHeader><span>Visual</span><br /><span>Pass/Fail</span></TableHeader>
                      <TableHeader>Electrical Leakage</TableHeader>
                      <TableHeader><span>Hermetic</span><br /><span>Sealed</span></TableHeader>
                      <TableHeader><span>Final</span><br /><span>Pass/Fail</span></TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {calData.filter( c => c.finalPass === true).map( c => { */}
                      {calData.map( c => {
                      const {serialNumber, range, isR, isMr, isMsv, isSv} = c.dosimeter
                      return(
                      <tr key={c.id} style={{textAlign: "center"}}>
                        <TableData>{serialNumber}</TableData>
                        <TableData>{determineCalculatedDosimeterRange(range, isR, isMr, isMsv, isSv).replace(/\D/gm,"") / 2} {printUnit(isR, isMr, isSv, isMsv)} </TableData>
                        <TableData>{c.accRead} {printUnit(isR, isMr, isSv, isMsv)}</TableData>
                        {/* <TableData>{midScaleAccuracy(c.accRead, isR, isMr, isSv, isMsv, range)}% </TableData> */}
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
                    <tr>
                      <td><br /></td>
                    </tr>
                    <tr style={{textAlign: "center", fontSize: "14px", paddingTop: "15px"}}>
                      <td colspan='8'>***********************END***********************</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </Page>
            </td>
          </tr>
        </tbody>
      <tfoot>
        <tr>
          <td>
            <PageFooter id='footer'>
            <Footer>
              <div style={{fontSize: "10px", lineHeight: "13px", display: "flex", justifyContent: "space-evenly"}}>
                <span>417 Main Avenue West</span><br />
                <span>P.O. Box 1240</span><br />
                <span>Rolla, ND 58367</span><br />
                <span>Phone: 701-477-6461</span><br />
                <span>Fax: 701-477-6464</span><br />
                <span>E-Mail: sales@dosimeter.com</span><br />
              </div>
              </Footer>
            </PageFooter>
          </td>
        </tr>
      </tfoot>
    </div>
  </table>
   );
}


 
export default CertificateOfCalibration;