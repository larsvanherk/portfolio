import type { Config } from 'tailwindcss';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import colors from 'tailwindcss/colors';

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        primary: '#d35400'
      }
    }
  }
};
