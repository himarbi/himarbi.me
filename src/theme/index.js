import { extendTheme, defineStyleConfig } from '@chakra-ui/react';

const Button = defineStyleConfig({
    baseStyle: {
        borderRadius: 'full',
        fontWeight: 'bold',
    },
    variants: {
        solid: (props) => ({
            bg: props.colorScheme === 'brand' ? 'brand.500' : undefined,
            color: props.colorScheme === 'brand' ? 'white' : undefined,
            boxShadow: props.colorScheme === 'brand' ? '0 4px 14px 0 rgba(37, 99, 235, 0.39)' : 'sm',
            _hover: {
                transform: 'translateY(-2px)',
                boxShadow: props.colorScheme === 'brand' ? '0 6px 20px rgba(37, 99, 235, 0.5)' : 'md',
                bg: props.colorScheme === 'brand' ? 'brand.400' : undefined,
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }),
        outline: () => ({
            _hover: {
                transform: 'translateY(-2px)',
                boxShadow: 'md',
            },
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }),
    },
});

const Card = defineStyleConfig({
    baseStyle: (props) => ({
        bg: props.colorMode === 'dark' ? 'gray.800' : 'white',
        borderRadius: '2xl',
        boxShadow: props.colorMode === 'dark' ? '0 10px 30px -10px rgba(0,0,0,0.5)' : '0 10px 30px -10px rgba(0,0,0,0.1)',
        border: '1px solid',
        borderColor: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.100',
        overflow: 'hidden',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    }),
});

const styles = {
    global: (props) => ({
        'html, body': {
            bg: props.colorMode === 'dark' ? '#0B1120' : '#FAFAFA',
            color: props.colorMode === 'dark' ? 'gray.100' : '#0F172A',
            fontFamily: '"Plus Jakarta Sans", "Inter", sans-serif',
            scrollBehavior: 'smooth',
            transitionProperty: 'background-color, color',
            transitionDuration: '0.4s',
            transitionTimingFunction: 'ease-in-out',
        },
        '*::placeholder': {
            color: props.colorMode === 'dark' ? 'whiteAlpha.400' : 'gray.400',
        },
        '*, *::before, &::after': {
            borderColor: props.colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.200',
        },
    }),
};

const colors = {
    brand: {
        50: '#eff6ff',
        100: '#dbeafe',
        200: '#bfdbfe',
        300: '#93c5fd',
        400: '#60a5fa',
        500: '#2563EB', // main blue
        600: '#1d4ed8',
        700: '#1e40af',
        800: '#1e3a8a',
        900: '#1e3a8a',
    },
};

const semanticTokens = {
    colors: {
        bg: {
            default: '#FAFAFA',
            _dark: '#0B1120', // deep navy/charcoal for dark mode
        },
        cardBg: {
            default: 'white',
            _dark: '#1E293B',
        },
        text: {
            default: '#0F172A',
            _dark: '#F8FAFC',
        },
        muted: {
            default: '#64748B',
            _dark: '#94A3B8',
        },
        borderColor: {
            default: 'gray.200',
            _dark: 'whiteAlpha.200',
        }
    }
}

const fonts = {
    heading: '"Plus Jakarta Sans", "Inter", sans-serif',
    body: '"Plus Jakarta Sans", "Inter", sans-serif',
};

const config = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const theme = extendTheme({
    colors,
    semanticTokens,
    fonts,
    styles,
    config,
    components: {
        Button,
        Card,
    },
});

export default theme;
