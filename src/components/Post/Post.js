import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {Container} from "@mui/material";
import Comment from "../Comment/Comment";
import CommentForm from "../Comment/CommentForm";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})

    (({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(20deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));



function Post(props) {
    const { title, text, userId, userName, postId} = props
    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [expanded, setExpanded] = React.useState(false);
    const [liked, setLiked] = React.useState(false);
    const [commentList, setCommentList] = React.useState([]);
    const isInitialMount = useRef(true)
    let disabled = localStorage.getItem("currentUser") == null ? true:false;

    const handleExpandClick = () => {
        setExpanded(!expanded);
        getComments()
        console.log(commentList)
    };

    const handleLike = () => {
        setLiked(!liked);
    };

    const getComments = () => {
        fetch("http://localhost:8082/comment?postId=" + postId)
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true)
                setCommentList(result)
            },(error) => {
                setIsLoaded(true)
                setError(error)
            })
        console.log(postId + " post id")
    }

    useEffect(() => {
        if(isInitialMount.current){
            isInitialMount.current=false
        }
        else
            getComments()
    }, [])


    if(error){
        return <div>Error !!</div>
    }
    else if(!isLoaded){
        return <div>Loading...</div>
    }
    else{
        return (
            <div className="postContainer">
                <Card sx={{ width: 800 , margin:10 }}>
                    <CardHeader
                        avatar={
                            <Link style={{ textDecoration: 'none', boxShadow: 'none', color: 'white' }} to={{ pathname: '/users/' + userId }}>
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {userName.charAt(0).toUpperCase()}
                                </Avatar>
                            </Link>
                        }
                        title={title}
                    />

                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            {text}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton onClick={handleLike} aria-label="add to favorites">
                            <FavoriteIcon style={liked ? { color: 'red'} : null}/>
                        </IconButton>

                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <CommentIcon />
                        </ExpandMore>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <Container fixed>
                            {error? "error" :
                                isLoaded? commentList.map(comment => (
                                    <Comment userId = {1} userName = {'USER'} text = {comment.text}></Comment>
                                )) : "Loading"}
                            {disabled? "":  <CommentForm userId = {1} userName = {'USER'} text = {"lorem ipsum"}></CommentForm>}
                        </Container>
                    </Collapse>
                </Card>
            </div>
        )
    }
}

export default Post