import React from "react";
import {Link} from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import {InputAdornment, OutlinedInput} from "@mui/material";
import Avatar from "@mui/material/Avatar";



function Comment(props) {
    const {text, userId, userName} = props;

    return(
        <CardContent >
            <OutlinedInput
                disabled
                id="outlined-adornment-amount"
                multiline
                inputProps = {{maxLength : 25}}
                fullWidth
                value = {text}
                startAdornment = {
                    <InputAdornment position="start">
                        <Link   to={{pathname : '/users/' + userId}}>
                            <Avatar aria-label="recipe">
                                {userName.charAt(0).toUpperCase()}
                            </Avatar>
                        </Link>
                    </InputAdornment>
                }
                style = {{ color : "black",backgroundColor: 'white'}}
            ></OutlinedInput>
        </CardContent>

    )
}


export default Comment;