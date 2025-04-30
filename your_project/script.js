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
const material = new THREE.MeshBasicMaterial({ color: 0x4a6bff, wireframe: true }); // Changed to match primary color

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

// GSAP Animations for header and navigation
gsap.from(".header", {
    duration: 1.2,
    y: -100,
    opacity: 0,
    ease: "expo.out",
    rotationX: 15,
    transformOrigin: "top"
});

gsap.from(".header-title", {
    duration: 1.5,
    opacity: 0,
    x: -50,
    ease: "power3.out",
    delay: 0.2
});

gsap.from("nav ul li", {
    duration: 1,
    opacity: 0,
    y: 20,
    stagger: 0.1,
    ease: "power3.out",
    delay: 0.4
});

// Sidebar animation
gsap.from(".sidebar", {
    duration: 1.2,
    x: -250,
    opacity: 0,
    ease: "expo.out",
    delay: 0.3
});

gsap.from(".sidebar ul li", {
    duration: 0.8,
    opacity: 0,
    x: -30,
    stagger: 0.05,
    ease: "power2.out",
    delay: 0.6
});

// Welcome section animations
gsap.from(".welcome-card", {
    duration: 1.2,
    opacity: 0,
    y: 50,
    ease: "expo.out",
    delay: 0.8
});

gsap.from(".stat-card", {
    duration: 0.8,
    opacity: 0,
    y: 30,
    stagger: 0.1,
    ease: "back.out(1.7)",
    delay: 1.2
});

// Dashboard cards animations
gsap.from(".dashboard-card", {
    duration: 1,
    opacity: 0,
    y: 50,
    stagger: 0.15,
    ease: "power3.out",
    delay: 1.5
});

// Announcement items animation
gsap.from(".announcement-item", {
    duration: 0.8,
    opacity: 0,
    x: -30,
    stagger: 0.1,
    ease: "power2.out",
    delay: 1.8
});

// Event items animation
gsap.from(".event-item", {
    duration: 0.8,
    opacity: 0,
    x: 30,
    stagger: 0.1,
    ease: "power2.out",
    delay: 1.9
});

// Quick actions animation
gsap.from(".quick-action-item", {
    duration: 0.8,
    opacity: 0,
    scale: 0.8,
    stagger: 0.1,
    ease: "back.out(1.7)",
    delay: 2
});

// Contact items animation
gsap.from(".contact-item", {
    duration: 0.8,
    opacity: 0,
    y: 30,
    stagger: 0.1,
    ease: "power2.out",
    delay: 2.1
});

// Animate footer entrance
gsap.from("footer", {
    duration: 1.2,
    opacity: 0,
    y: 50,
    ease: "expo.out",
    delay: 2.2
});

// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    // Add mobile menu toggle button if it doesn't exist
    if (!document.querySelector('.mobile-menu-toggle')) {
        const header = document.querySelector('.header');
        const mobileMenuToggle = document.createElement('button');
        mobileMenuToggle.className = 'mobile-menu-toggle';
        mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
        header.insertBefore(mobileMenuToggle, header.firstChild);

        // Add event listener to toggle sidebar
        mobileMenuToggle.addEventListener('click', function() {
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('active');
        });
    }

    // Add click event to close sidebar when clicking outside on mobile
    document.addEventListener('click', function(event) {
        const sidebar = document.querySelector('.sidebar');
        const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');

        if (window.innerWidth <= 768 &&
            sidebar.classList.contains('active') &&
            !sidebar.contains(event.target) &&
            event.target !== mobileMenuToggle &&
            !mobileMenuToggle.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });

    // Add notification functionality
    const notificationBadges = document.querySelectorAll('.notification-badge');
    notificationBadges.forEach(badge => {
        badge.addEventListener('click', function(e) {
            e.preventDefault();
            alert('Notifications feature coming soon!');
        });
    });
});