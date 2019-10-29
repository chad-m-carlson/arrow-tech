import React, {useState} from 'react';
import {Form, Button, Input, Radio} from 'semantic-ui-react';
import {convertValueReadToMr, } from './HelperFunctions';
import { useQuery, useMutation} from '@apollo/react-hooks';
import {CREATE_DOSIMETER_TEMPLATE} from './graphql/mutations'

const DosimeterTemplateForm = (props) => {
  const [unit, setUnit] = useState('');
  const [modelNumber, setModelNumber] = useState('');
  const [range, setRange] = useState('');
  const [rangeInMr, setRangeInMr] = useState('');

  const [createDosimeterTemplate] = useMutation(CREATE_DOSIMETER_TEMPLATE, {onCompleted(data){
    console.log(data)
  }})

  const handleUnitChange = (e, {value}) => {
    setUnit(value)
  };

  const handleRangeChange = (e) => {
    setRange(e.target.value)
    const isR = unit === "R";
    const isMr = unit === "mR";
    const isSv = unit === "Sv";
    const isMsv = unit === "mSv";
    setRangeInMr(convertValueReadToMr(e.target.value, isR,  isMr, isSv, isMsv))
  };

  const handleSubmit = () => {
    createDosimeterTemplate({variables: {
      "model_number": modelNumber,
      "range": rangeInMr,
      "unit": unit
    }})
    setModelNumber('');
    setRange('');
    setUnit('')
  };

  return ( 
    <Form onSubmit={handleSubmit}>
      <Form.Group fluid>
        <Form.Input
          label='Model Number'
          onChange={(e) => setModelNumber(e.target.value)}
          value={modelNumber}
        />
      </Form.Group>
      <Form.Group fluid style={{display: 'flex', flexDirection: "column"}} grouped>
        <label>Select a unit</label>
        <Form.Radio
          label="mR"
          value='mR'
          onChange={handleUnitChange}
          checked={unit === 'mR'}
        />
        <Form.Radio
          label="R"
          value='R'
          onChange={handleUnitChange}
          checked={unit === 'R'}
        />
      </Form.Group>
      <Form.Group fluid style={{display: 'flex', flexDirection: "column"}} grouped>
        <Form.Radio
          label="mSv"
          value='mSv'
          onChange={handleUnitChange}
          checked={unit === 'mSv'}
        />
        <Form.Radio
          label="Sv"
          value='Sv'
          onChange={handleUnitChange}
          checked={unit === 'Sv'}
        />
      </Form.Group>
      <Form.Group fluid>
        <Form.Input
          label="Range"
          onChange={(e) => handleRangeChange(e)}
          value={range}
        />
      </Form.Group>
      <Button>Submit</Button>
    </Form>
   );
}
 
export default DosimeterTemplateForm;