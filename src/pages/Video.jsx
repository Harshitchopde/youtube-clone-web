import {ReplyOutlined, ThumbDown, ThumbDownOutlined, ThumbUpOutlined } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Comments from '../components/Commentss';
// import Cart from '../components/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { dislikes, fetchStart, fetchSuccess, likes } from '../redux/videoSlices';
import { subscription} from '../redux/userSlices';
import { format } from 'timeago.js';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
const Container = styled.div`
 display: flex;
  
`;
const Content = styled.div`
flex: 5;
/* background-color: green; */

  
`;
const VideoWrapper = styled.div`
  /* border: 1px solid red; */
    border-radius: 50px;
    overflow: hidden;
    padding: 20px;
  
`;
const Title = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-top: 20px;
  color: ${({theme})=>theme.text};
`;
const Details = styled.div`
justify-content: space-between;
display: flex;
align-items: center;

`
const Info = styled.span``
const Buttons = styled.div`
display: flex;

`
const Button = styled.button`
display: flex;
    justify-content: center;
    background: transparent;
    color:${({theme})=>theme.text};
    margin-left: 20px;
   
    font-size: 16px;
    font-weight: 500;
    align-items: center;
    cursor: pointer;
    padding:2px 10px;
    border: none;
    gap: 10px;
`;
const Hr = styled.hr`
  margin: 15px 0px;
  border: 0.5px solid ${({theme})=>theme.soft} ;
`
// const Recommendation = styled.div`
//   flex: 3;

//   /* background-color: red; */
// `;
const Image= styled.img`
width: 36px;
height: 36px;
border-radius: 50%;

`;

const ChannelInfo= styled.div`
display: flex;
margin-top: 20px;
justify-content: space-between;

`;
const ChannelDetailWithLogo = styled.div`
display: flex;
  
`;
const ChannelDetail= styled.div`
display: flex;
flex-direction: column;
margin-left: 10px;
`;
const ChannelName= styled.span`
font-weight: 500;

`;
const ChannelSubscriber= styled.span`
margin-top: 5px;
margin-bottom: 20px;
color: ${({theme})=>theme.textSoft};
font-size: 12px;
`;
const ChannelDesc= styled.p`
font-size: 12px;
`;
const Subscriber = styled.button`
background-color:${(currentUser,channel)=>currentUser.subscribersUser?.includes(channel._id)?
           "#828181": "#841a1a"};
font-weight:500;
color: white;
border: none;
border-radius: 3px;
height: max-content;
padding: 10px 20px;
/* justify-content: flex-end; */
`;

const VideoFrame = styled.video`
  width: 100%;
  height: 720px;
border: 1px solid blue;
object-fit: cover;
`


function Video() {
  const {currentUser} = useSelector((state)=> state.user);
  const {currentVideo}= useSelector((state)=>state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split('/')[2];
    // console.log(path)
const [channel,setChannel]= useState({})
// const [video,setVideo]= useState({})
    useEffect(()=>{
      const fetchData = async ()=>{
        try {
          dispatch(fetchStart())
         
          const videoRes = await axios.get(`/video/find/${path}`);
          const channelRes = await axios.get(`/user/find/${videoRes.data.userId}`);
          // setVideo(videoRes.data)
          dispatch(fetchSuccess(videoRes.data))
          setChannel(channelRes.data)
          console.log("successfull fetch")
         
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    },[path,dispatch])
    // console.log(currentVideo.likes.lenght)
    const handleDisLikes=async()=>{
      // error due to i use current use id instead of video 
      try {
        console.log(currentUser)
        await axios.put(`/user/dislike/${currentVideo._id}`)
        dispatch(dislikes(currentUser._id))
      } catch (error) {
        console.log(error+" "+currentVideo._id)
      }
    }
    const handleLikes= async()=>{
      await axios.put(`/user/like/${currentVideo._id}`)
      dispatch(likes(currentUser._id))
    }
    const handleSubscribe =async()=>{
      // console.log("run the sub"+currentVideo.userId)
      currentUser.subscribersUser.includes(channel._id)?
      await axios.put(`/user/unsub/${channel._id}`):
      await axios.put(`/user/sub/${channel._id}`)
        dispatch(subscription(channel._id))   
    
    }


  return (
    <Container>
      <Content>
        <VideoWrapper>
          {/* <VideoFrame src="https://www.youtube.com/embed/CCF-xV3RSSs?si=YlZPn0k_sae6iMOK" cont/> */}
          <VideoFrame  controls>
          <source src={currentVideo.videoUrl} type="video/mp4" />
          </VideoFrame>

          
        
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>{currentVideo.views} view  {format(currentVideo.createdAt)}</Info>
          <Buttons>
            
            <Button onClick={handleLikes}>
            {currentVideo.likes?.includes(currentUser._id) ? (
           <ThumbUpIcon/>
             ): (<ThumbUpOutlined />)}
            {currentVideo.likes?.lenght}</Button>

            <Button onClick={handleDisLikes}>
             {currentVideo.dislikes?.includes(currentUser._id) ? (
             <ThumbDown />): (<ThumbDownOutlined/>)}
             Dislike</Button>
            <Button><ReplyOutlined />Share</Button>
            <Button><SaveIcon />Save</Button>
          </Buttons>
        </Details>
        <ChannelInfo>
          <ChannelDetailWithLogo>

        <Image src={channel.img}/>

         <ChannelDetail>
          <ChannelName>{channel.name}</ChannelName>
          <ChannelSubscriber>{channel.subscribers} Subscriber</ChannelSubscriber>
          <ChannelDesc>{currentVideo.desc}</ChannelDesc>
         </ChannelDetail>
         </ChannelDetailWithLogo>

          <Subscriber onClick={handleSubscribe}>
            {currentUser.subscribersUser?.includes(channel._id)?
          "SUBSCRIBED":"SUBSCRIBE"}
       
          </Subscriber>
        </ChannelInfo>
        <Hr/>
        <Comments videoId={currentVideo._id}/>
        
      </Content>
      {/* <Recommendation>
        <Cart type="sm"/>
        <Cart type="sm"/>
        <Cart type="sm"/>
        <Cart type="sm"/>
        <Cart type="sm"/>
        <Cart type="sm"/>
        <Cart type="sm"/>
        <Cart type="sm"/>
        <Cart type="sm"/>
        <Cart type="sm"/>
        <Cart type="sm"/>
        <Cart type="sm"/>
        <Cart type="sm"/>
        <Cart type="sm"/>
        <Cart type="sm"/>
        <Cart type="sm"/>
        <Cart type="sm"/>
        <Cart type="sm"/>
       
      </Recommendation> */}
    </Container>
  )
}

export default Video
