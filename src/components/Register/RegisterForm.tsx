import {
    Alert,
    AlertIcon,
    Button,
    Center,
    Flex,
    FormControl,
    Stack,
} from '@chakra-ui/react';
import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router';
import { register } from '../../services/api';
import FormInput from '../utils/FormInput';

export default function RegisterForm(): ReactElement {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
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
                register(email, password).catch((error) => setError(error));
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
                        onClick={() => history.push('/')}
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
