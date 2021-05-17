import {
    Button,
    ButtonGroup,
    Flex,
    Heading,
    Spinner,
    Table,
    Text,
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
    updatePointLimits,
} from '../../services/api';
import React, { useEffect, useState } from 'react';

function PointLimit() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string>();
    const [error, setError] = useState<string>();

    const handleClick = () => {
        setIsLoading(true);
        setMessage('');
        setError('');
        updatePointLimits()
            .then(setMessage)
            .catch(setError)
            .finally(() => setIsLoading(false));
    };

    return (
        <Flex
            direction="column"
            alignItems="center"
            maxW="container.lg"
            width="full"
            bg="gray.100"
            mt="6"
            borderRadius="md"
            height="full"
            p="3"
        >
            <Heading textAlign="center" size="md" mt="2">
                Kalkulacja progów punktowych rekrutacji
            </Heading>

            <Button
                onClick={handleClick}
                colorScheme="blue"
                disabled={isLoading}
                isLoading={isLoading}
                my="2"
            >
                Aktualizuj progi
            </Button>

            {error && <Text color="red">{error}</Text>}
            {message && <Text color="green">{message}</Text>}
        </Flex>
    );
}

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
        <>
            <PointLimit />
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
                        <Heading textAlign="center" size="md" mt="2">
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
                                                    onClick={handleAction(
                                                        i,
                                                        true,
                                                    )}
                                                >
                                                    Zaakceptuj
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    bg="white"
                                                    onClick={handleAction(
                                                        i,
                                                        false,
                                                    )}
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
        </>
    );
}
