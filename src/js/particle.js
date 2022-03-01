(() => {
	const canvas = document.querySelector('canvas');
	const c = canvas.getContext('2d');

	const NUM_PARTICLES = innerWidth / 40;
	const PARTICLE_RADIUS = 8;
	const PARTICLE_COLOR = 'black';

	canvas.height = innerHeight;
	canvas.width = innerWidth;

	const canStroke = (a, b) => (b.x - a.x) ** 2 + (b.y - a.y) ** 2 <= 200 ** 2;

	const drawEdges = (a, b) => {
		if (a === b) return;
		if (!canStroke(a, b)) return;
		c.beginPath();
		c.moveTo(a.x, a.y);
		c.lineTo(b.x, b.y);
		c.strokeStyle = PARTICLE_COLOR;
		c.lineWidth = 2;
		c.stroke();
		c.closePath();
	};

	class Particle {
		constructor(x, y, radius, color, velocity) {
			this.x = x;
			this.y = y;
			this.radius = radius;
			this.color = color;
			this.velocity = velocity;
		}

		draw() {
			c.beginPath();
			c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			c.fillStyle = this.color;
			c.fill();
			c.closePath();
		}

		update() {
			this.draw();
			if (
				this.x - PARTICLE_RADIUS < 0 ||
				this.x + PARTICLE_RADIUS > innerWidth
			)
				this.velocity.x *= -1;
			if (
				this.y - PARTICLE_RADIUS < 0 ||
				this.y + PARTICLE_RADIUS > innerHeight
			)
				this.velocity.y *= -1;
			this.x += this.velocity.x;
			this.y += this.velocity.y;
		}
	}

	const particles = [];
	const mouse = {
		x: undefined,
		y: undefined,
	};

	window.onmousemove = (e) => {
		mouse.x = e.clientX;
		mouse.y = e.clientY;
	};
	window.onresize = () => {
		c.save();
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		c.restore();
	};

	const init = () => {
		for (let i = 1; i <= NUM_PARTICLES; i++) {
			const x = Math.random() * innerWidth;
			const y = Math.random() * innerHeight;
			const velocity = {
				x: Math.random() * 6 - 3,
				y: Math.random() * 6 - 3,
			};
			particles.push(
				new Particle(x, y, PARTICLE_RADIUS, PARTICLE_COLOR, velocity)
			);
		}
	};

	const animation = () => {
		requestAnimationFrame(animation);
		c.clearRect(0, 0, innerWidth, innerHeight);

		particles.forEach((item, index) => {
			item.update();
			particles.slice(index).forEach((adj) => drawEdges(item, adj));
		});
		particles.forEach((item) => {
			drawEdges(item, mouse);
		});
	};

	init();
	animation();

	canvas.onclick = (e) => {
		const velocity = {
			x: Math.random() * 6 - 3,
			y: Math.random() * 6 - 3,
		};
		particles.push(
			new Particle(
				e.clientX,
				e.clientY,
				PARTICLE_RADIUS,
				PARTICLE_COLOR,
				velocity
			)
		);
		if (particles.length > innerWidth / 16) particles.shift();
	};
	canvas.oncontextmenu = (e) => {
		e.preventDefault();
		const calcDist = ({ x, y }, { clientX, clientY }) =>
			(clientX - x) ** 2 + (clientY - y) ** 2;
		particles.forEach((item, index) => {
			if (calcDist(item, e) <= 4 * PARTICLE_RADIUS * PARTICLE_RADIUS)
				particles.splice(index, 1);
		});
	};
})();
