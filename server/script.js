const container = document.getElementById('container');
const dots = [];

function createDot(x, y, size) {
    const dot = document.createElement('span');
    dot.className = 'dot';
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${x}px`;
    dot.style.top = `${y}px`;
    container.appendChild(dot);

    dots.push({
    el: dot,
    originX: x,
    originY: y,
    x: x,
    y: y,
    vx: 0,
    vy: 0
    });
}

// === Your Original Dot Placement ===

// Left
for (let i = 0; i < 500; i++) {
    let x = Math.random() * 100 + 50;
    let y = Math.random() * 400 + 50;
    createDot(x, y, Math.random() * 3 + 2);
}

// Middle
for (let i = 0; i < 300; i++) {
    let x = Math.random() * 200 + 100;
    let y = Math.random() * 60 + 200;
    createDot(x, y, Math.random() * 3 + 2);
}

// Right
for (let i = 0; i < 500; i++) {
    let x = Math.random() * 100 + 250;
    let y = Math.random() * 400 + 50;
    createDot(x, y, Math.random() * 4 + 2);
}

// I
for (let i = 0; i < 500; i++) {
    let x = Math.random() * 100 + 400;
    let y = Math.random() * 200 + 250;
    createDot(x, y, Math.random() * 4 + 2);
}
for (let i = 0; i < 300; i++) {
    let x = Math.random() * 50 + 425;
    let y = Math.random() * 50 + 150;
    createDot(x, y, Math.random() * 4 + 1);
}


// === Repel Animation ===
let mouse = { x: -9999, y: -9999 };

container.addEventListener('mousemove', e => {
    const rect = container.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

container.addEventListener('mouseleave', () => {
    mouse.x = -9999;
    mouse.y = -9999;
});

function animate() {
    dots.forEach(dot => {
    const dx = dot.x - mouse.x;
    const dy = dot.y - mouse.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const repelRadius = 200; // size

    if (dist < repelRadius) {
        const force = (1 - dist / repelRadius) * 1;
        const angle = Math.atan2(dy, dx);
        dot.vx += Math.cos(angle) * force;
        dot.vy += Math.sin(angle) * force;
    }

    // Spring back to origin
    const spring = .01;
    dot.vx += (dot.originX - dot.x) * spring;
    dot.vy += (dot.originY - dot.y) * spring;

    // Damping
    dot.vx *= 0.9;
    dot.vy *= 0.9;

    dot.x += dot.vx;
    dot.y += dot.vy;

    dot.el.style.left = `${dot.x}px`;
    dot.el.style.top = `${dot.y}px`;
    });

    requestAnimationFrame(animate);
}

animate();