export async function fetchFeed (req) {

	const Parallelism = 10;
	const asyncBatch = require('async-batch').default;
	const Parser = require('rss-parser');
	const parser = new Parser();

	const since = 0;
	const channels = [
		{ id: 'UCG-qQe1mnh4JVKhuJkdh8KA', nickname: 'dreading', tags: [ 'crime', 'psychology' ] },
		{ id: 'UC6107grRI4m0o2-emgoDnAA', nickname: 'Smarter Everyday', tags: [ 'maker', 'technology' ] },
		{ id: 'UCtGG8ucQgEJPeUPhJZ4M4jA', nickname: 'Rare Earth', tags: [ 'travel', 'history' ] },
		{ id: 'UC43NNGKNN6I3KqT963L6o6Q', nickname: 'this is MONSTERS', tags: [ 'true crime' ] },
		{ id: 'UC0T7tvy44mlQCjaTtparOZw', nickname: 'Jer Schmidt', tags: [ 'woodworking', 'maker' ] },
		{ id: 'UC19YG_LFFW4PGPpNKww4ARA', nickname: 'Ben Ben', tags: [ 'corvair' ] },
		{ id: 'UC1V-DYqsaj764uBis9-UDug', nickname: 'Foureyes Furniture', tags: [ 'furniture', 'maker' ] },
		{ id: 'UC3_VCOJMaivgcGqPCTePLBA', nickname: 'frank howarth', tags: [ 'woodworking', 'maker' ] },
		{ id: 'UC4EQCwfH54ieNPswtXh5K0w', nickname: 'my mechanics insights', tags: [ 'restoration', 'tools' ] },
		{ id: 'UC4sEmXUuWIFlxRIFBRV6VXQ', nickname: 'The History Guy', tags: [ 'history' ] },
		{ id: 'UC5I2hjZYiW9gZPVkvzM8_Cw', nickname: 'Techmoan', tags: [ 'technology', 'gadgets' ] },
		{ id: 'UC6I0KzAD7uFTL1qzxyunkvA', nickname: 'Blacktail Studio', tags: [ 'woodworking', 'tables' ] },
		{ id: 'UC8VkNBOwvsTlFjoSnNSMmxw', nickname: 'Smarter Everyday 2', tags: [ 'maker', 'technology', 'vlog' ] },
		{ id: 'UC9-y-6csu5WGm29I7JiwpnA', nickname: 'Computerphile', tags: [ 'computers' ] },
		{ id: 'UCA4vCk59oUmlBvyvXNiXQ7w', nickname: 'MAGNETFILM', tags: [ 'short films' ] },
		{ id: 'UCBa659QWEk1AI4Tg--mrJ2A', nickname: 'Tom Scott', tags: [ 'travel', 'history' ] },
		{ id: 'UCC76FBg2d-5NWFD8aK4ql5A', nickname: 'carlrogers', tags: [ 'home', 'restoration' ] },
		{ id: 'UCC9EjyMN_hx5NdctLBx5X7w', nickname: 'Scammer Payback', tags: [ 'whitehat' ] },
		{ id: 'UCCKDHzGUWhVXxdx0sZG7DCw', nickname: 'joshua w finn', tags: [ 'model airplanes' ] },
		{ id: 'UCDRmGMSgrtZkOsh_NQl4_xw', nickname: 'Secret Base', tags: [ 'sports' ] },
		{ id: 'UCG5h8yHSUS4n7zPnh0dG0SA', nickname: 'Georg Rockall-Schmidt', tags: [ 'criticism' ] },
		{ id: 'UCHC4G4X-OR5WkY-IquRGa3Q', nickname: 'Tom Scott Plus', tags: [ 'travel', 'history' ] },
		{ id: 'UCHkYrJ2Fbe7pBjEZvkFzi3A', nickname: 'Mr Chickadee', tags: [ 'japanese', 'woodworking', 'construction' ] },
		{ id: 'UCHnyfMqiRRG1u-2MsSQLbXA', nickname: 'Veritasium', tags: [ 'education' ] },
		{ id: 'UCHvBHWBzzB7NyU5tIiEZHBg', nickname: 'Project Binky', tags: [ 'maker', 'restoration', 'car' ] },
		{ id: 'UCL44k-cLrlsdr7PYuMU4yIw', nickname: 'That Chapter', tags: [ 'true crime' ] },
		{ id: 'UCLNBX6IEkvtuSoaJBbdQWsw', nickname: 'universal video', tags: [ 'movies' ] },
		{ id: 'UCMIqrmh2lMdzhlCPK5ahsAg', nickname: 'Jack Rhysider', tags: [ 'security', 'podcast' ] },
		{ id: 'UCMOqf8ab-42UUQIdVoKwjlQ', nickname: 'Practical Engineering', tags: [ 'materials', 'education' ] },
		{ id: 'UCMrMVIBtqFW6O0-MWq26gqw', nickname: 'my mechanics', tags: [ 'restoration', 'tools' ] },
		{ id: 'UCNqADXg6dTqov4klT703jYg', nickname: 'The Jérômes', tags: [ 'woodworking', 'home', 'restoration' ] },
		{ id: 'UCSju5G2aFaWMqn-_0YBtq5A', nickname: 'Stand Up Maths', tags: [ 'math' ] },
		{ id: 'UCTMt7iMWa7jy0fNXIktwyLA', nickname: 'Omeleto', tags: [ 'short films' ] },
		{ id: 'UCVveEFTOd6khhSXXnRhxJmg', nickname: 'Fireball Tool', tags: [ 'fun', 'maker' ] },
		{ id: 'UCW39zufHfsuGgpLviKh297Q', nickname: 'DW Documentary', tags: [ 'history', 'documentary' ] },
		{ id: 'UCW5OrUZ4SeUYkUg1XqcjFYA', nickname: 'GeoWizard', tags: [ 'travel', 'fun' ] },
		{ id: 'UCafxR2HWJRmMfSdyZXvZMTw', nickname: 'LOOK MUM NO COMPUTER', tags: [ 'maker', 'electronics', 'music' ] },
		{ id: 'UCcUf33cEPky2GiWBgOP-jQA', nickname: 'Coffeehouse Crime', tags: [ 'true crime' ] },
		{ id: 'UCckETVOT59aYw80B36aP9vw', nickname: 'Matthias Wandel', tags: [ 'woodworking', 'maker' ] },
		{ id: 'UCflg8pIElTb9qdFVaDC7gMQ', nickname: 'Dennis Davis Edu', tags: [ 'math' ] },
		{ id: 'UCfsznjef2zGJnrCRQBXqo6Q', nickname: 'Machine Thinking', tags: [ 'education', 'maker', 'machines' ] },
		{ id: 'UCg-_lYeV8hBnDSay7nmphUA', nickname: 'Tally Ho', tags: [ 'maker', 'restoration', 'boat' ] },
		{ id: 'UCgN4rDA3UNQ1OKQRXJd0nwg', nickname: 'SamSelikoff', tags: [ 'tutorials', 'UX' ] },
		{ id: 'UCivA7_KLKWo43tFcCkFvydw', nickname: 'applied science', tags: [ 'maker', 'chemistry' ] },
		{ id: 'UCj1VqrHhDte54oLgPG4xpuQ', nickname: 'Stuff Made Here', tags: [ 'maker', 'technology' ] },
		{ id: 'UCl9I7RgD0i7JZ58CK17kKHQ', nickname: 'Soup Motoring', tags: [ 'maker', 'restoration', 'car' ] },
		{ id: 'UClN4WzXIXAbmxjnfZ7EOoeg', nickname: 'Not Terrible Restorations', tags: [ 'restoration', 'tools' ] },
		{ id: 'UClkUhTjFbQbtGfS14h9Vw5g', nickname: 'Martijn Doolaard', tags: [ 'home', 'restoration' ] },
		{ id: 'UCnkp4xDOwqqJD7sSM3xdUiQ', nickname: 'Adam Neely', tags: [ 'education', 'music' ] },
		{ id: 'UCoxcjq-8xIDTYp3uz647V5A', nickname: 'Numberphile', tags: [ 'math' ] },
		{ id: 'UCpoTXOogFTivQw1aG5W1mTQ', nickname: 'Si-finds Thames Mudlark', tags: [ 'mudlarking' ] },
		{ id: 'UCqA15hM9dweij6GQsuwgQvg', nickname: 'randomly', tags: [ 'corvair' ] },
		{ id: 'UCqNpjt_UcMPgm_9gphZgHYA', nickname: 'münecat', tags: [ 'criticism' ] },
		{ id: 'UCsXVk37bltHxD1rDPwtNM8Q', nickname: 'Kurzgesagt – In a Nutshell', tags: [ 'education' ] },
		{ id: 'UCt1iKYekebRPGVGmlCYN44A', nickname: 'Peter Zelinka', tags: [ 'astrophotography' ] },
		{ id: 'UCtwKon9qMt5YLVgQt1tvJKg', nickname: 'Objectivity', tags: [ 'travel', 'history' ] },
		{ id: 'UCuVLG9pThvBABcYCm7pkNkA', nickname: 'Climate Town', tags: [ 'criticism' ] },
		{ id: 'UCz2iUx-Imr6HgDC3zAFpjOw', nickname: 'David Bennet Piano', tags: [ 'education', 'music' ] },
	];
	const res = [];
	await asyncBatch(channels, async ({ id, nickname, tags }) => {
		const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`;
		const rss = await parser.parseURL(url);
		const { title: channel, link: channelLink, items } = rss;
		items.forEach(({ link, title, pubDate }) => {
			const created = new Date(pubDate).getTime();
			if (created > since) {
				const videoLink = link.replace('watch?v=', 'embed/');
				const videoId = videoLink.replace('https://www.youtube.com/embed/', '');
				const thumbnail = `https://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`;
				res.push({ nickname, tags, channel, channelLink, id, videoLink, title, created, thumbnail });
			}
		});
	}, Parallelism);
	const sorted = res?.sort((a, b) => new Date(b?.created) - new Date(a?.created)) || [];
	return { channels, items: sorted };
}
