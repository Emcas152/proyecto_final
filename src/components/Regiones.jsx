import React, {useEffect, useState} from 'react'
import {Container, makeStyles} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Region from "./region";
import pokebola from "./../images/pokebola.png"

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

export default function RegionesPage(props) {
    const [ Error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ Regiones, setRegiones ] = useState([])

    useEffect(() => {
            async function fetchRegiones(){
            try{
                const regiones = await fetch(`https://pokeapi.co/api/v2/region/`)
                const response = await regiones.json();
                setRegiones(response.results)
                setLoading(false)
                setError(false)
            } catch (e) {
                setLoading(false)
                setError(true)
            }
            }
        const timer = setTimeout(() => fetchRegiones(), 3000);
        }, [])

    const classes = useStyles();

    return <Container >
            <h1>Regiones</h1>
            <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                    {loading ? (<img src={pokebola} alt="Logo" className={'App-Poke'}/>) : Error ? (<h1>Ocurrio un error</h1>) :
                    (Regiones.map((Item, index) => {
                        return (
                            <Region url={Item.url} key={index}/>
                        )
                        }))}
                </Grid>
            </Grid>
        </div>

        </Container>
        ;
}