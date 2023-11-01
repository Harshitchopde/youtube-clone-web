import { AddTaskOutlined, ReplyOutlined, ThumbDownOutlined, ThumbUpOutlined } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Comment from '../components/Comment';
import Cart from '../components/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { fetchStart, fetchSuccess } from '../redux/videoSlices';
import { format } from 'timeago.js';

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
const Recommendation = styled.div`
  flex: 3;

  /* background-color: red; */
`;
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
background-color: #cc1a00;
font-weight:500;
color: white;
border: none;
border-radius: 3px;
height: max-content;
padding: 10px 20px;
/* justify-content: flex-end; */
`;
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
color: ${({theme})=>theme.text};
background: transparent;
  
`;


function Video() {
  const {currentUser} = useSelector((state)=> state.user);
  const {currentVideo}= useSelector((state)=>state.video);
  const dispatch = useDispatch();
  const path = useLocation().pathname.split('/')[2];
    // console.log(path)
const [channel,setChannel]= useState({})
const [video,setVideo]= useState({})
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
          console.log(videoRes.data)
          console.log(channelRes.data)
        } catch (error) {
          console.log(error);
        }
      }
      fetchData();
    },[path,dispatch])
    console.log(currentVideo.likes.lenght)
  return (
    <Container>
      <Content>
        <VideoWrapper>
          <iframe width="100%" height="720" src="https://www.youtube.com/embed/eDjiMyXvOng?si=3Wi0fQUFHkh8opaQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
        </VideoWrapper>
        <Title>{currentVideo.title}</Title>
        <Details>
          <Info>{currentVideo.views} view  {format(currentVideo.createdAt)}</Info>
          <Buttons>
            
            <Button><ThumbUpOutlined />{currentVideo.likes?.lenght}</Button>
            <Button><ThumbDownOutlined />Dislike</Button>
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
          <ChannelDesc>How are you guys feeling joy in life , life is is't hard but seem to be..</ChannelDesc>
         </ChannelDetail>
         </ChannelDetailWithLogo>

          <Subscriber>Subscribe</Subscriber>
        </ChannelInfo>
        <Hr/>
        
        <NewComments>
          <Avatar src='https://cdn.pixabay.com/photo/2023/08/24/02/25/lord-krishna-8209645_1280.png'/>
          <Input placeholder='Add a Comments'/>
        </NewComments>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
        <Comment/>
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
