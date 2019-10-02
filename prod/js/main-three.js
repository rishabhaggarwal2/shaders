let container;
let camera, scene, renderer;
let uniforms = {
	u_time: null,
	u_resolution: null,
	u_mouse: null
};

// const fragmentShader = `
// uniform vec2 u_resolution;
//       uniform float u_time;

//       void main() {
//           vec2 st = gl_FragCoord.xy/u_resolution.xy;
//           gl_FragColor=vec4(st.x,st.y,0.0,1.0);
//       }`;

init();
animate();

function init() {
	container = document.getElementById("container");
	console.log(document);

	camera = new THREE.Camera();
	camera.position.z = 1;

	scene = new THREE.Scene();

	const geometry = new THREE.PlaneBufferGeometry(2, 2);

	uniforms = {
		u_time: { type: "f", value: 1.0 },
		u_resolution: { type: "v2", value: new THREE.Vector2() },
		u_mouse: { type: "v2", value: new THREE.Vector2() }
	};

	const material = new THREE.ShaderMaterial({
		uniforms: uniforms,
		vertexShader: document.getElementById("vertexShader").textContent,
		fragmentShader: document.getElementById("fragmentShader").textContent
	});

	const mesh = new THREE.Mesh(geometry, material);
	scene.add(mesh);

	renderer = new THREE.WebGLRenderer();
	renderer.setPixelRatio(window.devicePixelRatio);

	container.appendChild(renderer.domElement);

	onWindowResize();
	window.addEventListener("resize", onWindowResize, false);

	document.onmousemove = function(e) {
		uniforms.u_mouse.value.x = e.pageX;
		uniforms.u_mouse.value.y = e.pageY;
	};
}

function onWindowResize(event) {
	renderer.setSize(window.innerWidth, window.innerHeight);
	uniforms.u_resolution.value.x = renderer.domElement.width;
	uniforms.u_resolution.value.y = renderer.domElement.height;
}

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	uniforms.u_time.value += 0.05;
	renderer.render(scene, camera);
}
