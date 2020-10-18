import React, { useState, useEffect } from "react";
import { Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_NEW_CALIBRATOR_CERT } from "../graphql/mutations";

const AddCalibratorCertificate = ({ refetch }) => {
  const [tfn, setTfn] = useState("");
  const [date, setDate] = useState("");

  const [add_new_calibrator_cert] = useMutation(ADD_NEW_CALIBRATOR_CERT, {
    onCompleted(data) {
      setTfn("");
      setDate("");
      refetch();
    },
    // onError(error) {
    //   error.graphQLErrors &&
    //     toastMessage(error.graphQLErrors[0].message, "error");
    //   document.getElementById("1").focus();
    // },
  });

  const handleSubmit = () => {
    add_new_calibrator_cert({
      variables: {
        tfn: tfn,
        date: date,
      },
    });
  };

  return (
    <>
      <h2>Add Certificate</h2>
      <Form style={{ width: "200px" }}>
        <Form.Input
          label="TFN: "
          onChange={(e) => setTfn(e.target.value)}
          value={tfn}
        ></Form.Input>
        <Form.Input
          label="Date: "
          onChange={(e) => setDate(e.target.value)}
          value={date}
        ></Form.Input>
        <Form.Button onClick={() => handleSubmit()}>Submit</Form.Button>
      </Form>
    </>
  );
};

export default AddCalibratorCertificate;
