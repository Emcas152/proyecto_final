import React, {useEffect, useState} from 'react'
import {Container, fade, InputBase, makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {useParams} from "react-router-dom";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";
import pokebola from "../images/pokebola.png";
import { Bar } from 'react-chartjs-2';
import Button from "@material-ui/core/Button";
import SearchIcon from "@material-ui/icons/Search";
import Evolucion from "./evoultion";
import Evoluciones from "./Evoluciones";

export default function DetallePokemon(props) {
    const { name } = useParams()
    const  [Name, SetName ] = useState(name);
    const [ Error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ PokemonName, setPokemonName ] = useState([])
    const [ PokemonID, setPokemonID ] = useState([])
    const [ PokemonImg, setPokemonImg ] = useState([])
    const [ PokemonAbb, setPokemonAbb ] = useState([])
    const [ PokemonTyp, setPokemonTyp ] = useState([])
    const [ PokemonStats, setPokemonStats ] = useState([])
    const [ PokemonSearch, setPokemonSearch ] = useState([])
    const pokemonTypesToColors = {
        'bug': 'linear-gradient(135deg, rgba(217,255,0,1) 0%, rgba(113,133,0,1) 70%)',
        'dragon': 'linear-gradient(135deg, rgba(186,102,255,1) 0%, rgba(255,255,255,1) 70%)',
        'ice': 'linear-gradient(135deg, rgba(134,252,255,1) 0%, rgba(255,255,255,1) 70%)',
        'fighting': 'linear-gradient(135deg, rgba(242,201,198,1) 0%, rgba(255,255,255,1) 70%)',
        'fire': 'linear-gradient(135deg, rgba(255,39,39,1) 0%, rgba(64,0,0,1) 70%)',
        'flying': 'linear-gradient(135deg, rgba(226,204,252,1) 0%, rgba(255,255,255,1) 70%)',
        'grass': 'linear-gradient(135deg, rgba(79,247,79,1) 0%, rgba(255,255,255,1) 70%)',
        'ghost': 'linear-gradient(135deg, rgba(86,0,172,1) 0%, rgba(0,0,0,1) 70%)',
        'ground': 'linear-gradient(135deg, rgba(255,200,91,1) 0%, rgba(0,0,0,1) 70%)',
        'electric': 'linear-gradient(135deg, rgba(255,255,16,1) 0%, rgba(0,0,0,1) 70%)',
        'normal': 'linear-gradient(135deg, rgba(206,205,196,1) 0%, rgba(0,0,0,1) 70%)',
        'poison': 'linear-gradient(135deg, rgba(230,181,242,1) 0%, rgba(0,0,0,1) 70%)',
        'psychic': 'linear-gradient(135deg, rgba(247,175,216,1) 0%, rgba(0,0,0,1) 70%)',
        'rock': 'linear-gradient(135deg, rgba(203,204,175,1) 0%, rgba(0,0,0,1) 70%)',
        'water': 'linear-gradient(135deg, rgba(113,176,255,1) 0%, rgba(0,57,128,1) 70%)'
    };
    const pokemonColors = {
        'bug': '#000',
        'dragon': '#fff',
        'ice': '#000',
        'fighting': '#000',
        'fire': '#fff',
        'flying': '#000',
        'grass': '#000',
        'ghost': '#fff',
        'ground': '#fff',
        'electric': '#fff',
        'normal': '#fff',
        'poison': '#fff',
        'psychic': '#fff',
        'rock': '#fff',
        'water': '#000'
    };
    const useStyles = makeStyles((theme) => ({
        root: {
            flexGrow: 1,
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
        card: {
            maxWidth: '100%'
        },
        media: {
            height: '100%'
        },
        fiCardContent: {
            color: "#ffffff",
            backgroundColor: "rgba(0,0,0,.24)"
        },
        fiCardContentTextSecondary: {
            color: "rgba(255,255,255,0.78)"
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
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(3),
                width: 'auto',
            },
        },
        searchIcon: {
            padding: theme.spacing(0, 2),
            height: '100%',
            position: 'absolute',
            left: '50%',
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

    const classes =useStyles();
    useEffect(() => {
        setLoading(true);
        const fetchDetallePokemon = async () => {
            try {
                const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${Name}`)
                const json = await result.json()
                setPokemonName(json.name);
                setPokemonID(json.id);
                setPokemonImg(json.sprites.other["official-artwork"].front_default);
                setPokemonAbb(json.abilities);
                setPokemonTyp(json.types)
                setPokemonStats(json.stats)
                setLoading(false);
                setError(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
                setError(true)
            }
        }
        fetchDetallePokemon()
    },[Name])

    const newData = PokemonStats.map((item)=> item.base_stat);
    const newLabel = PokemonStats.map((item)=> item.stat.name);

    const data = {
        datasets: [
            {
                label: 'Estadistícas de pokemon',
                data: [...newData],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
        labels: [...newLabel],
    };
    const options = {
        scale: {
            ticks: { beginAtZero: true },
        },
    };
    return loading ? (<img src={pokebola} alt="Logo" className={'App-Poke'}/>) : Error ? (<h1>Ocurrio un error</h1>) :
        (<Container >
        <h1>Pokemon</h1>
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid container item xs={12} spacing={3}>
                    <Grid item xs={12} >
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <Button variant="contained" color="primary" onClick={()=>{SetName(PokemonSearch)}}><SearchIcon /></Button>
                            </div>
                            <InputBase
                                placeholder="Buscar…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                name="Pokemon"
                                inputProps={{ 'aria-label': 'search' }}
                                onChange={event => setPokemonSearch(event.target.value)}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} >
                        <Paper className={classes.paper}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="100%"
                                        image={PokemonImg}
                                        title={PokemonID}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {PokemonName}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="div">
                                            <h4>Habilidades</h4>
                                            <Grid container spacing={1}>
                                                {PokemonAbb.map((Item,index)=> {return <Grid item xs={6} ><Paper variant="outlined" key={index} square>{Item.ability.name}</Paper></Grid>})}
                                            </Grid>
                                            <h4>Tipo de Pokemon</h4>
                                            <Grid container spacing={1}>
                                                <Grid container item xs={12} spacing={1}>
                                                    {PokemonTyp.map((Item,index)=> {return <Grid item xs={6} >
                                                        <Paper variant="outlined" key={index} style={{background: pokemonTypesToColors[Item.type.name], color: pokemonColors[Item.type.name]} } square>{Item.type.name}</Paper>
                                                    </Grid>})}
                                                </Grid>
                                            </Grid>
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions style={{width:320}}>
                                    <Grid container spacing={1}>
                                        <Grid container item xs={12} spacing={3}>
                                            <Grid item xs={12} >
                                                <Bar data={data} options={options} style={{background: '#fff'}}/>
                                            </Grid>
                                            <Grid item xs={12} >
                                                <Evoluciones id={(PokemonID/2.5)} />
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </CardActions>
                            </Card>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    </Container>)

}