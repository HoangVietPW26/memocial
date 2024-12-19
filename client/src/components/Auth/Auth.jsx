import React, { useState } from "react";
import {
  Avatar,
  Button,
  Typography,
  Container,
  Paper,
  Grid,
} from "@material-ui/core";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import InputField from "./InputField.jsx";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import useStyles from "./styles.js";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setInSignUp] = useState(false);
  const handleSubmit = () => {};
  const handleChange = () => {};
  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };
  const switchMode = () => {
    setInSignUp((prevIsSignUp) => !prevIsSignUp);
    handleShowPassword(false);
  };

  const googleSuccess = async (res) => {
    console.log(res);
    // const clientId = res?.clientId;
    const cred = jwtDecode(res?.credential);
    const token = res?.credential;
    try {
      dispatch({ type: "AUTH", data: { cred, token } });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = (error) => {
    console.log(error);
  };
  return (
    <>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">
            {isSignUp ? "Sign Up" : "Sign In"}
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit} xs={6}>
            <Grid container spacing={2}>
              {isSignUp && (
                <>
                  <InputField
                    name="firstName"
                    label="First Name"
                    handleChange={handleChange}
                    half
                  ></InputField>
                  <InputField
                    name="lastName"
                    label="Last Name"
                    handleChange={handleChange}
                    half
                  ></InputField>
                </>
              )}
              <InputField
                name="email"
                label="Email Address"
                handleChange={handleChange}
                type="email"
              />
              <InputField
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? "text" : "password"}
                handleShowPassword={handleShowPassword}
              />
              {isSignUp && (
                <InputField
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignUp ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin onSuccess={googleSuccess} onFailure={googleFailure} />

            <Grid container justifyContent="center">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignUp
                    ? "Already have an account? Sign In"
                    : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </>
  );
};

export default Auth;
