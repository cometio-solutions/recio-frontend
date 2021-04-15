import {
    Bar,
    BarChart,
    CartesianGrid,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { HStack, Heading, Stack } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

const data = [
    {
        name: 'malopolska',
        value: 30,
    },
    {
        name: 'mazowsze',
        value: 10,
    },
    {
        name: 'pomorskie',
        value: 2,
    },
    {
        name: 'opolskie',
        value: 3,
    },
    {
        name: 'dolnoślaskie',
        value: 15,
    },
    {
        name: 'wielkopolska',
        value: 13,
    },
];

const getRandomData = (): any[] => {
    let data = [];
    for (let i = 0; i < 50; i++) {
        data.push({
            point: Math.floor(Math.random() * 200) + 800,
            value: Math.floor(Math.random() * 90) + 10,
        });
    }
    return data.sort((a, b) => {
        return a.point - b.point;
    });
};

const cyclesData = [
    {
        name: 1,
        value: 930,
    },
    {
        name: 2,
        value: 900,
    },
    {
        name: 3,
        value: 800,
    },
]

export default function RecruitmentSummary(): ReactElement {
    return (
        <>
            <HStack>
                <Stack>
                    <Heading textAlign="center" size="sm" mt="5">
                        Pochodzenie kandydatów
                    </Heading>
                    <BarChart
                        width={600}
                        height={300}
                        data={data}
                        barGap={2}
                        barCategoryGap={3}
                    >
                        <CartesianGrid strokeDasharray="10 10"></CartesianGrid>
                        <XAxis
                            dataKey="name"
                            name="test"
                            interval={0}
                            tick={{ fontSize: 10 }}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar maxBarSize={50} dataKey="value" fill="#8884d8" />
                    </BarChart>
                </Stack>
                <Stack>
                    <Heading textAlign="center" size="sm" mt="5">
                        Rozkład punktów
                    </Heading>
                    <LineChart width={600} height={300} data={getRandomData()}>
                        <XAxis dataKey="point" interval={5} minTickGap={0} />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#ff7300"
                        />
                    </LineChart>
                </Stack>
            </HStack>
            <HStack>
            <Stack>
                    <Heading textAlign="center" size="sm" mt="5">
                        Próg punktowy w poszczególnych cyklach rekrutacji
                    </Heading>
                    <LineChart width={600} height={300} data={cyclesData}>
                        <XAxis dataKey="name" interval={0} minTickGap={0} />
                        <YAxis />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line
                            type="monotone"
                            dataKey="value"
                            stroke="#ff7300"
                        />
                    </LineChart>
                </Stack>
            </HStack>
        </>
    );
}
