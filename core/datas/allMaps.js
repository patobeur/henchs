const MAPS = [
	{
		name: 'one',
		datas: { width: 500, height: 500, top: 0, left: 0, zIndex: 0 },
		spawns: [
			{ top: 250, left: 250, },
			{ top: 100, left: 100, }
		],
		parts: [
			{
				name: 'one', tag: 'img', collide: false,
				datas: {
					width: 126, height: 62, top: 50, left: -50, zIndex: 0,
					transform: -7,
					src: 'assets/img/nuages/nuages_05.png',
					childs: [
						{
							name: 'one', tag: 'img',
							datas: {
								width: 126, height: 62, top: 50, left: -50, zIndex: 0,
								src: 'assets/img/nuages/nuages_05.png'
							}
						},
					]
				}
			},
			{
				name: 'two', tag: 'img', collide: false,
				datas: {
					width: 168, height: 78,
					top: 110, left: 160, zIndex: 0,
					src: 'assets/img/nuages/nuages_05.png'
				},
			},
			{
				name: 'two', tag: 'img', collide: false, datas: {
					width: 63, height: 31,
					top: 210, left: 210, zIndex: 0,
					src: 'assets/img/nuages/nuages_05.png'
				},
			}
		],
		walls: [
			{ datas: { className: 'wall', width: 500, height: 5, top: 0, left: 0, zIndex: 0, transform: 0 } },
			{ datas: { className: 'wall', width: 500, height: 5, top: 495, left: 0, zIndex: 0, transform: 0 } },
			{ datas: { className: 'wall', width: 5, height: 500, top: 0, left: 0, zIndex: 0, transform: 0 } },
			{ datas: { className: 'wall', width: 5, height: 500, top: 0, left: 495, zIndex: 0, transform: 0 } }
		]
	},
	{ name: 'two', datas: { width: 1200, height: 300, top: 0, left: 0, zIndex: 0 } }
]
