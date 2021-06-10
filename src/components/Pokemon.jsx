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

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const result = await fetch(props.url)
                const json = await result.json()
                setPokemonID(json.name);
                setPokemonImg(json.sprites.front_default);
                setPokemonAbb(json.abilities);
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
                    {PokemonAbb.map((Item,index)=> {return (<li>{Item.ability.name}</li>)})}
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

