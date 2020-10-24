import React, { Component} from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { connect } from 'react-redux'
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles,
  MenuItem
} from '@material-ui/core';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
import { login } from './authActions'
import authReducer from './authReducer';
import { PureComponent } from 'react';

const actions = {
  login
}



const userTypes = [
  {
    value: 'hospital',
    label: 'Hospital',
  },
  {
    value: 'manufacturer',
    label: 'Manufacturer',
  },
];

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));




const LoginView = (props) => {
  const classes = useStyles();
  const navigate = useNavigate();
  return (
    <Page
          className={classes.root}
          title="Login"
        >
          <Box
            display="flex"
            flexDirection="column"
            height="100%"
            justifyContent="center"
          >
            <Container maxWidth="sm">
              <Formik
                initialValues={{
                  email: 'demo@devias.io',
                  password: 'Password123',
                  user: "",
                }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                  password: Yup.string().max(255).required('Password is required'),
                  user: Yup.string().required("User type is required")
                })}
                onSubmit={(values) => {
                  const user = values.user;
                  console.log(props);
                  props.login(values);
                  navigate('/app/dashboard', { replace: false });
                }}
              >
                {({
                  errors,
                  handleBlur,
                  handleChange,
                  handleSubmit,
                  isSubmitting,
                  touched,
                  values
                }) => (
                  <form onSubmit={handleSubmit}>
                    <Box mb={3}>
                      <Typography
                        color="textPrimary"
                        variant="h2"
                      >
                        Sign in
                      </Typography>
                      <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="body2"
                      >
                        Sign in on the internal platform
                      </Typography>
                    </Box>
                    <Grid
                      container
                      spacing={3}
                    >
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <Button
                          color="primary"
                          fullWidth
                          startIcon={<FacebookIcon />}
                          onClick={handleSubmit}
                          size="large"
                          variant="contained"
                        >
                          Login with Facebook
                        </Button>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        md={6}
                      >
                        <Button
                          fullWidth
                          startIcon={<GoogleIcon />}
                          onClick={handleSubmit}
                          size="large"
                          variant="contained"
                        >
                          Login with Google
                        </Button>
                      </Grid>
                    </Grid>
                    <Box
                      mt={3}
                      mb={1}
                    >
                      <Typography
                        align="center"
                        color="textSecondary"
                        variant="body1"
                      >
                        or login with email address
                      </Typography>
                      </Box>
                      <TextField
                      error={Boolean(touched.user && errors.user)}
                      helperText={touched.user && errors.user}
                      fullWidth
                      id="outlined-select-currency"
                      select
                      label="User"
                      value={values.user}
                      onChange={handleChange}
                      variant="outlined"
                      name="user"
                    >
                      {userTypes.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>  
                    <TextField
                      error={Boolean(touched.email && errors.email)}
                      fullWidth
                      helperText={touched.email && errors.email}
                      label="Email Address"
                      margin="normal"
                      name="email"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="email"
                      value={values.email}
                      variant="outlined"
                    />
                    <TextField
                      error={Boolean(touched.password && errors.password)}
                      fullWidth
                      helperText={touched.password && errors.password}
                      label="Password"
                      margin="normal"
                      name="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      type="password"
                      value={values.password}
                      variant="outlined"
                    />
                    <Box my={2}>
                      <Button
                        color="primary"
                        disabled={isSubmitting}
                        fullWidth
                        size="large"
                        type="submit"
                        variant="contained"
                      >
                        Sign in now
                      </Button>
                    </Box>
                    <Typography
                      color="textSecondary"
                      variant="body1"
                    >
                      Don&apos;t have an account?
                      {' '}
                      <Link
                        component={RouterLink}
                        to="/register"
                        variant="h6"
                      >
                        Sign up
                      </Link>
                    </Typography>
                  </form>
                )}
              </Formik>
            </Container>
          </Box>
        </Page>
  )
}

// class LoginView extends PureComponent {


  
//   render() {
//     const classes = useStyles();
//     return (
//       <div>
//         {Login()}
//       </div>
//     )
//   }
// }





export default connect(null,actions)(LoginView);
