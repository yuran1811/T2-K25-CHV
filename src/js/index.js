'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const select = (par, child) => par.querySelector(child);
const selectAll = (par, child) => par.querySelectorAll(child);

const app = document.querySelector('#app');

const defaultConfig = {
	ava: './src/img/ava1.jpg',
};

// Menu Switch
const switchBtn = document.querySelector('.header .switch-btn');
const sidebarPanel = document.querySelector('.sidebar');
switchBtn.onclick = (e) => {
	e.stopPropagation();
	app.classList.toggle('mini');
};

// Members Section Handles
const teacher = [
	{
		name: 'To Thi Hong',
		vi_name: 'Tô Thị Hồng',
		class: 'GVCN',
	},
	{
		name: 'Nguyen Van Cuong',
		vi_name: 'Nguyễn Văn Cường',
		class: 'GVCN',
	},
];
const members = [
	{
		id: 1,
		class: 'T2',
		name: 'Ha Minh Chau',
		vi_name: 'Hà Minh Châu',
		desc: 'I am a buffalo!',
		photo: './src/img/ava1.jpg',
		email: 'mailto:chauhm.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/profile.php?id=100049168088455',
	},
	{
		id: 2,
		class: 'T2',
		name: 'Nguyen Thi Hong Dung',
		vi_name: 'Nguyễn Thị Hồng Dung',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:dungnth.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/profile.php?id=100028449497584',
	},
	{
		id: 3,
		class: 'T2',
		name: 'Dinh Tien Dung',
		vi_name: 'Đinh Tiến Dũng',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:dungdt.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/no.oatoao',
	},
	{
		id: 4,
		class: 'T2',
		name: 'Huynh Binh Duong',
		vi_name: 'Huỳnh Bình Dương',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:duonghb.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100049176810414/',
	},
	{
		id: 5,
		class: 'T2',
		name: 'Le Nguyen Anh Duy',
		vi_name: 'Lê Nguyễn Anh Duy',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:duylna.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100058590596378/',
	},
	{
		id: 6,
		class: 'T2',
		name: 'Vu Tran Thu Ha',
		vi_name: 'Vũ Trần Thu Hà',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:havtt.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/profile.php?id=100078631712955',
	},
	{
		id: 7,
		class: 'T2',
		name: 'Tran Huy Hoang',
		vi_name: 'Trần Huy Hoàng',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:hoangth.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100030901999958/',
	},
	{
		id: 8,
		class: 'T2',
		name: 'Nguyen Bach Khoa',
		vi_name: 'Nguyễn Bách Khoa',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:khoanb.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100022934833093/',
	},
	{
		id: 9,
		class: 'T2',
		name: 'Le Trung Kien',
		vi_name: 'Lê Trung Kiên',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:kienlt.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100017113159378/',
	},
	{
		id: 10,
		class: 'T2',
		name: 'Luong Thanh Loc',
		vi_name: 'Lương Thành Lộc',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:loclt.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100015294047484/',
	},
	{
		id: 11,
		class: 'T2',
		name: 'Nguyen Doan Nhat Minh',
		vi_name: 'Nguyễn Đoàn Nhật Minh',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:minhndn.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100050499575575/',
	},
	{
		id: 12,
		class: 'T2',
		name: 'Nguyen Phuoc Dang Minh',
		vi_name: 'Nguyễn Phước Đăng Minh',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:minhnpd.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100013567955534/',
	},
	{
		id: 13,
		class: 'T2',
		name: 'Nguyen Son Thanh Ngan',
		vi_name: 'Nguyễn Sơn Thanh Ngân',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:ngannst.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100013960335966/',
	},
	{
		id: 14,
		class: 'T2',
		name: 'Do Bao Ngoc',
		vi_name: 'Đỗ Bảo Ngọc',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:ngocdb.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100020690148930/',
	},
	{
		id: 15,
		class: 'T2',
		name: 'Tran Quoc Nhat',
		vi_name: 'Trần Quốc Nhật',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:nhattq.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100014882071736/',
	},
	{
		id: 16,
		class: 'T2',
		name: 'Tran Thi Tuyet Nhu',
		vi_name: 'Trần Thị Tuyết Như',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:nhuttt.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100022005671355/',
	},
	{
		id: 17,
		class: 'T2',
		name: 'Dang Quan Phu',
		vi_name: 'Đặng Quan Phú',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:phudq.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100025292852769/',
	},
	{
		id: 18,
		class: 'T2',
		name: 'Vu Nguyen Minh Quang',
		vi_name: 'Vũ Nguyễn Minh Quang',
		desc: 'Ahihi do ngu',
		photo: './src/img/ava1.jpg',
		email: 'mailto:quangvnm.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/profile.php?id=100027961743727',
	},
	{
		id: 19,
		class: 'T2',
		name: 'Nguyen Cam Tho',
		vi_name: 'Nguyễn Cẩm Thơ',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:thonc.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100054764538518/',
	},
	{
		id: 20,
		class: 'T2',
		name: 'Khuong Ngoc Toan',
		vi_name: 'Khương Ngọc Toàn',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:toankn.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100034608337829/',
	},
	{
		id: 21,
		class: 'T2',
		name: 'Nguyen Thi Huyen Trang',
		vi_name: 'Nguyễn Thị Huyền Trang',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:trangnth.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100028360153052/',
	},
	{
		id: 22,
		class: 'T2',
		name: 'Ngo Minh Tri',
		vi_name: 'Ngô Minh Trí',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:trinm.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100048426810259/',
	},
	{
		id: 23,
		class: 'T2',
		name: 'Truong Hoang Y',
		vi_name: 'Trương Hoàng Ý',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:yth.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100011289947534/',
	},
	{
		id: 24,
		class: 'T2',
		name: 'Tran Hoang Ngoc Yen',
		vi_name: 'Trần Hoàng Ngọc Yến',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:yenthn.t2.2023@gmail.com',
		facebook: 'https://www.facebook.com/100049423807451/',
	},
	{
		id: 25,
		class: 'Ti',
		name: 'Dang Minh Anh',
		vi_name: 'Đặng Minh Ánh',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:anhdm.ti.2023@gmail.com',
		facebook: 'https://www.facebook.com/100035896567750/',
	},
	{
		id: 26,
		class: 'Ti',
		name: 'Tang Xuan Bac',
		vi_name: 'Tăng Xuân Bắc',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:bactx.ti.2023@gmail.com',
		facebook: 'https://www.facebook.com/100017814251455/',
	},
	{
		id: 27,
		class: 'Ti',
		name: 'Ly Gia Binh',
		vi_name: 'Lý Gia Bình',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:binhlg.ti.2023@gmail.com',
		facebook: 'https://www.facebook.com/100012140252357/',
	},
	{
		id: 28,
		class: 'Ti',
		name: 'Dao Tuan Duy',
		vi_name: 'Đào Tuấn Duy',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:duydt.ti.2023@gmail.com',
		facebook: 'https://www.facebook.com/ec.duy.9/',
	},
	{
		id: 29,
		class: 'Ti',
		name: 'Trinh Chan Duy',
		vi_name: 'Trịnh Chấn Duy',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:duytc.ti.2023@gmail.com',
		facebook: 'https://www.facebook.com/100009247686862/',
	},
	{
		id: 30,
		class: 'Ti',
		name: 'Tran Le Van Khanh',
		vi_name: 'Trần Lê Vân Khanh',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:khanhtlv.ti.2023@gmail.com',
		facebook: 'https://www.facebook.com/100042853937221/',
	},
	{
		id: 31,
		class: 'Ti',
		name: 'Yuran Legends',
		vi_name: 'Ngô Nguyễn Thế Khoa',
		desc: 'Nothing can stop me !!!',
		photo: './src/img/ava1.jpg',
		email: 'mailto:trieuvanbd123@gmail.com',
		facebook: 'https://www.facebook.com/YuranLegends/',
	},
	{
		id: 32,
		class: 'Ti',
		name: 'Nguyen Dinh Manh',
		vi_name: 'Nguyễn Đình Mạnh',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'manhnd.ti.2023@gmail.com',
		facebook: 'https://www.facebook.com/100012655329823/',
	},
	{
		id: 33,
		class: 'Ti',
		name: 'Tran Quang Thanh',
		vi_name: 'Trần Quang Thành',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:thanhtq.ti.2023@gmail.com',
		facebook: 'https://www.facebook.com/100022862094344/',
	},
	{
		id: 34,
		class: 'Ti',
		name: 'Huynh Duc Tin',
		vi_name: 'Huỳnh Đức Tín',
		desc: '',
		photo: './src/img/ava1.jpg',
		email: 'mailto:tinhd.ti.2023@gmail.com',
		facebook: 'https://www.facebook.com/100055966183205/',
	},
	{
		id: 35,
		class: 'Ti',
		name: 'Le Hong Vu',
		vi_name: 'Lê Hồng Vũ',
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
						style="background-image: url(${photo || defaultConfig.ava})">
					</div>
					${infoHTML}
					${!type ? socialHTML : ''}
				</div>
			</div>`;
		return htmls;
	});

const memberList = document.querySelector('.members-list .list-container');
const swiperWrapper = $('.members-recent .recent-list .swiper-wrapper');
memberList.innerHTML = getHTMLS(members).join('');
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

const searchMembers = document.querySelector('.members-search .search-input');
searchMembers.oninput = (e) => {
	const value = e.target.value.trim().toLowerCase();
	if (!value) {
		memberList.innerHTML = getHTMLS(members).join('');
		return;
	}

	const newList = members.filter(
		(item) =>
			item.id == value ||
			item.class.toLowerCase() === value ||
			item.name.toLowerCase().includes(value) ||
			item?.vi_name?.toLowerCase()?.includes(value)
	);
	memberList.innerHTML = getHTMLS(newList).join('');
};

// Recent Switch Btn
const recentSwitch = document.querySelector('.recent-switch');
recentSwitch.onclick = () =>
	recentSwitch.closest('.members').classList.toggle('show');

// Links Handles
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
};

const sidebarItems = document.querySelectorAll('.sidebar .item');
const homeContentItems = document.querySelectorAll('.home .item');
const contentSections = document.querySelectorAll('.content .section');

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

const resetUI = () => {
	hideList(contentSections);
	contentSections[0].classList.remove('hide');
};
resetUI();

addBlankInfo(contentSections);
$$('.blank-btn').forEach((item) => (item.onclick = resetUI));

const pageHeader = $('.header');
pageHeader.onclick = () => {
	app.classList.add('mini');
	resetUI();
};
