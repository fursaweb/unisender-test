import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@material-ui/core/Card";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Preloader from "../components/Preloader";
import { makeStyles } from "@material-ui/core/styles";

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

const Home = () => {
  const [users, setUsers] = useState(null);
  const [startId, setStartId] = useState(0);
  const [nextId, setNextId] = useState(0);
  const classes = useStyles();
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.github.com/users?per_page=5&since=${startId}`
      );
      for (let i of response.headers.entries()) {
        if (i[0] === "link") {
          setNextId(+i[1].match(/since=(\d+).*$/)[1]);
        }
      }
      const data = await response.json();
      setUsers(data);
    };
    fetchData();
  }, [startId]);

  const nextPage = () => {
    setStartId(nextId);
  };

  const firstPage = () => {
    setStartId(0);
  };

  if (users === null) {
    return <Preloader />;
  }

  return (
    <div>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              <Card className={classes.card}>
                <Link to={`/${user.login}`} className="d-flex link">
                  <Avatar className={classes.avatar}>
                    <img width="80" height="80" src={user.avatar_url} alt="" />
                  </Avatar>
                  <h4>{user.login}</h4>
                </Link>
                <Button
                  variant="contained"
                  href={user.html_url}
                  target="_blanc"
                >
                  more
                </Button>
              </Card>
            </li>
          );
        })}
      </ul>

      <div className="pagination">
        <button className="pagination__btn" onClick={firstPage}>
          first
        </button>
        <button className="pagination__btn" onClick={nextPage}>
          next
        </button>
      </div>
    </div>
  );
};

export default Home;
