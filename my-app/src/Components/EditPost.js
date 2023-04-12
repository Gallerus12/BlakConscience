import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
Textarea,
  } from '@chakra-ui/react';
import Editor from "../Editor";

export default function EditPost() {

  const {id} = useParams();
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [author, setAuthor] = useState('');
  const [tag, setTag] = useState('');
  const [content,setContent] = useState('');
  const [files, setFiles] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:4000/post/'+id)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setTag(postInfo.tag);
          setContent(postInfo.content);
          setAuthor(postInfo.author);
          setSummary(postInfo.summary);
        });
      });
  }, []);




    async function updatePost(e) {
        e.preventDefault();
       const data = new FormData();
       data.set('title', title);
       data.set('tag', tag);
       data.set('summary', summary);
       data.set('author', author);
       data.set('content', content);
       data.set('id', id);
       if (files?.[0]) {
        data.set('file', files?.[0]);
       }



     const response = await fetch(`http://localhost:4000/post`, {
            method: "PUT",
            body: data,
        });
        if (response.ok) {
          navigate("/");
        } else {
          navigate('/post/'+id)
        }
    }

    return (
        <Stack spacing={8} mx={'auto'} maxW={'xlg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Edit Post</Heading>
        
        </Stack>
        <Box
          rounded={'lg'}
          boxShadow={'lg'}
          p={8}
          maxW={'auto'}
          w={'100%'}
          >
          <Stack spacing={4}>
            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input isValid type="text" maxLength={'100'} value={title} onChange={(e) => setTitle(e.target.value)}  />
            </FormControl>
            <FormControl id="author" isRequired>
              <FormLabel>Author</FormLabel>
              <Input type="text" value={author} onChange={(e) => setAuthor(e.target.value )} />
            </FormControl>
            <FormControl id="summary" isRequired>
              <FormLabel>Summary</FormLabel>
              <Input isRequired errorbordercolor={'red.500'} minlength='100' maxlength='120' as={Textarea} type="text" value={summary} onChange={(e) => setSummary(e.target.value )} />
            </FormControl>
            <FormControl id='tags' isRequired>
                <FormLabel>Tags</FormLabel>
                <Input type='text' placeholder='Enter Tags' value={tag} onChange={(e) => setTag(e.target.value )}/>
            </FormControl>
            <FormControl id='file' isRequired>
                <FormLabel>File</FormLabel>
                 <Input type='file' accept='image/*' onChange={(e) => setFiles(e.target.files )}/>
            </FormControl>
           
            <Editor isRequired placeholder='Input Content' value={content} onChange={(e) => setContent(e.target.value )}/>
        
            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                
                isDisabled={!title || !summary || !tag || !content || !author || !files}
                onClick={updatePost}
                value={"update post"}>
                   
                    Create
                  
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>

    )
}