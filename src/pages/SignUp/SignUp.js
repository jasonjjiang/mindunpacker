import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import * as yup from 'yup';
import Box from '@mui/material/Box';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import NavBar from '../../components/NavBar/NavBar';
import { ErrorMessage, useFormik } from 'formik';
import AuthContext from '../../contexts/AuthCtx';
import { useNavigate } from 'react-router-dom';
import { api } from '../../api/api';
import { CircularProgress } from '@mui/material';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://themindunpacker.com/">
        The Mind Unpacker
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const defaultTheme = createTheme();

export default function SignUp() {
  const navigate = useNavigate();
  const AuthCtx = React.useContext(AuthContext);
  const [loading, setIsLoading] = React.useState(false);

  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(5, 'Password should be of minimum 5 characters length')
      .required('Password is required'),
    fName: yup.string("Enter First Name").required("First Name Is Required"),
    lName: yup.string("Enter Last Name").required("Last Name Is Required")
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      fName: '',
      lName: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      setIsLoading(true);
      api
        .post("api/users/", {
          email: values.email,
          password: values.password,
          name: `${values.fName} ${values.lName}`
        })
        .then((res) => {
          const responseData = res.data;
          const token = responseData.token;
          const userData = responseData.user;
          AuthCtx.login(token, userData);
          setIsLoading(false);
          navigate("/");
        })
        .catch((err) => {
          formik.setFieldError("email", "Email Already Exists");
          setIsLoading(false);
        });
    },
  });
  return (
    <ThemeProvider theme={defaultTheme}>
      <NavBar coloured={true} />
      <Container component="main" maxWidth="xs" sx={{
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         flexDirection: 'column'
      }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            boxShadow: 2,
            padding: '20px',
            borderRadius: '5px',
            minWidth: '50vw'
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            {/* <LockOutlinedIcon /> */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fName"
                  required
                  fullWidth
                  id="fName"
                  label="First Name"
                  autoFocus
                  value={formik.values.fName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.fName && Boolean(formik.errors.fName)}
                  helperText={formik.touched.fName && formik.errors.fName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lName"
                  label="Last Name"
                  name="lName"
                  autoComplete="family-name"
                  value={formik.values.lName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.lName && Boolean(formik.errors.lName)}
                  helperText={formik.touched.lName && formik.errors.lName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.password && Boolean(formik.errors.password)}
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {loading && <CircularProgress sx={{ marginRight: '10px' }} color="secondary" />}
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}
