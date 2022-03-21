'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const select = (par, child) => par.querySelector(child);
const selectAll = (par, child) => par.querySelectorAll(child);

const icons = {
	fbIco: '<i class="bi bi-facebook"></i>',
	mailIco: '<i class="bi bi-envelope"></i>',
};
const { fbIco, mailIco } = icons;
const API_LINK = 'https://t2k25chvapi.herokuapp.com';
const API_TEST = 'http://localhost:1811';

const app = $('#app');
const loadingItem = $('.loading');

const sidebarItems = $$('.sidebar .item');
const homeContentItems = $$('.home .item');
const contentSections = $$('.content .section');

const memberList = $('.members-list');
const memberListContainer = $('.members-list .list-container');
const searchMembers = $('.members-search .search-input');
const swiperWrapper = $('.members-recent .recent-list .swiper-wrapper');

let members, teachers;

const hideList = (list) => list.forEach((item) => item.classList.add('hide'));
const addBlankInfo = (list) => {
	list.forEach((item) => {
		if (item.innerHTML) return;
		item.innerHTML = `
		<div class="blank-container">
			<div class="blank-title">No Info</div>
			<button class="blank-btn">Return Home</button>
		</div>`;
	});
	$$('.blank-btn').forEach((item) => (item.onclick = resetUI));
};
const resetUI = () => {
	hideList(contentSections);
	contentSections[0].classList.remove('hide');
	loadingItem.classList.add('hide');
};

const getHTMLS = (list, type = 0) =>
	list
		.sort((a, b) => a.id - b.id)
		.map((item) => {
			const { name, vi_name, desc, photo, email, facebook } = item;
			const infoHTML = `
			<div class="info-container">
				<div class="name">${vi_name}</div>
				${!type && desc ? `<div class="desc">${desc}</div>` : ''}
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
						<a target="_blank" rel="noopener" href="mailto:${email}">
							${mailIco}
						</a>
					</li>
				</ul>
			</div>`;
			const htmls = `
			<div class="swiper-slide">
				<div class="card" data-memberid="${item.id}">
					<div
						class="card-img"
						style="background-image: url(${photo || defaultConfig.ava})">
					</div>
					${infoHTML}
					${!type ? socialHTML : ''}
				</div>
			</div>`;
			return htmls;
		});
const renderMembers = () => {
	memberListContainer.innerHTML = getHTMLS(members).join('');
	swiperWrapper.innerHTML += getHTMLS(members.slice(0, 5), 1).join('');
	new Swiper('.members-recent .recent-list .swiper-container', {
		direction: 'horizontal',
		centeredSlides: false,
		slidesPerView: 4,
		spaceBetween: 30,
		threshold: 4,
		speed: 700,
		breakpoints: {
			950: {
				centeredSlides: false,
				slidesPerView: 3,
				spaceBetween: 25,
			},
			780: {
				centeredSlides: false,
				slidesPerView: 2,
				spaceBetween: 25,
			},
			420: {
				centeredSlides: true,
				slidesPerView: 1,
				spaceBetween: 10,
			},
		},
	});
};

const searchMembersHandle = (e) => (list) => {
	const value = e.target.value.trim().toLowerCase();
	if (!value) {
		memberListContainer.innerHTML = getHTMLS(list).join('');
		return;
	}

	const newList = list.filter(
		(item) =>
			item.id == value ||
			item.class.toLowerCase() === value ||
			item.name.toLowerCase().includes(value) ||
			item?.vi_name?.toLowerCase()?.includes(value)
	);
	memberListContainer.innerHTML = getHTMLS(newList).join('');

	memberList.scroll(0, 0);
};

(() => {
	// Auth
	const lastAuth = JSON.parse(sessionStorage.getItem('authAt'));
	document.body.classList.toggle('isAuth', lastAuth);

	// Menu Switch
	const switchBtn = $('.header .switch-btn');
	switchBtn.onclick = (e) => {
		e.stopPropagation();
		app.classList.toggle('mini');
	};

	// Recent Switch Btn
	const recentSwitch = $('.recent-switch');
	recentSwitch.onclick = () =>
		recentSwitch.closest('.members').classList.toggle('show');

	// Header Click
	$('.header').onclick = () => {
		app.classList.add('mini');
		resetUI();
	};

	// Items Handle
	sidebarItems.forEach((item, index) => {
		item.onclick = () => {
			hideList(contentSections);
			contentSections[index].classList.remove('hide');
			app.classList.add('mini');
		};
	});

	homeContentItems.forEach((ctent) => {
		ctent.querySelector('button').onclick = () => {
			hideList(contentSections);
			contentSections.forEach((section) => {
				if (section.className.includes(ctent.dataset.sectionid))
					section.classList.remove('hide');
			});
		};

		ctent.addEventListener('mouseover', (e) => {
			homeContentItems.forEach((x) =>
				x.classList.toggle('rotate', x !== e.currentTarget)
			);
		});

		ctent.addEventListener('mouseleave', () =>
			homeContentItems.forEach((x) => x.classList.remove('rotate'))
		);
	});

	// Add Blank Page
	addBlankInfo(contentSections);
})();

// Members Section Handles
(async () => {
	const fetchData = await Promise.allSettled([
		fetch(`${API_LINK}/api/teachers/list`),
		fetch(`${API_LINK}/api/members/list`),
	]);
	const data = fetchData.map((data, idx) => {
		if (data.status === 'fulfilled') return data.value.json();
		return localData[idx];
	});
	const [teachersData, membersData] = data;
	teachers = await teachersData;
	members = await membersData;

	searchMembers.oninput = (e) => searchMembersHandle(e)(members);
	renderMembers();
	resetUI();
})(members, teachers);
