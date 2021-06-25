import React ,{useEffect} from 'react';
import {BrowserRouter as Router , Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'antd/dist/antd.css';
import '@ant-design/compatible/assets/index.css';
import Navbar from './components/navbar';
import Login from './components/auth/login';
import Register from './components/auth/register'
import Alert from './components/alert';
import setAuthToken from './utils/setauthtoken';
import {loaduser} from './action/auth';
import Landing from './components/landing';
import MovieDetail from './components/movie/moviedetail';
import FavouritePage from './components/favouritepage/favouritepage';
import PrivateRoute from './components/privaterouter/privateroute';
import GenreId from './components/genreid';
import Post from './components/post/post';
import SinglePost from './components/post/singlepost';

if(localStorage.token){
  setAuthToken(localStorage.token);
}
const App=()=>{
  useEffect(()=>store.dispatch(loaduser()),[]);
  return(
  <Provider store={store}>
    <Router>
      <Navbar/>
      <section className="container1">
        <Alert/>
        <Switch>
          <Route exact path='/' component={Landing}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path='/movie/:movieId' component={MovieDetail}/>
          <Route exact path='/genre/:genreId' component={GenreId}/>
          <Route exact path='/posts' component={Post} />
          <Route exact path='/posts/:postid' component={SinglePost}/>
          <PrivateRoute exact path='/favourite' component={FavouritePage}/>
        </Switch>
      </section>
    </Router>
  </Provider>
  
  )
}


export default App;