import {
    Alert,
    AlertIcon,
    Button,
    Center,
    Checkbox,
    Flex,
    FormControl,
    Radio,
    Stack,
} from '@chakra-ui/react';
import React, { ReactElement, useState } from 'react';

import FormInput from '../utils/FormInput';
import { register } from '../../services/api';
import { useHistory } from 'react-router';

export default function RegisterForm(): ReactElement {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [editorRequest, setEditorRequest] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const history = useHistory();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                if (password !== confirmPassword) {
                    setError('Błąd! Podane hasła nie są identyczne!');
                    return;
                }
                register(email, name, password, editorRequest)
                    .then((data) => history.push('/login'))
                    .catch((error) => setError(error));
            }}
        >
            <Stack align="center" spacing="3" mt="10">
                <FormControl w="80%" bg="#F8F8F8">
                    <FormInput
                        placeholder="Email"
                        type="email"
                        onChange={setEmail}
                    />
                </FormControl>
                <FormControl w="80%" bg="#F8F8F8">
                    <FormInput
                        placeholder="Imię i nazwisko"
                        type="text"
                        onChange={setName}
                    />
                </FormControl>
                <FormControl w="80%" bg="#F8F8F8">
                    <FormInput
                        placeholder="Hasło"
                        type="password"
                        onChange={setPassword}
                    />
                </FormControl>
                <FormControl w="80%" bg="#F8F8F8">
                    <FormInput
                        placeholder="Potwierdź hasło"
                        type="password"
                        onChange={setConfirmPassword}
                    />
                </FormControl>
            </Stack>
            <Stack textAlign="left">
                <Checkbox
                    mt="3"
                    ml="10%"
                    isChecked={editorRequest}
                    onChange={(e) => setEditorRequest(e.target.checked)}
                >
                    Uprawnienia do edycji
                </Checkbox>
            </Stack>
            <Center mt="3">
                {error !== '' && (
                    <Alert w="80%" status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
            </Center>
            <Center mt="10">
                <Flex w="90%">
                    <Button
                        type="submit"
                        colorScheme="red"
                        onClick={() => history.push('/login')}
                        size="lg"
                        fontSize="md"
                        m="auto"
                        w="40%"
                    >
                        Powrót
                    </Button>
                    <Button
                        type="submit"
                        colorScheme="blue"
                        size="lg"
                        fontSize="md"
                        m="auto"
                        w="40%"
                    >
                        Utwórz konto
                    </Button>
                </Flex>
            </Center>
        </form>
    );
}
