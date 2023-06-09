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
import Dropzone from "react-dropzone";
import { Link } from 'react-router-dom';
import { Formik } from "formik";
import * as yup from "yup";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import FlexBetween from 'components/FlexBetween';
import {APISUBMIT} from 'servers/API';
import { setLogin } from 'state';
const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
});
const initialValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};

export default function Register() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { palette } = useTheme();
    const inputLabelProps = {
        style: { color: palette.primary.primaryLight }
    };
    const handleFormSubmit = async (values, onSubmitProps) => {
        const formData = new FormData();
        for (let value in values) {
            formData.append(value, values[value]);
        }
        formData.append("picturePath", values.picture.name);

        const user = await APISUBMIT.post('auth/register', formData)
        if (user) {
            let {data} = user
            dispatch(
                setLogin({
                    user: data.user,
                    token: data.token,
                })
            );
            navigate("/home");
        }
        onSubmitProps.resetForm();

    };
  const alt = palette.background.alt;

    return (
        <Box component={'div'} sx={{ height: '100', minHeight: '100%'}} bgcolor={alt}>

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
                        Sign up
                    </Typography>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValuesRegister}
                        validationSchema={registerSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            setFieldValue,
                        }) => (
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="firstName"
                                            label="First Name"
                                            InputLabelProps={inputLabelProps}
                                            sx={{ color: palette.primary.main }}
                                            value={values.firstName}
                                            name="firstName"
                                            error={
                                                Boolean(touched.firstName) && Boolean(errors.firstName)
                                            }
                                            helperText={touched.firstName && errors.firstName}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="lastName"
                                            label="Last Name"
                                            InputLabelProps={inputLabelProps}
                                            sx={{ color: palette.primary.main }}
                                            value={values.lastName}
                                            name="lastName"
                                            error={Boolean(touched.lastName) && Boolean(errors.lastName)}
                                            helperText={touched.lastName && errors.lastName}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="Location"
                                            label="Location"
                                            InputLabelProps={inputLabelProps}
                                            sx={{ color: palette.primary.main }}
                                            value={values.location}
                                            name="location"
                                            error={Boolean(touched.location) && Boolean(errors.location)}
                                            helperText={touched.location && errors.location}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            required
                                            fullWidth
                                            id="Occupation"
                                            label="Occupation"
                                            InputLabelProps={inputLabelProps}
                                            sx={{ color: palette.primary.main }}
                                            value={values.occupation}
                                            name="occupation"
                                            error={Boolean(touched.occupation) && Boolean(errors.occupation)}
                                            helperText={touched.occupation && errors.occupation}
                                            onBlur={handleBlur}
                                            onChange={handleChange}
                                        />
                                    </Grid>
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
                                    <Grid item xs={12}>
                                        <Dropzone
                                            accept=".jpg,.jpeg,.png"
                                            multiple={false}
                                            onDrop={(acceptedFiles) =>
                                                setFieldValue("picture", acceptedFiles[0])
                                            }
                                            maxFiles={1}
                                        >
                                            {({ getRootProps, getInputProps }) => (
                                                <Box
                                                    {...getRootProps()}
                                                    border={`2px dashed ${Boolean(errors.picture)?palette.primary.error : palette.primary.main }`}
                                                    p="1rem"
                                                    sx={{ "&:hover": { cursor: "pointer" } }}
                                                >
                                                    <input {...getInputProps()} accept=".jpg,.jpeg,.png" />
                                                    {!values.picture ? (
                                                        <p>Add Picture Here</p>
                                                    ) : (
                                                        <FlexBetween>
                                                            <Typography>{values.picture.name}</Typography>
                                                            <EditOutlinedIcon />
                                                        </FlexBetween>
                                                    )}

                                                </Box>
                                            )}
                                        </Dropzone>
                                    </Grid>
                                   
                                </Grid>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}

                                >
                                    Sign Up
                                </Button>
                                <Grid container justifyContent="flex-end">
                                    <Grid item>
                                        <Link to='/auth/login' variant="body2">
                                            Already have an account? Sign in
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