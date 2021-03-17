import {
    Button,
    Center,
    FormControl,
    Input,
    Link,
    Stack,
    VStack,
} from '@chakra-ui/react';
import React, { ReactElement, useState } from 'react';
import { useHistory } from 'react-router';

export default function LoginForm(): ReactElement {
    const [email, setEmail] = useState<String>("");
    const [password, setPassword] = useState<String>("");
    const history = useHistory();

    return (
        <form
            onSubmit={() => {
               console.log(email);
               console.log(password);
            }}
        >
            <Stack align="center" spacing="3" mt="10">
                <FormControl w="80%" bg="#F8F8F8">
                    <Input
                        placeholder="Email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />
                </FormControl>
                <FormControl w="80%" bg="#F8F8F8">
                    <Input
                        placeholder="Password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="password"
                        required
                    />
                </FormControl>
            </Stack>
            <VStack align="left" mt="5" spacing="3">
                <Link align="left" ml="10%" color="blue.500" onClick={() => history.push("register")}>
                    Don't have account ? Sing up
                </Link>
            </VStack>
            <Center mt="10">
                <Button
                    type="submit"
                    colorScheme="blue"
                    size="lg"
                    fontSize="md"
                    m="auto"
                    w="40%"
                >
                    Sign in
                </Button>
            </Center>
        </form>
    );
}
