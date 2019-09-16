import React, {useState, } from 'react';
import {Grid, } from 'semantic-ui-react';
import CustomerDataForm from './CustomerDataForm';
import DosimeterDataForm from './DosimeterDataForm';

const CalibrationForm = () => {
  const [customerId, setCustomerId] = useState('')

  const getCustomerId = (id) => {
    setCustomerId(id)
  };

  return ( 
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column style={{width: "40%", borderRight: "1px solid gray"}}>
          <h1>Customer Data</h1>
          <CustomerDataForm sendCustomerIdToDosimeterForm={getCustomerId}/>
        </Grid.Column>
        <Grid.Column style={{width: "60%", borderLeft: "1px solid gray"}}>
          <h1>Dosimeter Data</h1>
          <DosimeterDataForm customerId={customerId}/>
        </Grid.Column>
      </Grid.Row>

    </Grid>
   );
}
 
export default CalibrationForm;