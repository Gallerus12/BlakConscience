import { Box, Container, Heading, Image, Text, Link, useColorModeValue} from '@chakra-ui/react'
import {formatISO9075} from 'date-fns';
import { NavLink } from 'react-router-dom'




export default function BlogPosts({_id, title, summary, author, createdAt, cover, tag}) {

    
    return(
      <>
      <Container p="5"   maxW={'100%'}>
   
      <Box
      
        marginTop={{ base: '1', sm: '5' }}
        display="flex"
        flexDirection={{ base: 'column', sm: 'row' }}
        justifyContent="space-between">
        <Box
        
          display="flex"
          flex="1"
          marginRight="3"
          position="relative"
          alignItems="center">
          <Box
          
            w={'sm'}
            maxW={'sm'}
            zIndex="2"
            marginLeft={{ base: '0', sm: '5%' }}
            marginTop="5%">
            <Link textDecoration="none" _hover={{ textDecoration: 'none' }}>
              <Image
                borderRadius="md"
                src={'http://localhost:4000/' + cover}
                alt="some good alt text"
                objectFit="contain"
              />
            </Link>
          </Box>
          <Box zIndex="1" w="100%" position="absolute" height="100%">
            <Box
              bgGradient={useColorModeValue(
                'radial(orange.600 1px, transparent 1px)',
                'radial(orange.300 1px, transparent 1px)'
              )}
              backgroundSize="20px 20px"
              opacity="0.4"
              height="100%"
            />
          </Box>
        </Box>
        <Box
          w={'inherit'}
          display="flex"
          flex="1"
          flexDirection="column"
          justifyContent="center"
          marginTop={{ base: '3', sm: '0' }}>
          <Heading marginTop="1">
            <Link as={NavLink} to={`/post/${_id}`} textDecoration="none" _hover={{ textDecoration: 'none' }}>
              {title}
            </Link>
          </Heading>
          <Text color={'grey'} as={'i'}> {tag} </Text>
          <Text
            noOfLines={4}
            as="p"
            marginTop="2"
            color={useColorModeValue('gray.700', 'gray.200')}
            fontSize="lg">
              {summary}
          </Text>
          <Text as={'b'} fontSize={'xs'}> {author} </Text>
        </Box>
      </Box>
      </Container>
      </>
    )
}