import { AccountCircleOutlined, SearchOutlined, VideoCallOutlined } from '@mui/icons-material';
import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components'
// import { logout } from '../redux/userSlices';
import Upload from './Upload';

const Container = styled.div`
  position: sticky;
  top: 0;
  background-color: ${({ theme }) => theme.bgLighter};
  height: 56px;
`;
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: flex-end;
height: 100%;
padding: 0px 20px;
position: relative;
/* background-color: aqua; */
  
`;
const Search = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  width: 40%;
  justify-content: space-between;
  padding: 5px;
  border: 1px solid #5e5e5e;
  border-radius: 3px;

`;
const Input = styled.input`
    background-color: transparent;
    width: 90%;
    color: ${({ theme }) => theme.text};
    border: none;
    outline: none;// it is for outline of input of search bar
`;
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

const User = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  
  font-weight: 500;
  color:${({ theme }) => theme.text};

`
const Avatar = styled.img`
  height: 32px;
  width: 32px;
  border-radius: 50%;
  background-color: #999;
`
const Logout = styled.button`
  align-items: center;

`
function Navbar() {
  const [open,setOpen]=useState(false);
  const { currentUser } = useSelector(state => state.user)

  return (
    <>
    <Container>
      <Wrapper>
        <Search>
          <Input placeholder='Search Any thing' />
          <SearchOutlined />
        </Search>
        {currentUser?(
        <User>
          <VideoCallOutlined 
          style={{cursor:'pointer'}}
          onClick={()=>setOpen(true)}/>
          <Avatar/>
          {currentUser.name}
          
        </User>
       ): <Link to="signIn" style={{textDecoration:"none"}}>

        <Button>
          <AccountCircleOutlined />
          SIGN IN
        </Button>
        </Link>
        }

        {/* // to delete after dev */}
        <Link to="signIn" style={{ textDecoration: "none" }}>

          <Button>
            <AccountCircleOutlined />
            SIGN IN
          </Button>
        </Link>
      </Wrapper>
    </Container>
  {open && <Upload setOpen={setOpen}/>}
    </>

  )
}

export default Navbar
