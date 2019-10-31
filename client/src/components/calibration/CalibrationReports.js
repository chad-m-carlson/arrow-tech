import React, {useState, useEffect} from 'react';
import CertificateOfCalibration from './CertificateOfCalibration';
import FailureReport from './FailureReport';
import CalibrationSummary from './CalibrationSummary';
import {Form, Button, Grid } from 'semantic-ui-react';
import {Link, } from 'react-router-dom';
import {CREATE_CALIBRATOR_RECORD} from '../graphql/mutations';
import {useMutation} from '@apollo/react-hooks';
import {toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CalibrationReports = (props) => {
  const [calibrator, setCalibrator] = useState({id: null, model: '', serialNumber: '', tfn: '265623-01', exposureRate: '', date: '6/6/2019'});
  const [addCalibrator, setAddCalibrator] = useState(false);
  const [viewFailureReport, setViewFailureReport] = useState(false);
  const [viewCalibrationSummary, setViewCalibrationSummary] = useState(true);
  const [viewCalibrationReport, setViewCalibrationReport] = useState(false);
  const [cocCounter, setCocCounter] = useState(0);
  const [allCalibrationData, setAllCalibrationData] = useState([]);
  const [currentCalibrationData, setCurrentCalibrationData] = useState([]);

  const calibratorModelList = [{key: 1, text: "J.L. Shepherd 20", value: "J.L. Shepherd 20"}, {key: 2, text: "TEMCO 100", value: "TEMCO 100"}]

  const calibratorExposureRateList = [{key: 1, text: "520 mR/hr", value: "520 mR/hr"}, 
                                      {key: 2, text: "4R/hr", value: "4R/hr"}, 
                                      {key: 3, text: "35.7 R/hr", value: "35.7 R/hr"}, 
                                      {key: 4, text: "588.2 R/hr", value: "588.2 R/hr"}, 
                                      {key: 5, text: "43 mR/hr", value: "43 mR/hr"},]

  const [createCalibratorRecord] = useMutation(CREATE_CALIBRATOR_RECORD, {
      onCompleted(data){
      setCalibrator({...calibrator ,id: data.createCalibratorRecord.calibrator.id});
      let x = allCalibrationData.filter( c => c.dosimeter.modelNumber === props.location.state.uniqueDosimeterModels[cocCounter])
      x.forEach( c => {
        {c.calibrator = data.createCalibratorRecord.calibrator} 
        {c.calibratorId = data.createCalibratorRecord.calibrator.id}
      })
      setAllCalibrationData([...allCalibrationData.filter( c => c.dosimeter.modelNumber !== props.location.state.uniqueDosimeterModels[cocCounter]), ...x])
      toastMessage('Calibration equipment saved', 'success')
    },
    onError(error){
      toastMessage(error.graphQLErrors[0].message, 'error')
    }
  })

  useEffect( () => {
    setAllCalibrationData(props.location.state.calData)
  },[]);

  useEffect( () => {
    calibratorSet()
    // if(props.location.state.calData[0].calibrator === null){
    //   alert("Calibration Equipment has not been set")
    //   setAddCalibrator(true)
    // }else{
    //   const {id, model, serialNumber, tfn, exposureRate, date} = props.location.state.calData[0].calibrator
    //   setCalibrator({id, model, serialNumber, tfn, exposureRate, date})
    //   setAddCalibrator(false)
    // }
  }, [cocCounter]);
  
  const calibratorSet = () => {
    // ?calData filtered by dosimeter model
    let x = props.location.state.calData.filter( c => c.finalPass === true && c.dosimeter.modelNumber === props.location.state.uniqueDosimeterModels[cocCounter])
    if(x[0].calibrator === null){
      setAddCalibrator(true)
      setCalibrator({id: null, model: '', serialNumber: '', tfn: '265623-01', exposureRate: '', date: '6/6/2019'})
    }else{
      const {id, model, serialNumber, tfn, exposureRate, date} = x[0].calibrator
      setCalibrator({id, model, serialNumber, tfn, exposureRate, date})
      setAddCalibrator(false)
      setCurrentCalibrationData(x)
    }
  };

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
      "batch": props.location.state.calData[0].batch,
      "dosimeter_model": props.location.state.uniqueDosimeterModels[cocCounter]
    }})
  };

  const handleCocNavigation = (direction) => {
    if(direction === 'next'){
      setCocCounter(cocCounter + 1)
    }else setCocCounter(cocCounter -1)
    calibratorSet()
  };

  const printCoc = () => {
    document.getElementById('navbar').style.display = 'none'
    document.getElementById('hide-to-print').style.display = 'none'
    document.getElementById('header').style.display = 'block'
    document.getElementById('footer').style.display = 'block'
    document.getElementById('page-container').style.margin = '0'
    document.getElementById('pdf-container').style.width = '100%'
    window.print()
    document.getElementById('header').style.display = 'none'
    document.getElementById('footer').style.display = 'none'
    document.getElementById('navbar').style.display = 'inline-flex'
    document.getElementById('hide-to-print').style.display = 'inline'
    document.getElementById('page-container').style.margin = '4rem'
    document.getElementById('pdf-container').style.width = '60%'
  };

  const switchCerts = (certToView) => {
    if(certToView === 'calibration'){
      setViewCalibrationReport(true)
      setViewFailureReport(false)
      setViewCalibrationSummary(false)
    }else if (certToView === 'failure'){
      setViewCalibrationReport(false)
      setViewFailureReport(true)
      setViewCalibrationSummary(false)
    }else{
      setViewCalibrationReport(false)
      setViewFailureReport(false)
      setViewCalibrationSummary(true)
    }
  };

  const toastMessage = (message, type) => {
    toast(message,{
      type: type,
      autoClose: 4000,
    })
  }

  return ( 
    <Grid columns={2}>
      <Grid.Column style={{width: "60%"}} id='pdf-container'>
        {viewCalibrationReport &&
          <CertificateOfCalibration 
            calData={currentCalibrationData.length > 0 ? currentCalibrationData : props.location.state.calData.filter( c => c.finalPass === true && c.dosimeter.modelNumber === props.location.state.uniqueDosimeterModels[cocCounter])}
            calibratorData={calibrator}
          />
        }
        {viewFailureReport &&
          <FailureReport
            calData={allCalibrationData.filter( c => c.finalPass === false)}
            calibratorData={calibrator}
            dateTested={props.location.state.calData.find(( {finalDate} ) => finalDate !== null).finalDate}
          />
        }
        {viewCalibrationSummary &&
          <CalibrationSummary
            calData={allCalibrationData.length > 0 ? allCalibrationData : props.location.state.calData}
            dateTested={props.location.state.calData.find(( {finalDate} ) => finalDate !== null).finalDate}
            uniqueDosimeterModels={props.location.state.uniqueDosimeterModels}
          />
        }
      </Grid.Column>
      <Grid.Column style={{width: "40%", position: "fixed", left: "65%"}} id='hide-to-print'>
        <h2>Batch# {props.location.state.calData[0].batch}</h2>
        <h3>Dosimeter Models: {props.location.state.uniqueDosimeterModels.length}</h3>
        <h4>Total Dosimeters: {props.location.state.calData.length}</h4>
          <>
            <Button
              disabled={!calibrator.id}
              style={{marginBottom: "10px"}}
              onClick={printCoc}
              color='green'>
                Print this certificate
            </Button>
            <br />
            <Button
              style={{marginBottom: "10px"}}
              onClick={() => switchCerts('summary')}
              >View Calibration Summary
            </Button>
            <br />
            <Button
              style={{marginBottom: "10px"}}
              onClick={() => switchCerts('calibration')}
              >View Calibration Report
            </Button>
            <br />
            {props.location.state.uniqueDosimeterModels.length > 1 && !viewFailureReport && !viewCalibrationSummary &&
              <>
                <Button
                  disabled={cocCounter === 0}
                  style={{marginBottom: "10px"}}
                  onClick={() =>  handleCocNavigation('prev')}
                >Previous Model CoC
                </Button>
                <Button
                  disabled={cocCounter === props.location.state.uniqueDosimeterModels.length - 1 ||
                            props.location.state.calData.filter( c => c.finalPass === true && c.dosimeter.modelNumber === props.location.state.uniqueDosimeterModels[cocCounter + 1]).length === 0}
                  style={{marginBottom: "10px"}}
                  onClick={() => handleCocNavigation('next')}
                >Next Model CoC
                </Button>
              <br />
            </>
            }
            <Button
              style={{marginBottom: "10px"}}
              onClick={() => switchCerts('failure')}
              >View Failure Report
            </Button>
            <br />
          </>
        {viewCalibrationReport &&
          <Button
            style={{marginBottom: "10px"}}
            onClick={() => setAddCalibrator(true)}
            >Edit Calibration Equipment
          </Button>
        }
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