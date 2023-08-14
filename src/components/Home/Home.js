import React, {useEffect, useState} from "react";
import Post from "../Post/Post";
import "./Home.css"
import PostForm from "../Post/PostForm";

export default function Home(){

    const [error, setError] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)
    const [postList, setPostList] = useState([])

    const getPosts = () => {
        fetch("http://localhost:8082/posts")
            .then(res => res.json())
            .then((result) => {
                setIsLoaded(true)
                setPostList(result)
            },(error) => {
                setIsLoaded(true)
                setError(error)
            })
    }


    useEffect(() => {
        getPosts()
    }, [])

    if(error){
        return <div>Error !!</div>
    }
    else if(!isLoaded){
        return <div>Loading...</div>
    }
    else{
        return(
            <div sx={{ display: 'flex', flexWrap:'wrap', justifyContent:'center', gap: '10vh', alignItems:'center', backgroundColor:'f0f5ff' }} >
                <PostForm userId={1} userName={"Ozan"} getPosts = {getPosts}/>

                {postList.map(post =>
                    (<Post userId={post.userId} userName={post.userName} title={post.title} text={post.text}/>
                ))}
            </div>
        )
    }
}