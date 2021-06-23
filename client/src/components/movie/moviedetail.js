import React, { useEffect, useState } from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {API_URL,API_KEY,IMAGE_URL} from '../../config/default';
import MainImage from '../sections/mainimage';
import MovieInfo from './movieinfo';
import {Button,Row} from 'antd';
import { Fragment } from 'react';
import GridCard from '../sections/gridcard';
import FavouriteButton from './favouritebutton';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import Comment from './comment';
import axios from 'axios';
import LikeDislike from './likedislike';


const MovieDetail = (props) => {
    //console.log(props);
    const movieId=props.match.params.movieId;
    const [Movie,setMovie]=useState([]);
    const [Crew,setCrew]=useState([]);
    const [ActorView,setActorView]=useState(false);
    const [LoadingForMovie, setLoadingForMovie] = useState(true)
    const [LoadingForCasts, setLoadingForCasts] = useState(true)
    const [CommentLists, setCommentLists] = useState([])
    const movieVariable = {
        movieId: movieId
    }
    let userId=null;
    if(props.isAuth===true && props.user!==null){
        userId=props.user._id;
        console.log("heloo user");
    }
    useEffect(()=>{
        let endpointForMovieInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}&language=en-US`;
        fetchDetailInfo(endpointForMovieInfo)

        axios.post('/api/comment/getComments', movieVariable)
        .then(response => {
            //console.log(response)
            if (response.data.success) {
                //console.log('response.data.comments', response.data.comments)
                setCommentLists(response.data.comments)
            } else {
                alert('Failed to get comments Info')
            }
        })

    },[]);
    const fetchDetailInfo = (endpoint) => {
        fetch(endpoint)
            .then(result => result.json())
            .then(result => {
                setMovie(result)
                setLoadingForMovie(false)

                let endpointForCasts = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;
                fetch(endpointForCasts)
                    .then(result => result.json())
                    .then(result => {
                        setCrew(result.cast)
                    })

                setLoadingForCasts(false)
            })
            .catch(error => console.error('Error:', error)
            )
    }
    const updateComment = (newComment) => {
        setCommentLists(CommentLists.concat(newComment));
    }


    return (
        <div>
            {
                !LoadingForMovie &&
                <MainImage
                    image={`${IMAGE_URL}w1280${Movie.backdrop_path}`}
                    title={Movie.original_title}
                    text={Movie.overview}

                />
            }
            <div style={{ width: '85%', margin: '1rem auto' }}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                   {props.user!==null? 
                        <FavouriteButton
                            userFrom={props.user._id}
                            movieId={movieId}
                            movieInfo={Movie}
                        />
                        :
                        <Button>
                            <Link to="/login">
                                Add To Favourite
                            </Link>
                        </Button>
                    }
                </div>

                {   
                    !LoadingForMovie&&
                    <MovieInfo movie={Movie}/>
                }
                <br/>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                   <Button onClick={()=>setActorView(!ActorView)}>Toggle Actor View</Button>
                </div>
                <br/>
                {
                    ActorView &&
                    <Row gutter={[16,16]}>
                        {
                            !LoadingForCasts&&
                            Crew.map((crew,index)=>(
                                <Fragment key={index}>
                                    {
                                        crew.profile_path&& 
                                        <GridCard
                                            actor 
                                            image={crew.profile_path} 
                                            characterName={crew.name}
                                        />
                                    }
                                </Fragment>
                            ))
                        }
                    </Row>
                }

                {/* likes & dislikes */}
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislike movie  userId={localStorage.getItem('userId')} movieId={movieId} />
                </div>

                {/* Comments */}
                <Comment movieTitle={Movie.original_title}  commentLists={CommentLists} postId={movieId} refreshFunction={updateComment}/>

            </div>






        </div>
    )
}


MovieDetail.propTypes={
    isAuth:PropTypes.bool.isRequired,
    user:PropTypes.object,
}

const mapStateToProps=state=>({
    isAuth:state.auth.isAuth,
    user:state.auth.user,
});

export default connect(mapStateToProps,{})(MovieDetail);
