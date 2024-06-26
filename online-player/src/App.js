import styled, { ThemeProvider } from 'styled-components'
import Menu from './components/Menu';
import Navbar from './components/Navbar';
import { useState } from 'react';
import { darkTheme, lightTheme } from './utils/Theme';
import {
  BrowserRouter,
  
  Route,
  Routes,
} from "react-router-dom";
import Home from './pages/Home';
import Video from './pages/Video';
import SignIn from './components/SignIn';
const Container = styled.div`
  display:flex;


`
const Main = styled.div`
 flex: 6;
 background-color: ${({theme})=>theme.bg};
 color: ${({theme})=>theme.text};

`;
const Wrapper = styled.div`
/* padding: 22px 96px; */
`;

function App() {
  
  const [darkMode,setDarkMode] = useState(true);
  return (
    <>
    <ThemeProvider theme={darkMode ?darkTheme:lightTheme}>

      <Container>
        <BrowserRouter>
        <Menu darkMode={darkMode} setDarkMode={setDarkMode}/>
        <Main>
          <Navbar />
          <Wrapper>
            <Routes>
              <Route path="/">
                <Route index element={<Home type="random"/>} />
                <Route path='trends' element={<Home type="trend"/>} />
                <Route path='subscriptions' element={<Home type="sub"/>} />
                <Route path='video'>
                  <Route path=':id' element={<Video/>}/>  
                </Route>
                <Route path='signIn' element={<SignIn/>}/>
              </Route>
            </Routes>

          </Wrapper>

        </Main>

        </BrowserRouter>

      </Container>
   
    </ThemeProvider>
    </>

  );
}

export default App;
