import React from "react";
import {useParams} from "react-router-dom";

export default function User(){
    const {userId} = useParams()
    return(
        <div>user id: {userId}</div>
    )
}