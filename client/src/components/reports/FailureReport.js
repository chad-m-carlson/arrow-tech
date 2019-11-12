import React from "react";
import { determineCalculatedDosimeterRange } from "../HelperFunctions";
import CertificateHeader from "./CertificateHeader";
import CertificateFooter from "./CertificateFooter";
import {
  TableData,
  TableHeader,
  BaseCalDetails,
  Page
} from "../../Styles/CalibrationCertificateStyles";
import { printUnit, printDate } from "../HelperFunctions";

const FailureReport = ({
  calData,
  calibratorData,
  dateTested,
  customer,
  user
}) => {
  return (
    <table>
      <div style={{ maxWidth: "7.5in", fontSize: "10pt" }}>
        <CertificateHeader />
        <tbody>
          <tr>
            <td>
              <Page>
                <h1 style={{ textAlign: "center", fontWeight: "900" }}>
                  Failure Report
                </h1>
                <p>
                  Customer:{" "}
                  <span style={{ paddingLeft: "15px" }}>{customer.name}</span>
                </p>
                <p>
                  <span style={{ paddingLeft: "80px" }}>
                    {customer.streetAddress1}
                  </span>
                  <br />
                  {customer.streetAddress2 && (
                    <>
                      <span style={{ paddingLeft: "80px" }}>
                        {customer.streetAddress2}
                      </span>
                      <br />
                    </>
                  )}
                  <span style={{ paddingLeft: "80px" }}>{customer.city},</span>
                  <span style={{ paddingLeft: "3px" }}>{customer.state}</span>
                  <span style={{ paddingLeft: "3px" }}>{customer.zip}</span>
                  <br />
                  <span style={{ paddingLeft: "80px" }}>
                    {customer.country}
                  </span>
                </p>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  {/* <p>Instrument: <BaseCalDetails>Direct Reading Dosimeter</BaseCalDetails></p> */}
                  {/* <p>Model: <BaseCalDetails>{calData[0].dosimeter.modelNumber}</BaseCalDetails></p> */}
                  {/* <p>Range: <BaseCalDetails>{determineCalculatedDosimeterRange(range, isR,  isMr, isSv, isMsv,)}</BaseCalDetails></p> */}
                </div>
                <p>
                  The referenced Direct-Reading Dosimeters have been tested for
                  response in accordance with applicable American National
                  Standard Institute (ANSI) Standards N13.5 and N322.
                  Arrow-Tech, Inc. Radioactive Material License #33-16216.
                </p>
                <p>
                  The above referenced Gamma Source is calibrated by utilizing
                  Direct-Reading Dosimeter "Transfer Standards" certified for
                  accuracy and with traceability to the National Institute of
                  Standards and Technology by Battelle National Laboratories.
                  TFN:{" "}
                  {calibratorData.id ? (
                    calibratorData.tfn
                  ) : (
                    <span style={{ backgroundColor: "yellow" }}>
                      ____________________
                    </span>
                  )}{" "}
                  dated{" "}
                  {calibratorData.id ? (
                    calibratorData.date
                  ) : (
                    <span style={{ backgroundColor: "yellow" }}>
                      ____________________
                    </span>
                  )}
                </p>
                <p>
                  All instruments were tested on a J.L. Shepherd 20 Curie,
                  Cesium 137 Carousel Calibrator, Serial Number 6046.
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    padding: "0px 30px 0px 30px"
                  }}
                >
                  <div style={{ margin: "0px 30px 30px 30px" }}>
                    <p>
                      Tests Performed By:{" "}
                      <BaseCalDetails>
                        {user.firstName} {user.lastName}
                      </BaseCalDetails>
                    </p>
                    <p>
                      Date Tested:{" "}
                      <BaseCalDetails>{printDate(dateTested)}</BaseCalDetails>
                    </p>
                  </div>
                  <div></div>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-around" }}
                >
                  <table
                    style={{
                      maxWidth: "7.5in",
                      fontSize: "8px",
                      borderCollapse: "collapse"
                    }}
                  >
                    <thead>
                      <tr>
                        <TableHeader>
                          <span>Model</span>
                          <br />
                          <span> Number</span>
                        </TableHeader>
                        <TableHeader>
                          <span>Serial</span>
                          <br />
                          <span> Number</span>
                        </TableHeader>
                        <TableHeader>
                          <span>Range</span>
                        </TableHeader>
                        <TableHeader>
                          <span>Exposed</span>
                          <br />
                          <span>to:</span>
                        </TableHeader>
                        <TableHeader>As Found Reading</TableHeader>
                        <TableHeader>
                          <span>Mid-Scale</span>
                          <br />
                          <span>Accuracy</span>
                        </TableHeader>
                        <TableHeader>
                          <span>Visual</span>
                          <br />
                          <span>Pass/Fail</span>
                        </TableHeader>
                        <TableHeader>Electrical Leakage</TableHeader>
                        <TableHeader>
                          <span>Hermetic</span>
                          <br />
                          <span>Sealed</span>
                        </TableHeader>
                        <TableHeader>
                          <span>Final</span>
                          <br />
                          <span>Pass/Fail</span>
                        </TableHeader>
                      </tr>
                    </thead>
                    <tbody>
                      {calData
                        .filter(c => c.finalPass === false)
                        .map(c => {
                          const {
                            serialNumber,
                            modelNumber,
                            range,
                            isR,
                            isMr,
                            isMsv,
                            isSv
                          } = c.dosimeter;
                          return (
                            <tr key={c.id} style={{ textAlign: "center" }}>
                              <TableData>{modelNumber}</TableData>
                              <TableData>{serialNumber}</TableData>
                              <TableData>
                                {determineCalculatedDosimeterRange(
                                  range,
                                  isR,
                                  isMr,
                                  isSv,
                                  isMsv
                                )}
                              </TableData>
                              <TableData>
                                {determineCalculatedDosimeterRange(
                                  range,
                                  isR,
                                  isMr,
                                  isMsv,
                                  isSv
                                ).replace(/\D/gm, "") / 2}{" "}
                                {printUnit(isR, isMr, isSv, isMsv)}{" "}
                              </TableData>
                              <TableData>
                                {" "}
                                {c.accRead} {printUnit(isR, isMr, isSv, isMsv)}
                              </TableData>
                              {/* <TableData disabled={!c.vipPass}>{midScaleAccuracy(c.accRead, isR, isMr, isSv, isMsv, range)}% </TableData> */}
                              <TableData failed={!c.accPass}>
                                <p>{c.accPass ? "Pass" : "Fail"}</p>
                              </TableData>
                              <TableData failed={!c.vipPass}>
                                <p>{c.vipPass ? "Pass" : "Fail"}</p>
                              </TableData>
                              <TableData failed={!c.elPass}>
                                <p>
                                  {c.elRead} ({c.elPass ? "Pass" : "Fail"})
                                </p>
                              </TableData>
                              {c.vacRequired ? (
                                <TableData failed={!c.vacPass}>
                                  <p>{c.vacPass ? "Pass" : "Fail"}</p>
                                </TableData>
                              ) : (
                                <TableData>
                                  <p>N/A</p>
                                </TableData>
                              )}
                              <TableData failed={!c.finalPass}>
                                <p>{c.finalPass ? "Pass" : "Fail"}</p>
                              </TableData>
                            </tr>
                          );
                        })}
                      {calData.filter(c => c.finalPass === false).length ===
                        0 && (
                        <tr
                          style={{
                            textAlign: "center",
                            fontSize: "16px",
                            letterSpacing: "8px"
                          }}
                        >
                          <td
                            style={{ border: ".1px solid black" }}
                            colspan="15"
                          >
                            No Failing Dosimeters
                          </td>
                        </tr>
                      )}
                      <tr>
                        <td>
                          <br />
                        </td>
                      </tr>
                      <tr style={{ textAlign: "center", fontSize: "8px" }}>
                        <td colspan="10">
                          ***********************END***********************
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </Page>
            </td>
          </tr>
        </tbody>
        <CertificateFooter />
      </div>
    </table>
  );
};

export default FailureReport;
