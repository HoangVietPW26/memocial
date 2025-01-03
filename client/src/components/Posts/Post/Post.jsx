import React from "react";
import useStyles from "./styles.js";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import moment from "moment";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";
import { deletePost, updateLike } from "../../../actions/posts.js";
import { useNavigate } from "react-router-dom";

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const navigate = useNavigate();
  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };
  const Likes = () => {
    console.log(post.messege.split(" "));
    if (post.likedBy.length > 0) {
      return post.likedBy.find(
        (like) => like === (user?.cred?.sub || user?.cred?._id)
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {post.likedBy.length > 2
            ? `You and ${post.likedBy.length - 1} others`
            : `${post.likedBy.length} like${
                post.likedBy.length > 1 ? "s" : ""
              }`}
        </>
      ) : (
        <>
          <ThumbUpAltOutlined fontSize="small" />
          &nbsp;{post.likedBy.length}{" "}
          {post.likedBy.length === 1 ? "Like" : "Likes"}
        </>
      );
    }

    return (
      <>
        <ThumbUpAltOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase
        className={classes.cardAction}
        component="span"
        name="test"
        onClick={openPost}
      >
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
          height={200}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        {(user?.cred?.sub === post?.creator ||
          user?.cred?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                setCurrentId(post._id);
              }}
            >
              <MoreHorizIcon fontSize="default" />
            </Button>
          </div>
        )}
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary" component="h2">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography
          className={classes.title}
          gutterBottom
          variant="h5"
          component="h2"
        >
          {post.title}
        </Typography>
        <CardContent className={classes.cardMessege}>
          <Typography
            className={classes.messageText}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {post.messege}
          </Typography>
        </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.cred}
          onClick={() => {
            dispatch(updateLike(post._id));
          }}
        >
          <Likes />
        </Button>
        {(user?.cred?.sub === post?.creator ||
          user?.cred?._id === post?.creator) && (
          <Button
            size="small"
            color="primary"
            onClick={() => {
              dispatch(deletePost(post._id));
            }}
          >
            <DeleteIcon fontSize="small" /> Delete
          </Button>
        )}
      </CardActions>
    </Card>
  );
};

export default Post;
