/* eslint-disable */

import React from 'react';
import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useColorModeValue, Text, Image, Link, Box, Stack, Avatar, Center, Heading, Card, VStack, Divider, Spacer, LinkOverlay, LinkBox, HStack } from '@chakra-ui/react';





const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const bg = useColorModeValue('#ced5e5', '#1c2132');

// This method fetches the posts from the database
useEffect(() => {
  async function getPosts() {
    const response = await fetch(`http://localhost:4000/post/`);

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    const posts = await response.json();
    setPosts(posts);
  }

  getPosts();

  return;
}, [posts.length]);

//This method will delete a record
async function deletePost(id) {
  await fetch(`http://localhost:4000/${id}`, {
    method: "DELETE"
  });

  const newPosts = posts.filter((el) => el._id !== id);
  setPosts(newPosts);

}

//This will map out the posts on the table
function postList() {
  
  return posts.map((post) => {
    return (
      <Post
        post={post}
        key={post._id}
        />

    )
  });
};

  return (
    <Box position={'relative'} marginBottom={'-300px'}>
      <HStack>
      {postList()}
      </HStack>
    </Box>
     
  );
};

export default PostsList;