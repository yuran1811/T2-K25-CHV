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
		id: 1,
		name: 'Ha Minh Chau',
		desc: 'I am a buffalo!',
		photo: './src/img/ava1.jpg',
		email: 'mailto:chauhm.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/profile.php?id=100049168088455',
	},
	{
		id: 2,
		name: 'Nguyen Thi Hong Dung',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:dungnth.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/profile.php?id=100028449497584',
	},
	{
		id: 3,
		name: 'Dinh Tien Dung',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:dungdt.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/no.oatoao',
	},
	{
		id: 4,
		name: 'Huynh Binh Duong',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:duonghb.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100049176810414/',
	},
	{
		id: 5,
		name: 'Le Nguyen Anh Duy',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:duylna.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100058590596378/',
	},
	{
		id: 6,
		name: 'Vu Tran Thu ha',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:havtt.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/profile.php?id=100078631712955',
	},
	{
		id: 7,
		name: 'Tran Huy Hoang',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:hoangth.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100030901999958/',
	},
	{
		id: 8,
		name: 'Nguyen Bach Khoa',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:khoanb.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100022934833093/',
	},
	{
		id: 9,
		name: 'Le Trung Kien',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:kienlt.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100017113159378/',
	},
	{
		id: 10,
		name: 'Luong Thanh Loc',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:loclt.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100015294047484/',
	},
	{
		id: 11,
		name: 'Nguyen Doan Nhat Minh',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:minhndn.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100050499575575/',
	},
	{
		id: 12,
		name: 'Nguyen Phuoc Dang Minh',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:minhnpd.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100013567955534/',
	},
	{
		id: 13,
		name: 'Nguyen Son Thanh Ngan',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:ngannst.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100013960335966/',
	},
	{
		id: 14,
		name: 'Do Bao Ngoc',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:ngocdb.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100020690148930/',
	},
	{
		id: 15,
		name: 'Tran Quoc Nhat',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:nhattq.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100014882071736/',
	},
	{
		id: 16,
		name: 'Tran Thi Tuyet Nhu',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:nhuttt.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100022005671355/',
	},
	{
		id: 17,
		name: 'Dang Quan Phu',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:phudq.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100025292852769/',
	},
	{
		id: 18,
		name: 'Vu Nguyen Minh Quang',
		desc: 'Ahihi do ngu',
		photo: './src/img/ava1.jpg',
		email: 'mailto:quangvnm.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/profile.php?id=100027961743727',
	},
	{
		id: 19,
		name: 'Nguyen Cam Tho',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:thonc.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100054764538518/',
	},
	{
		id: 20,
		name: 'Khuong Ngoc Toan',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:toankn.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100034608337829/',
	},
	{
		id: 21,
		name: 'Nguyen Thi Huyen Trang',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:trangnth.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100028360153052/',
	},
	{
		id: 22,
		name: 'Ngo Minh Tri',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:trinm.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100048426810259/',
	},
	{
		id: 23,
		name: 'Truong Hoang Y',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:yth.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100011289947534/',
	},
	{
		id: 24,
		name: 'Tran Hoang Ngoc Yen',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:yenthn.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100049423807451/',
	},
	{
		id: 25,
		name: 'Dang Minh Anh',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:anhdm.ti.2023@gmail.com',
		facebook: 'https://www.facebook.com/100035896567750/',
	},
	{
		id: 26,
		name: 'Tang Xuan Bac',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:bactx.ti.2023@gmail.com',
		facebook: 'https://www.facebook.com/100017814251455/',
	},
	{
		id: 27,
		name: 'Ly Gia Binh',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:binhlg.ti.2023@gmail.com',
		facebook: 'https://www.facebook.com/100012140252357/',
	},
	{
		id: 28,
		name: 'Dao Tuan DUy',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:duydt.ti.2023@gmail.com',
		facebook: 'https://www.facebook.com/ec.duy.9/',
	},
	{
		id: 29,
		name: 'Trinh Chan Duy',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:duytc.ti.2023@gmail.com',
		facebook: 'https://www.facebook.com/100009247686862/',
	},
	{
		id: 30,
		name: 'Tran Le Van Khanh',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:khanhtlv.ti.2023@gmail.com',
		facebook: 'https://www.facebook.com/100042853937221/',
	},
	{
		id: 31,
		name: 'Ngo Nguyen The Khoa',
		desc: 'Nothing can stop me !!!',
		photo: './src/img/ava1.jpg',
		email: 'mailto:trieuvanbd123@gmail.com',
		facebook: 'https://www.facebook.com/YuranLegends/',
	},
	{
		id: 32,
		name: 'Nguyen Dinh Manh',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'manhnd.ti.2023@gmail.com',
		facebook: 'https://www.facebook.com/100012655329823/',
	},
	{
		id: 33,
		name: 'Tran Quang Thanh',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:thanhtq.ti.2023@gmail.com',
		facebook: 'https://www.facebook.com/100022862094344/',
	},
	{
		id: 34,
		name: 'Huynh Duc Tin',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:tinhd.ti.2023@gmail.com',
		facebook: 'https://www.facebook.com/100055966183205/',
	},
	{
		id: 35,
		name: 'Le Hong Vu',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:vulh.ti.2023@gmail.com',
		facebook: 'https://www.facebook.com/100024492489395/',
	},
];
const icons = {
	fbIco: '<i class="bi bi-facebook"></i>',
	mailIco: '<i class="bi bi-envelope"></i>',
};
const { fbIco, mailIco } = icons;

const getHTMLS = (list, type = 0) =>
	list.map((item) => {
		const { name, desc, photo, email, facebook } = item;
		const infoHTML = `
			<div class="info-container">
				<div class="name">${name}</div>
				${!type ? `<div class="desc">${desc}</div>` : ''}
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
					<div class="card" data-memberid="${item.id}">
						<div
							class="card-img"
							style="background-image: url(${photo})">
						</div>
						${infoHTML}
						${!type ? socialHTML : ''}
					</div>
				</div>`;
		return htmls;
	});

// Members Section Handles
const swiperWrapper = $('.members-recent .recent-list .swiper-wrapper');
getHTMLS(members, 1).forEach((item) => {
	swiperWrapper.insertAdjacentHTML('beforeend', item);
});

const memberList = document.querySelector('.members-list .list-container');
memberList.innerHTML = getHTMLS(members).join('');

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

const searchMembers = document.querySelector('.members-search .search-input');
searchMembers.oninput = (e) => {
	const value = e.target.value.trim().toLowerCase();
	if (!value) {
		memberList.innerHTML = getHTMLS(members);
		return;
	}

	const newList = members.filter((item) =>
		item.name.toLowerCase().includes(value)
	);
	memberList.innerHTML = getHTMLS(newList);
};

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
