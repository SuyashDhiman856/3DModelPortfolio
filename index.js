const hamburger = document.querySelector(".hamburger");
      const navMenu = document.querySelector(".nav-menu");

      hamburger.addEventListener("click", mobileMenu);

      function mobileMenu() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
      }

      const navLink = document.querySelectorAll(".nav-link");

      navLink.forEach((n) => n.addEventListener("click", closeMenu));

      function closeMenu() {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
      }

      const container = document.getElementById("threejs-container");
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x02011a); // Set background color to blue

      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      const renderer = new THREE.WebGLRenderer({ antialias: true });

      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      window.addEventListener("resize", () => {
        const container = document.getElementById("threejs-container");
        camera.aspect = container.clientWidth / container.clientHeight; // Update aspect ratio
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      });

      // Add the rest of your Three.js model and animations here

      renderer.setPixelRatio(window.devicePixelRatio);

      // Add lighting
      const ambientLight = new THREE.AmbientLight(0xffffff, 2);
      scene.add(ambientLight);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(7, 1, -2);
      scene.add(directionalLight);

      // Set camera position
      camera.position.set(15, 3, 1); // Camera is positioned a bit higher and looking down on the model
      camera.rotation.set(10, 1, 1);

      // Add OrbitControls for drag and rotate functionality
      const controls = new THREE.OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enableDamping = true; // Smooth rotation
      controls.dampingFactor = 0.05;
      controls.minDistance = 2; // Minimum distance from the model
      controls.maxDistance = 10; // Maximum distance from the model

      // Load the 3D model
      const loader = new THREE.GLTFLoader();
      loader.load(
        "desktop_pc/scene.gltf",
        function (gltf) {
          const model = gltf.scene;
          model.scale.set(0.5, 0.5, 0.5); // Scale the model
          scene.add(model);

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

        renderer.render(scene, camera);
      }

      animate();