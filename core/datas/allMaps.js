const DATAZ = {
	ghostdatas: [
		{
			comment: 'this is my div from the futur, i ll use it for collisions before validating player moOOove',
			datas: {
				className: 'ghost',
				width: 25, height: 25, top: 0, left: 0, zIndex: 0,
				alt: 'My ghost',
				title: 'My ghost'
			},
			speed: 2,
			sommets: {}
		}
	],
	maps: [
		{
			name: 'one',
			datas: { width: 1000, height: 1000, top: 0, left: 0, zIndex: 0 },
			spawns: [
				{
					datas: {
						className: 'spawn',
						width: 50, height: 50, top: 50, left: 50, zIndex: 0,
						alt: 'Spawn Zone A',
						title: 'Spawn Zone A'
					}
				},
				{
					datas: {
						className: 'spawn',
						width: 50, height: 50, top: 250, left: 250, zIndex: 0,
						alt: 'Spawn Zone B',
						title: 'Spawn Zone B'
					}
				}
			],
			parts: [
				{
					name: 'one', tag: 'img', collide: false,
					datas: {
						className: 'part',
						width: 126, height: 62, top: 50, left: -50, zIndex: 0,
						transform: -7,
						src: 'assets/img/nuages/nuages_05.png',
						alt: 'one',
						title: 'one',
						textContent: 'Zone de test : Collisions',
						childs: [
							{
								name: 'oneb', tag: 'img',
								datas: {
									className: 'part-item',
									width: 126, height: 62, top: 50, left: -50, zIndex: 0,
									src: 'assets/img/nuages/nuages_05.png',
									alt: 'oneb',
									title: 'oneb'
								}
							},
						]
					}
				},
				{
					name: 'one', tag: 'div', collide: false,
					datas: {
						className: 'part',
						width: 200, height: 150,
						top: 75, left: 200, zIndex: 0,
						// src: 'assets/img/nuages/nuages_05.png',
						backgroundColor: 'rgba(10,10,10,.1)',
						alt: 'one',
						title: 'one',
						textContent: 'Zone de test : Collisions',
						childs: [
							{
								name: 'oneb', tag: 'img',
								datas: {
									className: 'part-item',
									width: 126, height: 62, top: 50, left: -50, zIndex: 0,
									src: 'assets/img/nuages/nuages_05.png',
									alt: 'oneb',
									title: 'oneb'
								}
							},
						]
					}
				},
				// {
				// 	name: 'two', tag: 'img', collide: false,
				// 	datas: {
				// 		className: 'part',
				// 		width: 168, height: 78,
				// 		top: 110, left: 160, zIndex: 0,
				// 		src: 'assets/img/nuages/nuages_05.png',
				// 		alt: 'two',
				// 		title: 'two'
				// 	},
				// },
				// {
				// 	name: 'three', tag: 'img', collide: false, datas: {
				// 		className: 'part',
				// 		width: 63, height: 31,
				// 		top: 210, left: 210, zIndex: 0,
				// 		src: 'assets/img/nuages/nuages_05.png',
				// 		alt: 'three',
				// 		title: 'three'
				// 	},
				// }
			],
			wallThin: 1,
			walls: [
				// { datas: { className: 'wall w1', width: 500, height: 4, top: 2, left: 250, zIndex: 0 } },
				// { datas: { className: 'wall', width: 500, height: 4, top: 498, left: 250, zIndex: 0 } },

				// { datas: { className: 'wall', width: 4, height: 500, top: 250, left: 2, zIndex: 0 } },
				// { datas: { className: 'wall', width: 4, height: 500, top: 250, left: 498, zIndex: 0 } },

				{
					datas: {
						title: 'this one is good ! it look like !!!', className: 'wall', width: 50, height: 50,
						top: 50, left: 150, zIndex: 0
					}
				},
				{
					datas: {
						title: 'this one is no good !', className: 'wall', width: 50, height: 50,
						top: 80, left: 250, zIndex: 0, rotate: 42, transform: 42
					}
				},
			]
		},
		{ name: 'two', datas: { width: 1200, height: 300, top: 0, left: 0, zIndex: 0 } }
	]
}
