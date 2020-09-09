import React, { useState, useEffect } from "react";
import { Form, Button } from "semantic-ui-react";
import BatchReportTable from "./BatchReportTable";
import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import { useMutation } from "@apollo/react-hooks";
import { CALIBRATIONS_BY_BATCH } from "../graphql/queries";
import { DELETE_CALIBRATION_RECORD } from "../graphql/mutations";
import { Segment, Dimmer, Loader, Image } from "semantic-ui-react";

const BatchReport = (props) => {
  const [batch, setBatch] = useState("");
  const [calData, setCalData] = useState([]);
  const [dataDeleted, setDataDeleted] = useState(false);
  const [noLoad, setNoLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [delete_calibration_record] = useMutation(DELETE_CALIBRATION_RECORD);

  useEffect(() => {
    setNoLoad(props.location.state.calData ? true : false);
    if (props.location.state.calData) {
      setCalData(props.location.state.calData);
      setBatch(props.location.state.calData[0].batch);
      setIsLoading(false);
    } else {
      setBatch(props.location.state.batch);
      window.scrollTo(0, 0);
    }
    setIsLoading(false);
  }, [props.location.state]);

  const handleDelete = (id) => {
    delete_calibration_record({ variables: { id: parseInt(id) } });
    let newState = calData.filter((d) => d.id !== id);
    setCalData(newState);
    setDataDeleted(true);
  };

  const passingDosimeterModels = (data) => {
    if (data.length == 0) return [];
    let passingDosimeters = data.filter((c) => c.finalPass == true);
    let modelsPassed = new Set(
      passingDosimeters.map((pd) => pd.dosimeter.modelNumber)
    );
    return modelsPassed;
  };

  return (
    <>
      <Form>
        <Form.Group>
          <Form.Input
            placeholder="Enter a batch number"
            disabled={isLoading}
            type="number"
            autoFocus
            value={batch}
            onChange={(e) => {
              setNoLoad(false);
              setBatch(e.target.value);
            }}
          />
          {/* <Button>Set Batch </Button> */}
        </Form.Group>
      </Form>
      {isLoading && noLoad ? (
        <Segment style={{ height: "300px" }}>
          <Dimmer active inverted>
            <Loader size="massive">Preparing Batch Report</Loader>
          </Dimmer>
        </Segment>
      ) : null}
      {!noLoad && batch ? (
        <Query
          query={CALIBRATIONS_BY_BATCH}
          variables={{ batch: parseInt(batch) }}
          fetchPolicy="no-cache"
        >
          {({ loading, error, data }) => {
            if (loading)
              return (
                <Segment style={{ height: "300px" }}>
                  <Dimmer active inverted>
                    <Loader size="massive">Preparing Batch Report</Loader>
                  </Dimmer>
                </Segment>
              );
            if (error)
              return (
                <div>
                  <h3>This report could not be loaded. Please try again</h3>
                </div>
              );
            if (data.calibrationsByBatch.length > 0) {
              if (dataDeleted) {
                // ?CAN'T FIGURE OUT HOW TO DISABLE THE CACHE FROM AUTO SETTING STATE WITH ORIGINAL ARRAY INSTEAD OF NEW FILTERED ARRAY
              } else {
                setCalData(data.calibrationsByBatch);
              }

              return (
                <>
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h1>
                      Batch Report #
                      {calData.length > 0 ? calData[0].batch : null} for{" "}
                      {data.calibrationsByBatch[0].dosimeter.customer.name}
                    </h1>
                    <div>
                      <h4>
                        Total Fail: {calData.filter((c) => !c.finalPass).length}
                      </h4>
                      <h4 style={{ marginTop: "-10px" }}>
                        Total Pass: {calData.filter((c) => c.finalPass).length}
                      </h4>
                      <Button
                        as={Link}
                        to={{
                          pathname: "/calreports",
                          state: {
                            calData: calData,
                            uniqueDosimeterModels: [
                              ...new Set(
                                data.calibrationsByBatch.map(
                                  (c) => c.dosimeter.modelNumber
                                )
                              ),
                            ],
                            passingDosimeterModels: [
                              ...passingDosimeterModels(
                                data.calibrationsByBatch
                              ),
                            ],
                          },
                        }}
                      >
                        View Reports
                      </Button>
                    </div>
                  </div>
                  <br />
                  <div
                    id="batch_table_container"
                    style={{ height: "65vh", overflow: "scroll" }}
                  >
                    <BatchReportTable
                      calData={calData}
                      handleDelete={handleDelete}
                    />
                  </div>
                </>
              );
            } else return <div>This Batch number does not exist</div>;
          }}
        </Query>
      ) : (
        <>
          {calData.length > 0 && noLoad && (
            <>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h1>
                  Batch Report #{batch} for{" "}
                  {calData.length > 0
                    ? calData[0].dosimeter.customer.name
                    : null}
                </h1>
                <div>
                  <h4>
                    Total Fail: {calData.filter((c) => !c.finalPass).length}
                  </h4>
                  <h4 style={{ marginTop: "-10px" }}>
                    Total Pass: {calData.filter((c) => c.finalPass).length}
                  </h4>
                  <Button
                    as={Link}
                    to={{
                      pathname: "/calreports",
                      state: {
                        calData: calData,
                        uniqueDosimeterModels: [
                          ...new Set(
                            calData.map((c) => c.dosimeter.modelNumber)
                          ),
                        ],
                        passingDosimeterModels: [
                          ...passingDosimeterModels(calData),
                        ],
                      },
                    }}
                  >
                    View Reports
                  </Button>
                </div>
              </div>
              <br />

              <div
                id="batch_table_container"
                style={{ height: "65vh", overflow: "scroll" }}
              >
                <BatchReportTable
                  calData={calData}
                  handleDelete={handleDelete}
                />
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default BatchReport;
