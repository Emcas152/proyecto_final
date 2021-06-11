import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import pokebola from "../images/pokebola.png";
import {Paper} from "@material-ui/core";


const pokemonTypesToColors = {
    'bug': '#e0e5c3',
    'dragon': '#c8b1db',
    'ice': '#d4f8f9',
    'fighting': '#f2c9c6',
    'fire': '#f9dfb8',
    'flying': '#e2ccfc',
    'grass': '#b8f2b8',
    'ghost': '#bcb4c4',
    'ground': '#d8d1c3',
    'electric': '#ffffa5',
    'normal': '#cecdc4',
    'poison': '#e6b5f2',
    'psychic': '#f7afd8',
    'rock': '#cbccaf',
    'water': '#adcef7'
};
const useStyles = makeStyles({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    card: {
        maxWidth: 345
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
});

export default function Pokemon(props) {
    const classes = useStyles();
    const [ Error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ PokemonID, setPokemonID ] = useState([])
    const [ PokemonImg, setPokemonImg ] = useState([])
    const [ PokemonAbb, setPokemonAbb ] = useState([])
    const [ PokemonTyp, setPokemonTyp ] = useState([])

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const result = await fetch(props.url)
                const json = await result.json()
                console.log(json)
                setPokemonID(json.name);
                setPokemonImg(json.sprites.front_default);
                setPokemonAbb(json.abilities);
                setPokemonTyp(json.types)
                setLoading(false);
                setError(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
                setError(true)
            }
        }
        fetchPokemon()
    },[props.url])

    return loading ? (<img src={pokebola} alt="Logo" className={'App-Poke'}/>) : Error ? (<h1>Ocurrio un error</h1>) :
        (<><Grid item xs={4} >
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
                    {PokemonAbb.map((Item,index)=> {return <li key={index}>{Item.ability.name}</li>})}
                    <Grid container spacing={1}>
                        <Grid container item xs={12} spacing={1}>
                        {PokemonTyp.map((Item,index)=> {return <Grid item xs={6} >
                        <Paper variant="outlined" key={index} style={{backgroundColor: pokemonTypesToColors[Item.type.name]} } square>{Item.type.name}</Paper>
                            </Grid>})}
                        </Grid>
                    </Grid>
                </Typography>
            </CardContent>
        </CardActionArea>
        <CardActions>
            <Button size="small" color="primary">
                Share
            </Button>
            <Button size="small" color="primary">
                Learn More
            </Button>
        </CardActions>
    </Card>
    </Grid></>
        )
}

