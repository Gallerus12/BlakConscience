import {
    Box,
    Container,
    Input,
    Stack,
    Text,
    HStack,
    Button,
    useColorModeValue,
  } from '@chakra-ui/react';
  import { Link } from 'react-router-dom';
  import { useAuth0 } from "@auth0/auth0-react";
  import LoginButton from './LoginButton';
  import LogoutButton from './LogoutButton';
  

  
  export default function SmallWithNavigation() {
    const {
      isAuthenticated,
    } = useAuth0();
    return (
      <Box 
        as={'footer'}
        bg={useColorModeValue('WhiteAlpha 900', 'BlackAlpha 900')}
        color={useColorModeValue('gray.700', 'gray.200')}>
        <Container
          as={Stack}
          maxW={'6xl'}
          py={4}
          direction={{ base: 'column', md: 'row' }}
          spacing={4}
          justify={{ base: 'center', md: 'space-between' }}
          align={{ base: 'center', md: 'center' }}>
          <Stack direction={'row'} spacing={6}>
            <Link as={Link} to={'/Subscribe'}>Subscribe</Link>
            <Link as={Link} to={'/Tags'}>Tags</Link>
            <Link as={Link} to={'/About'}>About</Link>
            {isAuthenticated && (
                  <LogoutButton/>
                )}
            {!isAuthenticated && (
                  <LoginButton/>
                )}
         
          </Stack>
          <HStack>
          <Text>Subscribe!</Text>
          <Input
              type={'email'}
              focusBorderColor='lime'
              placeholder={'Email Address'}
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
                  color={'white'}
                  _hover={{
                    bg: 'red.500',
                  }}>
                  Submit
            </Button>
          </HStack>
        </Container>
      </Box>
    );
  }