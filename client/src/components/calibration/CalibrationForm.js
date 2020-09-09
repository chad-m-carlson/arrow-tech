import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
import CustomerDataForm from "./CustomerDataForm";
import DosimeterDataForm from "./DosimeterDataForm";
import { CALIBRATION } from "../graphql/queries";
import { useQuery } from "@apollo/react-hooks";

const CalibrationForm = props => {
  const [customerId, setCustomerId] = useState("");
  const [batchNumber, setBatchNumber] = useState("");

  const { data, fetching, error } = useQuery(CALIBRATION, {
    variables: {
      id: props.location.state ? props.location.state.calibrationId : null
    },
    fetchPolicy: "no-cache"
  });

  useEffect(() => {
    if (props.location.state) {
      setBatchNumber(props.location.state.batch);
      setCustomerId(props.location.state.customerId);
    }
    window.scrollTo(0, 0);
  }, [props.location.state]);

  const getCustomerId = (id, batch) => {
    if (!props.location.state) {
      setCustomerId(id);
      setBatchNumber(batch);
    }
  };

  return (
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column style={{ width: "40%", borderRight: "1px solid gray" }}>
          <CustomerDataForm
            sendCustomerIdToDosimeterForm={getCustomerId}
            selectedBatch={
              props.location.state ? props.location.state.batch : null
            }
            customerId={
              props.location.state ? props.location.state.customerId : null
            }
            calibration={data}
          />
        </Grid.Column>
        <Grid.Column style={{ width: "60%", borderLeft: "1px solid gray" }}>
          {/* {error &&
            <h1>ERROR {error.message}</h1>
          } */}
          <DosimeterDataForm
            customerId={customerId}
            batchNumber={
              props.location.state ? props.location.state.batch : batchNumber
            }
            calibration={data}
            backToBatch={props.history.push}
            calData={props.location.state ? props.location.state.calData : null}
          />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default CalibrationForm;
