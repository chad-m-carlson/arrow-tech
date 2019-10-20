import React, {useState, useEffect} from 'react';
import CertificateOfCalibration from './CertificateOfCalibration';
import {Form, Button, Grid } from 'semantic-ui-react';
import {Link, } from 'react-router-dom';
import {CREATE_CALIBRATOR_RECORD} from '../graphql/mutations';
import {useMutation} from '@apollo/react-hooks';

const CalibrationReports = (props) => {
  const [calibrator, setCalibrator] = useState({id: null, model: '', serialNumber: '', tfn: '265623-01', exposureRate: '', date: '6/6/2019'});
  const [addCalibrator, setAddCalibrator] = useState(false);

  const calibratorModelList = [{key: 1, text: "J.L. Shepherd 20", value: "J.L. Shepherd 20"}, {key: 2, text: "TEMCO 100", value: "TEMCO 100"}]

  const calibratorExposureRateList = [{key: 1, text: "520 mR/hr", value: "520 mR/hr"}, 
                                      {key: 2, text: "4R/hr", value: "4R/hr"}, 
                                      {key: 3, text: "35.7 R/hr", value: "35.7 R/hr"}, 
                                      {key: 4, text: "588.2 R/hr", value: "588.2 R/hr"}, 
                                      {key: 5, text: "43 mR/hr", value: "43 mR/hr"},]

  const [createCalibratorRecord] = useMutation(CREATE_CALIBRATOR_RECORD, {onCompleted(data){
    debugger
    setCalibrator({...calibrator ,id: data.createCalibratorRecord.calibrator.id})
    setAddCalibrator(false)
  }})

  useEffect( () => {
    if(props.location.state.calData[0].calibrator === null){
      alert("Calibration Equipment has not been set")
      setAddCalibrator(true)
     }else{
       const {id, model, serialNumber, tfn, exposureRate, date} = props.location.state.calData[0].calibrator
       setCalibrator({id, model, serialNumber, tfn, exposureRate, date})
       setAddCalibrator(false)
     }
  }, []);

  const setCalibratorModel = (e, {value}) => {
    switch (value) {
      case "J.L. Shepherd 20":
        setCalibrator({...calibrator, serialNumber: "6046", model: value})
        break;
      case "TEMCO 100":
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
      "serial_number": calibrator.serialNumber,
      "exposure_rate": calibrator.exposureRate,
      "tfn": calibrator.tfn,
      "date": calibrator.date,
      "batch": props.location.state.calData[0].batch
    }})
  };

  const printCoc = () => {
    document.getElementById('navbar').style.display = 'none'
    document.getElementById('hide-to-print').style.display = 'none'
    document.getElementById('page-container').style.margin = '0'
    document.getElementById('pdf-container').style.width = '100%'
    window.print()
    document.getElementById('navbar').style.display = 'inline-flex'
    document.getElementById('hide-to-print').style.display = 'inline'
    document.getElementById('page-container').style.margin = '4rem'
    document.getElementById('pdf-container').style.width = '60%'
  };

  return ( 
    <Grid columns={2}>
        <Grid.Column style={{width: "60%"}} id='pdf-container'>
          <CertificateOfCalibration 
            calData={props.location.state.calData}
            calibratorData={calibrator}
          />
        </Grid.Column>
        <Grid.Column style={{width: "40%"}} id='hide-to-print'>
          <Button
            style={{marginBottom: "10px"}}
            onClick={printCoc}
            color='green'>
              Print this certificate
          </Button>
          <br />
          <Button
            style={{marginBottom: "10px"}}
            onClick={() => setAddCalibrator(true)}
            >Edit Calibration Equipment
          </Button>
          <br />
          <Button
            style={{marginBottom: "10px"}}
            as={Link}
            to={{pathname: '/batchreport', state: {batch: props.location.state.calData[0].batch}}}
            >
            Back to Batch #{props.location.state.calData[0].batch} Report
          </Button>
          {addCalibrator && 
            <div style={{display: "flex", flexDirection: "column", justifyContent: "center"}}>
              <Form onSubmit={handleSubmit}>
                <Form.Group style={{display: "flex", flexDirection: "column", width: "fit-content"}}>
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
                </Form.Group>
                <Button>
                  Save
                </Button>
              </Form>
            </div>
          }
        </Grid.Column>
      </Grid>
   );
}
 
export default CalibrationReports;