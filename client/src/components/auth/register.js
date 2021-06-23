import React,{useState} from 'react'
import {Link,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setAlert} from '../../action/alert';
import {register} from '../../action/auth';
import PropTypes from 'prop-types'


const Register = (props) => {
    const [formData,setData]=useState({
        name:'',
        email:'',
        password:'',
        confirmpassword:''
    });
    const onChange=e=>setData({...formData,[e.target.name]:e.target.value})
    const onSubmit=(e)=>{
        e.preventDefault();
        if(password !==confirmpassword) props.setAlert("Password do not match",'danger');
        else props.register({name,email,password});
    }
    const {name,email,password,confirmpassword}=formData;

    if(props.isAuth){
      return <Redirect to='/' />
    }

    return (
    <section className="container">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e=> onSubmit(e)}>
        <div className="form-group">
          <input 
            type="text" 
            placeholder="Name" 
            name="name" 
            value={name}   
            onChange={e=>onChange(e)} 
          />
        </div>
        <div className="form-group">
          <input 
            type="email" 
            placeholder="Email Address"  
            value={email}  
            onChange={e=>onChange(e)} 
            name="email" 
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
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirmpassword"
            value={confirmpassword}
            onChange={e=>onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
    )
}



Register.propTypes={
    setAlert:PropTypes.func.isRequired,
    register:PropTypes.func.isRequired,
    isAuth:PropTypes.bool, 
}
  
const mapStateToProps=state=>({
    isAuth:state.auth.isAuth
});
     


export default connect(mapStateToProps,{setAlert,register})(Register);
