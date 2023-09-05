import React, { useEffect, useState } from 'react'
import NavBar from '../../components/NavBar/NavBar'
import * as yup from "yup";
import { Box, Button, CircularProgress, Grid, TextField, Typography } from '@mui/material'
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import { api } from '../../api/api';

function EditJournel() {
    const [loading, setIsLoading] = React.useState(false);
    const [prevJournal, setPrevJournal] = useState()
    const navigate = useNavigate();
    const { id } = useParams();
    const validationSchema = yup.object({
        entry: yup
            .string('Enter Entry')
            .required('Entry Is Required'),
        title: yup.string('Enter Title')
    });

    useEffect(() => {
        api.get(`/api/journal/${id}`).then(
            (res) => {
                setPrevJournal(res.data.data)
            }
        ).catch
            (err => navigate("/journal")
            )
    }, [id, navigate])
    const initValues = prevJournal ? { title: prevJournal.title, entry: prevJournal.entry } : {
        title: "", entry: ""
    }
    console.log(initValues)
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: initValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            setIsLoading(true);
            api
                .put(`api/journal/update/${id}`, {
                    title: values.title,
                    entry: values.entry,
                })
                .then((res) => {
                    setIsLoading(false);
                    navigate("/journal")
                })
                .catch((err) => {
                    formik.setFieldError("title", "Something Went Wrong. Try Again Later");
                    setIsLoading(false);
                });
        },
    });
    return (
        <>
            <NavBar coloured={true} />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Edit Journal
                </Typography>
                <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                name="title"
                                fullWidth
                                id="title"
                                label="Title"
                                autoComplete='title'
                                autoFocus
                                value={formik.values.title}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.title && Boolean(formik.errors.title)}
                                helperText={formik.touched.title && formik.errors.title}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="entry"
                                label="Entry"
                                name="entry"
                                autoComplete="entry"
                                value={formik.values.entry}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.entry && Boolean(formik.errors.entry)}
                                helperText={formik.touched.entry && formik.errors.entry}
                                multiline
                                rows={10}
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
                        Edit
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link to="/journal" variant="body2">
                                Go Back
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    )
}

export default EditJournel