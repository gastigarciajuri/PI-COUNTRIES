import React, { useEffect } from "react";
import { useParams } from "react-router";
import { getCountry } from "../../actions/action.js";
import { useDispatch, useSelector } from "react-redux";
import CardAct from "../CardAct/CardAct";
import { Link } from "react-router-dom";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import styles from "./Detail.module.css";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(4),
      },
      flagImage: {
        width: "400px",
        height: "250px",
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
      backButton: {
        marginBottom: theme.spacing(2),
      },
      listItemText: {
        fontWeight: "bold",
      },
      title: {
        display: 'flex',
        justifyContent: 'flex-start',
        color: 'white',
      },
      dataContainer: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
      },
}));

const Detail = () => {
  const { countryId } = useParams();
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getCountry(countryId));
  }, [dispatch, countryId]);

  const country = useSelector((state) => state.country);

  return (
    <div className={classes.root}>
      <Button
        component={Link}
        to="/home/"
        variant="contained"
        color="primary"
        startIcon={<ArrowBackIcon />}
        className={classes.backButton}
      >
        Volver
      </Button>
      <div className={styles.detailContainer}>
        <Typography variant="h4" gutterBottom className={classes.title}>
          {country.name}
        </Typography>
        <div className={styles.imageContainer}>
          <img
            src={country.imgflag}
            alt={country.name}
            className={classes.flagImage}
          />
        </div>
        <div className={styles.textContainer}>
          <List>
            <ListItem>
              <ListItemText
                primary="Capital"
                secondary={country.capital}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Subregión"
                secondary={country.subregion}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Área"
                secondary={`${country.area} km2`}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Continente"
                secondary={country.continent}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Población"
                secondary={`${country.population} habitantes`}
                classes={{ primary: classes.listItemText }}
              />
            </ListItem>
          </List>
        </div>
      </div>
      <div>
        <Typography variant="h5" gutterBottom>
          Actividades
        </Typography>
        <div className={styles.activitiesContainer}>
          {country.activities &&
            country.activities.map((activity) => (
              <CardAct
                key={activity.id}
                name={activity.name}
                dificult={activity.dificult}
                lasting={activity.lasting}
                season={activity.season}
              />
            ))}
        </div>
      </div>
    </div>
  );
  
};

export default Detail;
