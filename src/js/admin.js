'use strict';

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const API_LINK = 'https://t2k25chvapi.herokuapp.com';
const API_TEST = 'http://localhost:1811';
const API = API_LINK;

const inputRule = `onkeydown="inputAvoidSubmit(event)"`;
const isAuth = JSON.parse(sessionStorage.getItem('isAuth'));
const userId = JSON.parse(sessionStorage.getItem('id')) || '';
const userName = JSON.parse(sessionStorage.getItem('name')) || '';
const userPass = JSON.parse(sessionStorage.getItem('pass')) || '';
const thisUser = {
	name: userName,
	pass: userPass,
	id: userId,
};
const data = {
	members: [],
	teachers: [],
};

const app = $('#app');
const loading = $('.loading');
const navBar = $('#app > nav');
const tools = $$('.tool-item');
const addBtns = $$('.add-btn');
const sections = $$('section');
const searchBar = $$('.search-bar');
const contents = $$('section .content');
const logInForm = $('.log-in-container');
const userField = $('.user');
const userContent = contents[0];
const userNameInp = userContent.querySelector('input[name="name"]');
const userPassInp = userContent.querySelector('input[name="pass"]');
const errMsg = logInForm.querySelector(`.err-msg`);
const userAvaEle = userField.querySelector('.ava');
const userNameEle = userField.querySelector('.name');

const hideList = (list) => list.forEach((item) => item.classList.add('hide'));
const updateData = async (type) => {
	const resp = await fetch(`${API}/api/${type}/list`);
	data[type] = await resp.json();
};
const getContent = (list, type) =>
	list.map((item) => {
		const { name, _id, vi_name, desc, photo, email, facebook } = item;
		return `
		<div class="content-item ${type}-item">
			<form class="${type}-data" data-${type}id="${_id}" data-type="${type}" method="POST">
				<input ${inputRule} type="text" name="name" value="${name}" placeholder="No name"/>
				<input ${inputRule} type="text" name="vi_name" value="${vi_name}" placeholder="No vi_name"/>
				${
					item?.subject
						? `<input ${inputRule} type="text" name="subject" value="${item?.subject}" placeholder="No subject"/>`
						: ''
				}
				<input ${inputRule} type="text" name="desc" value="${desc}" placeholder="No desc"/>
				<input ${inputRule} type="text" name="photo" value="${photo}" placeholder="No photo url"/>
				<input ${inputRule} type="text" name="email" value="${email}" placeholder="No email"/>
				<input ${inputRule} type="text" name="facebook" value="${facebook}" placeholder="No facebook"/>
				<button type="submit" class="edit" onclick="formEdit(event)">
					<div class="submit-ico">
						<i class="bi bi-pen edit-ico"></i>
						<i class="bi bi-arrow-repeat sync-ico spin"></i>
						<i class="bi bi-check2 success-ico"></i>
						<i class="bi bi-x-lg fail-ico"></i>
					</div>
					<span class="submit-text"> Edit </span>
				</button>
			</form>
		</div>`;
	});
const getAddSection = (type) => {
	const addForm = document.createElement('div');
	addForm.className = `content-item ${type}-item add-form`;
	addForm.innerHTML = `
	<form class="${type}-data" data-type="${type}" method="POST">
		${
			type === 'members'
				? `<input ${inputRule} type="number" name="index" placeholder="Index, required"/>`
				: ''
		}
		<input ${inputRule} type="text" name="name" placeholder="Name, required"/>
		<input ${inputRule} type="text" name="vi_name" placeholder="Vi_name, required"/>
		${
			type === 'teachers'
				? `<input ${inputRule} type="text" name="subject" placeholder="Subject, required"/>`
				: `<input ${inputRule} type="text" name="_class" placeholder="Class"/>`
		}
		<input ${inputRule} type="text" name="desc" placeholder="Description"/>
		<input ${inputRule} type="text" name="photo" placeholder="Photo URL"/>
		<input ${inputRule} type="text" name="email" placeholder="Email${
		type === 'members' ? ', required' : ''
	}"/>
		<input ${inputRule} type="text" name="facebook" placeholder="Facebook"/>
		<button type="submit" class="edit" onclick="formAdd(event)">
			<div class="submit-ico">
				<i class="bi bi-pen edit-ico"></i>
				<i class="bi bi-arrow-repeat sync-ico spin"></i>
				<i class="bi bi-check2 success-ico"></i>
				<i class="bi bi-x-lg fail-ico"></i>
			</div>
			<span class="submit-text"> Add </span>
		</button>
	</form>`;
	return addForm;
};
const render = (section, list, type) => {
	section.innerHTML = getContent(list, type).join('');
};
const inputAvoidSubmit = (e) => {
	if (e.key === 'Enter') {
		e.preventDefault();
		e.stopPropagation();
	}
};
const formAdd = async (e) => {
	const contentItem = e.target.closest('.content-item');
	const formEle = contentItem.querySelector('form');
	const type = formEle.dataset.type;
	const inputs = formEle.querySelectorAll('input');
	const submitBtn = formEle.querySelector('button');
	const submitText = formEle.querySelector('.submit-text');
	const { name, pass } = thisUser;

	const changeStatus = (status, mes) => {
		submitBtn.classList.add(status);
		submitText.innerHTML = mes;

		status === 'success' && updateData(type);

		setTimeout(() => {
			submitBtn.classList.remove(status);
			submitBtn.classList.add('edit');
			submitText.innerHTML = 'Add';

			inputs.forEach((input) => (input.disabled = false));
			submitBtn.disabled = false;

			status === 'success' && formEle.remove();
		}, 2000);
	};

	formEle.onsubmit = async (f) => {
		f.preventDefault();

		const inpList = [...formEle.querySelectorAll('input')];
		const data = {};
		inpList.forEach((item) => {
			const attr = item.name.toString();
			const inpType = item.type;
			const value = item.value.trim();
			data[attr] = inpType === 'number' ? +value : value;
		});

		submitBtn.classList.remove('edit');
		submitBtn.classList.add('sync');
		submitText.innerHTML = 'Syncing';

		inputs.forEach((input) => (input.disabled = true));
		submitBtn.disabled = true;

		const res = await fetch(
			`${API}/api/${type}/add/${name}/${pass}?_method=POST`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			}
		);
		const { status } = await res.json();

		submitBtn.classList.remove('sync');

		if (status === 'Success') changeStatus('success', 'Success');
		else changeStatus('fail', 'Fail');
	};
};
const formEdit = async (e) => {
	const contentItem = e.target.closest('.content-item');
	const formEle = contentItem.querySelector('form');
	const type = formEle.dataset.type;
	const typeID = formEle.dataset[`${type}id`];
	const inputs = formEle.querySelectorAll('input');
	const submitBtn = formEle.querySelector('button');
	const submitText = formEle.querySelector('.submit-text');
	const { name, pass } = thisUser;

	const changeStatus = (status, mes) => {
		submitBtn.classList.add(status);
		submitText.innerHTML = mes;

		status === 'success' && updateData(type);

		setTimeout(() => {
			submitBtn.classList.remove(status);
			submitBtn.classList.add('edit');
			submitText.innerHTML = 'Edit';

			inputs.forEach((input) => (input.disabled = false));
			submitBtn.disabled = false;
		}, 2000);
	};

	formEle.onsubmit = async (f) => {
		f.preventDefault();

		const inpList = [...formEle.querySelectorAll('input')];
		const data = {};
		inpList.forEach((item) => {
			const attr = item.name.toString();
			data[attr] = item.value.trim();
		});

		submitBtn.classList.remove('edit');
		submitBtn.classList.add('sync');
		submitText.innerHTML = 'Syncing';

		inputs.forEach((input) => (input.disabled = true));
		submitBtn.disabled = true;

		const res = await fetch(
			`${API}/api/${type}/edit/${typeID}/${name}/${pass}?_method=PUT`,
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			}
		);
		const { status } = await res.json();

		submitBtn.classList.remove('sync');
		if (status === 'Success') changeStatus('success', 'Success');
		else changeStatus('fail', 'Fail');
	};
};
const userEdit = async (e) => {
	const contentItem = e.target.closest('.content-item');
	const formEle = contentItem.querySelector('form');
	const inputs = formEle.querySelectorAll('input');
	const submitBtn = formEle.querySelector('button');
	const submitText = formEle.querySelector('.submit-text');

	const changeStatus = (status, mes) => {
		submitBtn.classList.add(status);
		submitText.innerHTML = mes;

		setTimeout(() => {
			submitBtn.classList.remove(status);
			submitBtn.classList.add('edit');
			submitText.innerHTML = 'Edit';

			inputs.forEach((input) => (input.disabled = false));
			submitBtn.disabled = false;
		}, 2000);
	};

	formEle.onsubmit = (f) => {
		f.preventDefault();

		const inpList = [...formEle.querySelectorAll('input')];
		const data = {};
		inpList.forEach((item) => {
			const attr = item.name.toString();
			data[attr] = item.value.trim();
		});

		submitBtn.classList.remove('edit');
		submitBtn.classList.add('sync');
		submitText.innerHTML = 'Syncing';

		inputs.forEach((input) => (input.disabled = true));
		submitBtn.disabled = true;

		(async () => {
			const res = await fetch(
				`${API}/api/users/edit/${thisUser.id}/${thisUser.name}/${thisUser.pass}?_method=PUT`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(data),
				}
			);
			const { status } = await res.json();

			submitBtn.classList.remove('sync');
			if (status === 'Success') {
				changeStatus('success', 'Success');

				Object.assign(thisUser, data);
				userNameEle.innerHTML = thisUser.name;
				sessionStorage.setItem('name', JSON.stringify(thisUser.name));
				sessionStorage.setItem('pass', JSON.stringify(thisUser.pass));
			} else {
				changeStatus('fail', 'Fail');
				console.log('Fail');
			}
		})();
	};
};
const logInHandle = async (e) => {
	e.preventDefault();
	const name = e.target.querySelector('.name').value.trim();
	const pass = e.target.querySelector('.pass').value.trim();

	if (!name || !pass) return;

	loading.classList.add('active');
	const res = await fetch(`${API}/api/users/auth/${name}/${pass}`);
	const { auth, id } = await res.json();
	loading.classList.remove('active');

	let lastWrong;
	if (!auth) {
		errMsg.classList.add('isErr');
		lastWrong && clearTimeout(lastWrong);
		lastWrong = setTimeout(() => {
			errMsg.classList.remove('isErr');
		}, 3000);
		thisUser.name = '';
		thisUser.pass = '';
		thisUser.id = '';
	} else {
		app.classList.add('isAuth');
		thisUser.name = name;
		thisUser.pass = pass;
		thisUser.id = id;
		userNameEle.innerHTML = name;
		userNameInp.value = name;
		userPassInp.value = pass;
	}

	sessionStorage.setItem('id', JSON.stringify(id));
	sessionStorage.setItem('isAuth', JSON.stringify(auth));
	sessionStorage.setItem('name', JSON.stringify(thisUser.name));
	sessionStorage.setItem('pass', JSON.stringify(thisUser.pass));
};
const searchBarHandle = (e) => (section, list, type) => {
	const value = e.currentTarget.value.trim().toLowerCase();
	if (!value) {
		section.innerHTML = '';
		return;
	}

	if (['*', '.'].includes(value)) {
		section.innerHTML = getContent(list, type).join('');
		return;
	}

	const newList = list.filter(
		(item) =>
			item?.index == value ||
			item?._class?.toLowerCase() === value ||
			item?.subject?.toLowerCase() === value ||
			item?.name?.toLowerCase()?.includes(value) ||
			item?.vi_name?.toLowerCase()?.includes(value)
	);
	section.innerHTML = getContent(newList, type).join('');
	section.scroll(0, 0);
};
const activeTool = (list, idx) => {
	list.forEach((item, index) => {
		if (idx === index) item.classList.remove('hide');
		else item.classList.add('hide');
	});
};

// Init App
app.classList.toggle('isAuth', isAuth);
userNameEle.innerHTML = userName;
userNameInp.value = thisUser.name;
userPassInp.value = thisUser.pass;

// Log In Auth Handle
logInForm.onsubmit = logInHandle;

// Tool Items Handles
tools.forEach((item, index) => {
	item.onclick = () => {
		activeTool(sections, index);

		const lastToolActive = $('.tool-item.active');
		lastToolActive && lastToolActive.classList.remove('active');
		item.classList.add('active');
	};
});

// Add new Members / Teachers
addBtns.forEach((item) => {
	item.onclick = () => {
		const section = item.closest('section');
		const content = section.querySelector('.content');
		const type = section.className;
		content.innerHTML = '';
		content.appendChild(getAddSection(type));
	};
});

// Fetch Data
(async () => {
	const dataList = ['members', 'teachers'];
	const fetchData = await Promise.allSettled([
		fetch(`${API}/api/members/list`),
		fetch(`${API}/api/teachers/list`),
	]);
	fetchData
		.filter((data) => data.status === 'fulfilled')
		.map((item) => item.value.json())
		.forEach(async (item, idx) => {
			data[dataList[idx]] = await item;
			searchBar[idx].oninput = (e) =>
				searchBarHandle(e)(
					contents[idx + 1],
					data[dataList[idx]],
					dataList[idx]
				);
		});
})();
