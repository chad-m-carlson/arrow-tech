import React from "react";
import CertificateHeader from "./CertificateHeader";
import CertificateFooter from "./CertificateFooter";
import {
  TableData,
  TableHeader,
  BaseCalDetails,
  Page
} from "../../Styles/CalibrationCertificateStyles";
import { printDate } from "../HelperFunctions";

const CalibrationSummary = ({ calData, dateTested, uniqueDosimeterModels }) => {
  const { customer } = calData[0].dosimeter;

  return (
    <table>
      <div style={{ maxWidth: "7.5in", fontSize: "10pt" }}>
        <CertificateHeader />
        <tbody>
          <tr>
            <td>
              <Page>
                <h1 style={{ textAlign: "center", fontWeight: "900" }}>
                  Calibration Summary
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
                        {calData[0].user.firstName} {calData[0].user.lastName}
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
                      width: "7.5in",
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
                          <span>Mid-Scale</span>
                          <br />
                          <span>Accuracy Fail</span>
                        </TableHeader>
                        <TableHeader>
                          <span>Visual Inspection</span>
                          <span>Fail</span>
                        </TableHeader>
                        <TableHeader>
                          <span>Hermetic Seal</span>
                          <br />
                          <span>Fail</span>
                        </TableHeader>
                        <TableHeader>
                          <span>Electrical Leakage</span>
                          <span>Fail</span>
                        </TableHeader>
                        <TableHeader>
                          <span>Total Fail</span>
                          <br />
                          <span>For Model</span>
                        </TableHeader>
                        <TableHeader>
                          <span>Total Pass</span>
                          <br />
                          <span>For Model</span>
                        </TableHeader>
                        <TableHeader>
                          <span>Total</span>
                          <br />
                          <span>For Model</span>
                        </TableHeader>
                      </tr>
                    </thead>
                    <tbody>
                      {uniqueDosimeterModels.map(d => {
                        return (
                          <tr key={d.index} style={{ textAlign: "center" }}>
                            <TableData>{d}</TableData>
                            <TableData>
                              {
                                calData.filter(
                                  c =>
                                    c.dosimeter.modelNumber === d &&
                                    c.accPass === false
                                ).length
                              }
                            </TableData>
                            <TableData>
                              {
                                calData.filter(
                                  c =>
                                    c.dosimeter.modelNumber === d &&
                                    c.vipPass === false
                                ).length
                              }
                            </TableData>
                            <TableData>
                              {
                                calData.filter(
                                  c =>
                                    c.dosimeter.modelNumber === d &&
                                    c.vacPass === false
                                ).length
                              }
                            </TableData>
                            <TableData>
                              {
                                calData.filter(
                                  c =>
                                    c.dosimeter.modelNumber === d &&
                                    c.elPass === false
                                ).length
                              }
                            </TableData>
                            <TableData>
                              {
                                calData.filter(
                                  c =>
                                    c.dosimeter.modelNumber === d &&
                                    c.finalPass === false
                                ).length
                              }
                            </TableData>
                            <TableData>
                              {
                                calData.filter(
                                  c =>
                                    c.dosimeter.modelNumber === d &&
                                    c.finalPass === true
                                ).length
                              }
                            </TableData>
                            <TableData>
                              {
                                calData.filter(
                                  c => c.dosimeter.modelNumber === d
                                ).length
                              }
                            </TableData>
                          </tr>
                        );
                      })}
                      <tr style={{ textAlign: "center" }}>
                        <td
                          style={{
                            borderBottom: ".1px solid black",
                            borderLeft: ".1px solid black"
                          }}
                        ></td>
                        <td style={{ borderBottom: ".1px solid black" }}></td>
                        <td style={{ borderBottom: ".1px solid black" }}></td>
                        <td style={{ borderBottom: ".1px solid black" }}></td>
                        <td style={{ borderBottom: ".1px solid black" }}></td>
                        <td style={{ borderBottom: ".1px solid black" }}></td>
                        <td
                          style={{
                            borderBottom: ".1px solid black",
                            borderRight: ".1px solid black",
                            textAlign: "right",
                            paddingRight: "5px"
                          }}
                        >
                          Grand Total
                        </td>
                        <td
                          style={{
                            borderBottom: ".1px solid black",
                            borderRight: ".1px solid black",
                            textAlign: "center"
                          }}
                        >
                          {calData.length}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <br />
                        </td>
                      </tr>
                      <tr style={{ textAlign: "center", fontSize: "8px" }}>
                        <td colspan="8">
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

export default CalibrationSummary;
