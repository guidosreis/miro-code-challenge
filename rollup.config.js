import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

const production = process.env.NODE_ENV === 'production';

export default {
  input: {
    'emails-input': 'src/emails-input.js'
  },
  output: {
    dir: 'dist',
    entryFileNames: `[name]${production ? '.min' : ''}.js`,
    format: 'umd',
    name: 'EmailsInput'
  },
  plugins: [
    babel()
  ]
    .concat(production ? [
      uglify()
    ] : [])
}
