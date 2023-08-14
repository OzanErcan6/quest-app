import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import { Link } from "react-router-dom";
import {OutlinedInput, Button, Snackbar, Alert} from '@mui/material';


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

function PostForm(props) {

    // todo : after sending a post refresh the post list using getPosts
    const {userId, userName, getPosts} = props
    const [text, setText] = React.useState("")
    const [title, setTitle] = React.useState("")
    const [isSent, setIsSent] = React.useState(false)

    const savePost = () => {
        fetch("http://localhost:8082/posts",
            {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title: title,
                    userId: userId,
                    text: text,
                })
            })
            .then((res) => res.json())
            .catch((err) => console.log("error"))
    }

    const handleSubmit = () => {
        savePost()
        setIsSent(true)
        setTitle("")
        setText("")
        getPosts()
    };

    const handleTitle = (value) => {
        setTitle(value)
        setIsSent(false)
    };

    const handleText = (value) => {
        setText(value)
        setIsSent(false)
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setIsSent(false);
    };

    return (
        <div className="postContainer">
            <Snackbar open={isSent} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    Post Gönderildi !!!
                </Alert>
            </Snackbar>
            <Card sx={{ width: 800 , margin:10 }}>
                <CardHeader
                    avatar={
                        <Link style={{ textDecoration: 'none', boxShadow: 'none', color: 'white' }} to={{ pathname: '/users/' + userId }}>
                            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    }

                    title={
                    <OutlinedInput id="outlined-adornment-amount" multiline
                                   placeholder="Title"
                                   inputProps={{maxLength:25}}
                                   fullWidth
                                   value={title}
                                   onChange = {(i) => handleTitle(i.target.value)}>
                    </OutlinedInput>}
                />

                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        <OutlinedInput id="outlined-adornment-amount"
                                       multiline placeholder="Text"
                                       inputProps={{maxLength:250}}
                                       fullWidth
                                       value={text}
                                       onChange = {(i) => handleText(i.target.value)}
                                       endAdornment={
                                            <inputAdornment position="end">
                                                <Button variant = "contained" onClick = {handleSubmit} >Post</Button>
                                            </inputAdornment>
                                        }>
                        </OutlinedInput>
                    </Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default PostForm