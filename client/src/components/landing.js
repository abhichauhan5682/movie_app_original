import React,{useState,useEffect} from 'react'
import {Typography,Row,Carousel} from 'antd';

import {API_URL,API_KEY,IMAGE_URL} from '../config/default';
import MainImage from './sections/mainimage';
import GridCard from './sections/gridcard';

const {Title} =Typography

const Landing = (props) => {
  const[Movies,setMovies]=useState([]);
  const[currentPage,setPage]=useState(0);
  useEffect(()=>{
    //console.log(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    fetchMovies();
  },[]);
  const fetchMovies=()=>{
    fetch(`${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${currentPage+1}`)
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
      <div className='landing1'>
        <Carousel autoplay >
        { Movies && Movies.map((movie,index)=>
          <MainImage  image={`${IMAGE_URL}w1280${movie.backdrop_path}`} title={movie.original_title} text={movie.overview} />
        )
          
        }
        </Carousel>
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


export default Landing;