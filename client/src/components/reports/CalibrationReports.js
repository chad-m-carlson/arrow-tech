import React, { useState, useEffect } from "react";
import CertificateOfCalibration from "./CertificateOfCalibration";
import FailureReport from "./FailureReport";
import CalibrationSummary from "./CalibrationSummary";
import { Form, Button, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { CREATE_CALIBRATOR_RECORD } from "../graphql/mutations";
import { useMutation } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CalibrationReports = props => {
  const [calibrator, setCalibrator] = useState({
    id: null,
    model: "",
    serialNumber: "",
    tfn: "265623-01",
    exposureRate: "",
    date: "6/6/2019"
  });
  const [addCalibrator, setAddCalibrator] = useState(false);
  const [viewFailureReport, setViewFailureReport] = useState(false);
  const [viewCalibrationSummary, setViewCalibrationSummary] = useState(true);
  const [viewCalibrationReport, setViewCalibrationReport] = useState(false);
  const [cocCounter, setCocCounter] = useState(0);
  const [allCalibrationData, setAllCalibrationData] = useState([]);
  const [currentCalibrationData, setCurrentCalibrationData] = useState([]);

  const { calData, uniqueDosimeterModels } = props.location.state;
  const calibratorModelList = [
    { key: 1, text: "J.L. Shepherd 20", value: "J.L. Shepherd 20" },
    { key: 2, text: "TEMCO 100", value: "TEMCO 100" }
  ];

  const calibratorExposureRateList = [
    { key: 1, text: "520 mR/hr", value: "520 mR/hr" },
    { key: 2, text: "4R/hr", value: "4R/hr" },
    { key: 3, text: "35.7 R/hr", value: "35.7 R/hr" },
    { key: 4, text: "588.2 R/hr", value: "588.2 R/hr" },
    { key: 5, text: "43 mR/hr", value: "43 mR/hr" }
  ];

  const [createCalibratorRecord] = useMutation(CREATE_CALIBRATOR_RECORD, {
    onCompleted(data) {
      setCalibrator({
        ...calibrator,
        id: data.createCalibratorRecord.calibrator.id
      });
      let x = allCalibrationData.filter(
        c => c.dosimeter.modelNumber === uniqueDosimeterModels[cocCounter]
      );
      x.forEach(c => {
        {
          c.calibrator = data.createCalibratorRecord.calibrator;
        }
        {
          c.calibratorId = data.createCalibratorRecord.calibrator.id;
        }
      });
      setAllCalibrationData([
        ...allCalibrationData.filter(
          c => c.dosimeter.modelNumber !== uniqueDosimeterModels[cocCounter]
        ),
        ...x
      ]);
      toastMessage("Calibration equipment saved", "success");
    },
    onError(error) {
      toastMessage(error.graphQLErrors[0].message, "error");
    }
  });

  useEffect(() => {
    setAllCalibrationData(calData);
  }, []);

  useEffect(() => {
    calibratorSet();
  }, [cocCounter]);

  const calibratorSet = () => {
    // ?calData filtered by dosimeter model
    let x = calData.filter(
      c => c.dosimeter.modelNumber === uniqueDosimeterModels[cocCounter]
    );
    if (x[0].calibrator === null) {
      setAddCalibrator(true);
      setCalibrator({
        id: null,
        model: "",
        serialNumber: "",
        tfn: "265623-01",
        exposureRate: "",
        date: "6/6/2019"
      });
    } else {
      const {
        id,
        model,
        serialNumber,
        tfn,
        exposureRate,
        date
      } = x[0].calibrator;
      setCalibrator({ id, model, serialNumber, tfn, exposureRate, date });
      setAddCalibrator(false);
    }
    setCurrentCalibrationData(x);
  };

  const setCalibratorModel = (e, { value }) => {
    switch (value) {
      case "J.L. Shepherd 20":
        setCalibrator({ ...calibrator, serialNumber: "6046", model: value });
        break;
      case "TEMCO 100":
        setCalibrator({ ...calibrator, serialNumber: "186", model: value });
        break;
    }
  };

  const setCalibratorExposureRate = (e, { value }) => {
    setCalibrator({ ...calibrator, exposureRate: value });
  };

  const handleSubmit = () => {
    createCalibratorRecord({
      variables: {
        id: calibrator.id,
        model: calibrator.model,
        serial_number: calibrator.serialNumber,
        exposure_rate: calibrator.exposureRate,
        tfn: calibrator.tfn,
        date: calibrator.date,
        batch: calData[0].batch,
        dosimeter_model: uniqueDosimeterModels[cocCounter]
      }
    });
  };

  const handleCocNavigation = direction => {
    if (direction === "next") {
      setCocCounter(cocCounter + 1);
    } else setCocCounter(cocCounter - 1);
    calibratorSet();
  };

  const printCoc = () => {
    const toastContainer = document.querySelectorAll(".Toastify");
    document.getElementById("navbar").style.display = "none";
    document.getElementById("hide-to-print").style.display = "none";
    document.getElementById("header").style.display = "block";
    document.getElementById("footer").style.display = "block";
    document.getElementById("page-container").style.margin = "0";
    document.getElementById("pdf-container").style.width = "100%";
    toastContainer.forEach(e => (e.style.display = "none"));
    window.print();
    toastContainer.forEach(e => (e.style.display = "inline"));
    document.getElementById("header").style.display = "none";
    document.getElementById("footer").style.display = "none";
    document.getElementById("navbar").style.display = "inline-flex";
    document.getElementById("hide-to-print").style.display = "inline";
    document.getElementById("page-container").style.margin = "4rem";
    document.getElementById("pdf-container").style.width = "60%";
  };

  const switchCerts = certToView => {
    if (certToView === "calibration") {
      setViewCalibrationReport(true);
      setViewFailureReport(false);
      setViewCalibrationSummary(false);
    } else if (certToView === "failure") {
      setViewCalibrationReport(false);
      setViewFailureReport(true);
      setViewCalibrationSummary(false);
    } else {
      setViewCalibrationReport(false);
      setViewFailureReport(false);
      setViewCalibrationSummary(true);
    }
  };

  const toastMessage = (message, type) => {
    toast(message, {
      type: type,
      autoClose: 4000
    });
  };

  return (
    <Grid columns={2}>
      <Grid.Column style={{ width: "60%" }} id="pdf-container">
        {viewCalibrationReport && (
          <CertificateOfCalibration
            customer={allCalibrationData[0].dosimeter.customer}
            user={allCalibrationData[0].user}
            calData={currentCalibrationData}
            calibratorData={calibrator}
          />
        )}
        {viewFailureReport && (
          <FailureReport
            customer={allCalibrationData[0].dosimeter.customer}
            user={allCalibrationData[0].user}
            calData={allCalibrationData}
            calibratorData={calibrator}
            dateTested={
              calData.find(({ finalDate }) => finalDate !== null) === undefined
                ? calData.find(({ accDate }) => accDate !== null).accDate
                : calData.find(({ finalDate }) => finalDate !== null).finalDate
            }
          />
        )}
        {viewCalibrationSummary && (
          <CalibrationSummary
            calData={
              allCalibrationData.length > 0 ? allCalibrationData : calData
            }
            dateTested={
              calData.find(({ finalDate }) => finalDate !== null) === undefined
                ? calData.find(({ accDate }) => accDate !== null).accDate
                : calData.find(({ finalDate }) => finalDate !== null).finalDate
            }
            uniqueDosimeterModels={uniqueDosimeterModels}
          />
        )}
      </Grid.Column>
      <Grid.Column
        style={{ width: "40%", position: "fixed", left: "65%" }}
        id="hide-to-print"
      >
        <h2>Batch# {calData[0].batch}</h2>
        <h3>Dosimeter Models: {uniqueDosimeterModels.length}</h3>
        <h4>Total Dosimeters: {calData.length}</h4>
        <>
          <Button
            disabled={!calibrator.id}
            style={{ marginBottom: "10px" }}
            onClick={printCoc}
            color="green"
          >
            Print this certificate
          </Button>
          <br />
          <Button
            style={{ marginBottom: "10px" }}
            onClick={() => switchCerts("summary")}
          >
            View Calibration Summary
          </Button>
          <br />
          <Button
            style={{ marginBottom: "10px" }}
            onClick={() => switchCerts("calibration")}
          >
            View Calibration Report
          </Button>
          <br />
          {uniqueDosimeterModels.length > 1 &&
            !viewFailureReport &&
            !viewCalibrationSummary && (
              <>
                <Button
                  disabled={cocCounter === 0}
                  style={{ marginBottom: "10px" }}
                  onClick={() => handleCocNavigation("prev")}
                >
                  Previous Model CoC
                </Button>
                <Button
                  disabled={
                    cocCounter === uniqueDosimeterModels.length - 1 ||
                    calData.filter(
                      c =>
                        c.finalPass === true &&
                        c.dosimeter.modelNumber ===
                          uniqueDosimeterModels[cocCounter + 1]
                    ).length === 0
                  }
                  style={{ marginBottom: "10px" }}
                  onClick={() => handleCocNavigation("next")}
                >
                  Next Model CoC
                </Button>
                <br />
              </>
            )}
          <Button
            style={{ marginBottom: "10px" }}
            onClick={() => switchCerts("failure")}
          >
            View Failure Report
          </Button>
          <br />
        </>
        {viewCalibrationReport && (
          <Button
            style={{ marginBottom: "10px" }}
            onClick={() => setAddCalibrator(true)}
          >
            Edit Calibration Equipment
          </Button>
        )}
        <br />
        <Button
          style={{ marginBottom: "10px" }}
          as={Link}
          to={{ pathname: "/batchreport", state: { batch: calData[0].batch } }}
        >
          Back to Batch #{calData[0].batch} Report
        </Button>
        {addCalibrator && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center"
            }}
          >
            <Form onSubmit={handleSubmit}>
              <Form.Group
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "fit-content"
                }}
              >
                <Form.Select
                  label="Calibration Unit"
                  options={calibratorModelList}
                  onChange={setCalibratorModel}
                />
                <Form.Select
                  label="Exposure Rate"
                  options={calibratorExposureRateList}
                  onChange={setCalibratorExposureRate}
                />
              </Form.Group>
              <Button>Save</Button>
            </Form>
          </div>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default CalibrationReports;
