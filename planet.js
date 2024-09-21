const planetContainer = document.getElementById("planet-container");
const scene2 = new THREE.Scene();
scene2.background = new THREE.Color(0x02011a); // Set background color to blue

const camera1 = new THREE.PerspectiveCamera(
    75,
    planetContainer.clientWidth / planetContainer.clientHeight,
    0.1,
    1000
);
const renderer1 = new THREE.WebGLRenderer({ antialias: true });

renderer1.setSize(planetContainer.clientWidth, planetContainer.clientHeight);
planetContainer.appendChild(renderer1.domElement);

window.addEventListener("resize", () => {
    const planetContainer = document.getElementById("planet-container");
    camera1.aspect = planetContainer.clientWidth / planetContainer.clientHeight; // Update aspect ratio
    camera1.updateProjectionMatrix();
    renderer1.setSize(planetContainer.clientWidth, planetContainer.clientHeight);
});

// Add the rest of your Three.js model and animations here

renderer1.setPixelRatio(window.devicePixelRatio);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene2.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(7, 1, -2);
scene2.add(directionalLight);

// Set camera1 position
camera1.position.set(15, 3, 1); // Camera is positioned a bit higher and looking down on the model
camera1.rotation.set(10, 1, 1);

// Add OrbitControls for drag and rotate functionality
const controls = new THREE.OrbitControls(camera1, renderer1.domElement);
controls.enableZoom = false;
controls.enableDamping = true; // Smooth rotation
controls.dampingFactor = 0.05;
controls.minDistance = 2; // Minimum distance from the model
controls.maxDistance = 10; // Maximum distance from the model

// Load the 3D model
const loader = new THREE.GLTFLoader();
loader.load(
    "./public/planet/scene.gltf",
    function (gltf) {
        const model = gltf.scene;
        model.scale.set(0.5, 0.5, 0.5); // Scale the model
        scene2.add(model);

        // Ensure the controls look at the model when it's loaded
        controls.target.copy(model.position);
    },
    undefined,
    function (error) {
        console.error(error);
    }
);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    controls.update(); // Needed for damping to work properly

    renderer1.render(scene2, camera1);
}

animate();