import { Flex, Text, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, VStack, Stack} from "@chakra-ui/react";
import { useState} from "react";
import {Select} from 'chakra-react-select';
import * as React from 'react'
import BlogPostList from "../BlogPostList";

 const getOptions = [
  { value: 'Finance', label: 'Blak Finance'},
  { value: 'Gaming', label: 'Gaming '},
  { value: 'Relationships', label: 'Blak Relationships'}
];



export default function Search ()  {
  const [posts, setPosts] = useState([]);
  const [text, setText] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure()



  const getDataFromAPI = (e) => {
    e.preventDefault()
    console.log("Options Fetched from API")
 
    fetch(`http://localhost:4000/post`).then(response => {
      response.json().then(posts => {
        setPosts(posts.filter(posts => posts.tag === text));
        
      });
 
     
    });

    

  }

 


    return (
      
      <>
       
        <Flex
        border={'none'}
        minH={'100vh'}
        p={'0.5rem'}
        position={'relative'}
        align={'center'}
        justify={'center'}>
          
      <Stack spacing={8} align={'center'} h={'lg'}>
      <Button onClick={onOpen}>Click Me!</Button>
  
  <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Search Options</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
          <Text>Gaming</Text>
          <Text>Finance</Text>
          <Text>Relationship</Text>
          <Text>Space</Text>

      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          Close
        </Button>
        <Button variant='ghost'>Secondary Action</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
        <Stack
        spacing={4}
        w={[300,400,500,600]}
        direction={'column'}
    
        
        >
      <Select
        name="global-color-scheme"
        colorScheme="green"
        options={getOptions}
        isClearable={false}
        onChange={(e) => setText(e.value)}
       
        
        
 
      />

        <Button
        onClick={getDataFromAPI}>Search</Button>
        </Stack>

    
        
            <VStack overflow={'auto'} >
             
            {posts.length > 0 && posts.map(post => (
                    <BlogPostList {...post} />
               ))}
          
            </VStack>
          
    
      </Stack>

       </Flex>
        
     </>  
        
    )
  }
  
 