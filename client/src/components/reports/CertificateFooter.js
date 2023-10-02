import React from "react";
import { PageFooter, Footer } from "../../Styles/CalibrationCertificateStyles";

const CertificateFooter = () => {
  return (
    <tfoot style={{ height: "75px" }}>
      <tr>
        <td>
          <PageFooter id="footer" style={{ height: "25px", marginTop: "35px" }}>
            <Footer>
              <div
                style={{
                  fontSize: "10px",
                  lineHeight: "13px",
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <span>417 Main Avenue West</span>
                <br />
                <span>P.O. Box 1240</span>
                <br />
                <span>Rolla, ND 58367</span>
                <br />
                <span>Phone: 701-477-6461</span>
                <br />
                <span>Fax: 701-477-6464</span>
                <br />
                <span>E-Mail: sales@dosimeter.com</span>
                <br />
              </div>
            </Footer>
          </PageFooter>
        </td>
      </tr>
    </tfoot>
  );
};

export default CertificateFooter;
