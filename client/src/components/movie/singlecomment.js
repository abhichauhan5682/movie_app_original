import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd';
import axios from 'axios';
import { connect } from 'react-redux';
import {setAlert} from '../../action/alert';
import PropTypes from 'prop-types';
import LikeDislike from './likedislike';
const { TextArea } = Input;

const SingleComment = (props) => {
    const [CommentValue, setCommentValue] = useState("");
    const [OpenReply, setOpenReply] = useState(false);
    const handleChange = (e) => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(props.auth.isAuth===false){
            props.setAlert("Please Login to add a comment","danger");
            alert("Please Login to add a comment");
        }
        if(props.auth.isAuth===true){
            const variables = {
                writer: props.auth.user._id,
                postId: props.postId,
                responseTo: props.comment._id,
                content:CommentValue
            }


            axios.post('/api/comment/saveComment', variables)
                .then(response => {
                    if (response.data.success) {
                        setCommentValue("")
                        setOpenReply(!OpenReply)
                        props.refreshFunction(response.data.result)
                    } else {
                        alert('Failed to save Comment')
                    }
                })
        }
    }
    const actions = [
        <LikeDislike comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
        <span onClick={openReply} key="comment-basic-reply-to">Reply to </span>
    ]
    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={
                    <Avatar
                        src=""
                        alt="image"
                    />
                }
                content={
                    <p>
                        {props.comment.content}
                    </p>
                }
            ></Comment>
            {OpenReply &&
                <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                    <TextArea
                        style={{ width: '100%', borderRadius: '5px',marginLeft:"45px" }}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write a comment"
                    />
                    <br/>
                    <Button style={{ width: '20%', height: '52px',borderRadius:"10%" }} onClick={onSubmit}>Submit</Button>
                </form>
            }
        </div>
    )
}

SingleComment.propTypes={
    auth:PropTypes.object.isRequired,
    setAlert:PropTypes.func.isRequired,
}

const mapStateToProps=state=>({
    auth:state.auth
});
export default connect(mapStateToProps,{setAlert})(SingleComment);
