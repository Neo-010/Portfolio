document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("particles-canvas");
    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const numParticles = 100; // Кількість частинок

    // Об'єкт миші
    const mouse = {
        x: null,
        y: null
    };

    // Додаємо обробник руху миші
    window.addEventListener("mousemove", function (event) {
        mouse.x = event.x;
        mouse.y = event.y;
    });

    // Функція створення частинки
    function Particle(x, y, size, speedX, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedX = speedX;
        this.speedY = speedY;

        this.draw = function () {
            ctx.fillStyle = "rgb(173, 216, 230)"; // Світло-блакитний колір
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        };

        this.update = function () {
            this.x += this.speedX;
            this.y += this.speedY;

            // Відскакування від країв
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;

            // Реакція на мишу (повільніший рух)
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                this.x -= dx * 0.1; // Зменшити множник для повільнішого руху
                this.y -= dy * 0.1; // Зменшити множник для повільнішого руху
            }

            this.draw();
        };
    }

    // Функція створення масиву частинок
    function initParticles() {
        particles = [];
        for (let i = 0; i < numParticles; i++) {
            let size = Math.random() * 3 + 1;
            let x = Math.random() * canvas.width;
            let y = Math.random() * canvas.height;
            let speedX = (Math.random() - 0.5) * 1;
            let speedY = (Math.random() - 0.5) * 1;
            particles.push(new Particle(x, y, size, speedX, speedY));
        }
    }

    // Функція малювання ліній між частинками
    function connectParticles() {
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                let dx = particles[a].x - particles[b].x;
                let dy = particles[a].y - particles[b].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 100) {
                    ctx.strokeStyle = "rgba(15, 12, 153, 0.64)";
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Анімація
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(particle => particle.update());
        connectParticles();
        requestAnimationFrame(animate);
    }

    // Запуск
    initParticles();
    animate();

    // Зміна розміру екрану
    window.addEventListener("resize", function () {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    });
});
