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
