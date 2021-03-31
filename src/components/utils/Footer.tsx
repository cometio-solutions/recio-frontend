import { Center, Flex, Heading, Stack, Text } from '@chakra-ui/react';

import NavItem from './NavItem';
import React from 'react';
import type { ReactElement } from 'react';

export default function Footer(): ReactElement {
    return (
        <Center bg="gray.50" as="footer">
            <Flex py="6" maxW="container.lg" w="full" alignItems="center">
                <Heading as="h1" size="md">
                    <Text color="blue.600">recIO</Text>
                </Heading>
                <Stack direction="row" ml="2">
                    <NavItem href="/" text="Polityka prywatności" />
                    <NavItem href="/" text="Regulamin" />
                </Stack>
            </Flex>
        </Center>
    );
}
