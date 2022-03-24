'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const select = (par, child) => par.querySelector(child);
const selectAll = (par, child) => par.querySelectorAll(child);

const defaultConfig = {
	ava: './src/img/ava1.jpg',
};
const icons = {
	fbIco: '<i class="bi bi-facebook"></i>',
	mailIco: '<i class="bi bi-envelope"></i>',
};
const { fbIco, mailIco } = icons;
const API_LINK = 'https://t2k25chvapi.herokuapp.com';
const API_TEST = 'http://localhost:1811';
const API = API_LINK;

const app = $('#app');
const loadingItem = $('.loading');
const sidebarItems = $$('.sidebar .item');
const homeContentItems = $$('.home .item');
const contentSections = $$('.content .section');

const aioListContainer = $('.aio-list .list-container');
const aioSearchInp = $('.aio-search input');

const memberList = $('.members-list');
const memberListContainer = $('.members-list .list-container');
const memberSearchContainer = $('.members-search');
const memberSearchBtn = memberSearchContainer.querySelector('.search-btn');
const memberSearchInp = memberSearchContainer.querySelector('.search-input');
const swiperWrapper = $('.members-recent .recent-list .swiper-wrapper');

let members, teachers, aio;

const render = {
	members: () => {
		memberListContainer.innerHTML = getHTMLS(members).join('');
	},
	teachers: () => {
		memberListContainer.innerHTML = getHTMLS(teachers, 'teachers').join('');
	},
	aio: () => {
		aioListContainer.innerHTML = getHTMLS(aio, 'aio').join('');
	},
};
const hideList = (list) => list.forEach((item) => item.classList.add('hide'));
const getSearchMode = (type) => memberSearchContainer.className.includes(type);
const addBlankInfo = (list) => {
	list.forEach((item) => {
		if (item.innerHTML) return;
		item.innerHTML = `
		<div class="blank-container">
			<div class="blank-title">No Info</div>
			<button class="blank-btn" onclick="resetUI">
				<i class="bi bi-house"></i>
				<span>Return Home</span>
			</button>
		</div>`;
	});
	$$('.blank-btn').forEach((item) => (item.onclick = resetUI));
};
const resetUI = () => {
	hideList(contentSections);
	contentSections[0].classList.remove('hide');
	loadingItem.classList.add('hide');
};
const getHTMLS = (list, type = 'members') =>
	list
		.sort((a, b) => a.id - b.id)
		.map((item) => {
			if (type === 'aio') {
				const aioLink = `
				<a
					style="background: ${item.color};"
					class="link-name"
					target="_blank"
					rel="noopener"
					href="${item.link}">
					${item.name}
				</a>`;
				return aioLink;
			}

			const { name, subject, vi_name, desc, photo, email, facebook } =
				item;
			const infoHTML = `
			<div class="info-container">
				<div class="name">${vi_name}</div>
				${type === 'members' && desc ? `<div class="desc">${desc}</div>` : ''}
				${type === 'teachers' && subject ? `<div class="desc">${subject}</div>` : ''}
			</div>`;
			const socialHTML = `
			<div class="social-container">
				<ul class="social">
				${
					facebook &&
					`<li><a target="_blank" rel="noopener" href="${facebook}"> ${fbIco} </a></li>`
				}
				${
					email &&
					`<li><a target="_blank" rel="noopener" href="mailto:${email}"> ${mailIco} </a></li>`
				}
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
					${email || facebook ? socialHTML : ''}
				</div>
			</div>`;
			return htmls;
		});
const geneSwiper = (ele) => {
	new Swiper(ele, {
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
const searchBarHandle = (e) => (section, list, type) => {
	const value = e.currentTarget.value.trim().toLowerCase();
	if (!value) {
		render[type]();
		return;
	}

	if (['*', '.'].includes(value)) {
		section.innerHTML = getHTMLS(list, type).join('');
		return;
	}

	const newList = list.filter(
		(item) =>
			item?.link == value ||
			item?.index == value ||
			item?._class?.toLowerCase() === value ||
			item?.subject?.toLowerCase() === value ||
			item?.name?.toLowerCase()?.includes(value) ||
			item?.vi_name?.toLowerCase()?.includes(value)
	);
	section.innerHTML = getHTMLS(newList, type).join('');
	section.scroll(0, 0);
};

// Init App
(() => {
	// Cancle Mode
	document.body.onclick = () => app.classList.add('mini');

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
		fetch(`${API}/api/teachers/list`),
		fetch(`${API}/api/members/list`),
		fetch(`${API}/api/aio/list`),
	]);
	const data = fetchData.map((data, idx) => {
		if (data.status === 'fulfilled') return data.value.json();
		return localData[idx];
	});
	const [teachersData, membersData, aioData] = data;
	teachers = await teachersData;
	members = await membersData;
	aio = await aioData;

	teachers.sort((a, b) => a.index - b.index);
	members.sort((a, b) => a.index - b.index);
	aio.sort();

	aioSearchInp.oninput = (e) => {
		searchBarHandle(e)(aioListContainer, aio, 'aio');
	};
	memberSearchInp.oninput = (e) => {
		searchBarHandle(e)(memberListContainer, members, 'members');
	};
	memberSearchBtn.onclick = () => {
		memberSearchContainer.classList.toggle('teachers');
		render['members']();
		if (getSearchMode('teachers')) {
			render['teachers']();
			memberSearchInp.oninput = (e) => {
				const searchMode = getSearchMode('teachers');
				searchBarHandle(e)(
					memberListContainer,
					searchMode ? teachers : members,
					searchMode ? 'teachers' : 'members'
				);
			};
		}
	};
	render['members']();
	render['aio']();
	resetUI();
})(members, teachers);
