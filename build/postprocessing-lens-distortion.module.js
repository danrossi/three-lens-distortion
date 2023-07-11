import { Uniform, Vector2 } from 'three';
import { Effect } from 'postprocessing';

var fragmentShader = "#define GLSLIFY 1\nuniform vec2 uK0;uniform vec2 uCc;uniform vec2 uFc;uniform float uAlpha_c;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec2 Xn=2.*(uv.st-.5);vec3 Xd=vec3((1.+uK0*dot(Xn,Xn))*Xn,1.);mat3 KK=mat3(vec3(uFc.x,0.,0.),vec3(uAlpha_c*uFc.x,uFc.y,0.),vec3(uCc.x,uCc.y,1.));vec2 Xp=(KK*Xd).xy*.5+.5;if(Xp.x>=0.&&Xp.x<=1.&&Xp.y>=0.&&Xp.y<=1.){outputColor=texture2D(inputBuffer,Xp);}}"; // eslint-disable-line

/**
 * Lens distortion effect.
 */

class LensDistortionEffect extends Effect {

	constructor({
	    distortion = new Vector2(0, 0),
        principalPoint = new Vector2(0, 0),
        focalLength = new Vector2(1, 1),
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

export { LensDistortionEffect };
