import React, { useState, useEffect } from "react";
import CertificateOfCalibration from "./CertificateOfCalibration";
import UniqueCertificateOfCalibration from "./UniqueCertificateOfCalibration";
import FailureReport from "./FailureReport";
import CalibrationSummary from "./CalibrationSummary";
import { Dimmer, Loader, Form, Button, Grid } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { CREATE_CALIBRATOR_RECORD } from "../graphql/mutations";
import { CALIBRATOR_CERTS } from "../graphql/queries";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CalibrationReports = (props) => {
  const [calibrator, setCalibrator] = useState({
    id: null,
    model: "",
    serialNumber: "",
    tfn: "",
    exposureRate: "",
    date: "",
  });
  const [addCalibrator, setAddCalibrator] = useState(false);
  const [viewFailureReport, setViewFailureReport] = useState(false);
  const [viewCalibrationSummary, setViewCalibrationSummary] = useState(true);
  const [viewCalibrationReport, setViewCalibrationReport] = useState(false);
  const [viewUniqueCalibrationReport, setViewUniqueCalibrationReport] =
    useState(false);
  const [cocCounter, setCocCounter] = useState(0);
  const [allCalibrationData, setAllCalibrationData] = useState([]);
  const [currentCalibrationData, setCurrentCalibrationData] = useState([]);
  const [savingCalibratorData, setSavingCalibratorData] = useState(false);
  useState();
  const [allCalibratorsSet, setAllCalibratorsSet] = useState(false);

  const { data } = useQuery(CALIBRATOR_CERTS, {
    variables: {
      active: true,
    },
    fetchPolicy: "no-cache",
  });

  const { calData, uniqueDosimeterModels, passingDosimeterModels } =
    props.location.state;
  const calibratorModelList = [
    { key: 1, text: "J.L. Shepherd 20", value: "J.L. Shepherd 20" },
    { key: 2, text: "TEMCO 100", value: "TEMCO 100" },
  ];

  const calibratorExposureRateList = [
    { key: 1, text: "520 mR/hr", value: "520 mR/hr" },
    { key: 2, text: "4R/hr", value: "4R/hr" },
    { key: 3, text: "35.7 R/hr", value: "35.7 R/hr" },
    { key: 4, text: "588.2 R/hr", value: "588.2 R/hr" },
    { key: 5, text: "43 mR/hr", value: "43 mR/hr" },
    { key: 6, text: "5.2 mSv/hr", value: "5.2 mSv/hr" },
  ];

  const [createCalibratorRecord] = useMutation(CREATE_CALIBRATOR_RECORD, {
    onCompleted(data) {
      setCalibrator({
        ...calibrator,
        id: data.createCalibratorRecord.calibrator.id,
      });
      let x = allCalibrationData.filter(
        (c) => c.dosimeter.modelNumber === uniqueDosimeterModels[cocCounter]
      );
      x.forEach((c) => {
        {
          c.calibrator = data.createCalibratorRecord.calibrator;
        }
        {
          c.calibratorId = data.createCalibratorRecord.calibrator.id;
        }
      });
      setAllCalibrationData([
        ...allCalibrationData.filter(
          (c) => c.dosimeter.modelNumber !== uniqueDosimeterModels[cocCounter]
        ),
        ...x,
      ]);
      setSavingCalibratorData(!savingCalibratorData);
      toastMessage("Calibration equipment saved", "success");
    },
    onError(error) {
      toastMessage(error.graphQLErrors[0].message, "error");
    },
  });

  useEffect(() => {
    setAllCalibrationData(calData);
  }, []);

  useEffect(() => {
    calibratorSet();
    determineCalibratorStatus(allCalibrationData);
  }, [cocCounter, data, viewUniqueCalibrationReport]);

  useEffect(() => {
    determineCalibratorStatus(allCalibrationData);
  }, [savingCalibratorData]);

  const determineCalibratorStatus = (calData) => {
    let passingDosimeterCount = calData.length;
    let calibratorSetCount = calData.filter((c) => c.calibrator != null).length;
    if (
      passingDosimeterCount > 0 &&
      passingDosimeterCount == calibratorSetCount
    )
      setAllCalibratorsSet(true);
  };

  const determineDosimetersToView = () => {
    let dosimetersToView;
    if (viewCalibrationReport) {
      dosimetersToView = calData.filter(
        (c) => c.dosimeter.modelNumber === uniqueDosimeterModels[cocCounter]
      );
    } else {
      dosimetersToView = calData;
    }
    return dosimetersToView;
  };

  const calibratorSet = () => {
    // ?calData filtered by dosimeter model
    if (passingDosimeterModels.length > 0) {
      let dosimetersToView = determineDosimetersToView();
      determineCalibratorData(dosimetersToView);
      setCurrentCalibrationData(dosimetersToView);
    } else {
      setAddCalibrator(false);
      setCalibrator({
        ...calibrator,
        id: 1,
      });
    }
  };

  const determineCalibratorData = (dosimetersToView) => {
    if (viewUniqueCalibrationReport) return;
    if (dosimetersToView[0].calibrator === null) {
      setAddCalibrator(true);
      setCalibrator({
        id: null,
        model: "",
        serialNumber: "",
        tfn: data ? data.calibratorCerts[0].tfn : null,
        exposureRate: "",
        date: data ? data.calibratorCerts[0].date : null,
      });
    } else {
      const { id, model, serialNumber, tfn, exposureRate, date } =
        dosimetersToView[0].calibrator;
      setCalibrator({ id, model, serialNumber, tfn, exposureRate, date });
      setAddCalibrator(false);
    }
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
        dosimeter_model: uniqueDosimeterModels[cocCounter],
      },
    });
    setSavingCalibratorData(!savingCalibratorData);
  };

  const handleCocNavigation = (direction) => {
    if (direction === "next") {
      setCocCounter(cocCounter + 1);
    } else setCocCounter(cocCounter - 1);
    calibratorSet();
  };

  const printCoc = () => {
    const toastContainer = document.querySelectorAll(".Toastify");
    document.getElementById("navbar").style.display = "none";
    document.getElementById("hide-to-print").style.display = "none";
    document.getElementById("UI-title").style.display = "none";
    document.getElementById("header").style.display = "block";
    document.getElementById("footer").style.display = "block";
    document.getElementById("page-container").style.margin = "0";
    document.getElementById("pdf-container").style.width = "100%";
    toastContainer.forEach((e) => (e.style.display = "none"));
    window.print();
    toastContainer.forEach((e) => (e.style.display = "inline"));
    document.getElementById("header").style.display = "none";
    document.getElementById("footer").style.display = "none";
    document.getElementById("UI-title").style.display = "block";
    document.getElementById("navbar").style.display = "inline-flex";
    document.getElementById("hide-to-print").style.display = "inline";
    document.getElementById("page-container").style.margin = "4rem";
    document.getElementById("pdf-container").style.width = "60%";
  };

  const switchCerts = (certToView) => {
    if (certToView === "batchcalibration") {
      setViewCalibrationReport(true);
      setViewFailureReport(false);
      setViewCalibrationSummary(false);
      setViewUniqueCalibrationReport(false);
    } else if (certToView === "failure") {
      setViewCalibrationReport(false);
      setViewFailureReport(true);
      setViewCalibrationSummary(false);
      setViewUniqueCalibrationReport(false);
    } else if (certToView === "uniquecalibration") {
      setViewCalibrationReport(false);
      setViewFailureReport(false);
      setViewCalibrationSummary(false);
      setViewUniqueCalibrationReport(true);
    } else {
      setViewCalibrationReport(false);
      setViewFailureReport(false);
      setViewCalibrationSummary(true);
      setViewUniqueCalibrationReport(false);
    }
  };

  const toastMessage = (message, type) => {
    toast(message, {
      type: type,
      autoClose: 4000,
    });
  };

  return (
    <Grid columns={2}>
      <Dimmer active={savingCalibratorData}>
        <Loader size="massive">Saving...</Loader>
      </Dimmer>
      <Grid.Column style={{ width: "60%" }} id="pdf-container">
        {viewCalibrationReport && (
          <CertificateOfCalibration
            customer={allCalibrationData[0].dosimeter.customer}
            user={allCalibrationData[0].user}
            calData={currentCalibrationData}
            calibratorData={calibrator}
          />
        )}
        {viewUniqueCalibrationReport && (
          <UniqueCertificateOfCalibration
            customer={allCalibrationData[0].dosimeter.customer}
            user={allCalibrationData[0].user}
            calData={currentCalibrationData}
          />
        )}
        {viewFailureReport && (
          <FailureReport
            customer={allCalibrationData[0].dosimeter.customer}
            user={allCalibrationData[0].user}
            calData={allCalibrationData}
            calibratorData={calibrator}
            dateTested={calData[0].finalDate}
          />
        )}
        {viewCalibrationSummary && (
          <CalibrationSummary
            calData={
              allCalibrationData.length > 0 ? allCalibrationData : calData
            }
            dateTested={calData[0].finalDate}
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
            style={{ marginBottom: "10px", width: "250px" }}
            onClick={printCoc}
            color="green"
          >
            Print this certificate
          </Button>
          <br />
          <Button
            style={{ marginBottom: "10px", width: "250px" }}
            onClick={() => switchCerts("summary")}
          >
            View Calibration Summary
          </Button>
          <br />
          <Button
            disabled={!allCalibratorsSet}
            style={{ marginBottom: "10px", width: "250px" }}
            onClick={() => switchCerts("uniquecalibration")}
          >
            View Unique Calibration Report
          </Button>
          <br />
          <Button
            style={{ marginBottom: "10px", width: "250px" }}
            onClick={() => switchCerts("batchcalibration")}
          >
            View Batch Calibration Report
          </Button>
          <br />
          {passingDosimeterModels.length > 1 &&
            !viewFailureReport &&
            !viewCalibrationSummary &&
            !viewUniqueCalibrationReport && (
              <>
                <Button
                  disabled={cocCounter === 0}
                  style={{ marginBottom: "10px", width: "125px" }}
                  onClick={() => handleCocNavigation("prev")}
                >
                  Previous Model CoC
                </Button>
                <Button
                  disabled={cocCounter === uniqueDosimeterModels.length - 1}
                  style={{ marginBottom: "10px", width: "125px" }}
                  onClick={() => handleCocNavigation("next")}
                >
                  Next Model CoC
                </Button>
                <br />
              </>
            )}
          <Button
            style={{
              marginBottom: "10px",
              width: "250px",
            }}
            onClick={() => switchCerts("failure")}
          >
            View Failure Report
          </Button>
          <br />
        </>
        {viewCalibrationReport && (
          <Button
            style={{ marginBottom: "10px", width: "250px" }}
            onClick={() => setAddCalibrator(true)}
          >
            Edit Calibration Equipment
          </Button>
        )}
        <br />
        <Button
          style={{ marginBottom: "10px", width: "250px" }}
          as={Link}
          to={{
            pathname: "/batchreport",
            state: {
              batch: calData[0].batch,
              calData: allCalibrationData,
            },
          }}
        >
          Back to Batch #{calData[0].batch} Report
        </Button>

        {/* <AssignCalibratorData
          calData={calData}
          passingDosimeterModels={props.location.state.passingDosimeterModels}
          uniqueDosimeterModels={props.location.state.uniqueDosimeterModels}
        /> */}
        {addCalibrator && viewCalibrationReport && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Form onSubmit={handleSubmit}>
              <Form.Group
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "fit-content",
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
