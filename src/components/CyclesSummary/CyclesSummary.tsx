import React, { useEffect, useState } from 'react';

import { Flex } from '@chakra-ui/layout';
import type { ReactElement } from 'react';
import { getCyclesSummary, CyclesSummary } from '../../services/api';
import { Text } from '@chakra-ui/react';
interface CyclesSummaryProps {
    id: number;
}

export default function CyclesSummary({
    id,
}: CyclesSummaryProps): ReactElement {
    const [cyclesSummary, setCyclesSummary] = useState<CyclesSummary>();

    useEffect(() => {
        getCyclesSummary(id).then(setCyclesSummary);
    }, []);

    return (
        <Flex direction="column">
            <Text>
                <b>Ilość cykli: </b>
                {cyclesSummary?.cycles_number}
            </Text>
            <Text>
                <b>Status: </b>
                <Text as="b" color={cyclesSummary?.is_active ? 'green' : 'red'}>
                    {cyclesSummary?.is_active ? 'AKTYWNA' : 'NIEAKTYWNA'}{' '}
                </Text>
            </Text>
            <Text>
                <b>Ilość wszystkich kandydatów: </b>
                {cyclesSummary?.overall_candidates_num}
            </Text>
            <Text>
                <b>Ilość zakwalifikowanych kandydatów: </b>
                {cyclesSummary?.overall_qualified}
            </Text>
        </Flex>
    );
}
