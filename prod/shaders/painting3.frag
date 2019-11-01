#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// float plot(vec2 st, float pct){
//   return  smoothstep( pct-0.02, pct, st.y) -
//           smoothstep( pct, pct+0.02, st.y);
// }

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;

    float x = st.x;
    float y = st.y;

    float opacity = 0.5;
    vec4 color, color2;
    float mixValue = distance(st,vec2(0,1));
    // float rays = 0.0;
    float rays = 2.0 * sin(u_time / 4.0) + sin(x * PI) - cos(y * PI);
    float center = 1.0 - sin(u_time / 4.0);
    float circle = (1.0 - 4.5 * sqrt((x - 0.5) * (x - 0.5) + (y-center) * (y-center)));
    color = vec4(rays, circle, sin(st.y * PI), mixValue);
    color2 = vec4(0.0, 0.6, 0.6, mixValue);
    color = mix(color, color2, 0.5);
    gl_FragColor = vec4(color);
}
