/**
 * Three.js WebGL Interactive 3D Background
 * Matrix of floating data nodes, connection lines, and particle flow
 */

(function initWebGLBackground() {
  const canvas = document.getElementById('webgl-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  let scene, camera, renderer;
  let particles, particleSystem, lineMesh;
  let mouseX = 0, mouseY = 0;
  let targetX = 0, targetY = 0;
  let scrollY = 0;
  
  const PARTICLE_COUNT = window.innerWidth < 768 ? 70 : 130;
  const CONNECT_DISTANCE = 110;
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const velocities = [];

  function init() {
    scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x05070e, 0.0018);

    camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 320;

    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Particle geometry
    const geometry = new THREE.BufferGeometry();

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 600;
      const y = (Math.random() - 0.5) * 450;
      const z = (Math.random() - 0.5) * 300;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      velocities.push({
        x: (Math.random() - 0.5) * 0.35,
        y: (Math.random() - 0.5) * 0.35,
        z: (Math.random() - 0.5) * 0.25
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Circle texture for smooth particles
    const canvasTexture = document.createElement('canvas');
    canvasTexture.width = 32;
    canvasTexture.height = 32;
    const ctx = canvasTexture.getContext('2d');
    const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(45, 212, 191, 1)');
    gradient.addColorStop(0.3, 'rgba(77, 124, 254, 0.8)');
    gradient.addColorStop(1, 'rgba(77, 124, 254, 0)');
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(16, 16, 16, 0, Math.PI * 2);
    ctx.fill();

    const pTexture = new THREE.CanvasTexture(canvasTexture);

    const material = new THREE.PointsMaterial({
      size: 6,
      map: pTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    particleSystem = new THREE.Points(geometry, material);
    scene.add(particleSystem);

    // Line connection mesh
    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x4d7cfe,
      transparent: true,
      opacity: 0.16,
      blending: THREE.AdditiveBlending
    });
    lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lineMesh);

    // Events
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('scroll', onScroll, { passive: true });

    animate();
  }

  function onResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function onMouseMove(e) {
    mouseX = (e.clientX - window.innerWidth / 2) * 0.3;
    mouseY = (e.clientY - window.innerHeight / 2) * 0.3;
  }

  function onScroll() {
    scrollY = window.pageYOffset || document.documentElement.scrollTop;
  }

  function animate() {
    requestAnimationFrame(animate);

    // Smooth mouse tilt
    targetX += (mouseX - targetX) * 0.04;
    targetY += (mouseY - targetY) * 0.04;

    camera.position.x = targetX;
    camera.position.y = -targetY + scrollY * 0.08;
    camera.lookAt(scene.position);

    // Update particle positions
    const pos = particleSystem.geometry.attributes.position.array;
    const linePositions = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      pos[i3] += velocities[i].x;
      pos[i3 + 1] += velocities[i].y;
      pos[i3 + 2] += velocities[i].z;

      // Bounds bounce
      if (pos[i3] < -320 || pos[i3] > 320) velocities[i].x *= -1;
      if (pos[i3 + 1] < -240 || pos[i3 + 1] > 240) velocities[i].y *= -1;
      if (pos[i3 + 2] < -180 || pos[i3 + 2] > 180) velocities[i].z *= -1;

      // Check distance for lines
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const j3 = j * 3;
        const dx = pos[i3] - pos[j3];
        const dy = pos[i3 + 1] - pos[j3 + 1];
        const dz = pos[i3 + 2] - pos[j3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < CONNECT_DISTANCE) {
          linePositions.push(pos[i3], pos[i3 + 1], pos[i3 + 2]);
          linePositions.push(pos[j3], pos[j3 + 1], pos[j3 + 2]);
        }
      }
    }

    particleSystem.geometry.attributes.position.needsUpdate = true;
    particleSystem.rotation.y += 0.0006;
    particleSystem.rotation.x += 0.0003;

    // Update line geometry
    lineMesh.geometry.setAttribute(
      'position',
      new THREE.Float32BufferAttribute(linePositions, 3)
    );
    lineMesh.rotation.y = particleSystem.rotation.y;
    lineMesh.rotation.x = particleSystem.rotation.x;

    renderer.render(scene, camera);
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
