import React, {useContext, } from 'react';
import {AuthContext, } from '../providers/AuthProvider';
import {Menu, } from 'semantic-ui-react';
import {NavLink, Link} from 'react-router-dom';

const NavBar = (props) => {
  const {handleLogout, admin, authenticated} = useContext(AuthContext);

  const adminControls = () => (
        <NavLink
          to='/admin'
          activeStyle={{textDecoration: "underline"}}
          align='center'
          style={{color: "black"}}>
          Admin
        </NavLink>
  )

  return (  
    <>
    <Menu id='navbar' fixed="top" style={{maxWidth: "{dimensions.width}"}}>
      {/* <Link to="/">
        <img src="https://static.wixstatic.com/media/b52571_71db7fe581844a49bed79066aabd7481~mv2.png" alt="logo" style={{height: "3rem", padding: ".3rem"}}/>
      </Link> */}
      
      <>
      <Menu.Menu position='right'>
        <Menu.Item 
          as={NavLink}
          to='/'
          content='Home'
          exact
        />
        <Menu.Item
          as={NavLink}
          to='/calform'
          content='Calibration Form'
          exact
        />
        <Menu.Item
          as={NavLink}
          to='/batchreport'
          content='Batch Reports'
          exact
        />
        <Menu.Item
          as={NavLink}
          to='/customers'
          content='Customers'
          exact
        />
        {!authenticated &&
        <>
          <Menu.Item
            as={NavLink}
            to='/login'
            content='Login'
            exact
          />
          <Menu.Item
            as={NavLink}
            to='/register'
            content='Register'
            exact
          />
        </>
        }
        {/* {admin &&
          <Menu.Item>
            <br />
            {adminControls()}
          </Menu.Item>
        } */}
        <Menu.Item
          as={Link}
          to='/'
          content='Logout'
          onClick={ () => handleLogout(props.history)}
        />

        </Menu.Menu>
        </>
        
    </Menu>
    </>
  );
};

 
export default NavBar;