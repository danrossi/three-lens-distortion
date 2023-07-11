uniform vec2 uK0;
uniform vec2 uCc; 
uniform vec2 uFc; 
uniform float uAlpha_c;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 Xn = 2. * ( uv.st - .5 ); // -1..1
    vec3 Xd = vec3(( 1. + uK0 * dot( Xn, Xn ) ) * Xn, 1.); // distorted 
    mat3 KK = mat3(
        vec3(uFc.x, 0., 0.),
        vec3(uAlpha_c * uFc.x, uFc.y, 0.),
        vec3(uCc.x, uCc.y, 1.)
    );
    
    vec2 Xp = ( KK * Xd ).xy * .5 + .5; // projected; into 0..1 
    if ( Xp.x >= 0. && Xp.x <= 1. && Xp.y >= 0. && Xp.y <= 1. ) {
        outputColor = texture2D(inputBuffer, Xp);
    }

}