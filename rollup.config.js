import babel from 'rollup-plugin-babel';
import path from 'path'
import { uglify } from 'rollup-plugin-uglify';
import typescript from 'rollup-plugin-typescript2';
const getPath = _path => path.resolve(__dirname, _path)
export default {
    input: 'index.ts',
    output: {
        file: 'dist/scratch.wmf.min.js',
        name: 'CODE',
        format: 'umd'//amd,cjs,es,iife,umd
    },
    plugins: [
        babel({
          exclude: 'node_modules/**'
        }),
        uglify(),
        typescript({
            tsconfig: getPath('./tsconfig.json')
        })
    ]
};