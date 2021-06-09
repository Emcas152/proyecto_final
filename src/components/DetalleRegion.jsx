import React, {useEffect, useState} from 'react'
import {Container, makeStyles} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Region from "./region";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

export default function DetalleRegion(props) {
    const [ Error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ CiudadID, setCiudadID ] = useState([])
    console.log(props.url)
    useEffect(() => {
        const fetchDetalleRegion = async () => {
            try {
                const result = await fetch(props.url)
                const json = await result.json()
                console.log(json)
                setCiudadID(json.name);
                setLoading(false);
                setError(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
                setError(true)
            }
        }
        fetchDetalleRegion()
    })
    const classes = useStyles();
    return loading ? (<h1>Cargando datos..</h1>) : Error ? (<h1>Ocurrio un error</h1>) :
        (<Container >
            <h1>Ciudades</h1>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid container item xs={12} spacing={3}>
                        {loading ? (<h1>Cargando datos..</h1>) : Error ? (<h1>Ocurrio un error</h1>) :
                            (CiudadID.map((Item, index) => {
                                return (
                                    <Region url={Item.url} key={index}/>
                                )
                            }))}
                    </Grid>
                </Grid>
            </div>
        </Container>)
}