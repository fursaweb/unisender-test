import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  preloader: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  },
}));

const Preloader = () => {
  const classes = useStyles();

  return (
    <div className={classes.preloader}>
      <CircularProgress />
    </div>
  );
};

export default Preloader;
