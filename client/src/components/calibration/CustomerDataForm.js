import React, {useState, useEffect } from 'react';
import Search from '../Search';
import {Form, Button, Divider} from 'semantic-ui-react';
import gql from 'graphql-tag';
import { useQuery, } from '@apollo/react-hooks';

const GET_ALL_CUSTOMERS_QUERY = gql`
query{
  customers{
    id
    name
    streetAddress1
    streetAddress2
    city
    state
    zip
    country
  }
  lastBatch
}
`;

const CustomerDataForm = ({sendCustomerIdToDosimeterForm}) => {
  const [customerList, setCustomerList] = useState([]);
  const [customerSelection, setCustomerSelection] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [filteredCustomerList, setFilteredCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState({});
  const [editingCustomerInfo, setEditingCustomerInfo] = useState(false);
  const [batchNumber, setBatchNumber] = useState(null)

  const {data, loading, error} = useQuery(GET_ALL_CUSTOMERS_QUERY)

  useEffect( () => {
    if(loading) setDataLoading(true)
    if(data){
      setCustomerList([...data.customers])
      setCustomerSelection([...data.customers.map( c => ({key: c.id, text: c.name, value: c.id}))])
      setDataLoading(false)
      // setBatchNumber(data.lastBatch)
    }
  }, [data, loading])

  const returnFilteredList = (results, active) => {
    if(active){
      setFilteredCustomerList(results)
      setSearchActive(true)
    }else setSearchActive(false)
  };

  const handleCustomerSelection = (e, {value}) => {
    setSelectedCustomer(...customerList.filter( c => c.id === value))
  };

  const updateBatchNumber = () => {
    setBatchNumber(data.lastBatch + 1)
  };

  sendCustomerIdToDosimeterForm(() => selectedCustomer.id, batchNumber)

  return ( 
    <div>
      <Form>
      <Form.Group style={{display: "flex", flexDirection: "row"}}>
        <Search
          data={customerSelection}
          onChange={returnFilteredList}
          searchActive={searchActive}
          searchOn='text'
          placeholder="Filter Customers"
          styles={{input:{background: "white", width: "10rem"}}}
          />
        <Form.Select
          disabled={batchNumber ? true : false}
          style={{margin: "1rem"}}
          placeholder="Select a customer"
          options={searchActive ? filteredCustomerList : customerSelection}
          loading={dataLoading}
          onChange={handleCustomerSelection}
        />

      </Form.Group>
        <p>Clicking the button below will generate a batch number and allow you to start entering THIS CUSTOMERS calibration data</p>
        <Button inverted color='green' onClick={updateBatchNumber}>Enter Calibration data for batch</Button>
        <Divider style={{margin: "1.5rem"}}/>

        <Form.Input
          disabled={!editingCustomerInfo}
          fluid
          style={{margin: ".5rem"}}
          value={selectedCustomer.name}
          label="Customer Name"
        />
        <Form.Input
          disabled={!editingCustomerInfo}
          fluid
          style={{margin: ".5rem"}}
          value={selectedCustomer.streetAddress1}
          label="Street Address 1"
        />
        <Form.Input
          disabled={!editingCustomerInfo}
          fluid
          style={{margin: ".5rem"}}
          value={selectedCustomer.streetAddress2}
          label="Street Address 2"
        />
        <Form.Input
          disabled={!editingCustomerInfo}
          fluid
          style={{margin: ".5rem"}}
          value={selectedCustomer.city}
          label="City"
        />
        <Form.Input
          disabled={!editingCustomerInfo}
          fluid
          style={{margin: ".5rem"}}
          value={selectedCustomer.state}
          label="State"
        />
        <Form.Input
          disabled={!editingCustomerInfo}
          fluid
          style={{margin: ".5rem"}}
          value={selectedCustomer.zip}
          label="Zip"
        />
        <Form.Input
          disabled={!editingCustomerInfo}
          fluid
          style={{margin: ".5rem"}}
          value={selectedCustomer.country}
          label="Country"
        />
        </Form>
        <Button inverted color='blue' onClick={() => setEditingCustomerInfo(!editingCustomerInfo)}>Edit Customer</Button>
    </div>
   );
}
 
export default CustomerDataForm;