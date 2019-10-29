import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../providers/AuthProvider';
import {Form, Divider, Button, Label, Icon} from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import {GET_UNIQUE_DOSIMETER_MODELS, GET_PREVIOUS_CALIBRATION} from '../graphql/queries';
import {CREATE_CALIBRATION_RECORD, } from '../graphql/mutations';
import { Query } from 'react-apollo';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {Link, } from 'react-router-dom';
import {determineCalculatedDosimeterRange, convertValueReadToMr} from '../HelperFunctions';
import {toast, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DosimeterDataForm = (props) => {
  const [batch, setBatch] = useState('')
  const [calibrationId, setCalibrationId] = useState(null)
  const [dosimeterRange, setDosimeterRange] = useState(0);
  const [isR, setIsR] = useState(false);
  const [isMr, setIsMr] = useState(false);
  const [isSv, setIsSv] = useState(false);
  const [isMsv, setIsMsv] = useState(false);
  const [tolerance, setTolerance] = useState(null);
  const [customTolerance, setCustomTolerance] = useState(false);
  const [dateReceived, setDateReceived] = useState('');
  const [dosimeterModelSelected, setDosimeterModelSelected] = useState('');
  const [dosimeterSerialNumber, setDosimeterSerialNumber] = useState('');
  const [dosimeterId, setDosimeterId] = useState('');
  const [elDateIn, setElDateIn] = useState('');
  const [elDateOut, setElDateOut] = useState('');
  const [elRead, setElRead] = useState('');
  const [elPass, setElPass] = useState(false);
  const [accDate, setAccDate] = useState('');
  const [accRead, setAccRead] = useState('');
  const [accPass, setAccPass] = useState(false);
  const [vacDateIn, setVacDateIn] = useState('');
  const [vacDateOut, setVacDateOut] = useState('');
  const [vacRead, setVacRead] = useState('');
  const [vacRefRead, setVacRefRead] = useState('');
  const [vacPass, setVacPass] = useState(true);
  const [vipProblems, setVipProblems] = useState('');
  const [vipPass, setVipPass] = useState(true);
  const [finalPass, setFinalPass] = useState(false);
  const [finalPassDate, setFinalPassDate] = useState('');
  const [certificateNumber, setCertificateNumber] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [customerDosimeterModels, setCustomerDosimeterModels] = useState([]);
  const [editing, setEditing] = useState(false);
  // const [back, setBack] = useState(true);
  // const [forward, setForward] = useState(false);

  const {user} = useContext(AuthContext);
  const {data} = useQuery(GET_UNIQUE_DOSIMETER_MODELS)
  const [create_calibration_record,] = useMutation(CREATE_CALIBRATION_RECORD, {
    onError(error){
      toastMessage(error.graphQLErrors[0].message, 'error')
    }
  })

  
  useEffect(() =>{
    // fills drop down menu with dosimeter model data
    if(data){
      setCustomerDosimeterModels(data.dosimeterTemplates.map( o => ({key: o.id, text: o.modelNumber, value: o.modelNumber})))
    } 
    if(props.calibration){
      const {accDate, accPass, accRead, certificateNumber, dateReceived, dueDate, elDateIn, elDateOut, elPass, elRead, finalDate, finalPass, id, tolerance, vacPass, vipPass, vipProblems, dosimeterId} = props.calibration.calibration
      const {modelNumber, serialNumber, range, isR, isMr, isSv, isMsv} = props.calibration.calibration.dosimeter

      setCurrentRecordToState(accDate, accPass, accRead, certificateNumber, dateReceived, dueDate, elDateIn, elDateOut, elPass, elRead, finalDate, finalPass, id, tolerance, vacPass, vipPass, vipProblems, dosimeterId, modelNumber, serialNumber, range, isR, isMr, isSv, isMsv);
    }
    setBatch(props.batchNumber)
  },[data, props.batchNumber, props.calibration]);

  useEffect( () => {
    handleFinalPass()
  }, [elPass, accPass, vacPass, vipPass]);

  const setCurrentRecordToState = (accDate, accPass, accRead, certificateNumber, dateReceived, dueDate, elDateIn, elDateOut, elPass, elRead, finalDate, finalPass, id, tolerance, vacPass, vipPass, vipProblems, dosimeterId,modelNumber, serialNumber, range, isR, isMr, isSv, isMsv) => {
    setEditing(true)
    setCalibrationId(id)
    setDosimeterRange(range)
    setIsR(isR)
    setIsMr(isMr)
    setIsSv(isSv)
    setIsMsv(isMsv)
    setAccDate(new Date(accDate))
    setAccPass(accPass)
    setAccRead(accRead)
    setCertificateNumber(certificateNumber)
    setDateReceived(new Date(dateReceived))
    // setDosimeterId(dosimeterId)
    // handleDosimeterModelSelection(modelNumber)
    setDosimeterId(dosimeterId)
    setDueDate(new Date(dueDate))
    setElDateIn(new Date(elDateIn))
    setElDateOut(new Date(elDateOut))
    setElPass(elPass)
    setElRead(elRead)
    setFinalPassDate(finalDate === null ? '' : new Date (finalDate))
    setFinalPass(finalPass)
    // setId(id)
    setTolerance(tolerance * 100)
    setVacPass(vacPass)
    setVipPass(vipPass)
    setVipProblems(vipProblems)
    setDosimeterSerialNumber(serialNumber)
    setDosimeterModelSelected(modelNumber)
  };

  const handleDosimeterModelSelection = (e, {value}) => {
    setDosimeterModelSelected(value)
    setDosimeterRange(data.dosimeterTemplates.filter( d => d.modelNumber === value)[0].range)
    setIsR(data.dosimeterTemplates.filter( d => d.modelNumber === value)[0].isR)
    setIsMr(data.dosimeterTemplates.filter( d => d.modelNumber === value)[0].isMr)
    setIsMsv(data.dosimeterTemplates.filter( d => d.modelNumber === value)[0].isMsv)
    setIsSv(data.dosimeterTemplates.filter( d => d.modelNumber === value)[0].isSv)
    handleAccReading(accRead)
    handleElReading(elRead)
  };

  const handleAccReading = (valueRead) => {
    const midRange = (dosimeterRange / 2)
    setAccRead(valueRead);
    let lowestAcceptable = midRange - (!customTolerance ? dosimeterRange * 0.05 : dosimeterRange * ((tolerance / 100))/ 2)
    let highestAcceptable = midRange + (!customTolerance ? dosimeterRange * 0.05 : dosimeterRange * ((tolerance / 100))/ 2)
    if(convertValueReadToMr(valueRead, isR,  isMr, isSv, isMsv) >= lowestAcceptable && convertValueReadToMr(valueRead, isR,  isMr, isSv, isMsv) <= highestAcceptable){
      setAccPass(true)
    }else setAccPass(false)
  }

  const handleElReading = (valueRead) => {
    setElRead(valueRead)
    if(elDateIn && elDateOut){
      const testDuration = elDateOut.getDate() - elDateIn.getDate()
      const perDayLeakageAllowed = 0.025 * dosimeterRange
      if(testDuration * perDayLeakageAllowed >= convertValueReadToMr(valueRead, isR,  isMr, isSv, isMsv)){
        setElPass(true);
      }else setElPass(false);
    }
    if(valueRead == '')setElPass(false);
    // 2.5% of full scale reading per day is the maximum allowed. 200mR dosimeter passes a two day el leakage test if it reads less than 10mR
  };

  const handleDosimeterCalibrationSubmission = (e) => {
    e.preventDefault()
    create_calibration_record({variables: {
        "id": calibrationId,
        "user_id": user.id,
        "dosimeter_id": dosimeterId,
        "date_received": dateReceived, 
        "el_date_in": elDateIn, 
        "el_date_out": elDateOut, 
        "acc_date": accDate, 
        "vac_date_in": vacDateIn, 
        "vac_date_out": vacDateOut, 
        "final_date": finalPassDate, 
        // "shipBackDate": shipBackDate, 
        "due_date": dueDate, 
        "el_pass": elPass, 
        "vip_pass": vipPass, 
        "vac_pass": vacPass, 
        "acc_pass": accPass, 
        "final_pass": finalPass, 
        "el_read": parseFloat(elRead), 
        "acc_read": parseFloat(accRead), 
        "vip_problems": vipProblems, 
        "vac_reading": parseFloat(vacRead), 
        "vac_ref_reading": parseFloat(vacRefRead), 
        "certificate_number": certificateNumber,
        "batch": parseInt(batch),
        "customer_id": parseInt(props.customerId),
        "model_number": dosimeterModelSelected,
        "serial_number": dosimeterSerialNumber,
        "tolerance": tolerance/100,
      }
    })
    // !if everything is successful, reset form
    resetForm()
    if(editing){
      setCalibrationId(null);
      setEditing(false);
      setTimeout(() => {
        props.backToBatch('/batchreport', {batch: batch})
      }, 500);
    }
  };
  
  const resetForm = () => {
    setDosimeterSerialNumber('');
    setElRead('');
    setAccRead('');
    setVacRead('');
    setVacRefRead('');
    setVipProblems('');
    setElPass(false);
    setAccPass(false);
    setVacPass(true);
    setVipPass(true);
    document.getElementById('1').focus();
    document.body.scrollTop = 0;
  };

  const handleFinalPass = () => {
    if(elPass === true && accPass === true && vacPass === true && vipPass === true){
      setFinalPass(true);
      // setFinalPassDate(new Date());
    }else {
      setFinalPass(false);
      // setFinalPassDate(null);
      // setCertificateNumber('');
    };
  };

  const customKeyBindings = (e) => {
    let currentField = parseInt(e.currentTarget.attributes.id.nodeValue)
    if (e.keyCode === 13 && currentField === 4) {
      handleDosimeterCalibrationSubmission(e)
    };
    if (e.keyCode === 13 && currentField !== 4) {
      currentField ++
      document.getElementById(currentField.toString()).focus()
    } else if (e.keyCode ===38) {
      currentField --
      document.getElementById(currentField.toString()).focus()
    }; 
  };

  const toastMessage = (message, type) => {
    toast(message,{
      type: type,
      autoClose: 10000
    })
  }

  return ( 
    <div>
      <h1>Calibration</h1>
        {/* <h1>Dosimeter Data</h1>
        <div>
          <Icon 
            style={{cursor: "pointer"}} 
            onClick={() => getPreviousRecord()} 
            name="arrow left"/>
          <Icon 
            style={{cursor: "pointer"}} 
            name="arrow right"
            onClick={() => getNextRecord()}/>
        </div> */}
        <Form size="mini">
          <Form.Group inline>

          <Form.Input 
            label="Batch"
            value={batch}
            error={batch === '' || batch === null}
            onChange={(e) => setBatch(e.target.value)}
            />
            </Form.Group>
        </Form>
        {/* {batch && 
          <h4 style={{margin: "auto 0"}}>Batch {batch}</h4>
        } */}
      <br />
      <Form size="mini">
      <Form.Group inline >
        <Form.Input label="Date Received" error={dateReceived === ''}>
          <DatePicker 
            selected={dateReceived} 
            onChange={date => setDateReceived(date)} 
            />
        </Form.Input>
          <Form.Select
            label="Dosimeter Model"
            loading={customerDosimeterModels.length < 1}
            // defaultValue={props.calibration ? props.calibration.calibration.dosimeter.id : null}
            options={customerDosimeterModels}
            onChange={handleDosimeterModelSelection}
            value={dosimeterModelSelected}
            error={dosimeterModelSelected === ''}
          />
        {(props.batchNumber || props.customerId || props.calibration) ?
          <Form.Input
          label="Dosimeter Serial Number"
            id="1"
            tabIndex='1'
            value={(props.batchNumber || props.customerID || props.calibration) ? dosimeterSerialNumber : ''}
            error={dosimeterSerialNumber === ''}
            onKeyDown={(e) => customKeyBindings(e)}
            onChange={(e) => setDosimeterSerialNumber(e.target.value)}
            />
          :
            <Form.Input
            label="Dosimeter Serial Number"
            id="1"
            tabIndex='1'
            value={(props.batchNumber || props.customerID || props.calibration) ? dosimeterSerialNumber : ''}
            onKeyDown={(e) => customKeyBindings(e)}
            onChange={(e) => setDosimeterSerialNumber(e.target.value)}>
                <Label 
                  basic 
                  color="red" 
                  pointing="above">
                  Please select a customer before entering dosimeter data
                </Label>
            </Form.Input>
        }
      </Form.Group>
      {dosimeterRange > 1 &&
      <p><b>Range:</b> {determineCalculatedDosimeterRange(dosimeterRange, isR, isMr, isSv, isMsv)}</p>
      }
      <Divider style={{margin: "1.5rem"}}/>
      <Form.Group widths='equal' inline>
        <Form.Input label="EL Date in" error={elDateIn === ''}>
          <DatePicker
            selected={elDateIn}
            onChange={date => setElDateIn(date)}
          />
        </Form.Input>
        <Form.Input label="EL Date out" error={elDateOut === ''}>
          <DatePicker
            selected={elDateOut}
            onChange={date => setElDateOut(date)}
          />
        </Form.Input>
        <Form.Input
          id='2'
          label="EL Read"
          tabIndex='2'
          value={elRead}
          error={elRead === ''}
          disabled={elDateIn && elDateOut ? false : true}
          onKeyDown={(e) => customKeyBindings(e)}
          onChange={(e) => {handleElReading(e.target.value)}}
        />
      </Form.Group>
      <div style={{textAlign: "center"}}>
        <Form.Checkbox
          style={{}}
          label="EL Pass"
          onChange={() => setElPass(!elPass)}
          checked={elPass}
          />
      </div>
      <Divider style={{margin: "1.5rem"}}/>
      <Form.Group widths='equal' inline style={{display: "flex", justifyContent: "space-around"}}>
        <Form.Checkbox 
          label="Custom Tolerance"
          checked={customTolerance}
          onChange={() => setCustomTolerance(!customTolerance)}
        />
        {customTolerance &&
          <Form.Input
            type="number"
            label="Custom Tolerance %"
            placeholder="Percentage"
            value={tolerance}
            onChange={(e) => setTolerance(e.target.value)}
          />
        }
      </Form.Group>
        <Form.Group widths='equal' inline>
        <Form.Input label="ACC Date" error={accDate === ''}>
          <DatePicker
            selected={accDate}
            onChange={date => setAccDate(date)}
          />
        </Form.Input>
        <Form.Input
          label="ACC Read"
          id='3'
          tabIndex='3'
          value={accRead}
          onKeyDown={(e) => customKeyBindings(e)}
          onChange={(e) => handleAccReading(e.target.value)}
        />
      </Form.Group>
      <div style={{textAlign: "center"}}>
        <Form.Checkbox
          style={{}}
          label="ACC Pass"
          onChange={() => setAccPass(!accPass)}
          checked={accPass}
        />
      </div>
      <Divider style={{margin: "1.5rem"}}/>
      <div style={{textAlign: "center"}}>
        <Form.Checkbox
          style={{}}
          label="VAC Pass"
          onChange={() => setVacPass(!vacPass)}
          checked={vacPass}
        />
      </div>
      <Divider style={{margin: "1.5rem"}}/>
      <Form.Group inline>
        <Form.Input
          label="VIP Problems"
          onChange={(e) => setVipProblems(e.target.value)}
          />
          <Form.Checkbox
            style={{marginLeft: "8.6rem"}}
            label="VIP Pass"
            onChange={() => setVipPass(!vipPass)}
            checked={vipPass}
          />
      </Form.Group>
      <Divider style={{margin: "1.5rem"}}/>
      <Form.Group widths="equal">
      <Form.Checkbox
            style={{}}
            label="Final Pass"
            disabled
            onChange={() => setFinalPass(!finalPass)}
            checked={finalPass}
          />
        <Form.Input label="Final Pass Date">
          <DatePicker
            selected={finalPassDate}
            onChange={date => setFinalPassDate(date)}
          />
        </Form.Input>
        <Form.Input 
          label="Certificate Number"
          value={certificateNumber}
          onChange={(e) => setCertificateNumber(e.target.value)}
        />
        <Form.Input label="Due Date">
          <DatePicker
            showYearDropdown
            selected={dueDate}
            onChange={date => setDueDate(date)}
          />
        </Form.Input>
      </Form.Group>
      </Form>
      <Button 
        id='4' 
        tabIndex='4' 
        onKeyDown={(e) => customKeyBindings(e)}
        onClick={(e) => handleDosimeterCalibrationSubmission(e)}
        >{!editing ? "Submit Dosimeter Calibration" : "Update Dosimeter Calibration" }
      </Button>
      {props.batchNumber &&
        <Button 
          as={Link} 
          to={{pathname: '/batchreport', state: {batch: props.batchNumber }}}
        >View Batch Report</Button>
      }
    </div>

   );
}
 
export default DosimeterDataForm;