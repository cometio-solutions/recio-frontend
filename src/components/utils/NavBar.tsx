import { Center, Flex, Heading, Stack, Text } from '@chakra-ui/react';

import NavItem from './NavItem';
import React from 'react';
import type { ReactElement } from 'react';

export default function NavBar(): ReactElement {
    const isAdmin = sessionStorage.getItem('role') === 'admin';
    return (
        <Center bg="gray.50" as="header">
            <Flex py="3" maxW="container.lg" w="full" alignItems="center">
                <Heading as="h1" size="md" color="blue.600" cursor="default">
                    recIO
                </Heading>
                <Stack direction="row" ml="10" flexGrow={1}>
                    <NavItem href="/" text="Strona główna" active />
                    <NavItem href="/recruitment" text="Lista rekrutacji" />
                    {isAdmin && (
                        <NavItem href="/admin" text="Panel administratora" />
                    )}
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
