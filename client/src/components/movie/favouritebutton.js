import React, { useEffect, useState } from 'react'
import {Button} from 'antd';
import axios from 'axios';

const FavouriteButton = (props) => {
    console.log(props);
    const variable={
        userFrom:props.userFrom,
        movieId:props.movieId,
        movieTitle:props.movieInfo.original_title,
        movieImage:props.movieInfo.backdrop_path,
        movieRunTime:props.movieInfo.runtime
    }
    const[favouriteNumber,setNumber]=useState(0);
    const[favourited,setFavourited]=useState(false);
    useEffect(async ()=>{

        const res=await axios.post('/api/favourite/favouriteNumber',variable);
        if(res.data.success){
            console.log(res);
            setNumber(res.data.favouriteNumber);
        }
        const res1= await axios.post('/api/favourite/favourited',variable);
        if(res1.data.success){
            console.log(res1);
            setFavourited(res1.data.favourited);
        }

    },[]);
    const handelFavourite=async ()=>{
        if(favourited){
            axios.post('/api/favourite/removeFromFavourite', variable)
                .then(response => {
                    if (response.data.success) {
                        setNumber(favouriteNumber - 1)
                        setFavourited(!favourited)
                    } else {
                        alert('Failed to Remove From Favorite')
                    }
                })
        }else{
            axios.post('/api/favourite/addToFavourite', variable)
                .then(response => {
                    if (response.data.success) {
                        setNumber(favouriteNumber + 1)
                        setFavourited(!favourited)
                    } else {
                        alert('Failed to Add To Favourite')
                    }
                })
        }
    }
    return (
        <div>
            <Button onClick={handelFavourite}> {favourited?"Remove From Favourite":"Add To Favourite"} {favouriteNumber}</Button>
        </div>
     )
}

export default FavouriteButton;
