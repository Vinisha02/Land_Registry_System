import { theme } from '@chakra-ui/react';

const customTheme = {
  ...theme,
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
  styles: {
    global: {
      body: {
        bg: 'gray.100',
        color: 'black',
      },
    },
  },
};

export default customTheme;
