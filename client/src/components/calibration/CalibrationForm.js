import React, {useState, useEffect } from 'react';
import {Grid, } from 'semantic-ui-react';
import CustomerDataForm from './CustomerDataForm';
import DosimeterDataForm from './DosimeterDataForm';
import {CALIBRATION_BY_BATCH} from '../graphql/queries';
import { useQuery, } from '@apollo/react-hooks';



const CalibrationForm = (props) => {
  const [customerId, setCustomerId] = useState('');
  const [batchNumber, setBatchNumber] = useState('');

  const {data} = useQuery(CALIBRATION_BY_BATCH, {variables: {batch: props.location.state ? props.location.state.lastBatch : null, id: null}});

  const getCustomerId = (id, batch) => {
    setCustomerId(id)
    setBatchNumber(batch)
  };

  return ( 
    <Grid columns={2}>
      <Grid.Row>
        <Grid.Column style={{width: "40%", borderRight: "1px solid gray"}}>
          <CustomerDataForm 
            sendCustomerIdToDosimeterForm={getCustomerId}
            selectedBatch={props.location.state ? props.location.state.lastBatch : ''}
          />
        </Grid.Column>
        <Grid.Column style={{width: "60%", borderLeft: "1px solid gray"}}>
          <DosimeterDataForm 
            // lastBatch={props.location.state ? props.location.state.lastBatch : ''}
            customerId={customerId}
            batchNumber={props.location.state ? props.location.state.lastBatch : batchNumber}
            lastCalibration={data}
          />
        </Grid.Column>
      </Grid.Row>

    </Grid>
   );
}
 
export default CalibrationForm;