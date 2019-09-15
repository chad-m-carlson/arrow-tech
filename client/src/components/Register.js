import React, {useContext, useState} from 'react';
import {Button, Form, Segment, Header, } from 'semantic-ui-react';
import {AuthContext} from '../providers/AuthProvider';

const Register = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const {handleRegister} = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === passwordConfirmation) {
      handleRegister({email, password, passwordConfirmation}, props.history);
    }else alert("Passwords Do Not Match")
  };
  return ( 
    <>
    <Segment basic>
      <h1>Not accepting registrations at this time</h1>
      {/* <Header as='h1' textAlign='center'>Register</Header>
      <Form onSubmit={handleSubmit}>
        <Form.Input
          label='Email'
          required
          autoFocus
          name='email'
          value={email}
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Input
          label='Password'
          required
          type='password'
          name='password'
          value={password}
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <Form.Input
          label='Confirm Password'
          required
          type='password'
          name='passwordConfirmation'
          value={passwordConfirmation}
          placeholder='Confirm Password'
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <Button>Sign Up</Button>
      </Form> */}
    </Segment>
    </>
   );
}
 
export default Register;