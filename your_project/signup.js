// GSAP animations
gsap.from(".logo-container", {
    duration: 1,
    y: -30,
    opacity: 0,
    ease: "power2.out"
});

gsap.from(".signup-container", {
    duration: 1.2,
    scale: 0.9,
    opacity: 0,
    ease: "power3.out",
    delay: 0.2
});

gsap.from("h2", {
    duration: 0.8,
    opacity: 0,
    y: -20,
    ease: "power2.out",
    delay: 0.5
});

gsap.from(".role-option", {
    duration: 0.6,
    opacity: 0,
    y: 20,
    stagger: 0.1,
    ease: "back.out(1.7)",
    delay: 0.7
});

gsap.from(".input-group", {
    duration: 0.8,
    opacity: 0,
    x: -30,
    stagger: 0.1,
    ease: "power2.out",
    delay: 1
});

gsap.from(".terms-checkbox", {
    duration: 0.6,
    opacity: 0,
    y: 20,
    ease: "power2.out",
    delay: 1.6
});

gsap.from("button", {
    duration: 0.8,
    opacity: 0,
    y: 20,
    ease: "back.out(1.7)",
    delay: 1.8
});

gsap.from(".login-link, .back-home", {
    duration: 0.6,
    opacity: 0,
    y: 20,
    stagger: 0.1,
    ease: "power2.out",
    delay: 2
});

// Three.js 3D background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('threejs-background').appendChild(renderer.domElement);

// Create cubes with community theme color
const cubes = [];
const cubeCount = 20;
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x4a6bff, wireframe: true });

for (let i = 0; i < cubeCount; i++) {
    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50,
        (Math.random() - 0.5) * 50
    );
    cube.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );
    scene.add(cube);
    cubes.push(cube);
}

camera.position.z = 30;

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate cubes
    cubes.forEach(cube => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
    });

    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();

// Form validation and role selector functionality
document.addEventListener('DOMContentLoaded', function() {
    // Role selector functionality
    const roleOptions = document.querySelectorAll('.role-option');
    const roleInput = document.getElementById('role-input');

    roleOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove active class from all options
            roleOptions.forEach(opt => opt.classList.remove('active'));

            // Add active class to clicked option
            this.classList.add('active');

            // Update hidden input value
            roleInput.value = this.getAttribute('data-role');
        });
    });

    // Form validation
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', function(e) {
            const password = document.querySelector('input[name="password"]');
            const confirmPassword = document.querySelector('input[name="confirm_password"]');

            if (password.value !== confirmPassword.value) {
                e.preventDefault();
                alert('Passwords do not match!');
                return false;
            }

            if (password.value.length < 8) {
                e.preventDefault();
                alert('Password must be at least 8 characters long!');
                return false;
            }

            return true;
        });
    }
});