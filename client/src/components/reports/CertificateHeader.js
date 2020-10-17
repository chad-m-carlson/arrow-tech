import React from "react";
import {
  Header,
  PageHeader,
  CertTitle,
  CertTitleNumber,
} from "../../Styles/CalibrationCertificateStyles";

const CertificateHeader = (props) => {
  return (
    <thead>
      <tr>
        <td>
          <Header id="header">
            <PageHeader>
              <div style={{ textAlign: "Center" }}>
                <img
                  src={require("../../logo.png")}
                  alt="logo"
                  style={{ marginLeft: "-40px" }}
                ></img>
                <CertTitle certificateType={props.certificateType}>
                  {props.certificateType}

                  <CertTitleNumber>Batch: {props.batchNumber}</CertTitleNumber>
                </CertTitle>
              </div>
            </PageHeader>
          </Header>
        </td>
      </tr>
    </thead>
  );
};

export default CertificateHeader;
