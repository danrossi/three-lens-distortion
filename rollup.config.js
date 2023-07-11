import glslify from 'rollup-plugin-glslify';
import includePaths from 'rollup-plugin-includepaths';
import resolve  from '@rollup/plugin-node-resolve';

export default [
	{
		input: './src/index.js',
		external: ['three'],
		plugins: [
			glslify()
		],
		output: [
			{
				format: 'esm',
				file: 'build/three-lens-distortion.module.js'
			}
		]
	},
	{
		input: './src/postprocessing.js',
		external: ['three','postprocessing'],
		plugins: [
			glslify()
		],
		output: [
			{
				format: 'esm',
				file: 'build/postprocessing-lens-distortion.module.js'
			}
		]
	},
	{
		input: './three-lib.js',
		plugins: [
			resolve(),
			includePaths({
				paths: ["./node_modules/three/examples/jsm/"]
		  	}),
		],
		output: [
			{
				format: 'esm',
				file: 'example/three.module.js'
			}
		]
	},
	{
		input: './postprocessing-lib.js',
		plugins: [
			resolve()
		],
		output: [
			{
				format: 'esm',
				file: 'example/postprocessing.module.js'
			}
		]
	}
];
