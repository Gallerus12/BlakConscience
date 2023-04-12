import { Box, Flex, Text, Spacer, Link } from "@chakra-ui/layout";
import React, {useState, useEffect} from 'react';
import { useNavigate, useParams } from "react-router";
import {Heading, Button, Img} from '@chakra-ui/react';
import { useAuth0 } from '@auth0/auth0-react';
import SEO from "../Components/SEO";








export default function PostPage() {
    const [postInfo, setPostInfo] = useState();
    const {id} = useParams();
    const navigate = useNavigate('/');
    const regex = /(<([^>]+)>)/ig;
const {
    
    isAuthenticated,
  } = useAuth0();

    useEffect(() => {
      fetch(`http://localhost:4000/post/${id}`).then(response => {
            response.json().then(postInfo => {
              setPostInfo(postInfo);
            
            });
          });
      }, []);
    
      if (!postInfo) return navigate;



    
    return (
        <>
    <SEO 
        title={postInfo.title}
        description={postInfo.summary}
        type="article"
        name={postInfo.author}/>
        <Flex
        minH={'100vh'}
        border={'none'}
        >
            <Box
            p={4}
            position={'relative'}
            marginLeft={'5%'}
            justify={'space-evenly'}
            w={'100%'}
            display={'block'}
            >
                {isAuthenticated && (
                   <>
                   <Button as={Link} href={`/edit/${postInfo._id}`}>
                    Edit
                   </Button>
                   </> 
                )}
                <Box  
                position={'relative'}
                margin={'auto'}
                p={2}
                >
                    <Heading
                    p={2}
                    margin={'auto'}
                    as='h3'
                    size={'lg'}
                    marginBottom={'auto'}>{postInfo.title}</Heading>
                
                <Box
                py={4}
                margin={'auto'}
                maxW={'100%'}
                w={'100%'}
                h={'auto'}
                 >
                    <Img
                    src={'http://localhost:4000/' + postInfo.cover}
                    boxSize={'300px'}
                    h={'400px'}
                    w={'500px'}
                    border={'4px'}/>
                </Box>
                <Spacer/>
                    <Box
                    marginTop={'10px'}
                    w={'100%'}
                    >
                          <Text
                        fontSize={'lg'}>{postInfo.summary}</Text>
                    </Box>
                    <Box
                    w={'100%'}
                    marginTop={'10px'}>
                        <Text
                        fontSize={'lg'}>{postInfo.content.replace(regex, '')}</Text>
                    </Box>
                </Box>
            </Box>
        </Flex>
        </>    
    )
                }
