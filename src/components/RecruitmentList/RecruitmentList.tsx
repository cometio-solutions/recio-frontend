import {
    Button,
    HStack,
    Heading,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
    chakra,
} from '@chakra-ui/react';
import { Column, usePagination, useSortBy, useTable } from 'react-table';
import React, { ReactElement, useEffect, useState } from 'react';
import { Recruitment, getRecruitment } from '../../services/api';
import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

import Filter from './Filter';
import { Flex } from '@chakra-ui/react';
import NavBar from '../utils/NavBar';
import { useHistory } from 'react-router';

export default function RecruitmentList(): ReactElement {
    const [recruitmentList, setRecruitmentList] = useState<Recruitment[]>([]);
    const [filteredRecruitmentList, setFilteredRecruitmentList] = useState<
        Recruitment[]
    >([]);
    const history = useHistory();

    useEffect(() => {
        getRecruitment().then((data) => {
            setRecruitmentList(data);
            setFilteredRecruitmentList(data);
        });
    }, []);

    const handleRowClick = (id: number) => () => {
        history.push(`/recruitment/${id}`);
    };

    const data = React.useMemo(() => filteredRecruitmentList, [
        filteredRecruitmentList,
    ]);
    const columns = React.useMemo<Column<Recruitment>[]>(
        () => [
            {
                Header: 'L.P.',
                Cell: (row: { row: { id: number } }) => {
                    return <div>{+row.row.id + 1}</div>;
                },
                disableSortBy: true,
            },
            { Header: 'Kierunek', accessor: 'major_name' },
            { Header: 'Wydział', accessor: 'faculty' },
            { Header: 'Stopień', accessor: 'degree' },
            { Header: 'Tryb', accessor: 'major_mode' },
            { Header: 'Próg Punktowy', accessor: 'point_limit' },
            { Header: 'Data Zakończenia', accessor: 'end_date' },
            { Header: 'Limit Miejsc', accessor: 'slot_limit' },
        ],
        [],
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        page,
        canPreviousPage,
        canNextPage,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize },
    } = useTable({ data, columns }, useSortBy, usePagination);

    return (
        <Flex as="main" direction="column" minH="100vh" bg="gray.100">
            <NavBar />
            <Filter
                setList={setFilteredRecruitmentList}
                list={recruitmentList}
            />
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
                <Table
                    colorScheme="blue"
                    mt="5"
                    textAlign="center"
                    {...getTableProps()}
                >
                    <Thead>
                        {headerGroups.map((group) => (
                            <Tr fontWeight="600">
                                {group.headers.map((col) => (
                                    <Th
                                        {...col.getHeaderProps(
                                            col.getSortByToggleProps(),
                                        )}
                                    >
                                        {col.render('Header')}
                                        <chakra.span pl="2">
                                            {col.isSorted ? (
                                                col.isSortedDesc ? (
                                                    <TriangleDownIcon />
                                                ) : (
                                                    <TriangleUpIcon />
                                                )
                                            ) : null}
                                        </chakra.span>
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </Thead>
                    <Tbody {...getTableBodyProps()}>
                        {page.map((row) => {
                            prepareRow(row);
                            return (
                                <Tr
                                    cursor="pointer"
                                    bg={
                                        row.original.is_active ? 'gray.200' : ''
                                    }
                                    _hover={{
                                        cursor: 'pointer',
                                        backgroundColor: 'grey',
                                    }}
                                    onClick={handleRowClick(row.original.id)}
                                    {...row.getRowProps()}
                                >
                                    {row.cells.map((cell) => (
                                        <Td {...cell.getCellProps()}>
                                            {cell.render('Cell')}
                                        </Td>
                                    ))}
                                </Tr>
                            );
                        })}
                    </Tbody>
                </Table>
                <Flex
                    bg="white"
                    p="3"
                    alignItems="center"
                    mt="2"
                    mb="3"
                    borderRadius="xl"
                >
                    <HStack spacing="1">
                        <Button
                            colorScheme="blue"
                            onClick={() => gotoPage(0)}
                            disabled={!canPreviousPage}
                        >
                            {'<<'}
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                        >
                            {'<'}
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        >
                            {'>'}
                        </Button>
                        <Button
                            colorScheme="blue"
                            onClick={() => gotoPage(pageCount - 1)}
                            disabled={!canNextPage}
                        >
                            {'>>'}
                        </Button>
                    </HStack>
                    <Text pl="2">
                        Strona {pageIndex + 1} z {pageCount} | Przejdź do strony
                    </Text>
                    <NumberInput
                        defaultValue={1}
                        min={1}
                        max={pageCount}
                        onChange={(p) => gotoPage(+p - 1)}
                        width="20"
                        pl="1"
                    >
                        <NumberInputField />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    <Select
                        value={pageSize}
                        onChange={(e) => setPageSize(+e.target.value)}
                        width="30"
                        pl="2"
                    >
                        {[10, 20, 30, 40, 50].map((size) => (
                            <option value={size}>Pokaż {size}</option>
                        ))}
                    </Select>
                </Flex>
            </Flex>
        </Flex>
    );
}
