import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { convertValueReadToMr } from "../HelperFunctions";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { CREATE_DOSIMETER_TEMPLATE } from "../graphql/mutations";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CalibratorModels = (props) => {
  const [unit, setUnit] = useState("");
  const [modelNumber, setModelNumber] = useState("");
  const [range, setRange] = useState("");
  const [rangeInMr, setRangeInMr] = useState("");

  const [createDosimeterTemplate] = useMutation(CREATE_DOSIMETER_TEMPLATE, {
    onCompleted(data) {
      toastMessage("Dosimeter Saved Succesfully", "success");
      setModelNumber("");
      setRange("");
      setUnit("");
      props.refetch();
    },
    onError(error) {
      toastMessage(error.graphQLErrors[0].message, "error");
    },
  });

  const handleSubmit = () => {
    createDosimeterTemplate({
      variables: {
        model_number: modelNumber,
        range: parseInt(rangeInMr),
        unit: unit,
      },
    });
  };

  const toastMessage = (message, type) => {
    toast(message, {
      type: type,
      autoClose: 10000,
    });
  };

  return (
    <div style={{ border: ".5px solid grey", padding: "5px", margin: "5px" }}>
      <h2>Add a new Calibrator model</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group fluid>
          <Form.Input
            label="Model Number"
            onChange={(e) => setModelNumber(e.target.value)}
            value={modelNumber}
          />
          <Form.Checkbox
            label="Inactive"
            onChange={(e) => setModelNumber(e.target.value)}
            value={modelNumber}
          />
        </Form.Group>

        <Button>Submit</Button>
      </Form>
    </div>
  );
};

export default CalibratorModels;
