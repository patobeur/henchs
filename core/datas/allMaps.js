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
						alt: 'spawn1',
						title: 'spawn1'
					}
				},
				{
					datas: {
						className: 'spawn',
						width: 50, height: 50, top: 250, left: 250, zIndex: 0,
						alt: 'spawn1',
						title: 'spawn1'
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
			walls: [
				{ datas: { className: 'wall w1', width: 500, height: 4, top: 2, left: 250, zIndex: 0 } },
				{ datas: { className: 'wall', width: 500, height: 4, top: 498, left: 250, zIndex: 0 } },

				{ datas: { className: 'wall', width: 4, height: 500, top: 250, left: 2, zIndex: 0 } },
				{ datas: { className: 'wall', width: 4, height: 500, top: 250, left: 498, zIndex: 0 } },

				{ datas: { className: 'wall', width: 50, height: 50, top: 250, left: 250, zIndex: 0 } },
			]
		},
		{ name: 'two', datas: { width: 1200, height: 300, top: 0, left: 0, zIndex: 0 } }
	]
}
// const MAPS = [
// 	{
// 		name: 'one',
// 		datas: { width: 500, height: 500, top: 0, left: 0, zIndex: 0 },
// 		spawns: [
// 			{
// 				datas: {
// 					className: 'spawn',
// 					width: 50, height: 50, top: 0, left: 0, zIndex: 0,
// 					alt: 'spawn1',
// 					title: 'spawn1'
// 				}
// 			},
// 			{
// 				datas: {
// 					className: 'spawn',
// 					width: 50, height: 50, top: 250, left: 250, zIndex: 0,
// 					alt: 'spawn1',
// 					title: 'spawn1'
// 				}
// 			}
// 		],
// 		parts: [
// 			{
// 				name: 'one', tag: 'img', collide: false,
// 				datas: {
// 					className: 'part',
// 					width: 126, height: 62, top: 50, left: -50, zIndex: 0,
// 					transform: -7,
// 					src: 'assets/img/nuages/nuages_05.png',
// 					alt: 'one',
// 					title: 'one',
// 					childs: [
// 						{
// 							name: 'oneb', tag: 'img',
// 							datas: {
// 								className: 'part-item',
// 								width: 126, height: 62, top: 50, left: -50, zIndex: 0,
// 								src: 'assets/img/nuages/nuages_05.png',
// 								alt: 'oneb',
// 								title: 'oneb'
// 							}
// 						},
// 					]
// 				}
// 			},
// 			{
// 				name: 'two', tag: 'img', collide: false,
// 				datas: {
// 					className: 'part',
// 					width: 168, height: 78,
// 					top: 110, left: 160, zIndex: 0,
// 					src: 'assets/img/nuages/nuages_05.png',
// 					alt: 'two',
// 					title: 'two'
// 				},
// 			},
// 			{
// 				name: 'three', tag: 'img', collide: false, datas: {
// 					className: 'part',
// 					width: 63, height: 31,
// 					top: 210, left: 210, zIndex: 0,
// 					src: 'assets/img/nuages/nuages_05.png',
// 					alt: 'three',
// 					title: 'three'
// 				},
// 			}
// 		],
// 		walls: [
// 			{ datas: { className: 'wall w1', width: 500, height: 4, top: 0, left: 250, zIndex: 0, transform: 0 } },
// 			{ datas: { className: 'wall', width: 500, height: 4, top: 500, left: 250, zIndex: 0, transform: 0 } },

// 			{ datas: { className: 'wall', width: 4, height: 500, top: 250, left: 0, zIndex: 0, transform: 0 } },
// 			{ datas: { className: 'wall', width: 4, height: 500, top: 250, left: 500, zIndex: 0, transform: 0 } }
// 		]
// 	},
// 	{ name: 'two', datas: { width: 1200, height: 300, top: 0, left: 0, zIndex: 0 } }
// ]
