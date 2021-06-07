import React, {useEffect, useState} from 'react'
import { makeStyles} from "@material-ui/core";
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

export default function Region() {
    const [ Error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ regionID, setregionID ] = useState('')

    useEffect(() => {
        async function fetchRegion(){
            try{
                const regiones = await fetch(this.props.url)
                const response = await regiones.json();
                setregionID(response.results)
                console.log(response)
                setLoading(false)
                setError(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
                setError(true)
            }
        }
        fetchRegion()
    }, [])

    const classes = useStyles();
    return loading ? (<h1>Cargando datos..</h1>) : Error ? (<h1>Ocurrio un error</h1>) :
        ( regionID.map((Item, index) => {
            return <Grid item xs={4} key={index}>
                <Paper className={classes.paper}>{Item.name}</Paper>
            </Grid>}
        ))
}