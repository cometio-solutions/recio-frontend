import axios from 'axios';

const API_URL = 'http://localhost:5000';
const dbConnectionError = 'Błąd połączenia z bazą danych !';

interface UserData {
    token: string;
    role: 'user' | 'editor' | 'admin';
}

const formatMajorMode = (major_mode: string) => {
    if (major_mode === 'Mode.FULL_TIME') return 'Stacjonarne';
    return 'Niestacjonarne';
};

const formatDegree = (degree: string) => {
    if (degree === 'Degree.BACHELOR') return 'Inżnierskie';
    return 'Magisterskie';
};

export const formatRecruitmentBody = (data: Recruitment) => {
    return {
        ...data,
        major_mode: formatMajorMode(data.major_mode),
        degree: formatDegree(data.degree),
    };
};

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

export interface EditorRequest {
    name: string;
    email: string;
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
