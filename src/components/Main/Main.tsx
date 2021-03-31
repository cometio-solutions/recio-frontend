import { Flex } from '@chakra-ui/react';
import Footer from '../utils/Footer';
import Index from '../Index/Index';
import NavBar from '../utils/NavBar';
import React from 'react';
import { Route } from 'react-router';

export default function Main() {
    return (
        <Flex as="main" direction="column" minH="100vh">
            <NavBar />
            <Flex
                h="auto"
                flexGrow={1}
                as="main"
                direction="column"
                alignItems="center"
            >
                <Route exact path="/" component={Index} />
            </Flex>
            <Footer />
        </Flex>
    );
}
