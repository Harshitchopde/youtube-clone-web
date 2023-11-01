import React from 'react'
import styled from 'styled-components'
import tubelog from '../img/tubelog.png'
import HomeIcon from '@mui/icons-material/Home';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import VideoLibraryOutlinedIcon from '@mui/icons-material/VideoLibraryOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import LibraryMusicOutlinedIcon from '@mui/icons-material/LibraryMusicOutlined';
import SportsBasketballOutlinedIcon from '@mui/icons-material/SportsBasketballOutlined';
import SportsEsportsOutlinedIcon from '@mui/icons-material/SportsEsportsOutlined';
import LocalMoviesOutlinedIcon from '@mui/icons-material/LocalMoviesOutlined';
import NewspaperOutlinedIcon from '@mui/icons-material/NewspaperOutlined';
import LiveTvOutlinedIcon from '@mui/icons-material/LiveTvOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import NightlightRoundOutlinedIcon from '@mui/icons-material/NightlightRoundOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { dark } from '@mui/material/styles/createPalette';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Container = styled.div`
  flex: 1;
  background-color: ${({theme}) =>theme.bg};
  color: ${({theme})=>theme.text};
  height: 100vh;
  font-size: 17px;
  
  position: sticky;
  top: 0;
`;
const Login = styled.div`

`
const Button = styled.button`
  padding: 5px 15px;
  background-color: transparent;
  border: 1px solid #3ea6ff;
  color: #3ea6ff;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: 10px;
  border-radius: 3px;


`
const Wrapper = styled.div`
padding: 18px 26px;

  
`;
const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 30px;
 
`;
const Img = styled.img`
height: 25px;
  
`;
const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  cursor: pointer;
  padding: 7.5px 0px;
  &:hover{
    background-color:${({theme})=>theme.hover};
  }

`;
const Hr = styled.hr`
margin: 15px 0px;
border: 0.5px solid ${({theme})=>theme.soft};

`
const Title = styled.h2`
  font-size: 14px;
  font-weight: 500;
  color: #aaaaaa;
  margin-bottom: 20px;
`
function Menu({darkMode,setDarkMode}) {
  const {currentUser} = useSelector(state=>state.user)
  return (
    <Container>
      <Wrapper>
       
        <Logo>
          <Img src={tubelog} />


          OnlinePlayer
        </Logo>

      
        <Link to="/" style={{textDecoration:"none",color:"inherit"}}>

        <Item>
          <HomeIcon />
          Home
        </Item>
        </Link>
        
        <Link to="trends" style={{textDecoration:"none",color:"inherit"}}>

        <Item>
          <ExploreOutlinedIcon />
          Explore
        </Item>
        </Link>
        <Link to="subscriptions" style={{textDecoration:"none",color:"inherit"}} >
          
        <Item>
          <SubscriptionsOutlinedIcon />
          Subscription
        </Item>
        </Link>
        <Hr/>
        <Item>
          <VideoLibraryOutlinedIcon />
          Library
        </Item>
        <Item>
          <HistoryOutlinedIcon />
          History
        </Item>
        <Hr/>
        {!currentUser && <><Login>
          Sign in to like Vides , suscribe and many more
          <Link to="signIn" style={{textDecoration:"none"}}>

          <Button><PersonOutlineOutlinedIcon/>Sign in</Button>
          </Link>

        </Login>
        <Hr/>
        </>
        }
        <Title>
          BEST OF FUTURE
        </Title>
        <Item>
          <LibraryMusicOutlinedIcon />
          Music
        </Item>
        <Item>
          <SportsBasketballOutlinedIcon />
          Sports
        </Item>
        <Item>
          <SportsEsportsOutlinedIcon />
          Gaming
        </Item>
        <Item>
          <LocalMoviesOutlinedIcon />
          Movies
        </Item>
        <Item>
          <NewspaperOutlinedIcon />
          Newspapers
        </Item>
        <Item>
          <LiveTvOutlinedIcon />
          Live
        </Item>
       <Hr/>
        <Item>
          <SettingsOutlinedIcon/>
          Setting
        </Item>
        <Item>
          <FlagOutlinedIcon />
          Report
        </Item>
        <Item>
          <HelpOutlineOutlinedIcon/>
          Help
        </Item>
        <Item onClick={()=>{setDarkMode(!darkMode)}}>
          <NightlightRoundOutlinedIcon />
          {darkMode?"Light Mode":"Dark Mode"}
        </Item>
       
      </Wrapper>
    </Container>
  )
}

export default Menu
