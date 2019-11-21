import React from "react";
import CalibratorCertificates from "./CalibratorCertificates";
import ExposureRates from "./ExposureRates";

const CalibratorManagement = props => {
  return (
    <div>
      <h1>CalibratorManagement</h1>
      <CalibratorCertificates />
      <ExposureRates />
    </div>
  );
};

export default CalibratorManagement;
