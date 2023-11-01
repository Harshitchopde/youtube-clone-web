import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    margin: 20px 5px;
`;
const Wrapper = styled.div`
margin-left: 15px;
    
`;
const Avatar = styled.img`
width: 36px;
height: 36px;
border-radius: 50%;
  
`;
const SemiWrapper = styled.div`

display: flex;
gap: 10px;
    
`;
const ChannelName = styled.span`
font-weight: 500;

    
`
const Time = styled.span`
color: ${({theme})=>theme.textSoft};
font-size: 14px;
font-weight: 300;
    
`;
const SingleComt = styled.p`
color: ${({theme})=>theme.text};
    font-weight: 300;
    font-size: 16px;
`;
function Comment() {
  return (
    <Container>
        <Avatar src='https://cdn.pixabay.com/photo/2023/08/24/02/25/lord-krishna-8209645_1280.png'/>
        <Wrapper>
            <SemiWrapper>
                <ChannelName>ChopdeHarshit</ChannelName>
                <Time>12 day</Time>
            </SemiWrapper>
            <SingleComt>how are you guys hop you are doing well please comment below</SingleComt>

        </Wrapper>
    </Container>
  )
}

export default Comment
