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
    chakra,
    NumberInput,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInputField,
    NumberInputStepper,
    Select,
    HStack,
} from '@chakra-ui/react';
import NavBar from '../utils/NavBar';
import { useState, useEffect } from 'react';
import {
    getRecruitmentDetails,
    RecruitmentDetails as RecruitmentDetailsType,
    Candidate,
} from './../../services/api';
import {
    CheckIcon,
    CloseIcon,
    TriangleDownIcon,
    TriangleUpIcon,
} from '@chakra-ui/icons';
import RecruitmentSummary from '../RecruitmentSummary/RecruitmentSummary';
import { Column, usePagination, useSortBy, useTable } from 'react-table';

interface DetailsTableProps {
    details: RecruitmentDetailsType;
}

function DetailsTable({ details }: DetailsTableProps) {
    const isSecondDegree = details.degree === 'Studia drugiego stopnia';

    const paidIcon = <CheckIcon color="green" />;
    const unpaidIcon = <CloseIcon color="red" />;

    const data = React.useMemo(() => details.candidates, [details]);
    const columns = React.useMemo<Column<Candidate>[]>(
        () => [
            {
                Header: 'L.P.',
                Cell: (row: { row: { id: number } }) => {
                    return <div>{+row.row.id + 1}</div>;
                },
                disableSortBy: true,
            },
            { Header: 'Imię i nazwisko', accessor: 'name' },
            { Header: 'Kraj', accessor: 'country' },
            { Header: 'Województwo', accessor: 'region' },
            { Header: 'Miasto', accessor: 'city' },
            ...((isSecondDegree
                ? [
                      { Header: 'Uczelnia', accessor: 'college_name' },
                      { Header: 'Kierunek', accessor: 'field_of_study' },
                      { Header: 'Wynik testu', accessor: 'test_points' },
                  ]
                : [
                      {
                          Header: 'Liceum',
                          accessor: (row) =>
                              row.highschool + ';' + row.highschool_city,
                      },
                      { Header: 'Wynik matury', accessor: 'matura_points' },
                  ]) as Column<Candidate>[]),
            { Header: 'Liczba punktów', accessor: 'points' },
            { Header: 'Pesel', accessor: 'pesel' },
            {
                Header: 'Opłata rekrutacyjna',
                accessor: (row) => (row.is_paid ? paidIcon : unpaidIcon),
                id: 'is_paid',
                sortType: (a, b, id) =>
                    (a.original as any)[id]
                        ? 1
                        : (b.original as any)[id]
                        ? -1
                        : 0,
            },
        ],
        [details],
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

    console.log(pageCount);

    return (
        <>
            <Table
                colorScheme="blue"
                mt="5"
                textAlign="center"
                {...getTableProps()}
            >
                <Thead>
                    {headerGroups.map((group) => (
                        <Tr fontWeight="600" {...group.getHeaderGroupProps()}>
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
                            <Tr {...row.getRowProps()}>
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
        </>
    );
}

interface Props {
    id: number;
}

export default function RecruitmentDetails({ id }: Props) {
    const [details, setDetails] = useState<RecruitmentDetailsType>();
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        getRecruitmentDetails(id).then(setDetails);
    }, [id]);

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
                {details && <DetailsTable details={details} />}
            </Flex>
        </Flex>
    );
}
