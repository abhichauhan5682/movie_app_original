import React,{useState}  from 'react'
import axios from 'axios'
import { Button, Input, Typography, } from 'antd';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {setAlert} from '../../action/alert';
import SingleComment from './singlecomment';
import ReplyComment from './replycomment';

const { TextArea } = Input;
const { Title } = Typography;

const Comment = (props) => {
    //console.log(props.commentLists);
    const [Comment, setComment] = useState("")

    const handleChange = (e) => {
        setComment(e.currentTarget.value)
    }
   const onSubmit=(e)=>{
       console.log(props);
        if(props.auth.isAuth==false){
            props.setAlert("Please Login to add a comment","danger")
            alert("Please Login to add a comment");
        }
        e.preventDefault();
        if(props.auth.isAuth===true){
            const variables = {
                content: Comment,
                writer: props.auth.user._id,
                postId: props.postId,
            }
            //console.log(variables)

            axios.post('/api/comment/saveComment', variables)
                .then(response => {
                    if (response.data.success) {
                        setComment("")
                        props.refreshFunction(response.data.result)
                    } else {
                        alert('Failed to save Comment')
                    }
                });
        }
   };
    return (
        <div>
            <br />
            <Title level={3} > Share your opinions about <span style={{color:"red"}}>{props.movieTitle}</span></Title>
            <hr />
            {props.commentLists && props.commentLists.map((comment, index1,index2) => (
                (!comment.responseTo &&
                    <React.Fragment>
                        <SingleComment key={index1} comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment key={index2} CommentLists={props.commentLists} postId={props.postId} parentCommentId={comment._id} refreshFunction={props.refreshFunction} />
                    </React.Fragment>
                )
            ))}
            { props.commentLists && props.commentLists.length === 0 &&
                <div style={{ display: 'flex', justifyContent:'center', alignItems:'center', height:'200px'}} >
                    Be the first one who shares your thought about this movie
                </div>
            }
            <br/>
            <form style={{ display: 'flex' }} onSubmit={onSubmit}>
                <TextArea
                    style={{ width: '100%', borderRadius: '5px' }}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="write a comment"
                />
                <br />
                <Button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</Button>
            </form>



        </div>
    )
}


Comment.propTypes={
    setAlert:PropTypes.func.isRequired,
    auth:PropTypes.object,
}

const mapStateToProps=state=>({
    auth:state.auth
})

export default connect(mapStateToProps,{setAlert})(Comment);
