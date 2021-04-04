import { Center, Flex, Heading, Stack, Text } from '@chakra-ui/react';

import NavItem from './NavItem';
import React from 'react';
import type { ReactElement } from 'react';

export default function NavBar(): ReactElement {
    return (
        <Center bg="gray.50" as="header">
            <Flex py="3" maxW="container.lg" w="full" alignItems="center">
                <Heading as="h1" size="md" color="blue.600">
                    recIO
                </Heading>
                <Stack direction="row" ml="10" flexGrow={1}>
                    <NavItem href="/" text="Strona główna" active />
                    <NavItem href="/" text="Twardy" />
                    <NavItem href="/" text="Działa Oracle?" />
                    <NavItem
                        href="/login"
                        onClick={() => {
                            sessionStorage.removeItem('token');
                            sessionStorage.removeItem('role');
                        }}
                        text="Wyloguj mnie"
                        right
                    />
                </Stack>
            </Flex>
        </Center>
    );
}