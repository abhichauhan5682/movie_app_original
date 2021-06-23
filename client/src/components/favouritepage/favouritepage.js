import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {IMAGE_URL} from '../../config/default';
import { Typography, Popover, Button } from 'antd';
import {setAlert} from '../../action/alert';


const { Title } = Typography;
const FavouritePage = (props) => {
    const [favMovies,setfavMovies]=useState([]);
    const[loading,setLoading]=useState(true);
    const variable={
        userFrom:props.user._id
    }
    useEffect(()=>{
        if(props.isAuth){
            fetchFavoredMovie();
        } 
    },[]);
    const fetchFavoredMovie=async ()=>{
        const res=await axios.post('/api/favourite/getFavouredMovie',variable);
            // .then(response=>{
            //     if(response.data.success){
            //         console.log(response.data.favorites);
            //         setfavMovies(response.data.favorites);
            //         setLoading(false);
            //     }else{
            //         console.log("error");
            //     }
            // })
        if(res.data.success){
            console.log(res.data.favorites);
            setfavMovies(res.data.favorites);
            setLoading(false);
        }else{
            console.log("error");
        }
    }
    const onClickDelete=async (movieId, userFrom)=>{
        const variables = {
            movieId: movieId,
            userFrom: userFrom,
        }

        // axios.post('/api/favourite/removeFromFavourite', variables)
        //     .then(response => {
        //         if (response.data.success) {
        //             console.log("remove");
        //             fetchFavoredMovie()
        //         } else {
        //             alert('Failed to Remove From Favorite')
        //         }
        //     })
        const res=await axios.post('/api/favourite/removeFromFavourite',variables);
        if(res.data.success){
            props.setAlert("Successfully Removed from your Favourite List","success");
            console.log("remove");
            fetchFavoredMovie();
        }else{
            props.setAlert("Error take place during Removal","danger");
        }
    }
    const renderCards = favMovies.map((favorite, index) => {


        const content = (
            <div>
                {favorite.movieImage ?
                    <img src={`${IMAGE_URL}w500${favorite.movieImage}`} />
                    : "no image"}
            </div>
        );

        return <tr key={index}>

            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>

            <td>{favorite.movieRunTime} mins</td>
            <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}> Remove </button></td>
        </tr>
    })
    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <Title level={2} > Favorite Movies By Me </Title>
            <hr />
            {
                !loading &&
                <table>
                    <thead>
                        <tr>
                            <th>Movie Title</th>
                            <th>Movie RunTime</th>
                            <td>Remove from favorites</td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            renderCards
                        }
                    </tbody>
                </table>
            }
        </div>
    )
}

FavouritePage.propTypes={
setAlert:PropTypes.func.isRequired,
isAuth:PropTypes.bool.isRequired,
user:PropTypes.object,
}
const mapStateToProps=state=>({
isAuth:state.auth.isAuth,
user:state.auth.user,
})

export default connect(mapStateToProps,{setAlert})(FavouritePage);
