import { Uniform, Vector2 } from "three";
import { Effect } from "postprocessing";


import fragmentShader from "./glsl/lens-distortion.frag";

/**
 * Lens distortion effect.
 */

export class LensDistortionEffect extends Effect {

	constructor({
	    distortion = new THREE.Vector2(0, 0),
        principalPoint = new THREE.Vector2(0, 0),
        focalLength = new THREE.Vector2(1, 1),
        skew = 0,
	} = {}) {

		super("LensDistortionEffect", fragmentShader, {
			uniforms: new Map([
				//["tDiffuse", new Uniform(null)],
				["uK0", new Uniform(distortion)], // radial distortion coeff 0 // radial distortion coeff of term r^2
                ["uCc", new Uniform(principalPoint)],
                ["uFc", new Uniform(focalLength)],
                ["uAlpha_c", new Uniform(skew)],
			])
		});

	
	}

}