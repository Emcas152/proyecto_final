import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Grid from "@material-ui/core/Grid";
import pokebola from "../images/pokebola.png";
import {Link, Paper} from "@material-ui/core";


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
                setPokemonID(json.name);
                setPokemonImg(json.sprites.other["official-artwork"].front_default);
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
        <Link href={`DetallePokemon/${PokemonID}`}>
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
                            {PokemonID}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="div">
                            <h4>Habilidades</h4>
                            <Grid container spacing={1}>
                                {PokemonAbb.map((Item,index)=> {return <Grid item xs={6} key={index}><Paper variant="outlined" key={index} square>{Item.ability.name}</Paper></Grid>})}
                            </Grid>
                            <h4>Tipo de Pokemon</h4>
                            <Grid container spacing={1}>
                                <Grid container item xs={12} spacing={1}>
                                {PokemonTyp.map((Item,index)=> {return <Grid item xs={6} key={index}>
                                <Paper variant="outlined" key={index} style={{background: pokemonTypesToColors[Item.type.name], color: pokemonColors[Item.type.name]} } square>{Item.type.name}</Paper>
                                    </Grid>})}
                                </Grid>
                            </Grid>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Link>
    </Grid></>
        )
}

