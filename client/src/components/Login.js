import React, {useContext, useState} from 'react';
import {Button, Form, Segment, Header, } from 'semantic-ui-react';
import {AuthContext} from '../providers/AuthProvider';

const Login = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {handleLogin} = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
      handleLogin({email, password, }, props.history);
  };
  return ( 
    <>
    <Segment basic>
      <Header as='h1' textAlign='center'>Login</Header>
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
        <Button>Log In</Button>
      </Form>
    </Segment>
    </>
   );
}
 
export default Login;