import React,{useState} from 'react'
import {Link, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {setAlert} from '../../action/alert';
import {login} from '../../action/auth';

const Login = ({setAlert,login,isAuth}) => {
    const [formData,setData]=useState({
        email:'',
        password:'',
    });
    const {email,password}=formData;
    const onChange=e=>setData({...formData,[e.target.name]:e.target.value})
    const onSubmit=(e)=>{
        e.preventDefault();
        if(!password) setAlert("please enter password","danger");
        else login({email,password});
    }
    //redirect if login in
    if(isAuth) return <Redirect to='/'/>

    return (
    <section className="container">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" onSubmit={e=>onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e=>onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={e=>onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
    )
}

Login.propTypes={
    setAlert:PropTypes.func.isRequired,
    login:PropTypes.func.isRequired,
    isAuth:PropTypes.bool,
}
const mapStateToProps=state=>({
    isAuth:state.auth.isAuth
});

export default connect(mapStateToProps,{setAlert,login})(Login);
