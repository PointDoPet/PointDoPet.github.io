import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

export const PointDoPetPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{orange.50}',
      100: '{orange.100}',
      200: '{orange.200}',
      300: '{orange.300}',
      400: '{orange.400}',
      500: '{orange.500}',
      600: '{orange.600}',
      700: '{orange.700}',
      800: '{orange.800}',
      900: '{orange.900}',
      950: '{orange.950}',
    },
    colorScheme: {
      light: {
        primary: {
          color: '{orange.500}',
          contrastColor: '{surface.900}',
          hoverColor: '{orange.600}',
          activeColor: '{orange.700}',
        },
        highlight: {
          background: '{orange.100}',
          focusBackground: '{orange.200}',
          color: '{surface.900}',
          focusColor: '{surface.900}',
        },
      },
    },
  },
  components: {
    // Texto laranja claro sobre branco tem pouco contraste: variantes sem fundo usam um tom escuro.
    button: {
      outlined: { primary: { color: '{orange.800}', borderColor: '{orange.500}' } },
      text: { primary: { color: '{orange.800}' } },
      link: { color: '{orange.800}', hoverColor: '{orange.900}', activeColor: '{orange.900}' },
    },
  },
});
