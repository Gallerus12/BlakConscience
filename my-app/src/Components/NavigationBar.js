
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
  import { useEffect } from 'react';
  import { UserContext } from '../UserContext';
  import { useContext } from 'react';
  
  const loginLink = ['Login']
  const subLink = ['Subscribe']
  const tagLink = ['Tags']
  const aboutLink = ['About']
  const registerLink = ['Register']
  const logoutLink = ['Logout']
  
  export default function Simple() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const {setUserInfo,userInfo} = useContext(UserContext);
    useEffect(() => {
      fetch('http://localhost:4000/profile', {
        credentials: 'include',
      }).then(response => {
        response.json().then(userInfo => {
          setUserInfo(userInfo);
        });
      });
    }, []);

    function logout() {
      fetch('http://localhost:4000/logout', {
        credentials: 'include',
        method: 'POST',
      });
      setUserInfo(null);
    }

    const username = userInfo?.username
  
    return (
      <>
        <Box bg={useColorModeValue('#ced5e5', '#1c2132')} px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
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
                {tagLink.map((link) => (
                  <Link as={Link} to='/Tags' key={link}>{link}</Link>
                ))}
                {aboutLink.map((link) => (
                  <Link as={Link} to='/About' key={link}>{link}</Link>
                ))}
                <HStack>
                {username && (
                  logoutLink.map((link) => (
                    <Link as={Link} to='/Logout' onClick={logout} key={link}>{link}</Link>
                  ))
                )}
                </HStack>
                {registerLink.map((link) => (
                  <Link as={Link} to='/Register' key={link}>{link}</Link>
                ))}
                {loginLink.map((link) => (
                  <Link as={Link} to='/Login' key={link}>{link}</Link>
                ))}
                <ColorModeSwitcher/>
              </HStack>
            </HStack>
          </Flex>
  
          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {subLink.map((link) => (
                  <Link as={Link} to='/Subscribe' key={link}>{link}</Link>
                ))}
                {tagLink.map((link) => (
                  <Link as={Link} to='/Tags' key={link}>{link}</Link>
                ))}
                {aboutLink.map((link) => (
                  <Link as={Link} to='/About' key={link}>{link}</Link>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>
  
    
      </>
    );
  }