import React, {useState, useEffect } from 'react';
import {Form, Card, Divider} from 'semantic-ui-react';
import {GET_ALL_CUSTOMERS_QUERY, } from './graphql/queries';
import { useQuery, useMutation} from '@apollo/react-hooks';
import {toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Customers = () => {
  const blankCustomer = {id: '', name: '', streetAddress1: '', streetAddress2: '', city: '', state: '', zip: '', country: '', email: ''};
  const [customerList, setCustomerList] = useState([blankCustomer]);
  const [customerSelection, setCustomerSelection] = useState([{key: '', text: '', value: ''}]);
  const [dataLoading, setDataLoading] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(blankCustomer);
  const [batchNumber, setBatchNumber] = useState(null)

  const {data, loading, error,} = useQuery(GET_ALL_CUSTOMERS_QUERY, {variables: {batch: null}, fetchPolicy: 'network-only'})

  useEffect( () => {
    if(loading) setDataLoading(true)
    if(error) console.log(error)
    if(data){
      setCustomerList([...customerList, ...data.customers])
      setCustomerSelection([...customerSelection, ...data.customers.map( c => ({key: c.id, text: c.name, value: c.id}))])
      setDataLoading(false)
    }
  }, [data, loading,]);

  const handleCustomerSelection = (e, {value}) => {
    setSelectedCustomer(...customerList.filter( c => c.id === value));
  };


  return ( 
    <>
    <Form>
      <Form.Group style={{display: "flex", flexDirection: "row"}}>
        <Form.Select
          search
          style={{margin: "1rem"}}
          placeholder="Select a customer"
          options={customerSelection}
          loading={dataLoading}
          onChange={handleCustomerSelection}
        />
      </Form.Group>
    </Form>
    {selectedCustomer &&
      <Card>
        <Card.Content>
          <Card.Header>{selectedCustomer.name}</Card.Header>
          <Card.Meta>{selectedCustomer.city}, {selectedCustomer.state}</Card.Meta>
          <Card.Meta>{selectedCustomer.email}</Card.Meta>
          <Divider />
          
        </Card.Content>
      </Card>
    }
    </>
  )
}
 
export default Customers;