import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import {
    Paper,
    Typography,
    Grid,
  } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    background: '#F5F5F5',
    borderRadius: '8px',
  },
  title: {
    marginBottom: theme.spacing(1),
    fontWeight: 'bold',
  },
  item: {
    marginBottom: theme.spacing(1),
  },
}));

const CardAct = (activity) => {
  const classes = useStyles();

  return (
    <Grid container direction="row">
      <Grid item xs={12}>
        <Paper className={classes.card}>
          {activity && (
            <div>
              <Typography variant="subtitle1" className={classes.item}>
                Actividad: {activity.name}
              </Typography>
              <Typography variant="body1" className={classes.item}>
                Dificultad: {activity.dificult}
              </Typography>
              <Typography variant="body1" className={classes.item}>
                Duración: {activity.lasting}
              </Typography>
              <Typography variant="body1" className={classes.item}>
                Temporada: {activity.season}
              </Typography>
            </div>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default CardAct;
