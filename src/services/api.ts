import axios from 'axios';

const API_URL = 'http://134.122.71.130:5000';
const dbConnectionError = 'Błąd połączenia z bazą danych !';

interface UserData {
    token: string;
    role: 'user' | 'editor' | 'admin';
}

export interface Recruitment {
    id: number;
    cycle_number: number;
    degree: string;
    end_date: string;
    faculty: string;
    is_active: boolean;
    major_mode: string;
    major_name: string;
    point_limit: number;
    slot_limit: number;
}

export interface CyclesSummary {
    cycles_number: number;
    overall_candidates_num: number;
    overall_qualified: number;
    min_point_limit: number;
    is_active: boolean;
    faculty: string;
    degree: string;
    major_name: string;
    major_mode: string;
}

export interface HistoryRecruitment {
    id: number;
    end_date: string;
    cycle_number: number;
    is_active: boolean;
    faculty: string;
    degree: string;
    major_name: string;
    major_mode: string;
    status: string;
}

export interface Candidate {
    id: number;
    name: string;
    country: string;
    city: string;
    region: string;
    highschool: string;
    highschool_city: string;
    pesel: string;
    matura_points: number;
    matura_date: string;
    graduation_date: string;
    points: number;
    is_paid: boolean;
    college_name: string;
    test_points: number;
    field_of_study: string;
    average: number;
    mode: string;
    status: string;
}

export interface RecruitmentDetails extends Recruitment {
    candidates: Candidate[];
}

export interface Major {
    id: number;
    faculty: string;
    mode: string;
    name: string;
    degree: string;
}

export interface EditorRequest {
    name: string;
    email: string;
}

export interface PointLimit {
    cycle_number: number;
    point_limit: number;
}

export interface CandidatesOrigin {
    origin: string;
    amount: number;
}

export interface CandidatesPoints {
    points: number;
    numberOfStudents: number;
}

const config = {
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
    },
};

function authConfig() {
    return {
        ...config,
        headers: {
            ...config.headers,
            token: sessionStorage.getItem('token'),
        },
    };
}

function pdfConfig() {
    const config = authConfig() as any;
    config.headers.accept = 'application/pdf';
    config['responseType'] = 'arraybuffer';
    return config;
}

export const login = (email: string, password: string): Promise<UserData> => {
    return new Promise((resolve, reject) => {
        axios
            .post(API_URL + '/user/auth', { email, password }, config)
            .then((res) => {
                console.log(res);
                resolve(res.data);
            })
            .catch((err) => {
                if (err.response) {
                    reject(err.response.data.error);
                } else {
                    reject(dbConnectionError);
                }
            });
    });
};

export const register = (
    email: string,
    name: string,
    password: string,
    editorRequest: boolean,
): Promise<string> => {
    return new Promise((resolve, reject) => {
        axios
            .post(
                API_URL + '/user',
                { email, name, password, editorRequest },
                config,
            )
            .then((res) => {
                console.log(res);
                resolve(res.data);
            })
            .catch((err) => {
                console.log(err);
                if (err.response) {
                    reject(err.response.data.error);
                } else {
                    reject(dbConnectionError);
                }
            });
    });
};

export const getEditorRequests = (): Promise<EditorRequest[]> => {
    return new Promise((resolve, reject) =>
        axios
            .get(API_URL + '/user/editorRequests', authConfig())
            .then((res) => resolve(res.data))
            .catch((err) => {
                console.error(err);
                reject(err.response.data.error);
            }),
    );
};

export const settleEditorRequests = (
    name: string,
    email: string,
    approved: boolean,
): Promise<EditorRequest[]> => {
    const approval = approved ? 'accept' : 'reject';
    return new Promise((resolve, reject) =>
        axios
            .post(
                API_URL + '/user/editorRequests',
                { name, email, approval },
                authConfig(),
            )
            .then((res) => resolve(res.data))
            .catch((err) => {
                console.error(err);
                reject(err.response.data.error);
            }),
    );
};

export const getRecruitment = (): Promise<Recruitment[]> => {
    return new Promise((resolve, reject) =>
        axios
            .get(API_URL + '/recruitment', authConfig())
            .then((res) => {
                resolve(res.data.data);
            })
            .catch((err) => {
                console.error(err);
                reject(err.response.data.error);
            }),
    );
};

export const getRecruitmentDetails = (
    id: number,
): Promise<RecruitmentDetails> => {
    return new Promise((resolve, reject) =>
        axios
            .get(API_URL + '/recruitment/' + id, authConfig())
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.error(err);
                reject(err.response.data.error);
            }),
    );
};

export const getPreviousRecruitmentCycle = (
    id: number,
): Promise<RecruitmentDetails> => {
    return new Promise((resolve, reject) =>
        axios
            .get(API_URL + '/recruitment/' + id + '/previous', authConfig())
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.response.data.error);
            }),
    );
};

export const getNextRecruitmentCycle = (
    id: number,
): Promise<RecruitmentDetails> => {
    return new Promise((resolve, reject) =>
        axios
            .get(API_URL + '/recruitment/' + id + '/next', authConfig())
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.response.data.error);
            }),
    );
};

export const importFile = (element: Element): Promise<string> => {
    const formData = new FormData();
    formData.append('data', (element as any).files[0]);
    const headers = { ...authConfig(), 'Content-Type': 'multipart/form-data' };
    return new Promise((resolve, reject) =>
        axios
            .post(API_URL + '/file', formData, headers)
            .then((res) => resolve(res.data.message))
            .catch((err) => {
                reject(err.response.data.error);
            }),
    );
};

export const getYears = (): Promise<number[]> => {
    return new Promise((resolve, reject) =>
        axios
            .get(API_URL + '/years', authConfig())
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.error(err);
                reject(err.response.data.error);
            }),
    );
};

export const getMajors = (): Promise<Major[]> => {
    return new Promise((resolve, reject) =>
        axios
            .get(API_URL + '/majors', authConfig())
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.error(err);
                reject(err.response.data.error);
            }),
    );
};

export const getPointLimitForCycles = (
    recruitment_id: number,
): Promise<PointLimit[]> => {
    return new Promise((resolve, reject) =>
        axios
            .get(API_URL + '/point-limit/' + recruitment_id, authConfig())
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                console.error(err);
                reject(err.response.data.error);
            }),
    );
};

export const getCandidatesPointsDistribution = (
    recruitment_id: number,
): Promise<CandidatesPoints[]> => {
    return new Promise((resolve, reject) =>
        axios
            .get(API_URL + '/points/' + recruitment_id, authConfig())
            .then((res) => resolve(res.data))
            .catch((err) => {
                console.error(err);
                reject(err.response.data.error);
            }),
    );
};

export const getCandidatesOrigin = (
    id: number,
): Promise<CandidatesOrigin[]> => {
    return new Promise((resolve, reject) =>
        axios
            .get(API_URL + '/origins/' + id, authConfig())
            .then((res) => {
                const candidatesOrigin: CandidatesOrigin[] = [];
                for (const origin of Object.keys(res.data)) {
                    candidatesOrigin.push({
                        origin,
                        amount: res.data[origin],
                    });
                }
                resolve(candidatesOrigin);
            })
            .catch((err) => {
                console.error(err);
                reject(err.response.data.error);
            }),
    );
};

export const updatePointLimits = (): Promise<string> => {
    return new Promise((resolve, reject) =>
        axios
            .post(API_URL + '/point-limit', {}, authConfig())
            .then((res) => resolve(res.data.message))
            .catch((err) => reject(err.response.data.error)),
    );
};

export const getCandidateRecruitmentHistory = (
    pesel: string,
): Promise<HistoryRecruitment[]> => {
    return new Promise((resolve, reject) =>
        axios
            .get(API_URL + '/candidate/migration/' + pesel, authConfig())
            .then((res) => {
                resolve(res.data.data);
            })
            .catch((err) => {
                reject(err.response.data.error);
            }),
    );
};

export const getCyclesSummary = (id: number): Promise<CyclesSummary> => {
    return new Promise((resolve, reject) =>
        axios
            .get(API_URL + '/recruitment/' + id + '/summary', authConfig())
            .then((res) => {
                resolve(res.data);
            })
            .catch((err) => {
                reject(err.response.data.error);
            }),
    );
};

export const openPlotReport = (): Promise<boolean> => {
    return axios
        .get(API_URL + '/report/plots', pdfConfig())
        .then((res) => {
            openPDF(res.data);
            return true;
        })
        .catch((err) => {
            console.error(err);
            return true;
        });
};

export const openYearReport = (year: number): Promise<boolean> => {
    return axios
        .get(API_URL + `/report/` + year, pdfConfig())
        .then((res) => {
            openPDF(res.data);
            return true;
        })
        .catch((err) => {
            console.error(err);
            return true;
        });
};

function openPDF(data: string) {
    const blob = new Blob([data], { type: 'application/pdf;base64' });
    const fileURL = URL.createObjectURL(blob);
    window.open(fileURL);
}
