import React from "react";
import { useSelector } from "react-redux";
import { Grid, CircularProgress } from "@material-ui/core";
import Post from "./Post/Post.jsx";
import useStyles from "./styles.js";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  console.log(isLoading);
  const classes = useStyles();
  console.log(posts);
  if (!posts.length && !isLoading) return "No Posts";
  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <Grid
        className={classes.container}
        container
        alignItems="strectch"
        spacing={3}
      >
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Post post={post} setCurrentId={setCurrentId}></Post>
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default Posts;
