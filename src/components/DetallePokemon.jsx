import React, {useEffect, useState} from 'react'
import {Container, makeStyles} from "@material-ui/core";
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

export default function DetallePokemon(props) {
    const { name } = useParams();
    const [ Error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ PokemonID, setPokemonID ] = useState([])
    const [ PokemonImg, setPokemonImg ] = useState([])
    const [ PokemonAbb, setPokemonAbb ] = useState([])
    const [ PokemonTyp, setPokemonTyp ] = useState([])
    const [ PokemonStats, setPokemonStats ] = useState([])
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
            height: 300
        },
        fiCardContent: {
            color: "#ffffff",
            backgroundColor: "rgba(0,0,0,.24)"
        },
        fiCardContentTextSecondary: {
            color: "rgba(255,255,255,0.78)"
        }
    }));

    const classes =useStyles();
    useEffect(() => {

        const fetchDetallePokemon = async () => {
            try {
                const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
                const json = await result.json()
                console.log(json.stats)
                setPokemonID(json.name);
                setPokemonImg(json.sprites.front_default);
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
    },[name])

    const newData = PokemonStats.map((item)=> item.base_stat);
    const newLabel = PokemonStats.map((item)=> item.stat.name);

    const data = {
        datasets: [
            {
                label: '# of Votes',
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
                        <Paper className={classes.paper}>
                            <Card className={classes.card}>
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        image={PokemonImg}
                                        title={PokemonID}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component="h2">
                                            {PokemonID}
                                        </Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
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
                                    <Bar data={data} options={options} />
                                </CardActions>
                            </Card>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </div>
    </Container>)

}