import React,{useState,useEffect,Fragment} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import axios from 'axios';
import {setAlert} from '../../action/alert';
import Comment from '../movie/comment';
import LikeDislike from '../movie/likedislike';

const SinglePost = props => {
    const postid=props.match.params.postid;
    const [data,setdata]=useState("");
    const [author,setAuthor]=useState("");
    const [CommentLists, setCommentLists] = useState([]);
    const movieVariable = {
        movieId: postid
    }
    useEffect(async()=>{
        const res=await axios.get(`/api/posts/${postid}`);
        console.log(res.data);
        if(res.data.success){
            setdata(res.data.post.content);
            setAuthor(res.data.post.name);
        }
        axios.post('/api/comment/getComments', movieVariable)
        .then(response => {
            //console.log(response)
            if (response.data.success) {
                //console.log('response.data.comments', response.data)
                setCommentLists(response.data.comments)
            } else {
                alert('Failed to get comments Info')
            }
        })
    },[postid]);
    const updateComment = async (newComment) => {
        await setCommentLists(CommentLists.concat(newComment));
    }
    return (
        <div>
            {
                data===null?<h1>Loading</h1>:<h1>{data}</h1>
            }
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <LikeDislike movie  userId={localStorage.getItem('userId')} movieId={postid} />
            </div>
            {/* Comments */}
            <Comment postId={postid} commentLists={CommentLists} refreshFunction={updateComment} movieTitle="this post"/>
        </div>
    )
}

SinglePost.propTypes = {
    auth:PropTypes.object.isRequired,
    setAlert:PropTypes.func.isRequired,
}
const mapStateToProps=state=>({
    auth:state.auth
});

export default connect(mapStateToProps,{setAlert})(SinglePost);

