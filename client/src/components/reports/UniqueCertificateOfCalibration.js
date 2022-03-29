import React from "react";
import {
  determineCalculatedDosimeterRange,
  renderPassFail,
} from "../HelperFunctions";
import CertificateHeader from "./CertificateHeader";
import CertificateFooter from "./CertificateFooter";
import {
  TableData,
  TableHeader,
  BaseCalDetails,
  Page,
} from "../../Styles/CalibrationCertificateStyles";
import { printUnit, printDate } from "../HelperFunctions";

const CertificateOfCalibration = ({ customer, calData }) => {
  const certType = "Certificate Of Calibration";
  var i = 0;

  const handleDueDate = (date) => {
    if (date === null) {
      return "Not Specified";
    } else return printDate(date);
  };

  return (
    <>
      {calData
        .filter((c) => c.finalPass === true)
        .map((c) => {
          i++;
          const { serialNumber, range, isR, isMr, isMsv, isSv } = c.dosimeter;
          return (
            <table key={c.id}>
              <div style={{ maxWidth: "7.5in", fontSize: "10pt" }}>
                <CertificateHeader
                  batchNumber={c.batch}
                  certificateType={certType}
                />
                <tbody>
                  <tr>
                    <td>
                      <Page style={{ marginTop: i == 1 ? "0px" : "155px" }}>
                        <h1
                          id="UI-title"
                          style={{ textAlign: "center", fontWeight: "900" }}
                        ></h1>
                        <p>
                          Certificate Number:{" "}
                          <span style={{ paddingLeft: "15px" }}>
                            {c.certificateNumber}
                          </span>
                        </p>
                        <p>
                          Customer:{" "}
                          <span style={{ paddingLeft: "15px" }}>
                            {customer.name}
                          </span>
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
                          <span style={{ paddingLeft: "80px" }}>
                            {customer.city},
                          </span>
                          <span style={{ paddingLeft: "3px" }}>
                            {customer.state}
                          </span>
                          <span style={{ paddingLeft: "3px" }}>
                            {customer.zip}
                          </span>
                          <br />
                          <span style={{ paddingLeft: "80px" }}>
                            {customer.country}
                          </span>
                        </p>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <p>
                            Instrument:{" "}
                            <BaseCalDetails>
                              Direct Reading Dosimeter
                            </BaseCalDetails>
                          </p>
                          <p>
                            Model:{" "}
                            <BaseCalDetails>
                              {c.dosimeter.modelNumber}
                            </BaseCalDetails>
                          </p>
                          <p>
                            Range:{" "}
                            <BaseCalDetails>
                              {determineCalculatedDosimeterRange(
                                range,
                                isR,
                                isMr,
                                isSv,
                                isMsv
                              )}
                            </BaseCalDetails>
                          </p>
                        </div>
                        <p>
                          The referenced Direct-Reading Dosimeters have been
                          tested for response in accordance with applicable
                          American National Standard Institute (ANSI) Standards
                          N13.5 and N322. Arrow-Tech, Inc. Radioactive Material
                          License #33-16216-01.
                        </p>
                        <p>
                          All instruments were tested on a{" "}
                          {c.calibrator ? (
                            c.calibrator.model
                          ) : (
                            <span style={{ backgroundColor: "yellow" }}>
                              ____________________
                            </span>
                          )}{" "}
                          Curie, Cesium 137 Carousel Calibrator, Serial Number{" "}
                          {c.calibrator ? (
                            c.calibrator.serialNumber
                          ) : (
                            <span style={{ backgroundColor: "yellow" }}>
                              ____________________
                            </span>
                          )}
                          , using an exposure rate of{" "}
                          {c.calibrator ? (
                            c.calibrator.exposureRate
                          ) : (
                            <span style={{ backgroundColor: "yellow" }}>
                              ____________________
                            </span>
                          )}
                          . All referenced Direct-Reading Dosimeters indicated
                          exposure are within the{" "}
                          {c.calibrator && c.tolerance !== 0.1
                            ? "customer defined limits"
                            : "allowable limits of +/-"}{" "}
                          {c.calibrator &&
                            c.tolerance * 100 + "% of true exposure."}
                          {!c.calibrator && (
                            <span style={{ backgroundColor: "yellow" }}>
                              ____________________
                            </span>
                          )}
                        </p>
                        <p>
                          The above referenced Gamma Source is calibrated by
                          utilizing Direct-Reading Dosimeter "Transfer
                          Standards" certified for accuracy and with
                          traceability to the National Institute of Standards
                          and Technology by Battelle National Laboratories PNNL
                          tracking Number{" "}
                          {c.calibrator ? (
                            c.calibrator.tfn
                          ) : (
                            <span style={{ backgroundColor: "yellow" }}>
                              ____________________
                            </span>
                          )}{" "}
                          dated{" "}
                          {c.calibrator ? (
                            c.calibrator.date
                          ) : (
                            <span style={{ backgroundColor: "yellow" }}>
                              ____________________
                            </span>
                          )}
                          .
                        </p>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            padding: "0px 30px 0px 30px",
                          }}
                        >
                          <div style={{ margin: "0px 30px 30px 30px" }}>
                            <p>
                              Calibration Performed By:{" "}
                              <BaseCalDetails>
                                {c.techFirstName} {c.techLastName}
                              </BaseCalDetails>
                            </p>
                            <p style={{ marginBottom: "0px" }}>
                              Approved By:{" "}
                              <BaseCalDetails>
                                ________________________________
                              </BaseCalDetails>
                            </p>
                            <p style={{ fontSize: "8px", marginLeft: "160px" }}>
                              Radiation Safety Officer
                            </p>
                          </div>
                          <div>
                            <p>
                              Calibration Date:{" "}
                              <BaseCalDetails style={{ marginLeft: "27px" }}>
                                {printDate(
                                  c.finalDate !== null ? c.finalDate : c.accDate
                                )}
                              </BaseCalDetails>
                            </p>
                            <p>
                              Calibration Due Date:{" "}
                              <BaseCalDetails>
                                {handleDueDate(c.dueDate)}
                              </BaseCalDetails>{" "}
                            </p>
                          </div>
                        </div>
                        <p>
                          In accordance with Good Health Physics practices,
                          Arrow-Tech, Inc. recommends an annual calibration
                          check on the listed instruments. More frequent
                          calibration maybe necessary should the User’s license
                          require a shorter calibration interval.
                        </p>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <table
                            style={{
                              maxWidth: "7.5in",
                              fontSize: "8px",
                              borderCollapse: "collapse",
                            }}
                          >
                            <thead>
                              <tr>
                                <TableHeader>
                                  <span>Serial</span>
                                  <br />
                                  <span> Number</span>
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
                                {c.vacRequired && (
                                  <TableHeader>
                                    <span>Hermetic</span>
                                    <br />
                                    <span>Sealed</span>
                                  </TableHeader>
                                )}
                                <TableHeader>
                                  <span>Final</span>
                                  <br />
                                  <span>Pass/Fail</span>
                                </TableHeader>
                              </tr>
                            </thead>
                            <tbody>
                              <tr key={c.id} style={{ textAlign: "center" }}>
                                <TableData>{serialNumber}</TableData>
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
                                  {c.accRead}{" "}
                                  {printUnit(isR, isMr, isSv, isMsv)}
                                </TableData>
                                <TableData>
                                  <p>
                                    {renderPassFail(
                                      c.accTestPerformed,
                                      c.accPass
                                    )}
                                  </p>
                                </TableData>
                                <TableData>
                                  <p>
                                    {renderPassFail(
                                      c.vipTestPerformed,
                                      c.vipPass
                                    )}
                                  </p>
                                </TableData>
                                <TableData>
                                  <p>
                                    {renderPassFail(
                                      c.elTestPerformed,
                                      c.elPass
                                    )}
                                    <br />
                                    {c.elTestPerformed && (
                                      <span>
                                        ({c.elRead}
                                        {c.elUnitsInMr
                                          ? "mR"
                                          : printUnit(isR, isMr, isSv, isMsv)}
                                        )
                                      </span>
                                    )}
                                  </p>
                                </TableData>
                                {c.vacRequired && (
                                  <TableData>
                                    <p>
                                      {renderPassFail(
                                        c.vacTestPerformed,
                                        c.vacPass
                                      )}
                                    </p>
                                  </TableData>
                                )}
                                <TableData>
                                  <p>{c.finalPass ? "Pass" : "Fail"}</p>
                                </TableData>
                              </tr>
                              <tr>
                                <td>
                                  <br />
                                </td>
                              </tr>
                              <tr
                                style={{ textAlign: "center", fontSize: "8px" }}
                              >
                                <td colspan="15">
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
        })}
    </>
  );
};

export default CertificateOfCalibration;
