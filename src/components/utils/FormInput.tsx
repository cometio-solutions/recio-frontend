import { Input } from '@chakra-ui/react';
import React, { ReactElement } from 'react';

interface FormInputProps {
    type: string;
    placeholder: string;
    onChange: (state: string) => void;
}

export default function FormInput({
    type,
    placeholder,
    onChange,
}: FormInputProps): ReactElement {
    return (
        <Input
            placeholder={placeholder}
            _hover={{ background: 'blue.50' }}
            _focus={{ background: 'blue.50', border: '2px solid blue' }}
            type={type}
            onChange={(e) => onChange(e.target.value)}
            autoComplete={type}
            required
        />
    );
}
