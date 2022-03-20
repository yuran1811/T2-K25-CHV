(() => {
	const sidebars = [
		'Home',
		'About',
		'Members',
		'Gallery',
		'Timetable',
		'AIO',
	];
	const contents = [
		{
			name: 'home',
			content: `
			<ul class="items">
				${sidebars
					.slice(2)
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
		{
			name: 'about',
			content: `
			<div class="about-container">
				<div class="about-title">About</div>
				<div class="about-content">
					<p class="item">We are T2 - K25 CHV</p>
					<p class="item">Thanks for visiting our site!!!</p>
				</div>
				<div class="about-footer">
					Made by <a href="https://www.facebook.com/YuranLegends/" class="link-hl" target="_blank" rel="noopener">Yuran Legends</a>
				</div>
			</div>`,
		},
		{
			name: 'members',
			content: `
			<div class="members-search">
				<input class="search-input" type="text" placeholder="Type name"/>
				<button class="search-btn"></button>
			</div>
			<div class="members-recent">
				<button class="recent-switch">
					<div class="show-content"><span>Show recent</span></div>
					<div class="hide-content"><span>Hide recent</span></div>
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
		{
			name: 'aio',
			content: `
			<table id="timetable">
				<thead>
					<tr>
						<th>Tự nhiên</th>
						<th>Xã hội</th>
						<th>Khác</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>
							<a
								target="_blank"
								rel="noopener"
								href="https://meet.google.com/hzx-chqe-trx?pli=1&amp;authuser=1"> Toán </a>
						</td>
						<td>
							<a
								target="_blank"
								rel="noopener"
								href="https://meet.google.com/gxz-xczh-nfs?pli=1&amp;authuser=1"> Văn </a>
						</td>
						<td>
							<a
								target="_blank"
								rel="noopener"
								href="https://meet.google.com/szi-dssf-hmv?pli=1&amp;authuser=1"> Công nghệ </a>
						</td>
					</tr>
					<tr>
						<td>
							<a
								target="_blank"
								rel="noopener"
								href="https://meet.google.com/ddi-iixf-wip?pli=1&authuser=1"> Lí </a>
						</td>
						<td>
							<a href="#"> Anh </a>
						</td>
						<td>
							<a href="#"> GDQP </a>
						</td>
					</tr>
					<tr>
						<td>
							<a
								target="_blank"
								rel="noopener"
								href="https://zoom.us/j/8157220370?pwd=SW1mSlAzMWZPSWxYa1huQ0hxZ2hsdz09"> Hóa </a>
						</td>
						<td>
							<a href="#"> Sử </a>
						</td>
						<td></td>
					</tr>
					<tr>
						<td>
							<a
								target="_blank"
								rel="noopener"
								href="https://zoom.us/j/9634945813?pwd=cWdGZWtXY1BWMXVqcnYwZVphVCtKUT09"> Sinh </a>
						</td>
						<td>
							<a href="#"> Địa </a>
						</td>
						<td></td>
					</tr>
					<tr>
						<td>
							<a
								target="_blank"
								rel="noopener"
								href="https://meet.google.com/jzh-nzaw-hzb"> Tin (N) </a>
						</td>
						<td>
							<a
								target="_blank"
								rel="noopener"
								href="https://meet.google.com/yry-gmyd-dya?pli=1&amp;authuser=1"> GDCD </a>
						</td>
						<td></td>
					</tr>
				</tbody>
			</table>`,
		},
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
		<div class="header-title">T2 - K25 CHV</div>
		<a
			class="admin-page"
			href="./admin-page.html"
			target="_blank"
			rel="noopener"
		>
			<span>Admin Page</span>
		</a>
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
