uniform vec2 distortion;
uniform vec2 principalPoint; 
uniform vec2 focalLength; 
uniform float skew;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 Xn = 2. * ( uv.st - .5 ); // -1..1
    vec3 Xd = vec3(( 1. + distortion * dot( Xn, Xn ) ) * Xn, 1.); // distorted 
    mat3 KK = mat3(
        vec3(focalLength.x, 0., 0.),
        vec3(skew * focalLength.x, focalLength.y, 0.),
        vec3(principalPoint.x, principalPoint.y, 1.)
    );
    
    vec2 Xp = ( KK * Xd ).xy * .5 + .5; // projected; into 0..1 
    if ( Xp.x >= 0. && Xp.x <= 1. && Xp.y >= 0. && Xp.y <= 1. ) {
        outputColor = texture2D(inputBuffer, Xp);
    }

}