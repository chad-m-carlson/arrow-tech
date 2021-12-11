import React, { useState, useEffect } from "react";
import { Form, Segment } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { UPDATE_ACTIVE_CAL_CERT } from "../graphql/mutations";
import { CALIBRATOR_CERTS } from "../graphql/queries";
import AddCalibratorCertificates from "./AddCalibratorCertificate";

const CalibratorCertificates = () => {
  const [activeCertId, setActiveCertId] = useState("");
  const [activeCerts, setActiveCerts] = useState([]);
  const [certData, setCertData] = useState([]);

  const { data, refetch } = useQuery(CALIBRATOR_CERTS, {
    variables: {
      active: false,
    },
    fetchPolicy: "no-cache",
  });

  const [update_active_cal_cert] = useMutation(UPDATE_ACTIVE_CAL_CERT, {
    onCompleted(data) {
      // if (editing) {
      //   setCalibrationId(null);
      //   setEditing(false);
      //   setTimeout(() => {
      //     props.backToBatch("/batchreport", { batch: batch });
      //   }, 500);
      // }
      refetch();
    },
    // onError(error) {
    //   error.graphQLErrors &&
    //     toastMessage(error.graphQLErrors[0].message, "error");
    //   document.getElementById("1").focus();
    // },
  });

  useEffect(() => {
    if (data) {
      setCertData(data.calibratorCerts.filter((c) => c.active != true));
      const activeCerts = data.calibratorCerts.filter((c) => c.active == true);
      if (activeCerts.length > 0) {
        setActiveCertId(activeCerts.id);
        setActiveCerts(activeCerts);
      }
    }
  }, [data]);

  const handleSetActive = (id) => {
    setActiveCertId(id);
    update_active_cal_cert({
      variables: {
        id: id,
      },
    });
  };

  return (
    <>
      <div style={{ display: "flex" }}>
        <Segment.Group style={{ width: "50%" }}>
          <Segment>
            <h3>Active Calibrator Certificates</h3>
            {activeCerts.map((ac) => (
              <Segment key={ac.id}>
                <div>PNNL Tracking Number: {ac.tfn}</div>
                <div>Calibration Date: {ac.date}</div>
                <Form.Button
                  checked={activeCertId == ac.id}
                  onClick={() => handleSetActive(ac.id)}
                >
                  Set In-active
                </Form.Button>
              </Segment>
            ))}
          </Segment>
        </Segment.Group>
        <Segment.Group
          style={{
            width: "50%",
            marginLeft: "20px",
            marginTop: "0px",
            height: "292px",
          }}
        >
          <AddCalibratorCertificates refetch={refetch} />
        </Segment.Group>
      </div>
      <Segment.Group style={{ width: "50%" }}>
        <Segment>
          <h3>In-Active Calibrator Certificates</h3>
          {certData.map((c) => (
            <Segment key={c.id}>
              <div>Calibration Date: {c.date}</div>
              <div>PNNL Tracking Number: {c.tfn}</div>
              <Form.Button
                checked={activeCertId == c.id}
                onClick={() => handleSetActive(c.id)}
              >
                Set Active
              </Form.Button>
            </Segment>
          ))}
        </Segment>
      </Segment.Group>
    </>
  );
};

export default CalibratorCertificates;
