import emailjs from '@emailjs/browser'
import { useRef, useState } from 'react';
import {
    Flex,
    Stack,
    Heading,
    Text,
    Input,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react';

  export default function Subscribe() {
    const [text, setText] = useState('');
    const isValidEmail = /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/g;

    const form = useRef();


  
    const handleSubmit = (e) => {
      e.preventDefault();
    
      emailjs.sendForm('service_496770a', 'template_a11we1l', form.current, 'Ky2M87lJNVC7HVRmC')
      .then(function(response) {
      if (text && text.length && text.match(isValidEmail)) {
        window.alert("You have successfully subscribed!");
        console.log('Success!', response.status)
        setText('');
      } else {
        window.alert('Invalid Email')
        setText('')

      }
      }, function (error) {
        console.log(error)
      })
    }


    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        py={12}
        bg={useColorModeValue('#feefe7', 'Black')}>
        <Stack
          boxShadow={'2xl'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          p={10}
          spacing={8}
          align={'center'}>
          <Stack align={'center'} spacing={2}>
            <Heading
              textTransform={'uppercase'}
              fontSize={'3xl'}
              color={useColorModeValue('gray.800', 'gray.200')}>
              Subscribe
            </Heading>
            <Text fontSize={'lg'} color={'gray.500'}>
              Subscribe to stay updated on the latest posts!
            </Text>
          </Stack>
          <Stack spacing={4} direction={{ base: 'column', md: 'row' }} w={'full'}>
          <form onSubmit={handleSubmit} ref={form}>
            <Input
              type='email'
              name='user_email'
              isRequired
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={''}
              color={useColorModeValue('gray.800', 'gray.200')}
              bg={useColorModeValue('gray.100', 'gray.600')}
              rounded={'full'}
              border={0}
              _focus={{
                bg: useColorModeValue('gray.200', 'gray.800'),
                outline: 'none',
              }}
            />
            <Button
              bg={'blue.400'}
              rounded={'full'}
              color={'white'}
              flex={'1 0 auto'}
              top={'10px'}
              align={'center'}
              onClick={handleSubmit}
              _hover={{ bg: 'blue.500' }}
              _focus={{ bg: 'blue.500' }}>
              Subscribe
            </Button>
            </form>
          </Stack>
        </Stack>
      </Flex>
    );
  }
