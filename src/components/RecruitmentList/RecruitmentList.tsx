import { Heading, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import React, { ReactElement, useEffect, useState } from 'react';
import {
    Recruitment,
    formatRecruitmentBody,
    getRecruitment,
} from '../../services/api';

import { Flex } from '@chakra-ui/react';
import NavBar from '../utils/NavBar';

export default function RecruitmentList(): ReactElement {
    const [recruitmentList, setRecruitmentList] = useState<Recruitment[]>([]);
    useEffect(() => {
        getRecruitment().then((data) => {
            console.log(data);
            setRecruitmentList(data.map((ele) => formatRecruitmentBody(ele)));
        });
    }, []);

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
                            <Th>Próg Punktowy</Th>
                            <Th>Data Zakończenia</Th>
                            <Th>Limit Miejsc</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {recruitmentList.map(
                            (
                                {
                                    major_name,
                                    faculty,
                                    degree,
                                    major_mode,
                                    point_limit,
                                    end_date,
                                    slot_limit,
                                    is_active,
                                },
                                idx,
                            ) => (
                                <Tr
                                    cursor="pointer"
                                    bg={is_active ? 'gray.200' : ''}
                                    key={idx}
                                >
                                    <Td>{idx + 1}</Td>
                                    <Td>{major_name}</Td>
                                    <Td>{faculty}</Td>
                                    <Td>{degree}</Td>
                                    <Td>{major_mode}</Td>
                                    <Td>{point_limit}</Td>
                                    <Td>{end_date}</Td>
                                    <Td>{slot_limit}</Td>
                                </Tr>
                            ),
                        )}
                    </Tbody>
                </Table>
            </Flex>
        </Flex>
    );
}
