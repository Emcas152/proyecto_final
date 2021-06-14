import React, {useEffect, useState} from 'react'
import {Container, fade, InputBase, Link, makeStyles} from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Pokemon from "./Pokemon";
import pokebola from "./../images/pokebola.png"
import SearchIcon from '@material-ui/icons/Search';
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
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '42%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        left: '60%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        right: '9%',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function PokemonPage(props) {
    const [ Error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ Pokemons, setPokemons ] = useState([])
    const [ PokemonID, setPokemonID ] = useState('')
    const [ ListPokemon, setListPokemon ] = useState('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=12')
    const [ Resp, setResp ] = useState('')
    useEffect(() => {
        setLoading(true)
        async function fetchPokemons(){
            try{
                const Pokemon = await fetch(`${ListPokemon}`)
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
                    <Grid item xs={12} >
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <Link href={`DetallePokemon/${PokemonID}`}><Button variant="contained" color="primary"><SearchIcon /></Button></Link>
                            </div>
                            <InputBase
                                placeholder="Buscar…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                    name="Pokemon"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={event => setPokemonID(event.target.value)}
                            />
                        </div>
                    </Grid>
                </Grid>
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
                        <Button onClick={()=>{setListPokemon(Resp.previous)}} variant="contained" color="primary">Anterior</Button>
                    </Grid>
                    <Grid item xs={6} >
                        <Button onClick={()=>{setListPokemon(Resp.next)}} variant="contained" color="primary">Siguiente</Button>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    </Container>
        ;
}