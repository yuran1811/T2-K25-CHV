'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const select = (par, child) => par.querySelector(child);
const selectAll = (par, child) => par.querySelectorAll(child);

const app = document.querySelector('#app');

const switchBtn = document.querySelector('.header .switch-btn');
const sidebarPanel = document.querySelector('.sidebar');
switchBtn.addEventListener('click', () => app.classList.toggle('mini'));

// Swiper Generator

const members = [
	{
		name: 'Yuran Legends',
		desc: 'Nothing can stop me !!!',
		photo: './src/img/ava1.jpg',
		email: 'mailto:trieuvanbd123@gmail.com',
		facebook: 'https://www.facebook.com/YuranLegends/',
	},
	{
		name: 'Ha Minh Chau',
		desc: 'I am a buffalo!',
		photo: './src/img/ava1.jpg',
		email: 'mailto:chauhm.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/profile.php?id=100049168088455',
	},
	{
		name: 'Vu Nguyen Minh Quang',
		desc: 'Ahihi do ngu',
		photo: './src/img/ava1.jpg',
		email: 'mailto:quangvnm.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/profile.php?id=100027961743727',
	},
];
const icons = {
	fbIco: '<i class="bi bi-facebook"></i>',
	mailIco: '<i class="bi bi-envelope"></i>',
};
const { fbIco, mailIco } = icons;

const getHTMLS = (list) =>
	list.map((item, index) => {
		const { name, desc, photo, email, facebook } = item;
		const infoHTML = `
			<div class="info-container">
				<div class="name">${name}</div>
				<div class="desc">${desc}</div>
			</div>`;
		const socialHTML = `
			<div class="social-container">
				<ul class="social">
					<li>
						<a target="_blank" rel="noopener" href="${facebook}">
							${fbIco}
						</a>
					</li>
					<li>
						<a target="_blank" rel="noopener" href="${email}">
							${mailIco}
						</a>
					</li>
				</ul>
			</div>`;
		const htmls = `
				<div class="swiper-slide">
					<div class="card" data-memberid="${index}">
						<div
							class="card-img"
							style="background-image: url(${photo})">
						</div>
						${infoHTML}
						${socialHTML}
					</div>
				</div>`;
		return htmls;
	});

// Usage
const swiperWrapper = $('.members-recent .recent-list .swiper-wrapper');
getHTMLS(members).forEach((item) => {
	swiperWrapper.insertAdjacentHTML('beforeend', item);
});

const memberList = document.querySelector('.members-list .list-container');
memberList.innerHTML = getHTMLS(members).join('');

// Swiper Generator
new Swiper('.members-recent .recent-list .swiper-container', {
	direction: 'horizontal',
	centeredSlides: false,
	slidesPerView: 5,
	spaceBetween: 30,
	threshold: 4,
	speed: 700,
	breakpoints: {
		400: {
			centeredSlides: true,
			slidesPerView: 1,
			spaceBetween: 10,
		},
		780: {
			centeredSlides: false,
			slidesPerView: 3,
			spaceBetween: 25,
		},
	},
});

// Recent Switch Btn
const recentSwitch = document.querySelector('.recent-switch');
recentSwitch.onclick = () =>
	recentSwitch.closest('.members').classList.toggle('show');

// Links Handles
const hideList = (list) => list.forEach((item) => item.classList.add('hide'));

const sidebarItems = document.querySelectorAll('.sidebar .item');
const contentItems = document.querySelectorAll('.content .item');
const contentSections = document.querySelectorAll('.content .section');

sidebarItems.forEach((item, index) => {
	item.onclick = () => {
		hideList(contentSections);
		contentSections[index].classList.remove('hide');
		app.classList.add('mini');
	};
});

contentItems.forEach((ctent) => {
	ctent.querySelector('button').onclick = (e) => {
		hideList(contentSections);
		contentSections.forEach((section) => {
			if (section.className.includes(ctent.dataset.sectionid))
				section.classList.remove('hide');
		});
	};

	ctent.addEventListener('mouseover', (e) => {
		contentItems.forEach((x) =>
			x.classList.toggle('rotate', x !== e.currentTarget)
		);
	});

	ctent.addEventListener('mouseleave', (e) => {
		contentItems.forEach((x) => x.classList.remove('rotate'));
	});
});

hideList(contentSections);
contentSections[0].classList.remove('hide');
