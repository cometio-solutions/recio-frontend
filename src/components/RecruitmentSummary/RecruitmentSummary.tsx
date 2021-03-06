import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
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
import {
    HStack,
    Heading,
    Stack,
    useTheme,
    useColorModeValue,
} from '@chakra-ui/react';
import React, { ReactElement, useEffect, useState } from 'react';

interface RecruitmentDetailsProps {
    id: number;
    paidCount: number;
    unpaidCount: number;
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
    paidCount,
    unpaidCount,
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

    const paymentData = [
        { status: 'Zap??acony', amount: paidCount },
        { status: 'Niezap??acony', amount: unpaidCount },
    ];
    const paymentColors = ['#38A169', '#E53E3E'];

    return (
        <Stack spacing={3} align="center">
            <HStack>
                <Stack>
                    <Heading textAlign="center" size="sm" mt="5">
                        Pochodzenie kandydat??w
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
                                value: 'Wojew??dztwo',
                                position: 'insideBottomRight',
                                offset: 0,
                                dy: 5,
                            }}
                        />
                        <YAxis
                            label={{
                                value: 'Ilo???? kandydat??w',
                                angle: -90,
                                dx: -10,
                            }}
                        />
                        <Tooltip />
                        <Bar
                            maxBarSize={50}
                            dataKey="amount"
                            fill="#8884d8"
                            name="Ilo???? kandydat??w"
                        />
                    </BarChart>
                </Stack>
            </HStack>
            <HStack>
                {hasRecruitmentCyclesPointLimit() && (
                    <Stack>
                        <Heading textAlign="center" size="sm" mt="5">
                            Pr??g punktowy w poszczeg??lnych cyklach rekrutacji
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
                                    value: 'Ilo???? punkt??w',
                                    angle: -90,
                                    dx: -10,
                                }}
                            />
                            <Tooltip />
                            <CartesianGrid stroke="#f5f5f5" />
                            <Line
                                name="Ilo???? punkt??w"
                                type="monotone"
                                dataKey="point_limit"
                                stroke="#ff7300"
                            />
                        </LineChart>
                    </Stack>
                )}
                <Stack>
                    <Heading textAlign="center" size="sm" mt="5">
                        Rozk??ad punkt??w
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
                                value: 'Ilo???? punkt??w',
                                position: 'insideBottomRight',
                                offset: 0,
                                dy: 5,
                            }}
                        />
                        <YAxis
                            label={{
                                value: 'Ilo???? kandydat??w',
                                angle: -90,
                                dx: -10,
                            }}
                        />
                        <Tooltip />
                        <CartesianGrid stroke="#f5f5f5" />
                        <Line
                            name="Ilo???? kandydat??w"
                            type="monotone"
                            dataKey="numberOfStudents"
                            stroke="#ff7300"
                        />
                    </LineChart>
                </Stack>
            </HStack>
            <HStack>
                <Stack>
                    <Heading textAlign="center" size="sm" mt="5">
                        Dokonane p??atno??ci rekrutacyjne
                    </Heading>
                    <BarChart width={800} height={300} data={paymentData}>
                        <CartesianGrid strokeDasharray="10 10"></CartesianGrid>
                        <XAxis
                            dataKey="status"
                            label={{
                                value: 'Status p??atno??ci',
                                position: 'center',
                                offset: 0,
                                dy: 10,
                            }}
                        />
                        <YAxis
                            label={{
                                value: 'Ilo???? kandydat??w',
                                angle: -90,
                                dx: -10,
                            }}
                        />
                        <Tooltip />
                        <Bar dataKey="amount" name="Ilo???? kandydat??w">
                            {paymentData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={paymentColors[index]}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </Stack>
            </HStack>
        </Stack>
    );
}
