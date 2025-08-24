// src/theme.ts
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  fonts: {
    body: "'Inter', sans-serif", // Match your original font, if used
  },
  styles: {
    global: {
      body: {
        margin: 0,
      },
    },
  },
});

export default theme;
