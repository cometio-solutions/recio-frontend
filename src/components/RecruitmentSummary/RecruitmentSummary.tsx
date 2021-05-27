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
import {
    CandidatesOrigin,
    CandidatesPoints,
    PointLimit,
    getCandidatesOrigin,
    getCandidatesPointsDistribution,
    getPointLimitForCycles,
} from '../../../src/services/api';
import { HStack, Heading, Stack } from '@chakra-ui/react';
import React, { ReactElement, useEffect, useState } from 'react';

interface RecruitmentDetailsProps {
    id: number;
}

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

export default function RecruitmentSummary({
    id,
}: RecruitmentDetailsProps): ReactElement {
    const [cyclesPointLimit, setCyclesPointLimit] = useState<PointLimit[]>([]);
    const [candidateOrigin, setCandidateOrigin] = useState<CandidatesOrigin[]>(
        [],
    );
    const [pointsDistribution, setPointsDistribution] = useState<
        CandidatesPoints[]
    >([]);

    const hasRecruitmentCyclesPointLimit = (): boolean => {
        for (const pointLimit of cyclesPointLimit) {
            if (pointLimit.point_limit == null) {
                return false;
            }
        }
        return true;
    };

    useEffect(() => {
        getPointLimitForCycles(id)
            .then((data) =>
                setCyclesPointLimit(
                    data.sort((a, b) => a.point_limit - b.point_limit),
                ),
            )
            .catch((err) => console.log(err));
        getCandidatesOrigin(id).then((data) => setCandidateOrigin(data));
        getCandidatesPointsDistribution(id).then((data) =>
            setPointsDistribution(data.sort((a, b) => a.points - b.points)),
        );
    }, []);
    return (
        <Stack spacing={3} align="center">
            <HStack>
                <Stack>
                    <Heading textAlign="center" size="sm" mt="5">
                        Pochodzenie kandydatów
                    </Heading>
                    <BarChart
                        width={1800}
                        height={300}
                        data={candidateOrigin}
                        barGap={2}
                        barCategoryGap={3}
                    >
                        <CartesianGrid strokeDasharray="10 10"></CartesianGrid>
                        <XAxis
                            dataKey="origin"
                            name="test"
                            interval={0}
                            tick={{ fontSize: 10 }}
                            label={{
                                value: 'Województwo',
                                position: 'insideBottomRight',
                                offset: 0,
                                dy: 5,
                            }}
                        />
                        <YAxis
                            label={{
                                value: 'Ilość kandydatów',
                                angle: -90,
                                dx: -10,
                            }}
                        />
                        <Tooltip />
                        <Bar
                            maxBarSize={50}
                            dataKey="amount"
                            fill="#8884d8"
                            name="Ilość kandydatów"
                        />
                    </BarChart>
                </Stack>
            </HStack>
            <HStack>
                {hasRecruitmentCyclesPointLimit() && (
                    <Stack>
                        <Heading textAlign="center" size="sm" mt="5">
                            Próg punktowy w poszczególnych cyklach rekrutacji
                        </Heading>
                        <LineChart
                            width={600}
                            height={300}
                            data={cyclesPointLimit}
                        >
                            <XAxis
                                dataKey="cycle_number"
                                interval={0}
                                minTickGap={0}
                                label={{
                                    value: 'Numer cyklu',
                                    position: 'insideBottomRight',
                                    offset: 0,
                                    dy: 5,
                                }}
                            />
                            <YAxis
                                label={{
                                    value: 'Ilość punktów',
                                    angle: -90,
                                    dx: -10,
                                }}
                            />
                            <Tooltip />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Line
                                name="Ilość punktów"
                                type="monotone"
                                dataKey="point_limit"
                                stroke="#ff7300"
                            />
                        </LineChart>
                    </Stack>
                )}
                <Stack>
                    <Heading textAlign="center" size="sm" mt="5">
                        Rozkład punktów
                    </Heading>
                    <LineChart
                        width={1000}
                        height={300}
                        data={pointsDistribution}
                    >
                        <XAxis
                            dataKey="points"
                            interval={5}
                            minTickGap={0}
                            label={{
                                value: 'Ilość punktów',
                                position: 'insideBottomRight',
                                offset: 0,
                                dy: 5,
                            }}
                        />
                        <YAxis
                            label={{
                                value: 'Ilość kandydatów',
                                angle: -90,
                                dx: -10,
                            }}
                        />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line
                            name="Ilość kandydatów"
                            type="monotone"
                            dataKey="numberOfStudents"
                            stroke="#ff7300"
                        />
                    </LineChart>
                </Stack>
            </HStack>
        </Stack>
    );
}
