import { Flex, Center, Heading, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { Route } from 'react-router';
import Index from '../Index/Index';
import NavItem from './NavItem';

export default function Main() {
    return (
        <Flex as="main" direction="column" minH="100vh">
            <Center bg="gray.50" as="header">
                <Flex py="3" maxW="container.lg" w="full" alignItems="center">
                    <Heading as="h1" size="md" color="blue.600">
                        recIO
                    </Heading>
                    <Stack direction="row" ml="10" flexGrow={1}>
                        <NavItem href="/" text="Strona główna" active />
                        <NavItem href="#" text="Twardy" />
                        <NavItem href="#" text="Działa Oracle?" />
                        <NavItem href="#" text="Wyloguj mnie" right />
                    </Stack>
                </Flex>
            </Center>
            <Flex
                h="auto"
                flexGrow={1}
                as="main"
                direction="column"
                alignItems="center"
            >
                <Route exact path="/" component={Index} />
            </Flex>
            <Center bg="gray.50" as="footer">
                <Flex py="6" maxW="container.lg" w="full" alignItems="center">
                    <Heading as="h1" size="md">
                        <Text color="blue.600">recIO</Text>
                    </Heading>
                    <Stack direction="row" ml="2">
                        <NavItem href="#" text="Polityka prywatności" />
                        <NavItem href="#" text="Regulamin" />
                    </Stack>
                </Flex>
            </Center>
        </Flex>
    );
}
