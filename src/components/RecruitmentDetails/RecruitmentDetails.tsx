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
    Candidate,
    getRecruitmentDetails,
    RecruitmentDetails,
} from './../../services/api';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import RecruitmentSummary from '../RecruitmentSummary/RecruitmentSummary';
import CandidateDetails from '../CandidateDetails/CandidateDetails';

interface Props {
    id: number;
}

export default function RecruitmentDetails({ id }: Props) {
    const [details, setDetails] = useState<RecruitmentDetails>();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: isCandidateDetailsOpen,
        onOpen: onCandidateDetailsOpen,
        onClose: onCandidateDetailsClose,
    } = useDisclosure();
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(
        {} as Candidate,
    );

    useEffect(() => {
        getRecruitmentDetails(id).then(setDetails);
    }, [id]);

    const isSecondDegree =
        (details && details.degree) === 'Studia drugiego stopnia';

    const paidIcon = <CheckIcon color="green" />;
    const unpaidIcon = <CloseIcon color="red" />;

    return (
        <Flex as="main" direction="column" minH="100vh" bg="gray.100">
            <CandidateDetails
                isOpen={isCandidateDetailsOpen}
                onClose={onCandidateDetailsClose}
                candidate={selectedCandidate}
            />
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
                            <b>Status: </b>
                            <Text
                                as="b"
                                color={details.is_active ? 'green' : 'red'}
                            >
                                {details.is_active ? 'AKTYWNA' : 'NIEAKTYWNA'}{' '}
                            </Text>
                        </Text>
                        <Text>
                            <b>Ilość miejsc: </b>
                            {details.candidates.length} / {details.slot_limit}
                        </Text>
                        <Text>
                            <b>Numer cyklu:</b> {details.cycle_number}
                        </Text>
                    </Flex>
                    <Flex direction="column" mr="8">
                        <Text>
                            <b>Data zakończenia:</b> {details.end_date}
                        </Text>
                        <Text>
                            <b>Kierunek:</b> {details.major_name}
                        </Text>
                        <Text>
                            <b>Wydział:</b> {details.faculty}
                        </Text>
                    </Flex>
                    <Flex direction="column" mr="8">
                        <Text>
                            <b>Tryb:</b> {details.major_mode}
                        </Text>
                        <Text>
                            <b>Stopień:</b> {details.degree}
                        </Text>
                        <Text>
                            <b>Próg:</b>{' '}
                            {details.point_limit !== null
                                ? details.point_limit
                                : '-'}
                        </Text>
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
                            details.candidates.map((candidate, i) => {
                                const {
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
                                } = candidate;
                                return (
                                    <Tr
                                        key={id}
                                        onClick={() => {
                                            setSelectedCandidate(candidate);
                                            onCandidateDetailsOpen();
                                        }}
                                        _hover={{
                                            cursor: 'pointer',
                                            backgroundColor: 'grey',
                                        }}
                                    >
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
                                );
                            })}
                    </Tbody>
                </Table>
            </Flex>
        </Flex>
    );
}
