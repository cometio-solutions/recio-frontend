import {
    Heading,
    Table,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import React, { ReactElement } from 'react';

import { Flex } from '@chakra-ui/react';
import NavBar from '../utils/NavBar';

const recruitmentList = [
    {
        major: 'Informatyka',
        faculty: 'WIET',
        degree: 'Magisterskie',
        mode: 'Stacjonarne',
        year: '2021',
        pointLimit: '-',
        endData: '2021-09-01',
        slotLimit: 130,
        candidatesNumber: 30,
        isActive: true,
    },
    {
        major: 'Elektronika',
        faculty: 'WIET',
        degree: 'Inżynierskie',
        mode: 'Stacjonarne',
        year: '2018',
        pointLimit: '900/1000',
        endData: '2018-09-01',
        slotLimit: 200,
        candidatesNumber: 300,
        isActive: false,
    },
];

export default function RecruitmentList(): ReactElement {
    return (
        <Flex as="main" direction="column" minH="100vh" bg="gray.100">
            <NavBar />
            <Heading textAlign="center" size="md" mt="5">
                Lista Rekrutacji
            </Heading>
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
                            <Th>Kierunek</Th>
                            <Th>Wydział</Th>
                            <Th>Stopień</Th>
                            <Th>Tryb</Th>
                            <Th>Rok</Th>
                            <Th>Próg Punktowy</Th>
                            <Th>Data Zakończenia</Th>
                            <Th>Limit Miejsc</Th>
                            <Th>Liczba Kandydatów</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {recruitmentList.map(
                            (
                                {
                                    major,
                                    faculty,
                                    degree,
                                    mode,
                                    year,
                                    pointLimit,
                                    endData,
                                    slotLimit,
                                    candidatesNumber,
                                    isActive,
                                },
                                idx,
                            ) => (
                                <Tr
                                    cursor="pointer"
                                    bg={isActive ? 'gray.200' : ''}
                                >
                                    <Td>{idx + 1}</Td>
                                    <Td>{major}</Td>
                                    <Td>{faculty}</Td>
                                    <Td>{degree}</Td>
                                    <Td>{mode}</Td>
                                    <Td>{year}</Td>
                                    <Td>{pointLimit}</Td>
                                    <Td>{endData}</Td>
                                    <Td>{slotLimit}</Td>
                                    <Td>{candidatesNumber}</Td>
                                </Tr>
                            ),
                        )}
                    </Tbody>
                </Table>
            </Flex>
        </Flex>
    );
}
