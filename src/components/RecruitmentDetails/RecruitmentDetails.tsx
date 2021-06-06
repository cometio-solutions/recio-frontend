import * as React from 'react';

import {
    ArrowBackIcon,
    ArrowForwardIcon,
    CheckIcon,
    CloseIcon,
    TriangleDownIcon,
    TriangleUpIcon,
} from '@chakra-ui/icons';
import {
    Button,
    Flex,
    HStack,
    Modal,
    ModalBody,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
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
    useDisclosure,
} from '@chakra-ui/react';
import {
    Candidate,
    RecruitmentDetails as RecruitmentDetailsType,
    getNextRecruitmentCycle,
    getPreviousRecruitmentCycle,
    getRecruitmentDetails,
} from './../../services/api';
import { Column, usePagination, useSortBy, useTable } from 'react-table';
import { useEffect, useState } from 'react';

import CandidateDetails from '../CandidateDetails/CandidateDetails';
import CyclesSummary from '../CyclesSummary/CyclesSummary';
import NavBar from '../utils/NavBar';
import RecruitmentSummary from '../RecruitmentSummary/RecruitmentSummary';

interface DetailsTableProps {
    details: RecruitmentDetailsType;
    onCandidateDetailsOpen: () => void;
    selectedCandidate: Candidate;
    setSelectedCandidate: (state: Candidate) => void;
}

function DetailsTable({
    details,
    onCandidateDetailsOpen,
    setSelectedCandidate,
}: DetailsTableProps) {
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
                            <Tr
                                {...row.getRowProps()}
                                onClick={() => {
                                    onCandidateDetailsOpen();
                                    setSelectedCandidate(row.original);
                                }}
                                _hover={{
                                    cursor: 'pointer',
                                    backgroundColor: 'gray.400',
                                }}
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
        </>
    );
}

interface Props {
    id: number;
}

export default function RecruitmentDetails({ id }: Props) {
    const [details, setDetails] = useState<RecruitmentDetailsType>();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        isOpen: cyclesSummaryIsOpen,
        onOpen: cyclesSummaryOnOpen,
        onClose: cyclesSummaryOnClose,
    } = useDisclosure();
    const [recruitmentId, setRecruitmentId] = useState<number>(id);
    const {
        isOpen: isCandidateDetailsOpen,
        onOpen: onCandidateDetailsOpen,
        onClose: onCandidateDetailsClose,
    } = useDisclosure();
    const [selectedCandidate, setSelectedCandidate] = useState<Candidate>(
        {} as Candidate,
    );

    const nextCycle = () => {
        getNextRecruitmentCycle(recruitmentId).then(
            (data: RecruitmentDetailsType) => {
                setRecruitmentId(data.id);
                setDetails(data);
            },
        );
    };

    const previousCycle = () => {
        getPreviousRecruitmentCycle(recruitmentId).then(
            (data: RecruitmentDetailsType) => {
                setRecruitmentId(data.id);
                setDetails(data);
            },
        );
    };

    useEffect(() => {
        getRecruitmentDetails(id).then(setDetails);
    }, [id]);

    const paidIcon = <CheckIcon color="green" />;
    const unpaidIcon = <CloseIcon color="red" />;

    const paidCount = details
        ? details.candidates.filter((c) => c.is_paid).length
        : 0;
    const unpaidCount = details ? details.candidates.length - paidCount : 0;

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
                        <RecruitmentSummary
                            id={id}
                            paidCount={paidCount}
                            unpaidCount={unpaidCount}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Zamknij</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Modal
                isOpen={cyclesSummaryIsOpen}
                onClose={cyclesSummaryOnClose}
                size="4xl"
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Podsumowanie wszystkich cyklów rekrutacji
                    </ModalHeader>
                    <ModalBody>
                        <CyclesSummary id={id} />
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={cyclesSummaryOnClose}>Zamknij</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <NavBar />
            <ArrowBackIcon
                pos="absolute"
                top="100"
                left="100"
                fontSize="40"
                onClick={previousCycle}
                _hover={{
                    cursor: 'pointer',
                    color: 'blue.500',
                }}
            />
            <ArrowForwardIcon
                pos="absolute"
                top="100"
                right="100"
                fontSize="40"
                onClick={nextCycle}
                _hover={{
                    cursor: 'pointer',
                    color: 'blue.500',
                }}
            />
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
                    <Flex direction="column" mr="8">
                        <Button onClick={onOpen}>Pokaż wykresy</Button>
                        <Button mt="3" onClick={cyclesSummaryOnOpen}>
                            Podsumowanie wszystkich cykli
                        </Button>
                    </Flex>
                </Flex>
            )}
            <Flex
                direction="column"
                alignItems="center"
                flexGrow={1}
                ml="5"
                mr="5"
            >
                {details && (
                    <DetailsTable
                        details={details}
                        onCandidateDetailsOpen={onCandidateDetailsOpen}
                        selectedCandidate={selectedCandidate}
                        setSelectedCandidate={setSelectedCandidate}
                    />
                )}
            </Flex>
        </Flex>
    );
}
