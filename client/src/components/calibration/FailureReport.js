import React from 'react';
import {determineCalculatedDosimeterRange, } from '../HelperFunctions';
import {TableData, TableHeader, BaseCalDetails, Header, PageHeader, Footer, PageFooter, Page, } from '../../Styles/CalibrationCertificateStyles';
import {printUnit, printDate, } from '../HelperFunctions';


const FailureReport = ({calData, calibratorData, dateTested}) => {
  const {customer} = calData[0].dosimeter

  //   const midScaleAccuracy = (accRead, isR, isMr, isSv, isMsv, range) => {
  //   let calculatedExposure = determineCalculatedDosimeterRange(range, isR, isMr, isMsv, isSv).replace(/\D/gm,"") / 2
  //   let difference =  Math.abs(accRead - calculatedExposure)
  //   return (((calculatedExposure - difference) / calculatedExposure) * 100).toFixed(2)
  // };
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
                <h1 style={{textAlign: "center", fontWeight: "900"}}>Failure Report</h1>
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
                  {/* <p>Instrument: <BaseCalDetails>Direct Reading Dosimeter</BaseCalDetails></p> */}
                  {/* <p>Model: <BaseCalDetails>{calData[0].dosimeter.modelNumber}</BaseCalDetails></p> */}
                  {/* <p>Range: <BaseCalDetails>{determineCalculatedDosimeterRange(range, isR,  isMr, isSv, isMsv,)}</BaseCalDetails></p> */}
                </div>
                <p>The referenced Direct-Reading Dosimeters have been tested for response in accordance with applicable American National Standard Institute (ANSI) Standards N13.5 and N322. Arrow-Tech, Inc. Radioactive Material License #33-16216.</p>
                <p>The above referenced Gamma Source is calibrated by utilizing Direct-Reading Dosimeter "Transfer Standards" certified for accuracy and with traceability to the National Institute of Standards and Technology by Battelle National Laboratories. <br />TFN: {calibratorData.id ? calibratorData.tfn : <span style={{backgroundColor: "yellow"}}>____________________</span>} dated {calibratorData.id ? calibratorData.date : <span style={{backgroundColor: "yellow"}}>____________________</span>}
                </p>
                <p>All instruments were tested on a J.L. Shepherd 20 Curie, Cesium 137 Carousel Calibrator, Serial Number 6046.</p>
                <div style={{display: "flex", justifyContent: "space-between", padding: "0px 30px 0px 30px"}}>
                <div style={{margin: "0px 30px 30px 30px"}}>
                  <p>Tests Performed By: <BaseCalDetails>{calData[0].user.firstName} {calData[0].user.lastName}</BaseCalDetails></p>
                  <p>Date Tested: <BaseCalDetails>{printDate(dateTested)}</BaseCalDetails></p>
                </div>
                  <div>
                  </div>
                </div>
                <div style={{display: "flex", justifyContent: "space-around"}}>
                <table style={{maxWidth: "7.5in", fontSize: "8px", borderCollapse: "collapse"}}>
                  <thead>
                    <tr>
                      <TableHeader><span>Model</span><br /><span> Number</span></TableHeader>
                      <TableHeader><span>Serial</span><br /><span> Number</span></TableHeader>
                      <TableHeader><span>Range</span></TableHeader>
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
                      {calData.map( c => {
                      const {serialNumber, modelNumber, range, isR, isMr, isMsv, isSv} = c.dosimeter
                      return(
                      <tr key={c.id} style={{textAlign: "center"}}>
                        <TableData>{modelNumber}</TableData>
                        <TableData>{serialNumber}</TableData>
                        <TableData>{determineCalculatedDosimeterRange(range, isR,  isMr, isSv, isMsv,)}</TableData>
                        <TableData>{determineCalculatedDosimeterRange(range, isR, isMr, isMsv, isSv).replace(/\D/gm,"") / 2} {printUnit(isR, isMr, isSv, isMsv)} </TableData>
                        <TableData> {c.accRead} {printUnit(isR, isMr, isSv, isMsv)}</TableData>
                        {/* <TableData disabled={!c.vipPass}>{midScaleAccuracy(c.accRead, isR, isMr, isSv, isMsv, range)}% </TableData> */}
                        <TableData failed={!c.accPass}>
                          <p>{c.accPass ? "Pass" : "Fail"}</p>
                        </TableData>
                        <TableData failed={!c.vipPass}>
                          <p>{c.vipPass ? "Pass" : "Fail"}</p>
                        </TableData>
                        <TableData failed={!c.elPass}>
                          <p>{c.elRead}  ({c.elPass ? "Pass" : "Fail"})</p>
                        </TableData>
                        <TableData failed={!c.vacPass}>
                          <p>{c.vacPass ? "Pass" : "Fail"}</p>
                        </TableData>
                        <TableData failed={!c.finalPass}>
                          <p>{c.finalPass ? "Pass" : "Fail"}</p>
                        </TableData>
                      </tr>
                    )})}
                    <tr>
                      <td><br /></td>
                    </tr>
                    <tr style={{textAlign: "center", fontSize: "14px", paddingTop: "15px"}}>
                      <td colspan='10'>***********************END***********************</td>
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
 
export default FailureReport;