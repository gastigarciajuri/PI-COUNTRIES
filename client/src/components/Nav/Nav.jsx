import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getByName } from "../../actions/action.js";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  form: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: theme.spacing(2),
  },
  input: {
    marginRight: theme.spacing(2),
  },
  btn: {
    textTransform: "none",
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.common.white,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
}));

export default function Nav() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    setName(e.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();
    dispatch(getByName(name));
    setName("");
  };

  return (
    <form onSubmit={handleClick} className={classes.form}>
      <TextField
        className={classes.input}
        type="text"
        placeholder="BUSCAR PAIS..."
        value={name}
        onChange={handleInputChange}
      />
      <Button className={classes.btn} type="submit">
        BUSCAR
      </Button>
    </form>
  );
}
