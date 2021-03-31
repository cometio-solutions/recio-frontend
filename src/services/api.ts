import axios from 'axios';

const API_URL = 'http://localhost:5000';

const invalidLoginDataError = 'Wprowadzono nieporawny email lub hasło !';
const dbConnectionError = 'Błąd połączenia z bazą danych !';
const incorrectEmailFormatError = 'Niepoprawny adres email !';
const emailAlreadyExistError = 'Podany email jest już zajęty !';

interface UserData {
    token: string;
    role: string;
}

const config = {
    headers: {
        accept: 'application/json',
        'Content-Type': 'application/json',
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
