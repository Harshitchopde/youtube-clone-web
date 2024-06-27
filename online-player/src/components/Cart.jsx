import { MoreVert } from '@mui/icons-material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { format } from 'timeago.js';
import { BASE_URL } from '../constants/constant';
const Container = styled.div`
/* width: 360px; */
width:${(props) => props.type !== "sm" && "360px"};
/* border: 1px solid red; */
display: ${(props) => props.type === "sm" && "flex"};
margin-bottom: ${(props)=>props.type==="sm"?"10px":"45px"};
cursor: pointer;
`;
const Image = styled.img`
width: 100%;
height:${(props) => props.type === "sm" ?"140px":"202px"};
background-color: #999;
margin:${(props)=>props.type==="sm" && "2px 20px"};
flex: 1;

`;
const Detail = styled.div`
  display: flex;
  
  width: 100%;
flex: 1;
  margin-top:${(props) => props.type !== "sm" && "16px"};
  gap: 12px;
`
const ChannelImage = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #999;
display: ${(props) => props.type === "sm" && "none"};
  
`;
const MiniTestx = styled.div`
  display: ${(props) => props.type === "sm"?"flex":"none"};
  display: flex;
  justify-content: space-between;
`
const Texts = styled.div`
  
`
const Title = styled.h1`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
`
const ChannelName = styled.h2`
font-size: 14px;
color: ${({ theme }) => theme.text};
margin: 9px 0px;

  
`
const Info = styled.div`
font-size: 14px;
color: ${({ theme }) => theme.text};

  
`;


function Cart({ type,video}) {
  const [channel,setChannel] = useState({});

  useEffect(()=>{
    const fetchChannel = async()=>{
      try{
        const res = await axios.get(BASE_URL+`/user/find/${video.userId}`)
        setChannel(res.data)
      }catch(error){
        console.log(error);
      }
    }
    fetchChannel()
  },[video.userId])
  console.log(video)
  return (
    <Link to={`/video/${video._id}`} style={{ textDecoration: "none", color: "inherit" }}>
      <Container type={type}>
        <Image type={type} src={video.imgUrl}></Image>
        <Detail type={type}>
          <ChannelImage  type={type} src={channel.img} />
          <Texts>
            <Title>{video.title}</Title>
            <ChannelName>{channel.name}</ChannelName>
            <Info>{video.views} views . {format(video.createdAt)} </Info>
          </Texts>
          <MoreVert />
        </Detail>
      </Container>
    </Link>

  )
}

export default Cart
