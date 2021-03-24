import { Container, Flex, Heading, Image } from '@chakra-ui/react';
import React from 'react';

export default function Index() {
    return (
        <Flex
            direction="column"
            alignItems="center"
            maxW="container.lg"
            width="full"
            bg="gray.100"
            my="6"
            borderRadius="md"
            height="full"
            flexGrow={1}
            p="3"
        >
            <Image src="/img/splash.png" w="80%" />
            <Heading pt="8">Witamy w systemie rekrutacji RecIO</Heading>
        </Flex>
    );
}