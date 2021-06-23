import React,{Fragment} from 'react'
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {logout} from '../action/auth';
import Helper from './Genre';

const Navbar = (props) => {
    const auth=(
        <ul>
            <li><Link to='/profiles'>Blogs</Link></li>
            <li><Helper/></li>
            <li>
                <Link to="/favourite">
                    <i className='fas fa-user'/>{' '}
                    {props.auth.isLoading===false && props.auth.isAuth===true&&props.auth.user!==null && <span className='hide-sm'>{props.auth.user.name}</span>}
                </Link>
            </li>
            <li>
                <Link onClick={props.logout} to="/">
                    <i className="fas fa-sign-out-alt"></i>{' '}
                    <span className='hide-sm'>Logout</span>
                </Link>
            </li>
        
        </ul> 
    );

    const guest=(
        <ul>
            <li><Link to="/">Blogs</Link></li>
            <li><Helper/></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );
    return (
    <nav className="navbar bg-dark">
        <h1>
            <Link to="/"><i className="fas fa-code"></i> DevConnector</Link>
        </h1>
        {!props.auth.isLoading && (<Fragment>{props.auth.isAuth?auth:guest}</Fragment>)}
    </nav>
    )
}

Navbar.propTypes={
    logout:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
}

const mapStateToProps=state=>({
    auth:state.auth,
})

export default connect(mapStateToProps,{logout})(Navbar);