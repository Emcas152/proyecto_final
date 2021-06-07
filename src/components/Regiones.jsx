import React, {useEffect, useState} from 'react'
import {Container, makeStyles} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

export default function RegionesPage() {
    const [ error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ regiones, setRegiones ] = useState(null)
    const [ regionID, setregionID ] = useState('')

    useEffect(() => {
            async function fetchRegiones(){
            try{
                const regiones = await fetch(`https://pokeapi.co/api/v2/location/${regionID}`)
                const response = await regiones.json();
                console.log(response)
                setLoading(false)
                setError(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
                setError(true)
            }
            }
        fetchRegiones()
        }, [regionID])

    const classes = useStyles();

    function FormRow() {
        return (
            <>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
                <Grid item xs={4}>
                    <Paper className={classes.paper}>item</Paper>
                </Grid>
            </>
        );
    }

    return (
        <Container >
            <h1>Regiones</h1>
            <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <FormRow />
                </Grid>
            </Grid>
        </div>
        </Container>
    );
}