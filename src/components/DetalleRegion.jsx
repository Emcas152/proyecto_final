import '../App.css';
import React, {useEffect, useState} from 'react'
import {Container, makeStyles} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Ciudad from "./ciudad";
import {useParams} from "react-router-dom";
import pokebola from "../images/pokebola.png";
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
    bottom: {
        color: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
}));

export default function DetalleRegion(props) {
    const { id } = useParams();

    const [ Error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ CiudadID, setCiudadID ] = useState([])

    useEffect(() => {
        const fetchDetalleRegion = async () => {
            try {
                const result = await fetch(`https://pokeapi.co/api/v2/region/${id}`)
                const json = await result.json()
                setCiudadID(json.locations);
                setLoading(false);
                setError(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
                setError(true)
            }
        }
        const timer = setTimeout(() => fetchDetalleRegion(), 3000);
        /*clearTimeout(timer);*/
    },[])
    const classes = useStyles();
    return loading ? (<img src={pokebola} alt="Logo" className={'App-Poke'}/>) : Error ? (<h1>Ocurrio un error</h1>) :
        (<Container >
            <h1>Ciudades</h1>
            <div className={classes.root}>
                <Grid container spacing={1}>
                    <Grid container item xs={12} spacing={3}>
                        {loading ? (<img src={pokebola} alt="Logo" className={'App-Poke'}/>) : Error ? (<h1>Ocurrio un error</h1>) :
                            (CiudadID.map((Item, index) => {
                                return (
                                    <Ciudad url={Item.url} key={index}/>
                                )
                            }))}
                    </Grid>
                </Grid>
            </div>
        </Container>)
}