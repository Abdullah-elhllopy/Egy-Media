import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useTheme } from '@emotion/react';
import { Link } from 'react-router-dom';
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import API from 'servers/API';
import { setLogin } from 'state';
import { toast } from 'react-toastify';
const LoginSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
});
const initialValuesLogin = {
    email: "",
    password: "",
};

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { palette } = useTheme();
    const inputLabelProps = {
        style: { color: palette.primary.primaryLight }
    };
    const handleFormSubmit = async (values, onSubmitProps) => {
        await API.post('auth/login', values).then((response) => {
            if (response) {
                let { data } = response;
                let { user } = data
               
                dispatch(
                    setLogin({
                        user: user,
                        token: data.token,
                    })

                );
                setTimeout(() => {
                    window.location.reload();
                    window.location.reload();
                    onSubmitProps.resetForm();
                }, 2000)

            }
        }).catch(error => {
            toast.error(error.message)
        })

    };
    return (
        <Box component={'div'} sx={{ height: '100', minHeight: '100%' }}>

            <Container component="main" maxWidth="xs" >
                <Box
                    sx={{
                        paddingTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign In
                    </Typography>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValuesLogin}
                        validationSchema={LoginSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                                <Grid container spacing={2}>

                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="email"
                                            label="Email Address"
                                            autoComplete="email"
                                            InputLabelProps={inputLabelProps}
                                            sx={{ color: palette.primary.main }}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.email}
                                            name="email"
                                            error={Boolean(touched.email) && Boolean(errors.email)}
                                            helperText={touched.email && errors.email}
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            required
                                            fullWidth
                                            label="Password"
                                            type="password"
                                            id="password"
                                            autoComplete="new-password"
                                            InputLabelProps={inputLabelProps}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                            value={values.password}
                                            name="password"
                                            error={Boolean(touched.password) && Boolean(errors.password)}
                                            helperText={touched.password && errors.password}
                                            sx={{ color: palette.primary.main }}
                                        />
                                    </Grid>

                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}

                                >
                                    Login
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link to='/auth/register' variant="body2">
                                            You don't have an account? Sign Up
                                        </Link>
                                    </Grid>
                                </Grid>
                            </Box>
                        )}
                    </Formik>
                </Box>

            </Container>
        </Box>
    );
}