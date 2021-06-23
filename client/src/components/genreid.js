import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {API_KEY,API_URL,IMAGE_URL} from '../config/default';
import GridCard from '../components/sections/gridcard';
import{Row,Typography} from 'antd';
const {Title}=Typography;
const GenreId = (props) => {
    const genreId=props.match.params.genreId;
    const [currentPage,setPage]=useState(0);
    const[Movies,setMovies]=useState([]);
    const URL=`${API_URL}discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US&page=${currentPage+1}`
    useEffect(()=>{
        fetchMovies();
      },[]);
      const fetchMovies=()=>{
        fetch(URL)
        .then(response=>response.json())
        .then(response=>{
        const temp=response.results;
        setMovies([...Movies,...temp]);
        setPage(response.page);
        //console.log(response.results);
        })
      }
      const handleClick=()=>{
        fetchMovies();
      }
    return (
        <div className="landing1">
            <div style={{width:"85%",margin:'1rem auto'}}>
              <Title level={2}>Movies By Latest</Title>
              <hr/>
              <Row gutter={[16, 16]}>
                      {Movies && Movies.map((movie, index) => (
                          <React.Fragment key={index}>
                              <GridCard
                                  image={movie.poster_path ?
                                      `${IMAGE_URL}w500${movie.poster_path}`
                                      : null}
                                  movieId={movie.id}
                                  movieName={movie.original_title}
                              />
                          </React.Fragment>
                      ))}
                </Row>
              <br />
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <button onClick={handleClick}>Load More</button>
              </div>
            </div>
        </div>
    )
}

export default GenreId
