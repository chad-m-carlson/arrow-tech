import React, {useState, useEffect} from 'react';
import {Form, Button} from 'semantic-ui-react';
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


  const [delete_calibration_record] = useMutation(DELETE_CALIBRATION_RECORD);

  useEffect( () => {
    if(props.location.state) setBatch(props.location.state.batch)
    window.scrollTo(0, 0)
  },[props.location.state]);


  const handleDelete = (id) => {
    delete_calibration_record({variables: {id: parseInt(id)}})
    let newState = calData.filter( d =>  d.id !== id)
    setCalData(newState);
    setDataDeleted(true);
  };

  return ( 
    <>
      <Form>
        <Form.Group>
          <Form.Input
            placeholder="Enter a batch number"
            autoFocus
            value={batch}
            onChange={(e) => setBatch(e.target.value)}
          />
          {/* <Button>Set Batch </Button> */}
        </Form.Group>
      </Form>
      {batch &&
      <Query query={CALIBRATIONS_BY_BATCH} variables={{"batch": parseInt(batch)}} fetchPolicy='no-cache'>
        {({ loading, error, data }) => {
          if (loading) return <div>Loading..</div>
          if (error) return <div>Error!</div>
          if (data.calibrationsByBatch.length > 0){
            if(dataDeleted){
              // ?CAN'T FIGURE OUT HOW TO DISABLE THE CACHE FROM AUTO SETTING STATE WITH ORIGINAL ARRAY INSTEAD OF NEW FILTERED ARRAY
            }else{
              setCalData(data.calibrationsByBatch.sort((a, b) => {
                return a.dosimeter.serialNumber - b.dosimeter.serialNumber}));
            }

            return(
              <>
              <div style={{display: "flex", justifyContent: "space-between"}}>
              <h1>Batch Report #{batch} for {data.calibrationsByBatch[0].dosimeter.customer.name}</h1>
                <div>
                  <h4>Total Fail: {calData.filter(c => !c.finalPass).length}
                  </h4>
                  <h4 style={{marginTop: "-10px"}}>Total Pass: {calData.filter(c => c.finalPass).length}
                  </h4>
                  <Button as={Link} to={{pathname: '/calreports', state: {calData: calData, uniqueDosimeterModels: [...new Set(data.calibrationsByBatch.map( c => c.dosimeter.modelNumber))]}}}>View Reports</Button>
                </div>
              </div>
              <BatchReportTable
                calData={calData}
                handleDelete={handleDelete}
              />
              </>
            )}else return <div>This Batch number does not exist</div>
        }}
      </Query>
      }
    </>
  );
}
 
export default BatchReport;