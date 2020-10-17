import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Query } from "react-apollo";

const CalibratorCertificates = () => {
  return (
    <>
      <h2>Exposure Rates</h2>{" "}
      <Query
        query={BATCHES_BY_CUSTOMER}
        fetchPolicy="no-cache"
        variables={{ customer_id: parseInt(selectedCustomer.id) }}
      >
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching..</div>;
          if (error) return <div>Error fetching data!</div>;
          if (data)
            return (
              <div>
                {data.batchByCustomer.map((b) => (
                  <ul>
                    <li>
                      Batch #{b.batch}{" "}
                      <span style={{ paddingLeft: "10px" }}>
                        Dated: {printDate(b.finalDate)}
                      </span>
                    </li>
                    <Link
                      to={{
                        pathname: "/batchreport",
                        state: { batch: b.batch },
                      }}
                      style={{ fontSize: "10px", paddingTop: "0px" }}
                    >
                      View Batch Report
                    </Link>
                    <br />
                    <Link
                      to={{
                        pathname: "/calform",
                        state: {
                          batch: b.batch,
                          customerId: b.dosimeter.customerId,
                        },
                      }}
                      style={{ fontSize: "10px", paddingTop: "0px" }}
                    >
                      {" "}
                      Continue entering calibration data
                    </Link>
                  </ul>
                ))}
              </div>
            );
        }}
      </Query>
    </>
  );
};

export default CalibratorCertificates;
