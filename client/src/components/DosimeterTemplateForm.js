import React from 'react';
import {Form, Button, Input, Checkbox} from 'semantic-ui-react';

const DosimeterTemplateForm = (props) => {
  return ( 
    <Form>
      <Input
        label="Model Number"
      />
      <Input
        label="Range"
      />
      <Checkbox
        label="mR"
      />
      <Checkbox
        label="R"
      />
    </Form>
   );
}
 
export default DosimeterTemplateForm;