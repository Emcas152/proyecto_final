import React, {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import CardMedia from '@material-ui/core/CardMedia';
import {Card, makeStyles, Popover} from "@material-ui/core";
import pokebola from "../images/pokebola.png";

export default function Evolucion(props) {
    const classes = useStyles()
    const [ Error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ PokemonID, setPokemonID ] = useState([])
    const [ PokemonImg, setPokemonImg ] = useState([])
    useEffect(() => {
        setLoading(true);
        const fetchEvolucionPokemon = async () => {
            try {
                const result = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.id}`)
                const json = await result.json()
                setPokemonID(json.name);
                setPokemonImg(json.sprites.other["official-artwork"].front_default);
                setLoading(false);
                setError(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
                setError(true)
            }
        }
        fetchEvolucionPokemon()
    },[props.id])
    return loading ? (<img src={pokebola} alt="Logo" className={'App-Poke'}/>) : Error ? (<h1>Ocurrio un error</h1>) :
        (<Card className={classes.card}>
                <CardMedia
                    image={PokemonImg}
                    title={PokemonID}
                    className={classes.image}
                    component={Link}
                    to={`./${PokemonID}`}
                />
            <Popover
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'left',
                }}
            >
                {PokemonID}
            </Popover>
        </Card>


)
}



const useStyles = makeStyles((theme) => ({
    card: {
        display: "flex",
        marginBottom:20,

    },
    image:{
        minWidth: 100,
        minHeight: 100,
        borderRadius: '50%',
        objectFit: 'cover'

    },
    content:{
        objectFit: 'cover'
    },
}))
