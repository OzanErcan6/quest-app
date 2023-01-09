import React, {useEffect, useState} from "react";
import Post from "../Post/Post";
import "./Home.css"
import Container from '@mui/material/Container';

export default function Home(){

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [postList, setPostList] = useState([])

    useEffect(() => {
        fetch("http://localhost:8082/posts")
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true)
                setPostList(result)
            },(error) => {
                setIsLoaded(true)
                setError(error)
            })
    },[])

    if(error){
        return <div>Error !!</div>
    }
    else if(!isLoaded){
        return <div>Loading...</div>
    }
    else{
        return(
            <Container sx={{ display: 'flex', flexWrap:'wrap', justifyContent:'center', gap: '10vh', alignItems:'center', backgroundColor:'#cfe8fc', height:'100vh' }} >
                {postList.map(post => (
                    <Post userId={post.userId} userName={post.userName} title={post.title} text={post.text}/>
                ))}
            </Container>
        )
    }
}