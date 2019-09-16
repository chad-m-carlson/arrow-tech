import React, {useState, useEffect} from 'react';
import {Form, Divider} from 'semantic-ui-react'
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

const DosimeterDataForm = () => {
  const [dateReceived, setDateReceived] = useState('')
  const [finalPassDate, setFinalPassDate] = useState('')

  return ( 
    <div>
      <Form>
      <Form.Group widths='equal'>
        {/* <div style={{display: "flex", justifyContent: "space-around"}}>
          <p>Date Received</p>
          <DatePicker 
          selected={dateReceived} 
          onChange={date => setDateReceived(date)} 
          placeholderText="Date Received"
          />
        </div> */}
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Checkbox 
          label="Custom Tolerance"
          defaultValue={false}
        />
      </Form.Group>
      <Form.Group widths='equal' inline>
        <Form.Input
          label="EL Date in"
        />
        <Form.Input
          label="EL Date out"
        />
        <Form.Input
          label="EL Read"
        />
      </Form.Group>
      <div style={{textAlign: "center"}}>
        <Form.Checkbox
          style={{}}
          label="EL Pass"
          defaultChecked={false}
          />
      </div>
      <Divider style={{margin: "1.5rem"}}/>
      <Form.Group widths='equal' inline>
        <Form.Input
          label="ACC Date"
        />
        <Form.Input
          label="ACC Read"
        />
      </Form.Group>
      <div style={{textAlign: "center"}}>
        <Form.Checkbox
          style={{}}
          label="ACC Pass"
          defaultChecked={false}
        />
      </div>
      <Divider style={{margin: "1.5rem"}}/>
      <Form.Group widths='equal' inline>
        <Form.Input
          label="VAC Date In"
        />
        <Form.Input
          label="VAC Date Out"
        />
      </Form.Group>
      <Form.Group widths='equal' inline>
        <Form.Input
          label="VAC Reading"
        />
        <Form.Input
          label="VAC Ref Reading"
        />
      </Form.Group>
      <div style={{textAlign: "center"}}>
        <Form.Checkbox
          style={{}}
          label="VAC Pass"
          defaultChecked={true}
        />
      </div>
      <Divider style={{margin: "1.5rem"}}/>
      <Form.Group>
        <Form.Input
          label="VIP Problems"
          // !disabled unless VIP pass fails
        />
      </Form.Group>
      <div style={{textAlign: "center"}}>
        <Form.Checkbox
          style={{}}
          label="VIP Pass"
          defaultChecked={true}
        />
      </div>
      <Form.Group widths="equal">
        {/* <div style={{display: "flex", justifyContent: "space-around"}}>
          <p>Final Pass Date</p>
          <DatePicker 
            selected={finalPassDate} 
            onChange={date => setFinalPassDate(date)} 
            placeholderText="Final Pass Date"
          />
        </div> */}
      </Form.Group>
      </Form>
    </div>

   );
}
 
export default DosimeterDataForm;