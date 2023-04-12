import React from 'react';
import {ChakraProvider} from '@chakra-ui/react';
import Simple from './Components/NavigationBar'
import Subscribe from './Pages/Subscribe';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Main from './Pages/Main';
import { extendTheme } from '@chakra-ui/react';
import Footer from './Components/Footer';
import { mode } from '@chakra-ui/theme-tools';
import CreatePost from './Components/CreatePost';
import PostPage from './Pages/PostPage';
import EditPost from './Components/EditPost';
import Search from './Pages/Search';
import "@fontsource/source-serif-pro/400.css";
import { HelmetProvider } from 'react-helmet-async';





const theme = extendTheme({

  fonts: {
    heading: `"Source Serif Pro", serif, Times New Roman, Cambria, Georgia`,
    body: `"Source Serif Pro", serif, Times New Roman, Cambira, Georgia`,
  },


  styles: {
    global: (props: StyleFunctionProps) => ({
      body: {
        bg: mode('WhiteAlpha 900', '#0d0c0c')(props),
      },
      box: {
        bg: mode('#ced5e5', '#1c2132')(props),
      },
      FormControl: {
        bg: mode('#ced5e5', '#1c2132')(props),
      }
    }),
  },
})


 function App() {
 
  return (
  <HelmetProvider>
    <ChakraProvider theme={theme}>
      <Router>
        <Simple />
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/Subscribe' element={<Subscribe/>}/>
            <Route path='/CreatePost' element={<CreatePost/>}/>
            <Route path='/post/:id' element={<PostPage/>}/>
            <Route path='/edit/:id' element={<EditPost/>}/>
            <Route path='/Search' element={<Search/>}/>
          </Routes>
          <Footer/>
      </Router>
    </ChakraProvider>
  </HelmetProvider>
  
  );
}

export default App;
