import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import axios from 'axios';
import { Tooltip } from 'antd';
import {LikeOutlined,DislikeOutlined,LikeFilled,DislikeFilled} from '@ant-design/icons';
import { Fragment } from 'react';

const LikeDislike = props => {
    const[Likes,setLikes]=useState(0);
    const[Dislikes,setDislikes]=useState(0);
    const [LikeAction, setLikeAction] = useState(false);
    const [DislikeAction, setDislikeAction] = useState(false);
    let variable={};
    
    if(props.movie){
        variable={movieId:props.movieId,userId:props.userId}
    }else{
        variable={commentId:props.commentId,userId:props.userId}
    }
    useEffect(async ()=>{
        const res=await axios.post('/api/like/getlikes',variable);
        if(res.data.success){
            setLikes(res.data.likes.length);
            res.data.likes.map(like=>{
                if(like.userId === props.userId){
                    setLikeAction(true);
                    console.log("user has liked it");
                }
            })
        }else{
            console.log(res.data.err);
        }
        
        const res1=await axios.post('/api/like/getdislikes',variable);
        if(res1.data.success){
            setDislikes(res1.data.dislikes.length);
            res1.data.dislikes.map((dislike)=>{
                if(dislike.userId=== props.userId){
                    console.log("disliked");
                    setDislikeAction(true);
                }
            })
        }else{
            console.log(res.data.err);
        }


    },[]);
    const handleClick=async ()=>{
       if(props.auth.isAuth===false||props.userId===null) alert("please login to like this post");
       if(LikeAction===false){
           const res=await axios.post('/api/like/uplike',variable);
           if(res.data.success===true){
               setLikes(Likes+1);
               setLikeAction(true);
               if(DislikeAction==true){
                   setDislikeAction(false);
                   setDislikes(Dislikes-1);
               }
           }else{
               alert("failed to like");
           }
       }else{
           const res=await axios.post('/api/like/unlike',variable)
           if(res.data.success===true){
               setLikes(Likes-1);
               setLikeAction(false);
           }else{
               alert("Failed to decrease the like");
           }
       }
    }
    const handleDislikeClik=async ()=>{
        if(props.auth.isAuth===false||props.userId===null) alert("please login to like this post");
        if(DislikeAction===false){
            const res=await axios.post('/api/like/updislike',variable);
            if(res.data.success===true){
                setDislikes(Dislikes+1);
                setDislikeAction(true);
                if(LikeAction===true){
                    setLikes(Likes-1);
                    setLikeAction(false);
                }
            }else{
                alert("failed to dislike")
            }
        }else{
            const res=await axios.post('/api/like/undislike',variable);
            if(res.data.success===true){
                setDislikeAction(false);
                setDislikes(Dislikes-1);
            }else{
                alert("failed to decrease the dislike");
            }
        }
    }
    return (
        <div style={{float:"left",display:"flex"}}>
            
            <span key='comment-basic-like'>
            
                <div onClick={handleClick}>
                    <Tooltip title='Like'>
                        {LikeAction==false ?<LikeOutlined />:<LikeFilled />}
                    </Tooltip>
                    <span style={{paddingLeft:"2px",cursor:'auto'}}>{Likes}</span>
                </div>
            </span>
            <span key="comment-basic-dislike">
                <div onClick={handleDislikeClik}>
                    <Tooltip title='Dislike'>
                        {DislikeAction==false?<DislikeOutlined />:<DislikeFilled />}
                    </Tooltip>
                    <span style={{paddingLeft:"2px",cursor:'auto'}}>{Dislikes}</span>
                </div>
            </span>
        </div>
    )
}

LikeDislike.propTypes = {
auth:PropTypes.object.isRequired,
}

const mapStateToProps=state=>({
auth:state.auth
});

export default connect(mapStateToProps,{})(LikeDislike);
