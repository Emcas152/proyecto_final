import React, {useEffect, useState} from 'react'
import {Button,  Link, makeStyles} from "@material-ui/core";
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

export default function Region(props) {
    const [ Error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(true)
    const [ RegionID, setRegionID ] = useState([])
    const [ RegionUrl, setRegionUrl ] = useState([])

    useEffect(() => {
        const fetchRegion = async () => {
            try {
                const result = await fetch(props.url)
                const json = await result.json()
                setRegionID(json.name);
                setRegionUrl(json.id);
                setLoading(false);
                setError(false)
            } catch (e) {
                console.log(e)
                setLoading(false)
                setError(true)
            }
        }
        fetchRegion()
    },[props.url])
    const classes = useStyles();
    return loading ? (<img src={pokebola} alt="Logo" className={'App-Poke'}/>) : Error ? (<h1>Ocurrio un error</h1>) :
        ( <><Grid item xs={4} >
                <Paper className={classes.paper}>
                    <Card className={classes.root}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {RegionID}
                            </Typography>
                            <Typography variant="body2" component="p">
                                well meaning and kindly.
                                <br />
                                {'"a benevolent smile"'}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" >
                                <Link rel="stylesheet" href={`/DetalleRegion/${RegionUrl}`} className={'LinkDeco'} replace>Ver más</Link></Button>
                        </CardActions>
                    </Card>
                </Paper>

            </Grid>
            </>
        )
}