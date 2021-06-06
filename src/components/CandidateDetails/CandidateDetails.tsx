import {
    Button,
    Center,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import {
    Candidate,
    HistoryRecruitment,
    getCandidateRecruitmentHistory,
} from '../../services/api';
import React, { ReactElement, useEffect, useState } from 'react';

import { Icon } from '@chakra-ui/react';
import { InfoOutlineIcon } from '@chakra-ui/icons';

interface CandidateDetailsProps {
    isOpen: boolean;
    onClose: () => void;
    candidate: Candidate;
}

export default function CandidateDetails({
    isOpen,
    onClose,
    candidate,
}: CandidateDetailsProps): ReactElement {
    const [recruitmentHistory, setRecruitmentHistory] = useState<
        HistoryRecruitment[]
    >([]);

    useEffect(() => {
        if (candidate.pesel) {
            getCandidateRecruitmentHistory(candidate.pesel).then((data) =>
                setRecruitmentHistory(data),
            );
        }
    }, [candidate]);

    return (
        <Modal isOpen={isOpen} onClose={onClose} size="5xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>
                    Sczegółowe dane kandydata <Icon as={InfoOutlineIcon} />
                </ModalHeader>
                <ModalBody>
                    <Flex direction="column" mr="8">
                        <Text>
                            <b>Imię i naziwsko:</b> {candidate.name}
                        </Text>
                        <Text>
                            <b>Wyniki matury:</b> {candidate.matura_points}
                        </Text>
                        <Text>
                            <b>Data zdawania matury:</b> {candidate.matura_date}
                        </Text>
                        {candidate.status && (
                            <Text as="b">
                                Status:
                                <Text
                                    as="span"
                                    color={
                                        candidate.status === 'ZAKWALIFIKOWANY'
                                            ? 'green'
                                            : 'red'
                                    }
                                >
                                    {' ' + candidate.status}
                                </Text>
                            </Text>
                        )}
                        {candidate.college_name && (
                            <Text>
                                <b>Uczelnia: </b> {candidate.college_name}
                            </Text>
                        )}{' '}
                        {candidate.field_of_study && (
                            <Text>
                                <b>Kierunek: </b> {candidate.field_of_study}
                            </Text>
                        )}{' '}
                        {candidate.graduation_date && (
                            <Text>
                                <b>
                                    Data ukończenia studiów pierwszego stopnia:{' '}
                                </b>{' '}
                                {candidate.graduation_date}
                            </Text>
                        )}
                        {candidate.mode && (
                            <Text>
                                <b>Tryb studiów: </b> {candidate.mode}
                            </Text>
                        )}
                        {candidate.average && (
                            <Text>
                                <b>Średnia z studiów pierwszego stopnia: </b>{' '}
                                {candidate.average}
                            </Text>
                        )}
                    </Flex>
                    <Center marginTop={10}>
                        <Text as="b">HISTORIA REKRUTACJI</Text>
                    </Center>
                    <Table size="sm">
                        <Thead>
                            <Tr>
                                <Th>Kierunek</Th>
                                <Th>Wydział</Th>
                                <Th>Stopień</Th>
                                <Th>Tryb</Th>
                                <Th>Data zakończenia</Th>
                                <Th>Status rekrutacji</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {recruitmentHistory.map((recruitment) => (
                                <Tr key={recruitment.id}>
                                    <Td>{recruitment.faculty}</Td>
                                    <Td>{recruitment.major_name}</Td>
                                    <Td>{recruitment.degree}</Td>
                                    <Td>{recruitment.major_mode}</Td>
                                    <Td>{recruitment.end_date}</Td>
                                    <Td>
                                        {recruitment.status === 'W TRAKCIE' && (
                                            <Text as={'b'} color="yellow.400">
                                                {recruitment.status}
                                            </Text>
                                        )}
                                        {recruitment.status ===
                                            'ZAKWALIFIKOWANY' && (
                                            <Text as={'b'} color="green">
                                                {recruitment.status}
                                            </Text>
                                        )}
                                        {recruitment.status ===
                                            'NIE ZAKWALIFIKOWANY' && (
                                            <Text as={'b'} color="red">
                                                {recruitment.status}
                                            </Text>
                                        )}
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Zamknij</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
