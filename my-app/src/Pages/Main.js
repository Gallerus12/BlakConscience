import { Box, Flex, Text, VStack } from '@chakra-ui/layout'
import { useState, useEffect } from 'react';
import BlogPosts from '../BlogPosts'
import { TypeAnimation } from 'react-type-animation'
import SEO from '../Components/SEO';




export default function Main() {
    const [posts,setPosts] = useState([]);
    useEffect(() => {
      fetch('http://localhost:4000/post').then(response => {
        response.json().then(posts => {
          setPosts(posts);
        });
      });
    }, []);


    return (
      <>
      <SEO
      title='BlakConscience'
      description='Latest guides/advice for everything supporting the Black Community!'
      name='BlakConscience'
      type='article'/>
      <Box align={'center'} maxW={'100%'} fontSize={['2em', '3em', '4em', '6em']} justify={'center'} p={5}>
        <TypeAnimation
          sequence={[
            '<BlakConscience>',
            10000,
            '',
            1000,
          ]}
          speed={20}
          style={{ maxWidth: '100%', display: 'block'}}
          repeat={Infinity}
          deletionSpeed={60}
         />
      </Box>
        <Flex
        minH={'100vh'}
        align={'left'}
        justify={'left'}
        py={12}
        >
            <Box
            w='100%'
            > 
            <Text p={6} fontSize={'2xl'}>Recent Posts</Text>
            <VStack direction={['column', 'row']} spacing={'14px'} w={'inherit'} overflowY={'inherit'}>
                
                {posts.length > 0 && posts.map(post => (
                    <BlogPosts {...post} />
                ))}
            
            </VStack>
            </Box>
        </Flex>
    </>
    )
}