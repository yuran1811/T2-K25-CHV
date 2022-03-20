const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const API_LINK = 'https://t2k25chvapi.herokuapp.com';
const API_TEST = 'http://localhost:1811';
const API = API_LINK;

const userName = JSON.parse(sessionStorage.getItem('name')) || '';
const userPass = JSON.parse(sessionStorage.getItem('pass')) || '';
const thisUser = {
	name: userName,
	pass: userPass,
};

const app = $('#app');
const navBar = $('#app > nav');
const membersSection = $('section.members .content');
const searchMembers = $('.members-search');

const getContent = (list) =>
	list.map((item) => {
		const { name, _id, vi_name, desc, photo, email, facebook } = item;
		return `
		<div class="member-item">
			<form class="member-data" data-memberId="${_id}" method="POST">
				<input type="text" name="name" value="${name}" placeholder="No name"/>
				<input type="text" name="vi_name" value="${vi_name}" placeholder="No vi_name"/>
				<input type="text" name="desc" value="${desc}" placeholder="No desc"/>
				<input type="text" name="photo" value="${photo}" placeholder="No photo"/>
				<input type="text" name="email" value="${email}" placeholder="No email"/>
				<input type="text" name="facebook" value="${facebook}" placeholder="No facebook"/>
				<button type="submit" onclick="formSubmit(event)">Edit</button>
			</form>
		</div>`;
	});
const renderMembers = (list) => {
	membersSection.innerHTML = getContent(list).join('');
};
const searchMembersHandle = (e) => (list) => {
	const value = e.target.value.trim().toLowerCase();
	if (!value) {
		membersSection.innerHTML = '';
		return;
	}

	if (['*', '.'].includes(value)) {
		membersSection.innerHTML = getContent(members).join('');
		return;
	}

	const newList = list.filter(
		(item) =>
			item.id == value ||
			item.class.toLowerCase() === value ||
			item.name.toLowerCase().includes(value) ||
			item?.vi_name?.toLowerCase()?.includes(value)
	);
	membersSection.innerHTML = getContent(newList).join('');
	membersSection.scroll(0, 0);
};
const formSubmit = async (e) => {
	const memberItem = e.target.closest('.member-item');
	const formEle = memberItem.querySelector('form');
	const memberID = formEle.dataset.memberid;
	const { name, pass } = thisUser;
	formEle.onsubmit = async (f) => {
		f.preventDefault();
		e.target.innerHTML = 'Syncing ...';
		const inpList = [...formEle.querySelectorAll('input')];
		const data = {};
		inpList.forEach((item) => {
			const attr = item.name.toString();
			data[attr] = item.value.trim();
		});
		const res = await fetch(
			`${API}/api/members/edit/${memberID}/${name}/${pass}?_method=PUT`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			}
		);
		const { status } = await res.json();
		console.log(status);
		if (status === 'Success') {
			e.target.classList.add('fulfilled');
			e.target.innerHTML = 'Success';
			setTimeout(() => {
				e.target.classList.remove('fulfilled');
				e.target.innerHTML = 'Edit';
			}, 2000);
		} else {
			e.target.classList.add('rejected');
			e.target.innerHTML = 'Success';
			setTimeout(() => {
				e.target.classList.remove('rejected');
				e.target.innerHTML = 'Edit';
			}, 2000);
		}
	};
};

const isAuth = JSON.parse(sessionStorage.getItem('isAuth'));
app.classList.toggle('isAuth', isAuth);

// Log In Auth Handle
const logInForm = $('.log-in-container');
const errMsg = logInForm.querySelector(`.err-msg`);
logInForm.onsubmit = async (e) => {
	e.preventDefault();
	const name = e.target.querySelector('.name').value.trim();
	const pass = e.target.querySelector('.pass').value.trim();
	const res = await fetch(`${API}/api/users/auth/${name}/${pass}`);
	const { auth, id } = await res.json();

	let lastWrong;
	if (!auth) {
		errMsg.classList.add('isErr');
		lastWrong && clearTimeout(lastWrong);
		lastWrong = setTimeout(() => {
			errMsg.classList.remove('isErr');
		}, 5000);
		thisUser.name = '';
		thisUser.pass = '';
	} else {
		app.classList.add('isAuth');
		thisUser.name = name;
		thisUser.pass = pass;
	}

	sessionStorage.setItem('id', JSON.stringify(id));
	sessionStorage.setItem('isAuth', JSON.stringify(auth));
	sessionStorage.setItem('name', JSON.stringify(thisUser.name));
	sessionStorage.setItem('pass', JSON.stringify(thisUser.pass));
};

// Tool Items Handles
const tools = $$('.tool-item');
const sections = $$('section');
const activeTool = (list, idx) => {
	list.forEach((item, index) => {
		if (idx === index) item.classList.remove('hide');
		else item.classList.add('hide');
	});
};
tools.forEach((item, index) => {
	item.onclick = () => {
		activeTool(sections, index);
	};
});

// Fetch Data
let members;
let teachers;
(async () => {
	const fetchData = await Promise.allSettled([
		fetch(`${API}/api/teachers/list`),
		fetch(`${API}/api/members/list`),
	]);
	const data = fetchData
		.filter((data) => data.status === 'fulfilled')
		.map((item) => item.value.json());
	const [teachersData, membersData] = data;
	teachers = await teachersData;
	members = await membersData;
	searchMembers.oninput = (e) => searchMembersHandle(e)(members);
})(members, teachers);
