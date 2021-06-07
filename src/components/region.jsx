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

export default function Region(props) {
    const [ Error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ regionID, setRegionID ] = useState([])

    useEffect(() => {

        const fetchRegion = async () => {
            try {
                const result = await fetch(props.url)
                const json = await result.json()
                setRegionID(json.results);
                setLoading(false);
                setError(false)
                console.log(json)
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