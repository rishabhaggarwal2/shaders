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
    color = vec4(0.0, 0.0, sin(st.y * PI), opacity);
    color2 = vec4(0.0, 0.4, 0.6, opacity);
    color = mix(color, color2, 0.5);
    // color = y < 0.4 ? vec4(0.0, 0.0, sin(smoothstep(0.0 ,1.0, st.y)), opacity) : vec4(0.0);
    // color = mix(color, vec4(0.0, y, 0.0, opacity), 0.5);
    // color = mix(color, vec4(1.0 + cos(u_time) + (sin(x * PI) + cos(y * PI)), 0.0, 0.0, opacity), 0.5);
    float unit = 2.0 * sin(u_time) + sin(x * PI) - cos(y * PI);
    color = mix(color, vec4(unit, unit / 3.0, 0.0, opacity), 0.5);

    // float circle = 1.0 - 7.5 * sqrt((x - 0.5) * (x - 0.5) + (y-0.5) * (y-0.5));
    // vec4 sun = vec4(circle, circle * 0.4, 0.0, opacity);
    // color = color + sun;
    // color = mix(color, sun, 0.5);

    // float pct = plot(st,y);
    // color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color);
}
