import React, {useState, useEffect} from 'react';
import { useQuery, } from '@apollo/react-hooks';
import {Table, Icon, Form, Button} from 'semantic-ui-react';
import {Link, } from 'react-router-dom';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

const CALIBRATIONS_BY_BATCH = gql`
  query($batch: Int!){
  calibrationsByBatch(batch: $batch) {
    id
    userId
    dosimeterId
    dateReceived
    finalDate
    certificateNumber
    batch
    vacPass
    vipPass
    accPass
    elPass
    finalPass
    user{
      firstName
      lastName
    }
    dosimeter{
      modelNumber
      serialNumber
      customer{
        name
      }
    }
  } 
}
`;

const BatchReport = (props) => {
const [batch, setBatch] = useState('');
const [triggerQuery, setTriggerQuery] = useState(false);
const [calData, setCalData] = useState([]);

useEffect( () => {
  if(props.location.state) setBatch(props.location.state.batch)
},[])

const handleSubmit = () => {
  setTriggerQuery(!triggerQuery);
}

  return ( 
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          value={batch}
          onChange={(e) => setBatch(parseInt(e.target.value))}
        />
        <Button>Set Batch </Button>
      </Form>
      <Query query={CALIBRATIONS_BY_BATCH} variables={{"batch": batch}}>
        {({ loading, error, data }) => {
          setCalData(data)
            if (loading) return <div>Fetching..</div>
            if (error) return <div>Error!</div>
            if (data.calibrationsByBatch.length > 0){
            return(
              <>
              <h1>Batch Report for {data.calibrationsByBatch[0].dosimeter.customer.name}</h1>
              <h2> Batch Number: {batch}</h2>
              <Table celled>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell>Dosimeter Model Number</Table.HeaderCell>
                    <Table.HeaderCell>Dosimeter Serial Number</Table.HeaderCell>
                    <Table.HeaderCell>Date Received</Table.HeaderCell>
                    <Table.HeaderCell>Calibration Tech</Table.HeaderCell>
                    <Table.HeaderCell>VAC Pass</Table.HeaderCell>
                    <Table.HeaderCell>VIP Pass</Table.HeaderCell>
                    <Table.HeaderCell>ACC Pass</Table.HeaderCell>
                    <Table.HeaderCell>EL Pass</Table.HeaderCell>
                    <Table.HeaderCell>Final Pass</Table.HeaderCell>
                    <Table.HeaderCell>Certificate Number</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {data.calibrationsByBatch.map( c => {
                    const {modelNumber, serialNumber} = c.dosimeter
                    const {firstName, lastName} = c.user
                    return(
                    <Table.Row negative={c.finaPass ? true : false}>
                    <Table.Cell>{modelNumber}</Table.Cell>
                    <Table.Cell>{serialNumber}</Table.Cell>
                    <Table.Cell>{c.dateReceived}</Table.Cell>
                    <Table.Cell>{firstName} {lastName}</Table.Cell>
                    <Table.Cell>
                      <Icon name={c.vacPass ? 'checkmark' : 'close'} color={c.vacPass ? 'green' : 'red'}/>
                    </Table.Cell>
                    <Table.Cell>
                      <Icon name={c.vipPass ? 'checkmark' : 'close'} color={c.vipPass ? 'green' : 'red'}/>
                    </Table.Cell>
                    <Table.Cell>
                    <Icon name={c.accPass ? 'checkmark' : 'close'} color={c.accPass ? 'green' : 'red'}/>
                    </Table.Cell>
                    <Table.Cell>
                      <Icon name={c.elPass ? 'checkmark' : 'close'} color={c.elPass ? 'green' : 'red'}/>
                    </Table.Cell>
                    <Table.Cell>
                      <Icon name={c.finalPass ? 'checkmark' : 'close'} color={c.finalPass ? 'green' : 'red'}/>
                    </Table.Cell>
                    <Table.Cell>{c.certificateNumber}</Table.Cell>
                  </Table.Row>
                  )})}
                </Table.Body>
              </Table>
              </>
            )}else return null
        }}
      </Query>
      <Button as={Link} to={{pathname: '/coc', state: {calData: calData}}}>View Batch Report</Button>
    </>
  );
}
 
export default BatchReport;