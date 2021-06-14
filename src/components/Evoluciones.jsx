import React, {useEffect, useState} from 'react'
import pokebola from "../images/pokebola.png";
import Evolucion from "./evoultion";

export default function Evoluciones(props) {
    const [ Error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ PokemonID, setPokemonID ] = useState([])
    useEffect(() => {
        setLoading(true);
        const fetchEvolucionesPokemon = async () => {
            try {
                const result = await fetch(`https://pokeapi.co/api/v2/evolution-chain/${Math.round(props.id)}`)
                const json = await result.json()
                setPokemonID(json.chain.evolves_to);
                setLoading(false);
                setError(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
                setError(true)
            }
        }
        fetchEvolucionesPokemon()
    },[props.id])

    return loading ? (<img src={pokebola} alt="Logo" className={'App-Poke'}/>) : Error ? (<h1>Ocurrio un error</h1>) :
        (PokemonID.map((Item,index)=>{
            console.log(Item.species.name)
            return <Evolucion id={Item.species.name}/>
        }) )
}


