import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Container, Grow, Grid } from "@material-ui/core";
import Posts from "../../components/Posts/Posts.jsx";
import Form from "../../components/Form/Form.jsx";
import { getPosts } from "../../actions/posts.js";
import useStyles from "./styles.js";

const Home = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId]);
  return (
    <>
      <Grow in>
        <Container>
          <Grid
            className={classes.mainContainer}
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts setCurrentId={setCurrentId}></Posts>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Form currentId={currentId} setCurrentId={setCurrentId}></Form>
            </Grid>
          </Grid>
        </Container>
      </Grow>
    </>
  );
};

export default Home;
