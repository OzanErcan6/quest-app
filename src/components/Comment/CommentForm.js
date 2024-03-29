import React, {useState} from "react";
import {Link} from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import {Button, InputAdornment, OutlinedInput} from "@mui/material";
import Avatar from "@mui/material/Avatar";


function CommentForm(props) {
    const {userId, userName, setCommentRefresh} = props;

    const [text, setText] = useState("");


    const handleSubmit = () => {
        //setText("");
        setCommentRefresh();
    }

    const handleChange = (value) => {
        //setText(value);
    }
    return(
        <CardContent>
            <OutlinedInput
                id="outlined-adornment-amount"
                multiline
                inputProps = {{maxLength : 250}}
                fullWidth
                onChange = {(i) => handleChange(i.target.value)}
                startAdornment = {
                    <InputAdornment position="start">
                        <Link  to={{pathname : '/users/' + userId}}>
                            <Avatar aria-label="recipe" >
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                endAdornment = {
                    <InputAdornment position = "end">
                        <Button
                            variant = "contained"
                            style = {{background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                                color: 'white'}}
                            onClick = {handleSubmit}
                        >Comment</Button>
                    </InputAdornment>
                }

                style = {{ color : "black",backgroundColor: 'white'}}
            ></OutlinedInput>
        </CardContent>

    )
}


export default CommentForm;