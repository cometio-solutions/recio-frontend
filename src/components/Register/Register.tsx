import { Box, Center, Heading } from '@chakra-ui/react';
import React, { ReactElement } from 'react';
import RegisterForm from './RegisterForm';

export default function Register(): ReactElement {
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
                minH="400"
                textAlign="center"
            >
                <Heading color="blue.500" textAlign="center">
                    RecIO
                </Heading>
                <RegisterForm />
            </Box>
        </Center>
    );
}
