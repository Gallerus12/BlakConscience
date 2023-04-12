
import { useNavigate } from "react-router";
import { useState } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react';
import 'react-quill/dist/quill.snow.css'
import Editor from '../Editor'
import {Select} from 'chakra-react-select';



export default function CreatePost() {
  const bg = useColorModeValue('#ced5e5', '#1c2132');
  const getOptions = [
    { value: 'Blak Finance', label: 'Blak Finance'},
    { value: 'Gaming', label: 'Gaming '},
    { value: 'Blak Relationships', label: 'Blak Relationships'}
  ];
  const [title,setTitle] = useState('');
  const [summary,setSummary] = useState('');
  const [content,setContent] = useState('');
  const [author, setAuthor] = useState('');
  const [tag, setTag] = useState();
  const [files, setFiles] = useState('');


    const navigate = useNavigate();

    


    //This will handle submission
    async function onSubmit(e) {
      const data = new FormData();
      data.set('title', title);
      data.set('summary', summary);
      data.set('author', author);
      data.set('tag', tag);
      data.set('content', content);
      data.set('file', files[0]);
      e.preventDefault();

      

    const response =await fetch("http://localhost:4000/post", {
       method: "POST",
       body: data,
      })
      .catch(error => {
        window.alert(error);
        return;
      });
      console.log(await response.json())
      
      navigate("/");
  }
    
    return (
        <Stack spacing={8} mx={'auto'} maxW={'70%'} py={12} px={6} maxH={'50%'}>
        <Box
          bg={bg}
          rounded={'lg'}
          boxShadow={'lg'}
          p={8}
          maxW={'auto'}
          >
          <Stack spacing={4}>
            <Box textAlign={'center'} fontSize={'3xl'}>Create New Post</Box>
            <FormControl id="title" isRequired>
              <FormLabel>Title</FormLabel>
              <Input as={'Textarea'} type="title" maxLength={'100'} value={title} onChange={(e) => setTitle(e.target.value )} />
            </FormControl>
            <FormControl id="author" isRequired>
              <FormLabel>Author</FormLabel>
              <Input type="author" value={author} maxLength={'50'} onChange={(e) => setAuthor(e.target.value )} />
            </FormControl>
            <FormControl id="summary" isRequired>
              <FormLabel>Summary</FormLabel>
              <Input type="summary" as={'Textarea'} minlength='100' maxlength='120' value={summary} onChange={(e) => setSummary(e.target.value )} />
            </FormControl>
            <FormControl id='tags' isRequired>
                <FormLabel>Tags</FormLabel>
                <Select options={getOptions} type={'text'} onChange={(e) => setTag(e.value)}  />
            </FormControl>
            <FormControl action="/post" method="post" enctype="multipart/form-data">
            <Input type='file' name="file" accept="image/*" className="form-control-file" onChange={e => setFiles(e.target.files)} />
            </FormControl>
            <Editor value={content} minlength='1' onChange={setContent}    />
        
            <Stack spacing={10}>
              <Button
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}
                onClick={onSubmit}
                >
                   
                    Create
                  
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    )
}