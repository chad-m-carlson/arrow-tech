import React, {useState, useEffect, useContext} from 'react';
import {AuthContext} from '../../providers/AuthProvider';
import {Form, Divider, Button, Popup, Label} from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/react-hooks';
import {Link, } from 'react-router-dom';

const GET_UNIQUE_DOSIMETER_MODELS = gql`
  query{
		uniqueDosimeterModels {
      id
      modelNumber
      range
      isR
      isMr
		}
  }
`;

const CREATE_CALIBRATION_RECORD =  gql`
  mutation CreateCalibrationRecord($user_id: Int, $date_received: String, $el_date_in: String, $el_date_out: String, $acc_date: String, $vac_date_in: String, $vac_date_out: String, $final_date: String,  $due_date: String, $el_pass: Boolean, $vip_pass: Boolean, $vac_pass: Boolean, $acc_pass: Boolean, $final_pass: Boolean,$el_read: Float, $acc_read: Float, $vip_problems: String, $vac_reading: Float, $vac_ref_reading: Float, $batch: Int, $customer_id: Int, $model_number: String, $serial_number: String, $tolerance: Float){
    createCalibrationRecord(input: {userId: $user_id, dateReceived: $date_received, elDateIn: $el_date_in, elDateOut: $el_date_out, accDate: $acc_date, vacDateIn: $vac_date_in, vacDateOut: $vac_date_out, finalDate: $final_date, dueDate: $due_date, elPass: $el_pass, vipPass: $vip_pass, vacPass: $vac_pass, accPass: $acc_pass, finalPass: $final_pass, elRead: $el_read, accRead: $acc_read, vipProblems: $vip_problems, vacReading: $vac_reading, vacRefReading: $vac_ref_reading, batch: $batch, customerId: $customer_id, modelNumber: $model_number, serialNumber: $serial_number, tolerance: $tolerance}){
      calibration{
        userId
        dateReceived
        elDateIn
        elDateOut
        accDate
        vacDateIn
        vacDateOut
        finalDate
        dueDate
        elPass
        accPass
        finalPass
        elRead
        accRead
        vipProblems
        vacRefReading
        batch
        vipPass
        accPass
        vacReading
      }
    }
  }
`;

const DosimeterDataForm = (props) => {
  const [dosimeterRange, setDosimeterRange] = useState(0);
  const [isR, setIsR] = useState(false);
  const [tolerance, setTolerance] = useState(null);
  const [customTolerance, setCustomTolerance] = useState(false);
  const [dateReceived, setDateReceived] = useState('');
  const [dosimeterModelSelected, setDosimeterModelSelected] = useState('');
  const [dosimeterSerialNumber, setDosimeterSerialNumber] = useState('');
  const [elDateIn, setElDateIn] = useState('');
  const [elDateOut, setElDateOut] = useState('');
  const [elRead, setElRead] = useState(0);
  const [elPass, setElPass] = useState(false);
  const [accDate, setAccDate] = useState('');
  const [accRead, setAccRead] = useState(0);
  const [accPass, setAccPass] = useState(false);
  const [vacDateIn, setVacDateIn] = useState('');
  const [vacDateOut, setVacDateOut] = useState('');
  const [vacRead, setVacRead] = useState(0);
  const [vacRefRead, setVacRefRead] = useState(0);
  const [vacPass, setVacPass] = useState(true);
  const [vipProblems, setVipProblems] = useState('');
  const [vipPass, setVipPass] = useState(true);
  const [finalPass, setFinalPass] = useState(false);
  const [finalPassDate, setFinalPassDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [customerDosimeterModels, setCustomerDosimeterModels] = useState([]);

  const {user} = useContext(AuthContext);
  const {data} = useQuery(GET_UNIQUE_DOSIMETER_MODELS)
  const [create_calibration_record] = useMutation(CREATE_CALIBRATION_RECORD)

  useEffect(() =>{
    if(data){
      setCustomerDosimeterModels(data.uniqueDosimeterModels.map( o => ({key: o.id, text: o.modelNumber, value: o.modelNumber})))
    } 
  },[data])

  useEffect( () => {
    handleFinalPass()
  }, [elPass, accPass, vacPass, vipPass])

  const handleDosimeterModelSelection = (e, {value}) => {
    setDosimeterModelSelected(value)
    setDosimeterRange(data.uniqueDosimeterModels.filter( d => d.modelNumber === value)[0].range)
    setIsR(data.uniqueDosimeterModels.filter( d => d.modelNumber === value)[0].isR)
  };

  const handleAccReading = (valueRead) => {
    const midRange = (dosimeterRange / 2)
    setAccRead(valueRead);
    let lowestAcceptable = midRange - (!customTolerance ? dosimeterRange * 0.05 : dosimeterRange * ((tolerance / 100))/ 2)
    let highestAcceptable = midRange + (!customTolerance ? dosimeterRange * 0.05 : dosimeterRange * ((tolerance / 100))/ 2)
    if((isR ? (valueRead * 1000) : valueRead) >= lowestAcceptable && (isR ? (valueRead * 1000) : valueRead) <= highestAcceptable){
      setAccPass(true)
    }else setAccPass(false)
  }

  const handleElReading = (valueRead) => {
    setElRead(valueRead)
    const testDuration = elDateOut.getDate() - elDateIn.getDate()
    const perDayLeakageAllowed = 0.025 * dosimeterRange
    if(testDuration * perDayLeakageAllowed >= (isR ? (valueRead * 1000) : valueRead)){
      setElPass(true);
    }else setElPass(false);
    if(valueRead == '')setElPass(false);
    // 2.5% of full scale reading per day is the maximum allowed. 200mR dosimeter passes a two day el leakage test if it reads less than 10mR
  };

  const handleDosimeterCalibrationSubmission = (e) => {
    e.preventDefault()
    console.log('submitted')
    create_calibration_record({variables: {
        "user_id": user.id,
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
        "batch": props.batchNumber,
        "customer_id": parseInt(props.customerId),
        "model_number": dosimeterModelSelected,
        "serial_number": dosimeterSerialNumber,
        "tolerance": tolerance/100,
      }
    })
    // !if everything is successful, reset form
    resetForm()
  };
  
  const resetForm = () => {
    setDosimeterSerialNumber('');
    setElRead('');
    setAccRead('');
    setVacRead('');
    setVacRefRead('');
    setElPass(false);
    setAccPass(false);
    setVacPass(true);
    setVipPass(true);
    document.getElementById('focus').focus();
    document.body.scrollTop = 0;
  };

  const handleFinalPass = () => {
    if(elPass === true && accPass === true && vacPass === true && vipPass === true){
      setFinalPass(true);
      setFinalPassDate(new Date());
    }else {
      setFinalPass(false);
      setFinalPassDate('');
    };
  };

  return ( 
    <div>
      <Form size="mini">
      <Form.Group inline >
        <Form.Input label="Date Received">
          <DatePicker 
            selected={dateReceived} 
            onChange={date => setDateReceived(date)} 
            />
        </Form.Input>
          <Form.Select
            label="Dosimeter Model"
            loading={customerDosimeterModels.length < 1}
            options={customerDosimeterModels}
            onChange={handleDosimeterModelSelection}
          />
        {(props.batchNumber || props.customerID) ?
          <Form.Input
          label="Dosimeter Serial Number"
            id="focus"
            tabIndex='1'
            value={(props.batchNumber || props.customerID) ? dosimeterSerialNumber : ''}
            onChange={(e) => setDosimeterSerialNumber(e.target.value)}
            />
          :
            <Form.Input
            label="Dosimeter Serial Number"
            id="focus"
            tabIndex='1'
            value={(props.batchNumber || props.customerID) ? dosimeterSerialNumber : ''}
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
      <p><b>Range:</b> {isR ? (dosimeterRange/1000) : dosimeterRange}{isR ? "R" : "mR"}</p>
      }
      <Divider style={{margin: "1.5rem"}}/>
      <Form.Group widths='equal' inline>
        <Form.Input label="EL Date in">
          <DatePicker
            selected={elDateIn}
            onChange={date => setElDateIn(date)}
          />
        </Form.Input>
        <Form.Input label="EL Date out">
          <DatePicker
            selected={elDateOut}
            onChange={date => setElDateOut(date)}
          />
        </Form.Input>
        <Form.Input
          label="EL Read"
          tabIndex='2'
          value={elRead}
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
        <Form.Input label="ACC Date">
          <DatePicker
            selected={accDate}
            onChange={date => setAccDate(date)}
          />
        </Form.Input>
        <Form.Input
          label="ACC Read"
          tabIndex='3'
          value={accRead}
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
      {/* <Form.Group widths='equal' inline>
        <Form.Input label="VAC Date In">
          <DatePicker
            selected={vacDateIn}
            onChange={date => setVacDateIn(date)}
          />
        </Form.Input>
        <Form.Input label="VAC Date Out">
          <DatePicker
            selected={vacDateOut}
            onChange={date => setVacDateOut(date)}
          />
        </Form.Input>
      </Form.Group>
      <Form.Group widths='equal' inline>
        <Form.Input
          label="VAC Reading"
          tabIndex='4'
          value={vacRead}
          onChange={(e) => setVacRead(e.target.value)}
        />
        <Form.Input
          label="VAC Ref Reading"
          tabIndex='5'
          value={vacRefRead}
          onChange={(e) => setVacRefRead(e.target.value)}
        />
      </Form.Group> */}
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
        <Form.Input label="Due Date">
          <DatePicker
            showYearDropdown
            selected={dueDate}
            onChange={date => setDueDate(date)}
          />
        </Form.Input>
      </Form.Group>
      <Button tabIndex='6' onClick={handleDosimeterCalibrationSubmission}>Submit Dosimeter Calibration</Button>
      <Button as={Link} to='/batchreport'>View Batch Report</Button>
      </Form>
    </div>

   );
}
 
export default DosimeterDataForm;