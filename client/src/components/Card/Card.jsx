import React from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  card: {
    borderRadius: theme.shape.borderRadius,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.3s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  continent: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    textTransform: "uppercase",
    color: "#888",
    fontSize: "0.8rem",
  },
  population: {
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
}));

function CountryCard({ imgflag, name, continent, population, id }) {
  const classes = useStyles();

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <RouterLink to={"/home/" + id} style={{ textDecoration: "none" }}>
        <Card className={classes.card}>
          <CardMedia
            component="img"
            src={imgflag}
            alt="not found"
            height="180"
          />
          <CardContent className={classes.cardContent}>
            <Typography variant="h9" component="h5" gutterBottom>
              {name}
            </Typography>
            <Typography variant="subtitle2" className={classes.continent}>
              Continente: <strong>{continent}</strong>
            </Typography>
            <Typography variant="subtitle2" className={classes.population}>
              Población: {population} habitantes
            </Typography>
          </CardContent>
        </Card>
      </RouterLink>
    </Grid>
  );
}

export default CountryCard;
