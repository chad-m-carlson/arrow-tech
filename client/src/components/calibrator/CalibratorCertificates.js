import React, { useState, useEffect } from "react";
import { Form, Segment } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { UPDATE_ACTIVE_CAL_CERT } from "../graphql/mutations";
import { CALIBRATOR_CERTS } from "../graphql/queries";
import AddCalibratorCertificates from "./AddCalibratorCertificate";

const CalibratorCertificates = () => {
  const [activeCertId, setActiveCertId] = useState("");
  const [activeCert, setActiveCert] = useState({});
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
      const activeCert = data.calibratorCerts.filter((c) => c.active == true);
      if (activeCert.length > 0) {
        setActiveCertId(activeCert[0].id);
        setActiveCert(activeCert[0]);
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
      <Segment.Group>
        <Segment>
          <h3>Active Calibrator Certificate</h3>
          <p>Calibration Date: {activeCert.date}</p>
          <p>PNNL Tracking Number: {activeCert.tfn}</p>
        </Segment>
      </Segment.Group>
      <div>
        <AddCalibratorCertificates refetch={refetch} />
        <Segment.Group>
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
        </Segment.Group>
      </div>
    </>
  );
};

export default CalibratorCertificates;
