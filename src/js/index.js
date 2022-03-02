'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const select = (par, child) => par.querySelector(child);
const selectAll = (par, child) => par.querySelectorAll(child);

const app = document.querySelector('#app');

const switchBtn = document.querySelector('.header .switch-btn');
const sidebarPanel = document.querySelector('.sidebar');
switchBtn.addEventListener('click', () => app.classList.toggle('mini'));

const contentItems = document.querySelectorAll('.content .item');
contentItems.forEach((item) => {
	item.addEventListener('mouseover', (e) => {
		contentItems.forEach((x) =>
			x.classList.toggle('rotate', x !== e.currentTarget)
		);
	});

	item.addEventListener('mouseleave', (e) => {
		contentItems.forEach((x) => x.classList.remove('rotate'));
	});
});

// Swiper Generator
(() => {
	const members = [
		{
			name: 'Yuran Legends',
			desc: 'Nothing can stop me !!!',
			photo: './src/img/ava1.jpg',
			email: 'mailto:trieuvanbd123@gmail.com',
			facebook: 'https://www.facebook.com/YuranLegends/',
		},
		{
			name: 'Naot',
			desc: 'Do not say that I need a sugar daddy',
			photo: './src/img/ava1.jpg',
			email: 'mailto:toanvv.ti.1922@gmail.com',
			facebook: 'https://www.facebook.com/toan.vong.585',
		},
		{
			name: 'Vinh Pham',
			desc: 'Hello World',
			photo: './src/img/ava1.jpg',
			email: 'mailto:vinhpt.ti.1922@gmail.com',
			facebook: 'https://www.facebook.com/vinhpham08',
		},
		{
			name: 'Vbee',
			desc: 'Nho truong lop',
			photo: './src/img/ava1.jpg',
			email: 'mailto:baovg.a1.k2023@gmail.com',
			facebook: 'https://www.facebook.com/vbeeee',
		},
		{
			name: 'Hello',
			desc: 'Nho truong lop',
			photo: './src/img/ava1.jpg',
			email: 'mailto:baovg.a1.k2023@gmail.com',
			facebook: 'https://www.facebook.com/vbeeee',
		},
		{
			name: 'World',
			desc: 'Nho truong lop',
			photo: './src/img/ava1.jpg',
			email: 'mailto:baovg.a1.k2023@gmail.com',
			facebook: 'https://www.facebook.com/vbeeee',
		},
		{
			name: 'Hello',
			desc: 'Nho truong lop',
			photo: './src/img/ava1.jpg',
			email: 'mailto:baovg.a1.k2023@gmail.com',
			facebook: 'https://www.facebook.com/vbeeee',
		},
		{
			name: 'World',
			desc: 'Nho truong lop',
			photo: './src/img/ava1.jpg',
			email: 'mailto:baovg.a1.k2023@gmail.com',
			facebook: 'https://www.facebook.com/vbeeee',
		},
	];
	const icons = {
		fbIco: '<i class="bi bi-facebook"></i>',
		mailIco: '<i class="bi bi-envelope"></i>',
	};
	const { fbIco, mailIco } = icons;

	const getHTMLS = (list) =>
		list.map((item) => {
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
					<div class="card">
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
	const swiperWrapper = $('.member-recent .recent-list .swiper-wrapper');
	getHTMLS(members).forEach((item) => {
		swiperWrapper.insertAdjacentHTML('beforeend', item);
	});

	const memberList = document.querySelector('.member-list .list-container');
	memberList.innerHTML = getHTMLS(members).join('');

	// Swiper Generator
	const mySwiper = new Swiper(
		'.member-recent .recent-list .swiper-container',
		{
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
		}
	);
})();

// Recent Switch Btn
const recentSwitch = document.querySelector('.recent-switch');
recentSwitch.onclick = () =>
	recentSwitch.closest('.member').classList.toggle('show');

// Links Handles
const hideList = (list) => list.forEach((item) => item.classList.add('hide'));

const sidebarLinks = document.querySelectorAll('.sidebar .item');
const mainContent = document.querySelectorAll('.content .section');

sidebarLinks.forEach((item, index) => {
	item.onclick = () => {
		hideList(mainContent);
		mainContent[index].classList.remove('hide');
		app.classList.add('mini');
	};
});
