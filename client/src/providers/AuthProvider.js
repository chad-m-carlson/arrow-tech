import React from "react";
import axios from "axios";

export const AuthContext = React.createContext();
export const AuthConsumer = AuthContext.Consumer;

export class AuthProvider extends React.Component {
  state = { user: null, admin: false, error: "" };

  handleRegister = (user, history) => {
    axios
      .post("/api/auth", user)
      .then(res => {
        this.setState({ user: res.data.data });
        history.push("/");
      })
      .catch(res => {
        console.log(res);
      });
  };

  handleLogin = (user, history) => {
    axios
      .post("/api/auth/sign_in", user)
      .then(res => {
        this.setState({ user: res.data.data, admin: res.data.data.is_admin });
        history.push("/");
      })
      .catch(res => {
        console.log(res);
        this.setState({ error: "User name or password is incorrect" });
      });
  };

  handleLogout = history => {
    axios
      .delete("/api/auth/sign_out")
      .then(res => {
        this.setState({ user: null, admin: false });
        history.push("/login");
      })
      .catch(res => {
        console.log(res);
      });
  };

  render() {
    return (
      <AuthContext.Provider
        value={{
          ...this.state,
          authenticated: this.state.user !== null,
          admin: this.state.admin,
          handleRegister: this.handleRegister,
          handleLogin: this.handleLogin,
          handleLogout: this.handleLogout,
          setUser: user => this.setState({ user }),
          setAdmin: admin => this.setState({ admin })
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
    );
  }
}
