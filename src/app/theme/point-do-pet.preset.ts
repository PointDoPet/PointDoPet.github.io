import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

// Escala gerada a partir do amarelo do logo (#ffac08 = 500).
const amareloLogo = {
  50: '#fff8eb',
  100: '#ffefcc',
  200: '#ffdd94',
  300: '#ffcb5c',
  400: '#ffbb2e',
  500: '#ffac08',
  600: '#e08f00',
  700: '#b06c00',
  800: '#8a5300',
  900: '#6e4300',
  950: '#3f2500',
};

const navyLogo = '#071a28';

export const PointDoPetPreset = definePreset(Aura, {
  semantic: {
    primary: amareloLogo,
    colorScheme: {
      light: {
        primary: {
          color: '{primary.500}',
          contrastColor: navyLogo,
          hoverColor: '{primary.600}',
          activeColor: '{primary.700}',
        },
        highlight: {
          background: '{primary.100}',
          focusBackground: '{primary.200}',
          color: navyLogo,
          focusColor: navyLogo,
        },
      },
    },
  },
  components: {
    // Amarelo sobre branco tem pouco contraste: variantes sem fundo usam um tom escuro.
    button: {
      outlined: { primary: { color: '{primary.800}', borderColor: '{primary.500}' } },
      text: { primary: { color: '{primary.800}' } },
      link: { color: '{primary.800}', hoverColor: '{primary.900}', activeColor: '{primary.900}' },
    },
  },
});
