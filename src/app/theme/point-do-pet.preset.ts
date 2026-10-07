import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const PointDoPetPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{yellow.50}',
      100: '{yellow.100}',
      200: '{yellow.200}',
      300: '{yellow.300}',
      400: '{yellow.400}',
      500: '{yellow.500}',
      600: '{yellow.600}',
      700: '{yellow.700}',
      800: '{yellow.800}',
      900: '{yellow.900}',
      950: '{yellow.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{yellow.400}',
          contrastColor: '{surface.900}',
          hoverColor: '{yellow.500}',
          activeColor: '{yellow.600}',
        },
        highlight: {
          background: '{yellow.100}',
          focusBackground: '{yellow.200}',
          color: '{surface.900}',
          focusColor: '{surface.900}',
        },
      },
    },
  },
  components: {
    // Texto amarelo sobre branco é ilegível: variantes sem fundo usam um tom escuro.
    button: {
      outlined: { primary: { color: '{yellow.800}', borderColor: '{yellow.400}' } },
      text: { primary: { color: '{yellow.800}' } },
      link: { color: '{yellow.800}', hoverColor: '{yellow.900}', activeColor: '{yellow.900}' },
    },
  },
});
