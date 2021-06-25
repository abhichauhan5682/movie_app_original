import React,{useState,useEffect,Fragment} from 'react'
import { Button, Input, Typography, } from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {setAlert} from '../../action/alert';

const { TextArea } = Input;
const { Title } = Typography;

const Post = (props) => {
    const [formData,setData]=useState("");
    const [Posts,setPosts]=useState("");
    useEffect(()=>{
        getAllPost();
    },[])
    const getAllPost=async()=>{
        const res=await axios.get('/api/posts/getposts');
        console.log(res.data);
        if(res.data.success) setPosts(res.data.post);
    }
    const handleChange = (e) => {
        setData(e.currentTarget.value)
    }
    const onSubmit=(e)=>{
        if(props.auth.isAuth===false){
            props.setAlert("Please Login to add a post","danger")
        }
        e.preventDefault();
        if(props.auth.isAuth===true){
            const variables = {
                text: formData,
            }
            //console.log(variables)

            axios.post('/api/posts/setpost', variables)
                .then(response => {
                    if (response.data.success) {
                        setData("")
                        getAllPost();
                    } else {
                        alert('Failed to save Post')
                    }
                });
        }
    }
    return (
        <div className="post-body">
            <div className="post-container">
                <h1 className="Posts">Posts</h1>
                <b style={{fontSize:"20px"}}><i className="fas fa-users"></i> Welcome to the Community</b>
                <div className="top-bar-posts">
                    Post Something...
                 </div>
                <form onSubmit={onSubmit}>
                    <TextArea
                        className="form-control"
                        style={{ width: '100%', borderRadius: '5px',height:'130px' }}
                        onChange={handleChange}
                        value={formData}
                        placeholder="Write a post to ask suggestion from other user"
                    />
                    <br />
                    <button className="btn btn-dark submit-btn" style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
                </form>
                <div className>
                    {
                        Posts.length==0?(<div>Loading</div>):(
                            Posts.map((p,i)=>(
                                <Fragment>
                                    <div key={i} className="row posting mt-2">
                                    <div className="col-2 avatar-container"><i className="fas fa-user avatar" ></i><b className="name">{p.name}</b></div>
                                    <div className="col">
                                        <p>{p.content}</p>
                                        <button type="button" className="btn like"><i className="far fa-thumbs-up"></i></button>
                                        <button type="button" className="btn dislike"><i className="far fa-thumbs-down"></i></button>
                                        <Link to={`/posts/${p._id}`}className="btn discussion-btn">Discussion</Link>
                                        </div>
                                    </div>
                                </Fragment>
                            ))
                        )
                    }
                </div>
            </div>
        </div>
        // <div className="main-chatbox-container">
        //     <h1 className="Posts">Posts</h1>
        //     <b style="font-size: 17px;"><i className="fas fa-users"></i> Welcome to the Community</b>
        //     <div className="top-bar-posts">
        //         Post Something...
        //     </div>
        //     <textarea className="form-control" style="resize: none; height: 130px;" placeholder="Create a Post..."></textarea>
        //     <button className="btn btn-dark submit-btn" >Submit</button>
        //     <div className="row post-container">
        //         <div className="col-2 avatar-container"><i className="fas fa-user avatar" ></i><b className="name">name</b></div>
        //         <div className="col">
        //             <p>taque eveniet! Expedim inventore doloribus natus itaque nobis? Est, velit! Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, iste nostrum dolor, veniam voluptatibus atque molestiae illo temporibus ea vitae saepe omnis quas esse at perferendis ut nam perspiciatis excepturi?</p>
        //             <button type="button" className="btn like"><i className="far fa-thumbs-up"></i></button>
        //             <button type="button" className="btn dislike"><i className="far fa-thumbs-down"></i></button>
        //             <button className="btn discussion-btn">Discussion</button>
        //         </div>
        //     </div>
        // </div>
    )
}
Post.propTypes={
    auth:PropTypes.object.isRequired,
    setAlert:PropTypes.func.isRequired,
}

const mapStateToProps=state=>({
    auth:state.auth
});
export default connect(mapStateToProps,{setAlert})(Post)
