import {
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
} from '@chakra-ui/react';
import { Major, Recruitment, getMajors, getYears } from '../../services/api';
import React, { ReactElement, useEffect, useState } from 'react';

import { SearchIcon } from '@chakra-ui/icons';

interface FilterProps {
    setList: (state: Recruitment[]) => void;
    list: Recruitment[];
}

interface FilterData {
    years: number[];
    majors: Major[];
}

export default function Filter({ setList, list }: FilterProps): ReactElement {
    const [filterData, setFilterData] = useState<FilterData>({
        years: [],
        majors: [],
    });
    const [status, setStatus] = useState<string>('');
    const [searchInput, setSearchInput] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const [major, setMajor] = useState<string>('');

    useEffect(() => {
        getYears().then((years) => {
            getMajors().then((majors) => setFilterData({ years, majors }));
        });
    }, []);

    useEffect(() => {
        const filterList = (): Recruitment[] => {
            return list
                .filter((recruitment) => {
                    if (status === '') return true;
                    return recruitment.is_active === (status === 'true');
                })
                .filter((recruitment) =>
                    recruitment.major_name
                        .toLowerCase()
                        .includes(searchInput.toLowerCase()),
                )
                .filter((recruitment) => {
                    return recruitment.end_date.includes(year);
                })
                .filter((recruitment) => {
                    if (major === '') return true;
                    const [name, faculty] = major.split(',');
                    return (
                        recruitment.major_name === name &&
                        recruitment.faculty === faculty
                    );
                });
        };
        setList(filterList());
    }, [status, year, major, searchInput]);

    return (
        <HStack
            h="60px"
            m="5"
            justify="center"
            bg="gray.50"
            borderRadius="20px"
            border="1px solid"
            borderColor="gray.200"
        >
            <InputGroup bg="gray.50" w="20%" size="sm">
                <InputLeftElement
                    pointerEvents="none"
                    children={<SearchIcon color="gray.300" />}
                />
                <Input
                    type="tel"
                    placeholder="Wyszukaj"
                    onChange={(e) => setSearchInput(e.target.value)}
                />
            </InputGroup>
            <Select
                w="20%"
                color="blue.500"
                bg="gray.50"
                placeholder="Kierunek, Wydział"
                size="sm"
                onChange={(e) => setMajor(e.target.value)}
            >
                {filterData.majors.map((major) => (
                    <option
                        key={major.id}
                        value={`${major.name},${major.faculty}`}
                    >
                        {`${major.name},${major.faculty}`}
                    </option>
                ))}
            </Select>
            <Select
                w="20%"
                color="blue.500"
                bg="gray.50"
                placeholder="Rok"
                size="sm"
                onChange={(e) => setYear(e.target.value)}
            >
                {filterData.years.map((year) => (
                    <option key={year} value={year}>
                        {year}
                    </option>
                ))}
            </Select>
            <Select
                w="20%"
                color="blue.500"
                bg="gray.50"
                placeholder="Status"
                size="sm"
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="true">Aktywne</option>
                <option value="false">Zakończone</option>
            </Select>
        </HStack>
    );
}
