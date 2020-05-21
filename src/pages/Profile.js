import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles } from "@material-ui/core/styles";
import Preloader from "../components/Preloader";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  card: {
    padding: "20px 30px",
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
}));

const Profile = (props) => {
  const [user, setUser] = useState(null);
  const classes = useStyles();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.github.com/users/${props.match.params.login}`
      );
      const data = await response.json();
      setUser(data);
    };
    fetchData();
  }, [props.match.params.login]);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  if (user === null) {
    return <Preloader />;
  }

  return (
    <div>
      <Card className={classes.card}>
        <div className="d-flex link">
          <Avatar className={classes.avatar}>
            <img width="80" height="80" src={user.avatar_url} alt="" />
          </Avatar>
          <div>
            <h2>{user.name}</h2>
            <p>
              {user.company}, {user.location}
            </p>
            <p className="subtitle">from {formatDate(user.created_at)}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Profile;
