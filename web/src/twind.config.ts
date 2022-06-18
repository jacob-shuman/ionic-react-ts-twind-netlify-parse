import { setup, css } from 'twind/css';
import { Configuration } from 'twind';

const config: Configuration = {
  mode: 'warn',

  plugins: {
    'hide-scroll': css`
      /* Chrome, Safari, Opera */
      &::-webkit-scrollbar {
        display: none;
      }

      /* IE, Edge */
      -ms-overflow-style: none;

      /* Firefox */
      scrollbar-width: none;
    `,

    'safe-p': (parts, { theme: t }) => {
      const p = t('padding', parts[0] ?? '0');

      return css`
        padding: ${p};
        @supports (padding: max(0px)) {
          padding-top: max(${p}, env(safe-area-inset-top));
          padding-bottom: max(${p}, env(safe-area-inset-bottom));
          padding-left: max(${p}, env(safe-area-inset-left));
          padding-right: max(${p}, env(safe-area-inset-right));
        }
      `;
    },
    'safe-py': (parts, { theme: t }) => {
      const p = t('padding', parts[0] ?? '0');

      return css`
        padding-top: ${p};
        padding-bottom: ${p};
        @supports (padding: max(0px)) {
          padding-top: max(${p}, env(safe-area-inset-top));
          padding-bottom: max(${p}, env(safe-area-inset-bottom));
        }
      `;
    },
    'safe-pt': (parts, { theme: t }) => {
      const p = t('padding', parts[0] ?? '0');

      return css`
        padding-top: ${p};
        @supports (padding: max(0px)) {
          padding-top: max(${p}, env(safe-area-inset-top));
        }
      `;
    },
    'safe-pb': (parts, { theme: t }) => {
      const p = t('padding', parts[0] ?? '0');

      return css`
        padding-bottom: ${p};
        @supports (padding: max(0px)) {
          padding-bottom: max(${p}, env(safe-area-inset-bottom));
        }
      `;
    },
    'safe-px': (parts, { theme: t }) => {
      const p = t('padding', parts[0] ?? '0');

      return css`
        padding-left: ${p};
        padding-right: ${p};
        @supports (padding: max(0px)) {
          padding-left: max(${p}, env(safe-area-inset-left));
          padding-right: max(${p}, env(safe-area-inset-right));
        }
      `;
    },
    'safe-m': (parts, { theme: t }) => {
      const m = t('margin', parts[0] ?? '0');

      return css`
        margin: ${m};
        @supports (margin: max(0px)) {
          margin-top: max(${m}, env(safe-area-inset-top));
          margin-bottom: max(${m}, env(safe-area-inset-bottom));
          margin-left: max(${m}, env(safe-area-inset-left));
          margin-right: max(${m}, env(safe-area-inset-right));
        }
      `;
    },
    'safe-my': (parts, { theme: t }) => {
      const m = t('margin', parts[0] ?? '0');

      return css`
        margin-top: ${m};
        margin-bottom: ${m};
        @supports (margin: max(0px)) {
          margin-top: max(${m}, env(safe-area-inset-top));
          margin-bottom: max(${m}, env(safe-area-inset-bottom));
        }
      `;
    },
    'safe-mt': (parts, { theme: t }) => {
      const m = t('margin', parts[0] ?? '0');

      return css`
        margin-top: ${m};
        @supports (margin: max(0px)) {
          margin-top: max(${m}, env(safe-area-inset-top));
        }
      `;
    },
    'safe-mx': (parts, { theme: t }) => {
      const m = t('margin', parts[0] ?? '0');

      return css`
        margin-left: ${m};
        margin-right: ${m};
        @supports (margin: max(0px)) {
          margin-left: max(${m}, env(safe-area-inset-left));
          margin-right: max(${m}, env(safe-area-inset-right));
        }
      `;
    },
    'rm-highlight': css`
      -webkit-tap-highlight-color: transparent;
    `,
  },

  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins'],
        raleway: ['Raleway'],
        inter: ['Inter'],
      },
    },
    fontFamily: {
      poppins: ['Poppins'],
      raleway: ['Raleway'],
      inter: ['Inter'],
    },
  },
};

setup(config);

export default config;
