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
