precision mediump float;

uniform float iGlobalTime;
uniform vec2 u_resolution;

#pragma glslify: blend = require("./glsl-blend/screen")

#define PI 3.14159265359

void main() {
  vec2 st = gl_FragCoord.xy / u_resolution;

  float x = st.x;
    float y = st.y;
    float opacity = 0.5;
    vec4 color, color2;
    float mixValue = 0.5;
    color = vec4(0.0, 0.0, sin(st.y * PI), mixValue);
    color2 = vec4(0.0, 0.4, 0.6, mixValue);
    color = mix(color, color2, 0.5);
    float unit = 2.0 * sin(iGlobalTime / 4.0) + sin(x * PI) - cos(y * PI);
     vec3 color3 = blend(color.rgb, vec3(unit, unit / 3.0, 0.0), 0.5);

    float center = 1.0 - sin(iGlobalTime / 4.0);
    float circle = (1.0 - 8.5 * sqrt((x - 0.5) * (x - 0.5) + (y-center) * (y-center)));
    vec4 sun = vec4(circle, circle * 0.9, 0.0, opacity);
    color3 = blend(color3.rgb, sun.rgb);
    gl_FragColor = vec4(color3, 0.5);
}
