import React, { useState } from "react";
import { api, handleError } from "helpers/api";
import User from "models/User";
import {useNavigate} from "react-router-dom";
import { Button } from "components/ui/Button";
import "styles/views/Register.scss";
import BaseContainer from "components/ui/BaseContainer";
import PropTypes from "prop-types";

/*
It is possible to add multiple components inside a single file,
however be sure not to clutter your files with an endless amount!
As a rule of thumb, use one file per component and only add small,
specific components that belong to the main one in the same file.
 */
const FormField = (props) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className="register field">
      <label className="register label">{props.label}</label>
      <input
        className="register input"
        placeholder="enter here.."
        type={props.type}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
      />
    </div>
  );
};

FormField.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.string,
};

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string>(null);
  const [name, setName] = useState<string>(null);
  const[password, setPassword] = useState<string>(null);

  const doRegister = async () => {
    try {
      const requestBody = JSON.stringify({ username, name, password });
      const response = await api.post("/users", requestBody);

      // Get the returned user and update a new object.
      const user = new User(response.data);

      // Store the token into the local storage.
      localStorage.setItem("token", user.token);

      // Login successfully worked --> navigate to the route /game in the GameRouter
      navigate("/overview");
    } catch (error) {
      // Handle different types of errors
      if (error.response && error.response.status === 400) {
        // Bad request (username already taken)
        alert("Username is already taken. Please choose a different one.");
      } else {
        // Other errors
        alert(`Something went wrong during the register: \n${handleError(error)}`);
      }
    }
  };

  return (
    <BaseContainer>
      <div className="register container">
        <div className="register form">
          <FormField
            label="Username"
            value={username}
            onChange={(un: string) => setUsername(un)}
          />
          <FormField
            label="Name"
            value={name}
            onChange={(n) => setName(n)}
          />
          <FormField
            label="Password"
            type="password"
            value={password}
            onChange={(pw: string) => setPassword(pw)}
          />
          <div className="register button-container">
            <Button
              disabled={!username || !name || !password}
              width="100%"
              onClick={() => doRegister()}
            >
                            Register
            </Button>
          </div>

          <div className="register button-container">
            <Button
              width="100%"
              onClick={() => navigate("/login")}
            >
                            Go back to Login
            </Button>
          </div>

        </div>
      </div>
    </BaseContainer>
  );
};

/**
 * You can get access to the history object's properties via the useLocation, useNavigate, useParams, ... hooks.
 */
export default Register;
