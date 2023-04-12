import {Box, Text, Link, Img, Heading, Flex} from '@chakra-ui/react'
export default function BlogPostList({summary, author, cover, title, tag, _id, createdAt}) {
    return (
<Box margin={'auto'} maxW={600} w={[300,400,500,700, 600]} h={'100%'} border={'4px solid'} p='5'>
    <Box>
        <Text as='b' fontSize='sm'>Author: Elijah Turner</Text>
    </Box>
        <Box top={'3em'} >
            <Heading as='h3' size='md' as={Link} href={`/post/${_id}`}>Elden Ring is Loved by Everyone in the Gaming Community</Heading>
        </Box>
        <Text as='i' >{tag}</Text>
            <Flex maxH={'100px'} >   
                <Box w={'100%'}>
                    <Text overflow={'hidden'} noOfLines={[2, 2, 3]}>
                    {summary}</Text>
                </Box>
                <Box bg='blue' w={[0,100,200,250]}>
                    <Img
                    src={'http://localhost:4000/' + cover}
                    boxSize={'100%'}
                    maxW={'100%'}
                    
                    
                 
                    
                    />
                </Box>
            </Flex>
        
    </Box>

    )   
    }