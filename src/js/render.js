(() => {
	const sidebars = [
		'Home',
		'About',
		'Members',
		'Gallery',
		'Timetable',
		'AIO',
	];
	const homeData = ['Members', 'Gallery', 'Timetable', 'AIO'];
	const contents = [
		{
			name: 'home',
			content: `
			<ul class="items">
				${homeData
					.map(
						(item) => `
						<li class="item" data-sectionid="${item.toLowerCase()}">
							<button><span>Go</span></button>
							<span class="label">${item}</span>
						</li>`
					)
					.join('')}
			</ul>`,
		},
		{ name: 'about', content: `` },
		{
			name: 'members',
			content: `
			<div class="members-search">
				<input
					class="search-input"
					type="text"
					placeholder="Type name"
				/>
				<button class="search-btn"></button>
			</div>

			<div class="members-recent">
				<button class="recent-switch">
					<div class="show-content">Show recent</div>
					<div class="hide-content">Hide recent</div>
				</button>
				<div class="recent-list">
					<div class="swiper-container">
						<div class="swiper-wrapper"></div>
					</div>
				</div>
			</div>

			<div class="horizon-bar"></div>

			<div class="members-list">
				<div class="list-header">Members</div>
				<div class="list-container"></div>
			</div>`,
		},
		{ name: 'gallery', content: `` },
		{ name: 'timetable', content: `` },
		{ name: 'aio', content: `` },
	];
	const contacts = [
		{
			href: `https://www.facebook.com/T2.K25.CHV`,
			ico: `<i class="bi bi-facebook"></i>`,
		},
		{
			href: `mailto:lopt2hv2023@gmail.com`,
			ico: `<i class="bi bi-envelope"></i>`,
		},
	];

	const app = document.querySelector('#app');
	const HEADER = `
	<div class="header">
		<button class="switch-btn"></button>
		<div class="header-title">CHV - T2 - K25</div>
	</div>`;
	const SIDEBAR = `
	<div class="sidebar">
		<ul class="items">
		${sidebars
			.map(
				(item) =>
					`<li class="item"><span class="label">${item}</span></li>`
			)
			.join('')}
		</ul>
	</div>`;
	const CONTENT = `
	<div class="content">
	${contents
		.map(
			(item) => `
			<div class="section ${item.name}">${item.content}</div>`
		)
		.join('')}
	</div>`;
	const CONTACT = `
	<div class="contact">
		<ul class="contact-panel items">
		${contacts
			.map(
				(item) => `
			<li class="item">
				<a target="_blank" rel="noopener" href="${item.href}">
					${item.ico}
				</a>
			</li>`
			)
			.join('')}
		</ul>
	</div>`;

	app.innerHTML = `
	${HEADER}
	${SIDEBAR}
	${CONTENT}
	${CONTACT}`;
})();
