import React, { useState, useEffect } from "react";
import { Form, Card, Divider } from "semantic-ui-react";
import {
  GET_ALL_CUSTOMERS_QUERY,
  BATCHES_BY_CUSTOMER
} from "../graphql/queries";
import { Query } from "react-apollo";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { printDate } from "../HelperFunctions";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Customers = () => {
  const blankCustomer = {
    id: "",
    name: "",
    streetAddress1: "",
    streetAddress2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    email: ""
  };
  const [customerList, setCustomerList] = useState([blankCustomer]);
  const [customerSelection, setCustomerSelection] = useState([
    { key: "", text: "", value: "" }
  ]);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState("");

  const { data, loading, error } = useQuery(GET_ALL_CUSTOMERS_QUERY, {
    variables: { batch: null },
    fetchPolicy: "network-only"
  });

  useEffect(() => {
    if (loading) setDataLoading(true);
    if (error) console.log(error);
    if (data) {
      setCustomerList([...customerList, ...data.customers]);
      setCustomerSelection([
        ...customerSelection,
        ...data.customers.map(c => ({ key: c.id, text: c.name, value: c.id }))
      ]);
      setDataLoading(false);
    }
  }, [data, loading]);

  const handleCustomerSelection = (e, { value }) => {
    setSelectedCustomer(...customerList.filter(c => c.id === value));
  };

  return (
    <>
      <h2>Select a customer to view available batches</h2>
      <Form>
        <Form.Group style={{ display: "flex", flexDirection: "row" }}>
          <Form.Select
            search
            style={{ margin: "1rem" }}
            placeholder="Select a customer"
            options={customerSelection}
            loading={dataLoading}
            onChange={handleCustomerSelection}
          />
        </Form.Group>
      </Form>
      {selectedCustomer !== "" && (
        <Card>
          <Card.Content>
            <Card.Header>{selectedCustomer.name}</Card.Header>
            <Card.Meta>
              {selectedCustomer.city}, {selectedCustomer.state}
            </Card.Meta>
            <Card.Meta>{selectedCustomer.email}</Card.Meta>
            <Divider />
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
                      {data.batchByCustomer.map(b => (
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
                              state: { batch: b.batch }
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
                                customerId: b.dosimeter.customerId
                              }
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
          </Card.Content>
        </Card>
      )}
    </>
  );
};

export default Customers;
