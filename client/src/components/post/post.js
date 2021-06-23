import React,{useState,useEffect,Fragment} from 'react'
import { Button, Input, Typography, } from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';

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
            console.log(variables)

            axios.post('/api/posts/setpost', variables)
                .then(response => {
                    if (response.data.success) {
                        setData("")
                        getAllPost();
                    } else {
                        alert('Failed to save Comment')
                    }
                });
        }
    }
    return (
        <div className="container p-5">
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px',height:'250px' }}
                    onChange={handleChange}
                    value={formData}
                    placeholder="Write a post to ask suggestion from other user"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>
            <div className="row">
                {
                    Posts.length==0?(<div>Loading</div>):(
                        Posts.map((p,i)=>(
                            <Fragment>
                                <div key={i} className="col-12">
                                    <h1>{p.content}</h1>
                                </div>
                            </Fragment>
                        ))
                    )
                }
            </div>
        </div>
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
