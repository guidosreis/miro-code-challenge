import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

const production = process.env.NODE_ENV === 'production';

export default {
  input: 'src/emails-input.js',
  output: {
    file: `dist/emails-input${production ? '.min' : ''}.js`,
    format: 'umd',
    name: 'ityped',
    sourcemap: true,
    banner: `/**
    * @name ityped
    * @description Dead simple Animated Typing with no dependencies
    * @author Luis Vinícius
    * @email luisviniciusbarreto@gmail.com
    */`,
  },
  plugins: [
    babel()
  ]
    .concat(production ? [
      uglify()
    ] : [])
}
