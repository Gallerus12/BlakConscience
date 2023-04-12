import {
    Box,
    Flex,
    HStack,
    IconButton,
    useDisclosure,
    useColorModeValue,
    Stack,
  } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { ColorModeSwitcher } from '../ColorModeSwitcher';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import Profile from './Profile';
import { useAuth0 } from '@auth0/auth0-react';
  
  const subLink = ['Subscribe']
  const searchLink = ['Search']
  
  export default function Simple() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const bg = useColorModeValue('WhiteAplha 900', 'BlackAlpha 900');
    const {
      isAuthenticated,
    } = useAuth0();
   
    return (
      
    
       <>
        <Box bg={bg} px={4}>
          
          <Flex h={'auto'} alignItems={'center'} justifyContent={'space-between'} maxW={'100%'}>
          <IconButton
            
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
            />
            <HStack spacing={8} alignItems={'center'}>
              <Box as={Link} to='/'>BlakConscience</Box>
              <HStack
                as={'nav'}
                spacing={4}
                display={{ base: 'none', md: 'flex' }}>
                {subLink.map((link) => (
                  <Link as={Link} to='/Subscribe' key={link}>{link}</Link>
                ))}
                {searchLink.map((link) => (
                  <Link as={Link} to='/Search' key={link}>{link}</Link>
                ))}
               {isAuthenticated && (
                  <>
                  <LogoutButton />
                  <Link as={Link} to='/CreatePost'>Create</Link>
                  <Link as={Link} to='/EditPost'>Edit</Link>
                  </>
                )}
                {!isAuthenticated && (
                  <LoginButton/>
                )}
                <Profile />
                <ColorModeSwitcher/>
              </HStack>
            </HStack>
      
          
          {isOpen ? (
            <Box h={10} display={{ md: 'none' }} align={'center'} marginBottom={'50px'}>
              <Stack as={'nav'}>
                {subLink.map((link) => (
                  <Link as={Link} to='/Subscribe' key={link}>{link}</Link>
                ))}
                {searchLink.map((link) => (
                  <Link as={Link} to='/Search' key={link}>{link}</Link>
                ))}
                 {isAuthenticated && (
                  <>
                  <LogoutButton />
                  <Link as={Link} to='/CreatePost'>Create</Link>
                  <Link as={Link} to='/EditPost'>Edit</Link>
                  </>
                )}
                {!isAuthenticated && (
                  <LoginButton/>
                )}
                <ColorModeSwitcher/>
              </Stack>
            </Box>
          ) : null}
          </Flex>
        </Box>
      </>
    );
                }
  
