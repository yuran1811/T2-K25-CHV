(() => {
	const app = document.querySelector('#app');
	const inputRule = `onkeydown="inputAvoidSubmit(event)"`;

	const logInCPN = `
	<form class="log-in-container">
		<div class="title">Welcome</div>
		<input ${inputRule} type="text" name="name" class="name" autocomplete="off" placeholder="User Name" />
		<div class="pass-container">
			<input
				${inputRule}
				type="password"
				name="pass"
				class="pass"
				id="pass"
				autocomplete="off"
				placeholder="Password" />
			<label for="pass" class="pass-mode">
				<i class="bi bi-eye show"></i>
				<i class="bi bi-eye-slash hide"></i>
			</label>
		</div>
		<div class="err-msg">Check your account info</div>
		<button type="submit">
			<span> Log In </span>
		</button>
	</form>`;

	const mainContent = [
		{
			name: 'User',
			title: 'Edit Info',
			icon: '',
			extra: '',
			env: `<input type="text" name="photo" placeholder="Photo URL"/>`,
			content: `
			<div class="content-item user-item">
				<form method="POST">
					<input ${inputRule} type="text" name="name" placeholder="Username"/>
					<input ${inputRule} type="text" name="pass" placeholder="Password"/>
					<button type="submit" class="edit" onclick="userEdit(event)">
						<div class="submit-ico">
							<i class="bi bi-pen edit-ico"></i>
							<i class="bi bi-arrow-repeat sync-ico spin"></i>
							<i class="bi bi-check2 success-ico"></i>
							<i class="bi bi-x-lg fail-ico"></i>
						</div>
						<span class="submit-text"> Edit </span>
					</button>
				</form>
			</div>`,
		},
		{
			name: 'Members',
			icon: '<i class="bi bi-mortarboard"></i>',
			extra: `
			<input type="text" class="search-bar members-search" placeholder="Searching" />
			<div class="add-btn members">
				<i class="bi bi-person-plus"></i>
			</div>`,
		},
		{
			name: 'Teachers',
			icon: '<i class="bi bi-person"></i>',
			extra: `
			<input type="text" class="search-bar teachers-search" placeholder="Searching" />
			<div class="add-btn teachers">
				<i class="bi bi-person-plus"></i>
			</div>`,
		},
		{
			name: 'AIO',
			icon: '<i class="bi bi-columns-gap"></i>',
			extra: `
			<input type="text" class="search-bar aio-search" placeholder="Searching" />
			<div class="add-btn aio">
				<i class="bi bi-plus-circle"></i>
			</div>`,
		},
		{
			name: 'Timetable',
			icon: '<i class="bi bi-calendar3"></i>',
			extra: ``,
		},
	];

	const toolCpn = `
	<nav class="tool">
		<div class="tool-item user">
			<div class="ava"><i class="bi bi-x-diamond spin"></i></div>
			<div class="name">User</div>
		</div>
		<ul>
		${mainContent
			.slice(1)
			.map(
				(item) =>
					`<li class="tool-item">
						${item.icon}
						<span> ${item.name} </span>
					</li>`
			)
			.join('')}
		</ul>
	</nav>`;

	const mainCpn = `
	<div class="main">
		${mainContent
			.map((item) => {
				return `
				<section class="${item.name.toLowerCase()} ${
					item.name === 'User' ? 'hide' : ''
				}">
					<h2>${item.icon} ${item?.title ? item.title : item.name}</h2>
					${item.extra}
					<div class="content">${item?.content ? item.content : ''}</div>
				</section>`;
			})
			.join('')}
	</div>`;

	app.innerHTML = `${logInCPN} ${toolCpn} ${mainCpn}`;
})();
