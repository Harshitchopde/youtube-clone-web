import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { loginStart, loginSuccess, loginfailure } from '../redux/userSlices'
import { auth,provider } from '../firebase'
import { signInWithPopup } from 'firebase/auth'
const Constainer = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;

/* height: calc(100vh -56px); */
/* calc--> calculate */
height: 100vh;
color: ${({theme})=>theme.text};
`
const Wrapper = styled.div`
display: flex;
align-items: center;
flex-direction: column;
background-color: ${({theme})=>theme.bgLighter};
border: 1px solid  ${({theme})=>theme.soft};
padding: 20px 50px;
gap: 10px;

`
const Title = styled.h1`
font-size: 24px;
`
const SubTitle = styled.h2`

font-size:20px;
font-weight:300;
`
const Input = styled.input`
    border: 1px solid  ${({theme})=>theme.soft};
    border-radius: 3px;
    outline: none;
    padding: 10px;
    color:  ${({theme})=>theme.text};
    background-color: transparent;
    width: 100%;
    font-size: 14px;
`
const Button = styled.button`
    border-radius: 3px;
    background: ${({theme})=>theme.soft};
    color: ${({theme})=>theme.textSoft};
    cursor: pointer;
    border: none;
    padding: 10px 20px;
`
const More = styled.div`
    display: flex;
    font-size: 12px;
    margin-top: 10px;
    color:${({theme})=>theme.textSoft};
    
`
const Links = styled.div`
    margin-left: 50px;
`
const Link = styled.span`
margin-left: 30px;
`
// const Constainer = styled.div``
function SignIn() {
    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const dispatch = useDispatch();
    const handleSignIn = async(e)=>{
        e.preventDefault();
        dispatch(loginStart())
        try {
            const res = await axios.post("/auth/signin",{name,password})
            console.log(res.data);
            dispatch(loginSuccess(res.data))
            
        } catch (error) {
            dispatch(loginfailure())
        }
    }
    const handlesiginwithgoogle= async()=>{
        try {
            dispatch(loginStart())
            signInWithPopup(auth,provider).then((result)=>{
             axios.post('/auth/google',{
                name:result.user.displayName,
                email:result.user.email,
                img:result.user.photoURL,
             }).then((res)=>{
                dispatch(loginSuccess(res.data))
             })
                
            })
        } catch (error) {
            dispatch(loginfailure())
        }
    } 
  return (
    <Constainer>
        <Wrapper>
           <Title>Sign in</Title>
           <SubTitle>to continue to Online</SubTitle>
           <Input placeholder='Username' onChange={(e)=>setName(e.target.value)}/>
           <Input type='password' placeholder='password' onChange={(e)=>setPassword(e.target.value)}/>
           <Button onClick={handleSignIn}>Sign in</Button>
           <Title>Or</Title>
           <Button onClick={handlesiginwithgoogle}>Sigin  with google</Button>
           <Title>Or</Title>
           <Input placeholder='username' onChange={(e)=>setName(e.target.value)} />
           <Input placeholder='email' onChange={(e)=>setEmail(e.target.value)}/>
           <Input type='password' placeholder='password'onChange={(e)=>setPassword(e.target.value)}/>
           <Button>Sign Up</Button>
        </Wrapper>
        <More>
            Englist(us)
            <Links>
                <Link>Help</Link>
                <Link>Privacy</Link>
                <Link>Terms</Link>
            </Links>
        </More>
    </Constainer>
  )
}

export default SignIn
