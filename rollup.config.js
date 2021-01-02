import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';
import postcss from 'rollup-plugin-postcss';
import autoprefixer from 'autoprefixer';
import env from 'postcss-preset-env';
import cssnano from 'cssnano';

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
    postcss({
      extensions: ['.sass', '.scss'],
      namedExports: true,
      extract: true,
      plugins: [
        env(),
        autoprefixer(),
        cssnano()
      ]
    }),
    babel()
  ]
    .concat(production ? [
      uglify()
    ] : [])
}
