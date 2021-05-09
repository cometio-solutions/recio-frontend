import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';

import type { Candidate } from 'src/services/api';
import { Icon } from "@chakra-ui/react"
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
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Sczegółowe dane kandydata <Icon as={InfoOutlineIcon} /></ModalHeader>
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
                                <b>Data ukończenia studiów pierwszego stopnia: </b> {candidate.graduation_date}
                            </Text>
                        )}
                        {candidate.mode && (
                            <Text>
                                <b>Tryb studiów: </b> {candidate.mode}
                            </Text>
                        )}
                        {candidate.average && (
                            <Text>
                                <b>Średnia z studiów pierwszego stopnia: </b> {candidate.average}
                            </Text>
                        )}
                    </Flex>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>Zamknij</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}
