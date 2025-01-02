import React, { useState, useEffect } from "react";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./styles.js";
import { createPost, updatePost } from "../../actions/posts.js";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    messege: "",
    tags: [],
    selectedFile: "",
    likeCount: 0,
  });
  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((p) => p._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  useEffect(() => {
    if (post) {
      setPostData(post);
    }
  }, [post]);

  const handleSubmit = (e) => {
    // e.preventDefault();
    // dispatch(createPost(postData));
    if (postData.title === "") {
      alert("Title cannot be empty");
    } else {
      console.log(currentId);
      console.log({ ...postData, name: user?.cred?.name });
      if (currentId) {
        dispatch(
          updatePost(currentId, { ...postData, name: user?.cred?.name })
        );
        console.log(currentId);
      } else {
        dispatch(createPost({ ...postData, name: user?.cred?.name }));
      }
      clear();
    }
  };
  if (!user?.cred?.name) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please sign in to create your own memories and like other's memories
        </Typography>
      </Paper>
    );
  }

  const clear = () => {
    setCurrentId(null);
    setPostData({
      title: "",
      messege: "",
      tags: "",
      selectedFile: "",
    });
  };
  return (
    <>
      <Paper className={classes.paper}>
        <form
          autoComplete="off"
          noValidate
          className={classes.form}
          onSubmit={handleSubmit}
          action=""
        >
          <Typography variant="h6">
            {currentId ? "Editing" : "Creating"} a Memory
          </Typography>
          <TextField
            name="title"
            variant="outlined"
            label="Title"
            required
            fullWidth
            value={postData.title}
            onChange={(e) => {
              setPostData({ ...postData, title: e.target.value });
            }}
          />
          <TextField
            name="messege"
            variant="outlined"
            label="Messege"
            fullWidth
            value={postData.messege}
            onChange={(e) => {
              setPostData({ ...postData, messege: e.target.value });
            }}
          />
          <TextField
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onChange={(e) => {
              setPostData({ ...postData, tags: e.target.value.split(",") });
            }}
          />
          <div className={classes.fileInput}>
            <FileBase
              type="file"
              mutiple={false}
              onDone={({ base64 }) => {
                setPostData({ ...postData, selectedFile: base64 });
              }}
            />
          </div>
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            fullWidth
            onSubmit={handleSubmit}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size="small"
            fullWidth
            onClick={clear}
          >
            Clear
          </Button>
        </form>
      </Paper>
    </>
  );
};

export default Form;
