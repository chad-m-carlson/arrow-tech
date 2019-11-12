import React from "react";
import { Header, PageHeader } from "../../Styles/CalibrationCertificateStyles";

const CertificateHeader = () => {
  return (
    <thead>
      <tr>
        <td>
          <Header id="header">
            <PageHeader>
              <div style={{ textAlign: "Center" }}>
                <img src={require("../../logo.png")} alt="logo"></img>
              </div>
            </PageHeader>
          </Header>
        </td>
      </tr>
    </thead>
  );
};

export default CertificateHeader;
