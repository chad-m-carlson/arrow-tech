import React, {useState, useEffect} from 'react';
import {Table, Icon, Form, Button} from 'semantic-ui-react';
import BatchReportTable from './BatchReportTable';
import {Link, } from 'react-router-dom';
import { Query } from 'react-apollo';
import {useMutation} from '@apollo/react-hooks';
import {CALIBRATIONS_BY_BATCH, } from './graphql/queries';
import {DELETE_CALIBRATION_RECORD} from './graphql/mutations';

const BatchReport = (props) => {
  const [batch, setBatch] = useState('');
  const [calData, setCalData] = useState([]);
  const [dataDeleted, setDataDeleted] = useState(false);

  const [delete_calibration_record] = useMutation(DELETE_CALIBRATION_RECORD)

  useEffect( () => {
    if(props.location.state) setBatch(props.location.state.batch)
  },[])


  const handleDelete = (id) => {
    delete_calibration_record({variables: {id: parseInt(id)}})
    let newState = calData.filter( d =>  d.id !== id)
    debugger
    setCalData(newState);
    setDataDeleted(true);
  };

  return ( 
    <>
      <Form>
        <Form.Input
          autofocus={true}
          value={batch}
          onChange={(e) => setBatch(e.target.value)}
        />
        {/* <Button>Set Batch </Button> */}
      </Form>
      <Query query={CALIBRATIONS_BY_BATCH} variables={{"batch": parseInt(batch)}} fetchPolicy='no-cache'>
        {({ loading, error, data }) => {
          if (loading) return <div>Fetching..</div>
          if (error) return <div>Error!</div>
          if (data.calibrationsByBatch.length > 0){
            if(dataDeleted){
              // ?CAN'T FIGURE OUT HOW TO DISABLE THE CACHE FROM AUTO SETTING STATE WITH ORIGINAL ARRAY INSTEAD OF NEW FILTERED ARRAY
            }else{setCalData(data.calibrationsByBatch)}
            return(
              <>
              <h1>Batch Report for {data.calibrationsByBatch[0].dosimeter.customer.name}</h1>
              <h2> Batch Number: {batch}</h2>
              <BatchReportTable
                calData={calData}
                handleDelete={handleDelete}
              />
              {/* <Table celled>
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
                    <Table.HeaderCell>Edit Record</Table.HeaderCell>
                    <Table.HeaderCell>Delete Record</Table.HeaderCell>
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {calData.map( c => {
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
                    <Table.Cell>
                      <Icon 
                        name='edit' 
                        color='green' 
                        // onClick={} 
                      />
                    </Table.Cell>
                    <Table.Cell>
                      <Icon 
                        name='delete' 
                        color='red' 
                        onClick={() => handleDelete(c.id)} 
                        style={{cursor: "pointer"}}
                      />
                    </Table.Cell>
                  </Table.Row>
                  )})}
                </Table.Body>
              </Table> */}
              </>
            )}else return null
        }}
      </Query>
      <Button as={Link} to={{pathname: '/coc', state: {calData: calData}}}>View Batch Report</Button>
    </>
  );
}
 
export default BatchReport;