import { Uniform, Vector2 } from "three";
import { Effect } from "postprocessing";


import fragmentShader from "./glsl/lens-distortion.frag";

/**
 * Lens distortion effect.
 */
export class LensDistortionEffect extends Effect {

	constructor({
	    distortion = new Vector2(0, 0),
        principalPoint = new Vector2(0, 0),
        focalLength = new Vector2(1, 1),
        skew = 0,
	} = {}) {

		super("LensDistortionEffect", fragmentShader, {
            uniforms: new Map([
				["distortion", new Uniform(distortion)], // radial distortion coeff 0 // radial distortion coeff of term r^2
                ["principalPoint", new Uniform(principalPoint)],
                ["focalLength", new Uniform(focalLength)],
                ["skew", new Uniform(skew)],
			])
		});

	
	}

	get distortion() {

		return this.uniforms.get("distortion").value;

	}

	set distortion(value) {

		this.uniforms.get("distortion").value = value;

	}

	get principalPoint() {

		return this.uniforms.get("principalPoint").value;

	}

	set principalPoint(value) {

		this.uniforms.get("principalPoint").value = value;

	}

	get focalLength() {

		return this.uniforms.get("focalLength").value;

	}

	set focalLength(value) {

		this.uniforms.get("focalLength").value = value;

	}

	get skew() {

		return this.uniforms.get("skew").value;

	}

	set skew(value) {

		this.uniforms.get("skew").value = value;

	}

}