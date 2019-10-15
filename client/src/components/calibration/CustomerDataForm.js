import React, {useState, useEffect } from 'react';
import Search from '../Search';
import {Form, Button, Divider} from 'semantic-ui-react';
import {GET_ALL_CUSTOMERS_QUERY, } from '../graphql/queries';
import {CREATE_CUSTOMER} from '../graphql/mutations';
import { useQuery, useMutation} from '@apollo/react-hooks';

const CustomerDataForm = ({sendCustomerIdToDosimeterForm, selectedBatch, customerId}, props) => {
  const blankCustomer = {id: '', name: '', streetAddress1: '', streetAddress2: '', city: '', state: '', zip: '', country: '', email: ''};
  const [customerList, setCustomerList] = useState([blankCustomer]);
  const [customerSelection, setCustomerSelection] = useState([{key: '', text: "Add a new customer", value: ''}]);
  const [dataLoading, setDataLoading] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const [filteredCustomerList, setFilteredCustomerList] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(blankCustomer);
  const [editingCustomerInfo, setEditingCustomerInfo] = useState(true);
  const [batchNumber, setBatchNumber] = useState(null)

  const {data, loading, error} = useQuery(GET_ALL_CUSTOMERS_QUERY, {variables: {batch: selectedBatch ? selectedBatch : null}})
  const [create_customer, {error: mutationError}] = useMutation(CREATE_CUSTOMER, { onCompleted(data){( setSelectedCustomer({...selectedCustomer, id: data.createCustomer.customer.id}))}})

  useEffect( () => {
    if(loading) setDataLoading(true)
    if(error) console.log(error)
    if(data){
      setCustomerList([...customerList, ...data.customers])
      setCustomerSelection([...customerSelection, ...data.customers.map( c => ({key: c.id, text: c.name, value: c.id}))])
      setDataLoading(false)
      if(data.customerByBatch){
        setSelectedCustomer(...data.customers.filter( c => c.id === data.customerByBatch.id))
        setBatchNumber(selectedBatch);
        sendCustomerIdToDosimeterForm();
      };
      if(customerId){
        // debugger
        setSelectedCustomer(...data.customers.filter( c => c.id === customerId));
      };
      // setBatchNumber(data.lastBatch)
    }
  }, [data, loading]);

  const returnFilteredList = (results, active) => {
    if(active){
      setFilteredCustomerList(results);
      setSearchActive(true);
    }else setSearchActive(false);
  };

  const handleCustomerSelection = (e, {value}) => {
    setSelectedCustomer(...customerList.filter( c => c.id == value));
    value !== '' ? setEditingCustomerInfo(false) : setEditingCustomerInfo(true);
    setBatchNumber(data.lastBatch + 1);
  };

  // const updateBatchNumber = () => {
  //   setBatchNumber(data.lastBatch + 1)
  // };

  sendCustomerIdToDosimeterForm(() => selectedCustomer.id, batchNumber)

  const handleSubmit = () => {
    setEditingCustomerInfo(false)
    create_customer({variables: {
      "id": selectedCustomer.id ? selectedCustomer.id : null,
      "name": selectedCustomer.name,
      "street_address1": selectedCustomer.streetAddress1,
      "street_address2": selectedCustomer.streetAddress2,
      "city": selectedCustomer.city,
      "state": selectedCustomer.state,
      "zip": selectedCustomer.zip,
      "country": selectedCustomer.country,
      "email":selectedCustomer.email
    }})

  };

  return ( 
    <div>
      <h1>Customer Data</h1>
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
          disabled={selectedBatch ? true : false}
          style={{margin: "1rem"}}
          placeholder="Add new or select existing customer"
          defaultValue={customerId ? customerId : null}
          options={searchActive ? filteredCustomerList : customerSelection}
          loading={dataLoading}
          onChange={handleCustomerSelection}
        />

      </Form.Group>
        {/* <p>Clicking the button below will generate a batch number and allow you to start entering THIS CUSTOMERS calibration data</p>
        <Button inverted color='green' onClick={updateBatchNumber}>Enter Calibration data for batch</Button> */}
        <Divider style={{margin: "1.5rem"}}/>

        <Form.Input
          disabled={!editingCustomerInfo}
          fluid
          style={{margin: ".5rem"}}
          value={selectedCustomer.name}
          onChange={(e) => setSelectedCustomer({...selectedCustomer, name: e.target.value})}
          label="Customer Name"
        />
        <Form.Input
          disabled={!editingCustomerInfo}
          fluid
          style={{margin: ".5rem"}}
          value={selectedCustomer.email}
          onChange={(e) => setSelectedCustomer({...selectedCustomer, email: e.target.value})}
          label="Email"
        />
        <Form.Input
          disabled={!editingCustomerInfo}
          fluid
          style={{margin: ".5rem"}}
          value={selectedCustomer.streetAddress1}
          onChange={(e) => setSelectedCustomer({...selectedCustomer, streetAddress1: e.target.value})}
          label="Street Address 1"
        />
        <Form.Input
          disabled={!editingCustomerInfo}
          fluid
          style={{margin: ".5rem"}}
          value={selectedCustomer.streetAddress2}
          onChange={(e) => setSelectedCustomer({...selectedCustomer, streetAddress2: e.target.value})}
          label="Street Address 2"
        />
        <Form.Input
          disabled={!editingCustomerInfo}
          fluid
          style={{margin: ".5rem"}}
          value={selectedCustomer.city}
          onChange={(e) => setSelectedCustomer({...selectedCustomer, city: e.target.value})}
          label="City"
        />
        <Form.Input
          disabled={!editingCustomerInfo}
          fluid
          style={{margin: ".5rem"}}
          value={selectedCustomer.state}
          onChange={(e) => setSelectedCustomer({...selectedCustomer, state: e.target.value})}
          label="State"
        />
        <Form.Input
          disabled={!editingCustomerInfo}
          fluid
          style={{margin: ".5rem"}}
          value={selectedCustomer.zip}
          onChange={(e) => setSelectedCustomer({...selectedCustomer, zip: e.target.value})}
          label="Zip"
        />
        <Form.Input
          disabled={!editingCustomerInfo}
          fluid
          style={{margin: ".5rem"}}
          value={selectedCustomer.country}
          onChange={(e) => setSelectedCustomer({...selectedCustomer, country: e.target.value})}
          label="Country"
        />
        </Form>
        <Button 
          inverted 
          color='blue' 
          onClick={() => handleSubmit()}
          >Save Customer
        </Button>
    </div>
   );
}
 
export default CustomerDataForm;