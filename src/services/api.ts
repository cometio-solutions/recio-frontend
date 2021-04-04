import axios from 'axios';

const API_URL = 'http://localhost:5000';

const invalidLoginDataError = 'Wprowadzono nieporawny email lub hasło !';
const dbConnectionError = 'Błąd połączenia z bazą danych !';
const incorrectEmailFormatError = 'Niepoprawny adres email !';
const emailAlreadyExistError = 'Podany email jest już zajęty !';

interface UserData {
    token: string;
    role: 'user' | 'editor' | 'admin';
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

const authConfig = {
    ...config,
    headers: {
        ...config.headers,
        token: sessionStorage.getItem('token'),
    },
};

export const login = (email: string, password: string): Promise<UserData> => {
    return new Promise((resolve, reject) => {
        axios
            .post(API_URL + '/user/auth', { email, password }, config)
            .then((res) => {
                console.log(res);
                resolve(res.data);
            })
            .catch((err) => {
                console.log(err);
                if (err.response) {
                    reject(invalidLoginDataError);
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
                    if (err.response.status == 400) {
                        reject(incorrectEmailFormatError);
                    } else {
                        reject(emailAlreadyExistError);
                    }
                } else {
                    reject(dbConnectionError);
                }
            });
    });
};

export const getEditorRequests = (): Promise<EditorRequest[]> => {
    return new Promise((resolve, reject) =>
        axios
            .get(API_URL + '/user/editorRequests', authConfig)
            .then((res) => resolve(res.data))
            .catch((err) => {
                console.error(err);
                reject(dbConnectionError);
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
                authConfig,
            )
            .then((res) => resolve(res.data))
            .catch((err) => {
                console.error(err);
                reject(dbConnectionError);
            }),
    );
};
