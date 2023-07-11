import { Uniform, Vector2 } from 'three';
import { Effect } from 'postprocessing';

var fragmentUvShader = "#define GLSLIFY 1\nuniform vec2 distortion;uniform vec2 principalPoint;uniform vec2 focalLength;uniform float skew;float border(const in vec2 uv){return float(uv.s>=0.0&&uv.s<=1.0&&uv.t>=0.0&&uv.t<=1.0);}void mainUv(inout vec2 uv){vec2 xn=2.0*(uv.st-0.5);vec3 xDistorted=vec3((1.0+distortion*dot(xn,xn))*xn,1.0);mat3 kk=mat3(vec3(focalLength.x,0.0,0.0),vec3(skew*focalLength.x,focalLength.y,0.0),vec3(principalPoint.x,principalPoint.y,1.0));uv=(kk*xDistorted).xy*0.5+0.5;}void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){outputColor=vec4(border(uv)*inputColor.rgb,inputColor.a);}"; // eslint-disable-line

var fragmentImageShader = "#define GLSLIFY 1\nuniform vec2 distortion;uniform vec2 principalPoint;uniform vec2 focalLength;uniform float skew;void mainImage(const in vec4 inputColor,const in vec2 uv,out vec4 outputColor){vec2 Xn=2.*(uv.st-.5);vec3 Xd=vec3((1.+distortion*dot(Xn,Xn))*Xn,1.);mat3 KK=mat3(vec3(focalLength.x,0.,0.),vec3(skew*focalLength.x,focalLength.y,0.),vec3(principalPoint.x,principalPoint.y,1.));vec2 Xp=(KK*Xd).xy*.5+.5;if(Xp.x>=0.&&Xp.x<=1.&&Xp.y>=0.&&Xp.y<=1.){outputColor=texture2D(inputBuffer,Xp);}}"; // eslint-disable-line

/**
 * Lens distortion effect.
 */

class LensDistortionImageEffect extends Effect {

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

class LensDistortionUvEffect extends Effect {

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

export { LensDistortionImageEffect, LensDistortionUvEffect };
