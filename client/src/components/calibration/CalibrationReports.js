import React, {useState, useEffect} from 'react';
import CertificateOfCalibration from './CertificateOfCalibration';
import {Form, Button, } from 'semantic-ui-react';
import {Link, } from 'react-router-dom';
import {CREATE_CALIBRATOR_RECORD} from '../graphql/mutations';
import {useMutation} from '@apollo/react-hooks';

const CalibrationReports = (props) => {
  const [calibrator, setCalibrator] = useState({id: null, model: '', serialNumber: '', tfn: '265623-01', exposureRate: '', date: '6/6/2019'});
  const [addCalibrator, setAddCalibrator] = useState(false);

  const calibratorModelList = [{key: 1, text: "J.L. Shepherd, 20 Curie, Cesium 137", value: "J.L. Shepherd, 20 Curie, Cesium 137"}, {key: 2, text: "TEMCO, 100", value: "TEMCO, 100"}]

  const calibratorExposureRateList = [{key: 1, text: "520 mR/hr", value: "520 mR/hr"}, 
                                      {key: 2, text: "4R/hr", value: "4R/hr"}, 
                                      {key: 3, text: "35.7 R/hr", value: "35.7 R/hr"}, 
                                      {key: 4, text: "588.2 R/hr", value: "588.2 R/hr"}, 
                                      {key: 5, text: "43 mR/hr", value: "43 mR/hr"},]

  const [createCalibratorRecord] = useMutation(CREATE_CALIBRATOR_RECORD)

  useEffect( () => {
    if(props.location.state.calData[0].calibrator === null){
      setAddCalibrator(true)
     }else{
       const {id, model, serialNumber, tfn, exposureRate, date} = props.location.state.calData[0].calibrator
       setCalibrator({id, model, serialNumber, tfn, exposureRate, date})
       setAddCalibrator(false)
     }
  }, []);

  const setCalibratorModel = (e, {value}) => {
    switch (value) {
      case "J.L. Shepherd, 20 Curie, Cesium 137":
        setCalibrator({...calibrator, serialNumber: "6046", model: value})
        break;
      case "TEMCO, 100":
        setCalibrator({...calibrator, serialNumber: "186", model: value})
        break;
    }
  }

  const setCalibratorExposureRate = (e, {value}) => {
    setCalibrator({...calibrator, exposureRate: value})
  };

  const handleSubmit = () => {
    createCalibratorRecord({variables:{
      "id": calibrator.id,
      "model": calibrator.model,
      "serialNumber": calibrator.serialNumber,
      "exposureRate": calibrator.exposureRate,
      "tfn": calibrator.tfn,
      "date": calibrator.date,
    }})
  };

  const printCoc = () => {
    document.getElementById('navbar').style.display = 'none'
    document.getElementById('hide-to-print').style.display = 'none'
    document.getElementById('page-container').style.margin = '0'
    window.print()
    document.getElementById('navbar').style.display = 'inline-flex'
    document.getElementById('hide-to-print').style.display = 'inline'
    document.getElementById('page-container').style.margin = '4rem'
  };

  return ( 
    <>
      {addCalibrator && 
      <>
        <h1>need to add a calibrator</h1>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Select 
              label="Calibration Unit"
              options={calibratorModelList}
              onChange={setCalibratorModel}
            />
            <Form.Select
              label="Exposure Rate"
              options={calibratorExposureRateList}
              onChange={setCalibratorExposureRate}
            />
            <Button>
              Save
            </Button>
          </Form.Group>
        </Form>
      </>
      }
      <Button
        onClick={() => setAddCalibrator(true)}
        >Edit Calibrator
      </Button>
      <div id='hide-to-print'>
        <Button
          as={Link}
          to={{pathname: '/batchreport', state: {batch: props.location.state.calData[0].batch}}}
        >
          Back to Batch #{props.location.state.calData[0].batch} Report
        </Button>
        <Button 
          style={{marginLeft: "50px"}}
          onClick={printCoc}
          color='green'>
            Print this certificate
        </Button>
      </div>
      <br />
      <br />
      <CertificateOfCalibration 
        calData={props.location.state.calData}
        calibratorData={props.location.state.calData[0].calibrator === null ? calibrator : props.location.state.calData[0].calibrator}
      />
    </>
   );
}
 
export default CalibrationReports;