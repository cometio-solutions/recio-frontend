import Admin from '../Admin/Admin';
import { Flex } from '@chakra-ui/react';
import Index from '../Index/Index';
import NavBar from '../utils/NavBar';
import React from 'react';
import RecruitmentSummary from '../RecruitmentSummary/RecruitmentSummary';
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
                <Route exact path="/admin" component={Admin} />
                <Route path="/summary" component={RecruitmentSummary} />
            </Flex>
        </Flex>
    );
}
