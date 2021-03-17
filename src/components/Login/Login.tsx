import { Box, Center, Heading } from '@chakra-ui/layout';
import React, { ReactElement } from 'react';
import LoginForm from './LoginForm';

export default function Login(): ReactElement {
    return (
        <Center
            bgGradient="linear(to-r, blue.500, blue.200)"
            minH="100vh"
            py="12"
            px={{ sm: '6', lg: '8' }}
        >
            <Box
                bg="#F5F5F5"
                boxShadow="dark-lg"
                p="6"
                rounded="md"
                w="40%"
                h="400"
                textAlign="center"
            >
                <Heading color="blue.500" textAlign="center">
                    RecIO
                </Heading>
                <LoginForm/>
            </Box>
        </Center>
    );
}
