import * as React from 'react';
import {
    Flex,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Text,
    Button,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalBody,
    ModalContent,
    ModalHeader,
    ModalFooter,
} from '@chakra-ui/react';
import NavBar from '../utils/NavBar';
import { useState, useEffect } from 'react';
import {
    getRecruitmentDetails,
    RecruitmentDetails,
} from './../../services/api';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import RecruitmentSummary from '../RecruitmentSummary/RecruitmentSummary';

interface Props {
    id: number;
}

export default function RecruitmentDetails({ id }: Props) {
    const [details, setDetails] = useState<RecruitmentDetails>();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        getRecruitmentDetails(id).then(setDetails);
    }, [id]);

    const isSecondDegree =
        (details && details.degree) === 'Studia drugiego stopnia';

    const paidIcon = <CheckIcon color="green" />;
    const unpaidIcon = <CloseIcon color="red" />;

    return (
        <Flex as="main" direction="column" minH="100vh" bg="gray.100">
            <Modal isOpen={isOpen} onClose={onClose} size="full">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Podsumowanie rekrutacji</ModalHeader>
                    <ModalBody>
                        <RecruitmentSummary />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Zamknij</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <NavBar />
            {details && (
                <Flex
                    alignItems="center"
                    bg="white"
                    py="3"
                    px="5"
                    borderRadius="xl"
                    width="max-content"
                    alignSelf="center"
                    mt="3"
                >
                    <Flex direction="column" mr="8">
                        <Text>
                            Status:{' '}
                            {details.is_active ? 'AKTYWNA' : 'NIEAKTYWNA'}
                        </Text>
                        <Text>
                            Ilość miejsc: {details.candidates.length} /{' '}
                            {details.slot_limit}
                        </Text>
                        <Text>Numer cyklu: {details.cycle_number}</Text>
                    </Flex>
                    <Flex direction="column" mr="8">
                        <Text>Data zakończenia: {details.end_date}</Text>
                        <Text>Kierunek: {details.major_name}</Text>
                        <Text>Wydział: {details.faculty}</Text>
                    </Flex>
                    <Flex direction="column" mr="8">
                        <Text>Tryb: {details.major_mode}</Text>
                        <Text>Stopień: {details.degree}</Text>
                        <Text>Próg: {details.point_limit}</Text>
                    </Flex>
                    <Button onClick={onOpen}>Pokaż wykresy</Button>
                </Flex>
            )}
            <Flex
                direction="column"
                alignItems="center"
                flexGrow={1}
                ml="5"
                mr="5"
            >
                <Table colorScheme="blue" mt="5" textAlign="center">
                    <Thead>
                        <Tr fontWeight="600">
                            <Th>L.P.</Th>
                            <Th>Imię i nazwisko</Th>
                            <Th>Kraj</Th>
                            <Th>Województwo</Th>
                            <Th>Miasto</Th>
                            {isSecondDegree ? (
                                <>
                                    <Th>Uczelnia</Th>
                                    <Th>Kierunek</Th>
                                    <Th>Wynik testu</Th>
                                </>
                            ) : (
                                <>
                                    <Th>Liceum</Th>
                                    <Th>Wynik matury</Th>
                                </>
                            )}
                            <Th>Liczba punktów</Th>
                            <Th>Pesel</Th>
                            <Th>Opłata rekrutacyjna</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {details &&
                            details.candidates.map(
                                (
                                    {
                                        id,
                                        name,
                                        country,
                                        city,
                                        region,
                                        college_name,
                                        highschool,
                                        highschool_city,
                                        field_of_study,
                                        matura_points,
                                        test_points,
                                        points,
                                        pesel,
                                        is_paid,
                                    },
                                    i,
                                ) => (
                                    <Tr key={id}>
                                        <Td>{i + 1}</Td>
                                        <Td>{name}</Td>
                                        <Td>{country}</Td>
                                        <Td>{region}</Td>
                                        <Td>{city}</Td>
                                        {isSecondDegree ? (
                                            <>
                                                <Td>{college_name}</Td>
                                                <Td>{field_of_study}</Td>
                                                <Td>{test_points}</Td>
                                            </>
                                        ) : (
                                            <>
                                                <Td>
                                                    {highschool};{' '}
                                                    {highschool_city}
                                                </Td>
                                                <Td>{matura_points}</Td>
                                            </>
                                        )}
                                        <Td>{points}</Td>
                                        <Td>{pesel}</Td>
                                        <Td>
                                            {is_paid && paidIcon}
                                            {!is_paid && unpaidIcon}
                                        </Td>
                                    </Tr>
                                ),
                            )}
                    </Tbody>
                </Table>
            </Flex>
        </Flex>
    );
}
