import React, {useEffect, useState} from 'react'
import {Container, makeStyles} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Pokemon from "./Pokemon";
import pokebola from "./../images/pokebola.png"
import Button from "@material-ui/core/Button";

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

export default function PokemonPage(props) {
    const [ Error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ Pokemons, setPokemons ] = useState([])
    const [ ListPokemon, setListPokemon ] = useState('offset=0&limit=12')
    const [ Resp, setResp ] = useState('offset=0&limit=12')
    useEffect(() => {
        async function fetchPokemons(){
            try{
                const Pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/?${ListPokemon}`)
                const response = await Pokemon.json();
                setResp(response)
                setPokemons(response.results)
                setLoading(false)
                setError(false)
            } catch (e) {
                setLoading(false)
                setError(true)
            }
        }
        setTimeout(() => fetchPokemons(), 3000);
    }, [ListPokemon])

    const classes = useStyles();
    return <Container >
        <h1>Pokemon</h1>
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                    {loading ? (<img src={pokebola} alt="Logo" className={'App-Poke'}/>) : Error ? (<h1>Ocurrio un error</h1>) :
                        (Pokemons.map((Item, index) => {
                            return (
                                <Pokemon url={Item.url} key={index}/>
                            )
                        }))}
                </Grid>
                <Grid container item xs={12} spacing={3}>
                    <Grid item xs={6} >
                        <Button>Anterior</Button>
                    </Grid>
                    <Grid item xs={6} >
                        <Button>Siguiente</Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    </Container>
        ;
}