import {
    Checkbox,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
} from '@chakra-ui/react';
import React, { ReactElement, useEffect, useState } from 'react';

import type { Recruitment } from 'src/services/api';
import { SearchIcon } from '@chakra-ui/icons';

interface FilterProps {
    setList: (state: Recruitment[]) => void;
    list: Recruitment[];
}

export default function Filter({ setList, list }: FilterProps): ReactElement {
    const [status, setStatus] = useState<string>('');
    const [searchInput, setSearchInput] = useState<string>('');
    const [year, setYear] = useState<string>('');
    const [majorName, setMajorName] = useState<string>('');

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
                );
        };
        setList(filterList());
    }, [status, year, majorName, searchInput]);

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
                placeholder="Kierunek"
                size="sm"
                onChange={(e) => console.log(e.target.value)}
            >
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
            </Select>
            <Select
                w="20%"
                color="blue.500"
                bg="gray.50"
                placeholder="Rok"
                size="sm"
            />
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
