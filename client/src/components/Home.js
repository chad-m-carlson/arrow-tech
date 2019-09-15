import React, {useState} from 'react';
import Customers from './Customers';

const Home = () => {
  const [showCustomers, setShowCustomers] = useState(false)
  return ( 
    <>
      <h1>Home</h1>
      <h3 onClick={() => setShowCustomers(!showCustomers)}>View All Customers</h3>
      {showCustomers &&
        <Customers />
      }
    </>
   );
}
 
export default Home;