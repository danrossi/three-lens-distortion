import { Uniform, Vector2 } from "three";
import { Effect } from "postprocessing";


import fragmentUvShader from "./glsl/lens-distortion-uv.frag";
import fragmentImageShader from "./glsl/lens-distortion-image.frag";

/**
 * Lens distortion effect.
 */

export class LensDistortionImageEffect extends Effect {

	constructor({
	    distortion = new Vector2(0, 0),
        principalPoint = new Vector2(0, 0),
        focalLength = new Vector2(1, 1),
        skew = 0,
	} = {}) {

		super("LensDistortionImageEffect", fragmentImageShader, {
            uniforms: new Map([
				["distortion", new Uniform(distortion)], // radial distortion coeff 0 // radial distortion coeff of term r^2
                ["principalPoint", new Uniform(principalPoint)],
                ["focalLength", new Uniform(focalLength)],
                ["skew", new Uniform(skew)],
			])
		});

	
	}

}

export class LensDistortionUvEffect extends Effect {

	constructor({
	    distortion = new Vector2(0, 0),
        principalPoint = new Vector2(0, 0),
        focalLength = new Vector2(1, 1),
        skew = 0,
	} = {}) {

		super("LensDistortioUvnEffect", fragmentUvShader, {
            uniforms: new Map([
				["distortion", new Uniform(distortion)], // radial distortion coeff 0 // radial distortion coeff of term r^2
                ["principalPoint", new Uniform(principalPoint)],
                ["focalLength", new Uniform(focalLength)],
                ["skew", new Uniform(skew)],
			])
		});

	
	}

}