import {
    Button,
    ButtonGroup,
    Flex,
    Heading,
    Spinner,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import {
    EditorRequest,
    getEditorRequests,
    settleEditorRequests,
} from '../../services/api';
import React, { useEffect, useState } from 'react';

export default function Admin() {
    const [isLoading, setIsLoading] = useState(false);
    const [requests, setRequests] = useState<EditorRequest[]>([]);

    const fetchData = () => {
        getEditorRequests()
            .then(setRequests)
            .then(() => setIsLoading(false));
    };

    useEffect(() => {
        setIsLoading(true);
        fetchData();
    }, []);

    const handleAction = (index: number, approved: boolean) => () => {
        setIsLoading(true);
        const { name, email } = requests[index];
        settleEditorRequests(name, email, approved).then(fetchData);
    };

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
            {isLoading && <Spinner size="lg" color="blue" mt="4" />}
            {!isLoading && (
                <>
                    <Heading textAlign="center" size="md" mt="5">
                        Lista wniosków o konto edytora
                    </Heading>
                    <Table colorScheme="blue" mt="5">
                        <Thead>
                            <Tr>
                                <Th>L.p.</Th>
                                <Th>Imię i nazwisko</Th>
                                <Th>Adres e-mail</Th>
                                <Th></Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {requests.map(({ name, email }, i) => (
                                <Tr key={email}>
                                    <Td>{i + 1}</Td>
                                    <Td>{name}</Td>
                                    <Td>{email}</Td>
                                    <Td>
                                        <ButtonGroup>
                                            <Button
                                                colorScheme="blue"
                                                onClick={handleAction(i, true)}
                                            >
                                                Zaakceptuj
                                            </Button>
                                            <Button
                                                variant="outline"
                                                bg="white"
                                                onClick={handleAction(i, false)}
                                            >
                                                Odrzuć
                                            </Button>
                                        </ButtonGroup>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </>
            )}
        </Flex>
    );
}
