import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Text,
} from '@chakra-ui/react';
import React, { FormEvent, useState } from 'react';

import { importFile } from '../../services/api';

export default function ImportForm() {
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState<string>();
    const [error, setError] = useState<string>();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');
        setError('');
        const fileInput = (e.target as HTMLFormElement).elements.namedItem(
            'file',
        );
        importFile(fileInput as Element)
            .then(setMessage)
            .catch(setError)
            .finally(() => setIsLoading(false));
    };

    return (
        <Box
            mt="8"
            bg="white"
            p="4"
            boxShadow="md"
            borderRadius="md"
            backgroundColor="gray.50"
        >
            <Heading size="md" mb="3">
                Import plików
            </Heading>
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <FormControl id="file" isRequired isInvalid={!!error}>
                    <FormLabel htmlFor="file">Plik do zaimportowania</FormLabel>
                    <input
                        type="file"
                        name="file"
                        id="file"
                        accept=".csv,.xlsx"
                    />
                    <FormHelperText>
                        Akceptowane formaty: .csv i .xlsx
                    </FormHelperText>
                </FormControl>
                <Button
                    type="submit"
                    colorScheme="blue"
                    mt="3"
                    disabled={isLoading}
                    isLoading={isLoading}
                >
                    Importuj...
                </Button>
            </form>

            {error && <Text color="red">{error}</Text>}
            {message && <Text color="green">{message}</Text>}
        </Box>
    );
}
