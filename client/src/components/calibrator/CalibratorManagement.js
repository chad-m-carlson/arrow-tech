import React from "react";
import CalibratorCertificates from "./CalibratorCertificates";
import ExposureRates from "./ExposureRates";

const CalibratorManagement = (props) => {
  return (
    <div>
      <h1>Calibrator Management</h1>
      <CalibratorCertificates />
      {/* <ExposureRates /> */}
    </div>
  );
};

export default CalibratorManagement;
