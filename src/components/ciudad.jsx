import React, {useEffect, useState} from 'react'
import {makeStyles} from "@material-ui/core";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import pokebola from "../images/pokebola.png";
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
}));

export default function Ciudad(props) {
    const [ Error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ CiudadID, setCiudadID ] = useState([])
    /*const [ CiudadUrl, setCiudadUrl ] = useState([])*/

    useEffect(() => {
        const fetchCiudad = async () => {
            try {
                const result = await fetch(props.url)
                const json = await result.json()
                setCiudadID(json.name);
                /*setCiudadUrl(json.id);*/
                setLoading(false);
                setError(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
                setError(true)
            }
        }
        fetchCiudad()
    },[props.url])
    const classes = useStyles();
    return loading ? (<img src={pokebola} alt="Logo" className={'App-Poke'}/>) : Error ? (<h1>Ocurrio un error</h1>) :
        ( <><Grid item xs={4} >
                <Paper className={classes.paper}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {CiudadID}
                            </Typography>
                        </CardContent>
                        <CardActions>
                        </CardActions>
                    </Card>
                </Paper>
            </Grid>
            </>
        )
}