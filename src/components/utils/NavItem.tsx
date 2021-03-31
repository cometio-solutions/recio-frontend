import { Box, Link } from '@chakra-ui/react';

import React from 'react';

export default function NavItem(props: {
    href: string;
    onClick?: () => void;
    text?: string;
    active?: boolean;
    right?: boolean;
}) {
    const { href, text, active, right, onClick } = props;
    const bg = active ? 'blue.500' : 'transparent';
    const color = active ? 'white' : 'black';
    const bgHover = active ? bg : 'blue.100';
    const ms = right ? 'auto !important' : undefined;
    return (
        <Link
            onClick={onClick}
            href={href}
            style={{ textDecoration: 'none' }}
            ms={ms}
        >
            <Box
                py="2"
                px="4"
                borderRadius="md"
                bg={bg}
                color={color}
                _hover={{ bg: bgHover }}
            >
                {text || href}
            </Box>
        </Link>
    );
}
