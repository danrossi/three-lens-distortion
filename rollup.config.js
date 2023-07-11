import glslify from 'rollup-plugin-glslify';


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
	}
];
