import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import axios from 'axios';
import { useSelector } from 'react-redux';
const NewComments = styled.div`
display: flex;
padding: 5px;

align-items: center;

  
`;
const Avatar = styled.img`
width: 36px;
height: 36px;
border-radius: 50%;
  
`;
const Input = styled.input`
margin-left: 15px;
width: 100%;
font-size: 18px;                             
font-weight: 500; 
border: none;
outline: none;
/* color: red; */
color: ${({theme})=>theme.text};  
background: transparent;
  
`;
function Commentss({ videoId }) {
    const [comments, setComments] = useState([])
    const {currentUser} = useSelector((state)=> state.user);
    useEffect(() => {
        const fetchComments = async () => {
            try {


                const commentRes = await axios.get(`/comment/${videoId}`);


                setComments(commentRes.data)


            } catch (error) {
                console.log(error);
            }
        }
        fetchComments();
    }, [videoId])

    return (
        <>
            <NewComments>
                <Avatar src={currentUser.img}/>
                <Input placeholder='Add a Comments' />
            </NewComments>
            {comments.map(comment =>

                <Comment key={comment._id} comment={comment} />
            )}


        </>
    )
}

export default Commentss;
