import { Button, Container, Flex, Heading, Image } from '@chakra-ui/react';
import React from 'react';
import ImportForm from '../utils/ImportForm';
import { openPlotReport } from '../../services/api';

export default function Index() {
    const isEditor = sessionStorage.getItem('role') === 'editor';
    return (
        <Flex
            direction="column"
            alignItems="center"
            maxW="container.lg"
            width="full"
            my="6"
            borderRadius="md"
            height="full"
            flexGrow={1}
            p="3"
        >
            <Image src="/img/splash.png" w="80%" />
            <Heading pt="8">Witamy w systemie rekrutacji RecIO</Heading>
            {isEditor && <ImportForm />}
        </Flex>
    );
}
