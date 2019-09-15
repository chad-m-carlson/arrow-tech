import React, {useContext, } from 'react';
import {AuthContext, } from '../providers/AuthProvider';
import {Menu, } from 'semantic-ui-react';
import {NavLink,} from 'react-router-dom';

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
    <Menu fixed="top" style={{madWidth: "{dimensions.width}"}}>
      {/* <Link to="/">
        <img src="https://static.wixstatic.com/media/b52571_71db7fe581844a49bed79066aabd7481~mv2.png" alt="logo" style={{height: "3rem", padding: ".3rem"}}/>
      </Link> */}
      
      <>
      <Menu.Menu position='right'>
        <Menu.Item>
          <br />
          <NavLink 
            to='/'
            exact
            activeStyle={{textDecoration: "underline"}}
            align='center'
            style={{color: "black"}}>
            Home
          </NavLink>
        </Menu.Item>
        {!authenticated &&
        <>
          <Menu.Item>
            <br />
              <NavLink
              to='/login'
              activeStyle={{textDecoration: "underline"}}
              align='center'
              style={{color: "black"}}>
                Login
              </NavLink>
          </Menu.Item>
          <Menu.Item>
            <br />
            <NavLink
              to='/register'
              activeStyle={{textDecoration: "underline"}}
              align='center'
              style={{color: "black"}}>
              Register
            </NavLink>
          </Menu.Item>
        </>
        }
        {admin &&
          <Menu.Item>
            <br />
            {adminControls()}
          </Menu.Item>
        }
        <Menu.Item>
          <br />
          <NavLink
            exact
            to='/'
            align='center'
            onClick={ () => handleLogout(props.history)}
            style={{color: "black"}}>
            Logout
          </NavLink>
        </Menu.Item>
        </Menu.Menu>
        </>
        
    </Menu>
    </>
  );
};

 
export default NavBar;