import {
    Alert,
    AlertIcon,
    Button,
    Center,
    FormControl,
    Link,
    Stack,
    VStack,
} from '@chakra-ui/react';
import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router';
import FormInput from '../utils/FormInput';
import { login } from '../../services/api';

export default function LoginForm(): ReactElement {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const history = useHistory();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                login(email, password).catch((error) => setError(error));
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
            </Stack>
            <VStack align="left" mt="5" spacing="3">
                <Link
                    align="left"
                    ml="10%"
                    color="blue.500"
                    onClick={() => history.push('register')}
                >
                    Utwórz nowe konto
                </Link>
            </VStack>
            <Center mt="3">
                {error !== '' && (
                    <Alert w="80%" status="error">
                        <AlertIcon />
                        {error}
                    </Alert>
                )}
            </Center>
            <Center mt="10">
                <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    fontSize="md"
                    m="auto"
                    w="40%"
                >
                    Zaloguj się
                </Button>
            </Center>
        </form>
    );
}
