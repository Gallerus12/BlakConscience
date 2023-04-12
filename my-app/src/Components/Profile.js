import { useAuth0 } from "@auth0/auth0-react"
import { Box, Flex, Text } from "@chakra-ui/layout";
import React from "react";

export default function Profile() {

    const { user, isAuthenticated, isLoading } = useAuth0();

    if (isLoading) {
        return <Box>Loading...</Box>
    }


    return (
        isAuthenticated && (
            <Flex>
                <Box>{user.name}</Box>
                <Text>{user.email}</Text>
            </Flex>
        )
    )
}