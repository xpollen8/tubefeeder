export async function fetchFeed (req) {

	const Parallelism = 10;
	const asyncBatch = require('async-batch').default;
	const Parser = require('rss-parser');
	const parser = new Parser();

	const since = 0;
	const channels = [
		// search for 'content="https://www.youtube.com/channel/XXXXX"' in page source to find `id`
		{ id: 'UC87qasdI10PyUVvobsZIaww', nickname: "Solomon's Outdoor Adventures", tags: [ 'geology' ] },
		{ id: 'UCGDXj3vSgJ8MCbzbb_C9thA', nickname: 'Slice', tags: [ 'documentaries' ] },
		{ id: 'UCq_bZsJlI9Euj4usDdhGQrw', nickname: 'kamilkazani', tags: [ 'politics' ] },
		{ id: 'UC_T771ortPzkzbbHp7SU8ZA', nickname: 'Vintage Car Care', tags: [ 'corvair' ] },
		{ id: 'UCQcuOJNAEmMYUgWBh9P0kwg', nickname: 'Corvair Restoration Journey', tags: [ 'corvair' ] },
		{ id: 'UCHV6ooB6QJxJxdkJKHIddhg', nickname: 'American Flat 6', tags: [ 'corvair' ] },
		{ id: 'UChVLwnlHKc-1-ap4KObH6SQ', nickname: 'Third Mind', tags: [ 'cinema', 'experimental' ] },
		{ id: 'UCYO_jab_esuFRV4b17AJtAw', nickname: '3Blue1Brown', tags: [ 'math', 'education' ] },
		{ id: 'UCjFqcJQXGZ6T6sxyFB-5i6A', nickname: 'Every Frame a Painting', tags: [ 'film', 'criticism' ] },
		{ id: 'UC5_Y-BKzq1uW_2rexWkUzlA', nickname: 'New Mind', tags: [ 'mechanics', 'education' ] },
		{ id: 'UCKWkhqAHjW4x2oRK_yzpxlA', nickname: 'RRC Restoration', tags: [ 'auto', 'restoration' ] },
		{ id: 'UC8IHAQMuiJdY6ALuhG7iU8Q', nickname: 'FilmRiseMovies', tags: [ 'movies' ] },
		{ id: 'UCJuyiB0GT9-q92gC_M3XLpg', nickname: 'IndieRightsMoviesForFree', tags: [ 'movies' ] },
		{ id: 'UCqfp_TZGkNakCWMNHPGxgng', nickname: 'Desert Drifter', tags: [ 'desert', 'ruins', 'exploration' ] },
		{ id: 'UChol434K2Z6AHyogM2K2KEA', nickname: 'Hythacg', tags: [ 'renovation', 'home' ] },
		{ id: 'UCVa4o0P6xhhSDi3rgLm2SBw', nickname: 'RECESSIM', tags: [ 'smart meter', 'reverse engineering' ] },
		{ id: 'UCY5_KS72QmaK7aaWMil4q1Q', nickname: 'WAY OUT WEST', tags: [ 'maker', 'electronics' ] },
		{ id: 'UCSuHzQ3GrHSzoBbwrIq3LLA', nickname: 'NBTV (Naomi Brockwell TV)', tags: [ 'infosec', 'education' ] },
		{ id: 'UC4ri3-k8e2rme3PZcEaBgwQ', nickname: 'Dead Kenedy In Space', tags: [ 'space', 'education' ] },
		{ id: 'UCE4xstUnu0YmkG-W9_PyYrQ', nickname: 'Usagi Electric', tags: [ 'computer', 'maker' ] },
		{ id: 'UCjtUS7-SZTi6pXjUbzGHQCg', nickname: 'Undecided with Matt Ferrell', tags: [ 'efficiency', 'technology' ] },
		{ id: 'UCtRFmSyL4fSLQkn-wMqlmdA', nickname: 'History of the Universe', tags: [ 'cosmology', 'education' ] },
		{ id: 'UCb0MyY46T9ZYOzDHkYnIoXg', nickname: 'Plainly Difficult', tags: [ 'disaster', 'education' ] },
		//{ id: 'UCz1oFxMrgrQ82-276UCOU9w', nickname: 'Atlas Pro', tags: [ 'education', 'Earth' ] },
		//{ id: 'UCDW13ycIiHcl4QVN-YwVy0w', nickname: 'Astro Pro', tags: [ 'education', 'astrology' ] },
		{ id: 'UCcvfHa-GHSOHFAjU0-Ie57A', nickname: 'Adam Something', tags: [ 'criticism' ] },
		{ id: 'UCXyqsJ-AycDjNc4qWEUDbpg', nickname: 'Lomond Campbell', tags: [ 'music', 'electronic', 'experimental' ] },
		{ id: 'UCnyaFjtCzBls96RvD4Eytwg', nickname: 'Machining and Microwaves', tags: [ '3d-printing', 'microwaves', 'radio' ] },
		{ id: 'UC06HVrkOL33D5lLnCPjr6NQ', nickname: 'Breaking Taps', tags: [ 'chemistry', 'electronics', 'education' ] },
		{ id: 'UCk0fGHsCEzGig-rSzkfCjMw', nickname: 'The Engineering Mindset', tags: [ 'electronics', 'education' ] },
		//{ id: 'UCB1t-8MBhxyDVabeUcTj0Zw', nickname: 'Shawn Willsey', tags: [ 'geology' ] },
		{ id: 'UCVpankR4HtoAVtYnFDUieYA', nickname: 'Ze Frank', tags: [ 'humor', 'education' ] },
		{ id: 'UCVSHXNNBitaPd5lYz48--yg', nickname: 'Tech Ingredients', tags: [ 'electronics', 'maker' ] },
		{ id: 'UCEqNbbsx0i7fhwRt0saYIcQ', nickname: 'Ancient America', tags: [ 'history', 'Americas' ] },
		{ id: 'UCjiVhIvGmRZixSzupD0sS9Q', nickname: 'Electronoobs', tags: [ 'maker', 'electronics' ] },
		{ id: 'UC7Jf7t6BL4e74O53dL6arSw', nickname: 'Blondihacks', tags: [ 'maker', 'machining' ] },
		{ id: 'UCS0N5baNlQWJCUrhCEo8WlA', nickname: 'Ben Eater', tags: [ 'tutorial', 'circuits' ] },
		//{ id: 'UCswG6FSbgZjbWtdf_hMLaow', nickname: 'Matt Pocock', tags: [ 'tutorial', 'code' ] },
		{ id: 'UCzfW6SlNEyxmAPtdr3n-_Og', nickname: 'Moritz Klein', tags: [ 'electronics', 'maker' ] },
		{ id: 'UCy-IytMjnUY6_bAxD7yuZ-w', nickname: 'Wesley Kagan', tags: [ 'car', 'maker' ] },
		{ id: 'UCworsKCR-Sx6R6-BnIjS2MA', nickname: 'Clickspring', tags: [ 'metalworking' ] },
		{ id: 'UCimiUgDLbi6P17BdaCZpVbg', nickname: 'exurb1a', tags: [ 'philosophy' ] },
		{ id: 'UCy0tKL1T7wFoYcxCe0xjN6Q', nickname: 'Technology Connections', tags: [ 'technology', 'education' ] },
		{ id: 'UCVI8Mfisni3GaobL1e2JOIQ', nickname: 'Inheritance Machining', tags: [ 'shop' ] },
		//{ id: 'UCvcEBQ0K3UsQ8bzWKHKQmbw', nickname: 'struthless', tags: [ 'education' ] },
		{ id: 'UC8w0ME4M1dlrByNVOTyH2mQ', nickname: 'All The Right Movies', tags: [ 'cinema', 'criticism' ] },
		{ id: 'UCUQo7nzH1sXVpzL92VesANw', nickname: 'DIY Perks', tags: [ 'DIY', 'electronics' ] },
		{ id: 'UC4gs8rXqG5G15QYhtNeM0EQ', nickname: 'Myron Cook', tags: [ 'geology' ] },
		//{ id: 'UCAJfDidJyukTekgSRZrjadw', nickname: 'AronRa', tags: [ 'education', 'science' ] },
		{ id: 'UCEIwxahdLz7bap-VDs9h35A', nickname: 'Steve Mould', tags: [ 'education', 'science', 'technology' ] },
		{ id: 'UCaSOD17PCFgtDq5wwSYzK9g', nickname: 'Red Tree Crime', tags: [ 'true crime' ] },
		{ id: 'UCDVK2t-ttSjXHnGejDvVm1g', nickname: 'Dashner Design \u0026 Restoration', tags: [ 'furniture', 'restoration' ] },
		{ id: 'UCJOh5FKisc0hUlEeWFBlD-w', nickname: 'jan Misali', tags: [ 'linguistics' ] },
		{ id: 'UCEn3fRj2e0mpqYsijxnzayg', nickname: 'Xyla Foxlin', tags: [ 'maker' ] },
		{ id: 'UCzjbia0NqUsSL1_-loJihMg', nickname: 'CinemaStix', tags: [ 'criticism', 'film' ] },
		// { id: 'UCQ_bmgSrYsQS0LboA_tZpEw', nickname: 'Bourbon Moth Woodworking', tags: [ 'woodworking' ] },
		{ id: 'UCR1D15p_vdP3HkrH8wgjQRw', nickname: 'Internet Histories', tags: [ 'history' ] },
		{ id: 'UCyNtlmLB73-7gtlBz00XOQQ', nickname: 'Folding Idea', tags: [ 'criticism' ] },
		{ id: 'UCmRBWspht0wl5JIAbHndOKQ', nickname: "CHEST'ER", tags: [ 'furniture', 'restoration' ] },
		{ id: 'UCxIu58e9tuENg3EWgQFTfnw', nickname: 'WOOD DESIGN', tags: [ 'furniture', 'restoration' ] },
		{ id: 'UCzR-rom72PHN9Zg7RML9EbA', nickname: 'PBS Eons', tags: [ 'education', 'history' ] },
		{ id: 'UCpxYSWgxVt3Pyn1ovXsGQ0g', nickname: 'PBS Terra', tags: [ 'education', 'history' ] },
		{ id: 'UCBbnbBWJtwsf0jLGUwX5Q3g', nickname: 'Journey to the Microcosmos', tags: [ 'education', 'microbes' ] },
		{ id: 'UC5XFNQc8zPWyYGCtvB2l9pA', nickname: 'Sally Pointer', tags: [ 'maker', 'historical' ] },
		{ id: 'UCUW49KGPezggFi0PGyDvcvg', nickname: 'Zack Freedman', tags: [ 'maker', 'wierdo' ] },
		{ id: 'UCUHW94eEFW7hkUMVaZz4eDg', nickname: 'Minute Physics', tags: [ 'education', 'math' ] },
		{ id: 'UCRix1GJvSBNDpEFY561eSzw', nickname: 'Laura Kampf', tags: [ 'maker', 'restoration' ] },
		{ id: 'UC3KEoMzNz8eYnwBC34RaKCQ', nickname: 'Simone Giertz', tags: [ 'maker', 'wierdo' ] },
		{ id: 'UCCWeRTgd79JL0ilH0ZywSJA', nickname: 'AlphaPhoenix', tags: [ 'maker', 'elctronics' ] },
		{ id: 'UCfIqCzQJXvYj9ssCoHq327g', nickname: 'How To Make Everything', tags: [ 'maker', 'history' ] },
		{ id: 'UCN9v4QG3AQEP3zuRvVs2dAg', nickname: 'History Time', tags: [ 'history', 'civilizations' ] },
		{ id: 'UCuCkxoKLYO_EQ2GeFtbM_bw', nickname: 'Half as Interesting', tags: [ 'education', 'diverse' ] },
		//{ id: 'UCTUtqcDkzw7bisadh6AOx5w', nickname: '12tone', tags: [ 'music', 'education' ] },
		{ id: 'UC-2YHgc363EdcusLIBbgxzg', nickname: 'Joe Scott', tags: [ 'education', 'criticism' ] },
		{ id: 'UC9RM-iSvTu1uPJb8X5yp3EQ', nickname: 'Wendover Productions', tags: [ 'education', 'logistics', 'history' ] },
		{ id: 'UCCoAJ5JYKYTMubpTIsWi70w', nickname: 'David Hilowitz Music', tags: [ 'electronics', 'maker', 'music' ] },
		{ id: 'UCJWKjrrUh2KL1d3zXQW79cQ', nickname: 'ExploreWithUs', tags: [ 'true crime' ] },
		{ id: 'UCIfNl6eO2PDYDJ0YCldE2hA', nickname: 'MichaelKrzyzaniak', tags: [ 'electronics', 'maker', 'audio' ] },
		{ id: 'UCG-qQe1mnh4JVKhuJkdh8KA', nickname: 'dreading', tags: [ 'true crime', 'psychology' ] },
		{ id: 'UC6107grRI4m0o2-emgoDnAA', nickname: 'Smarter Everyday', tags: [ 'maker', 'technology' ] },
		{ id: 'UCtGG8ucQgEJPeUPhJZ4M4jA', nickname: 'Rare Earth', tags: [ 'travel', 'history' ] },
		{ id: 'UC43NNGKNN6I3KqT963L6o6Q', nickname: 'this is MONSTERS', tags: [ 'true crime' ] },
		{ id: 'UC0T7tvy44mlQCjaTtparOZw', nickname: 'Jer Schmidt', tags: [ 'woodworking', 'maker' ] },
		{ id: 'UC19YG_LFFW4PGPpNKww4ARA', nickname: 'Ben Ben', tags: [ 'corvair' ] },
		{ id: 'UC1V-DYqsaj764uBis9-UDug', nickname: 'Foureyes Furniture', tags: [ 'furniture', 'maker' ] },
		{ id: 'UC3_VCOJMaivgcGqPCTePLBA', nickname: 'frank howarth', tags: [ 'woodworking', 'maker' ] },
		{ id: 'UC4EQCwfH54ieNPswtXh5K0w', nickname: 'my mechanics insights', tags: [ 'restoration', 'tools' ] },
		//{ id: 'UC4sEmXUuWIFlxRIFBRV6VXQ', nickname: 'The History Guy', tags: [ 'history' ] },
		{ id: 'UC5I2hjZYiW9gZPVkvzM8_Cw', nickname: 'Techmoan', tags: [ 'technology', 'gadgets' ] },
		{ id: 'UC6I0KzAD7uFTL1qzxyunkvA', nickname: 'Blacktail Studio', tags: [ 'woodworking', 'tables' ] },
		{ id: 'UC8VkNBOwvsTlFjoSnNSMmxw', nickname: 'Smarter Everyday 2', tags: [ 'maker', 'technology', 'vlog' ] },
		{ id: 'UC9-y-6csu5WGm29I7JiwpnA', nickname: 'Computerphile', tags: [ 'computers' ] },
		//{ id: 'UCA4vCk59oUmlBvyvXNiXQ7w', nickname: 'MAGNETFILM', tags: [ 'short films' ] },
		{ id: 'UCBa659QWEk1AI4Tg--mrJ2A', nickname: 'Tom Scott', tags: [ 'travel', 'history' ] },
		{ id: 'UCC76FBg2d-5NWFD8aK4ql5A', nickname: 'carlrogers', tags: [ 'home', 'restoration' ] },
		{ id: 'UCCKDHzGUWhVXxdx0sZG7DCw', nickname: 'joshua w finn', tags: [ 'model airplanes' ] },
		{ id: 'UCG5h8yHSUS4n7zPnh0dG0SA', nickname: 'Georg Rockall-Schmidt', tags: [ 'criticism' ] },
		{ id: 'UCHC4G4X-OR5WkY-IquRGa3Q', nickname: 'Tom Scott Plus', tags: [ 'travel', 'history' ] },
		{ id: 'UCHkYrJ2Fbe7pBjEZvkFzi3A', nickname: 'Mr Chickadee', tags: [ 'japanese', 'woodworking', 'construction' ] },
		{ id: 'UCHnyfMqiRRG1u-2MsSQLbXA', nickname: 'Veritasium', tags: [ 'education' ] },
		{ id: 'UCHvBHWBzzB7NyU5tIiEZHBg', nickname: 'Project Binky', tags: [ 'maker', 'restoration', 'car' ] },
		{ id: 'UCL44k-cLrlsdr7PYuMU4yIw', nickname: 'That Chapter', tags: [ 'true crime' ] },
		//{ id: 'UCLNBX6IEkvtuSoaJBbdQWsw', nickname: 'universal video', tags: [ 'movies' ] },
		{ id: 'UCMIqrmh2lMdzhlCPK5ahsAg', nickname: 'Jack Rhysider', tags: [ 'security', 'podcast' ] },
		{ id: 'UCMOqf8ab-42UUQIdVoKwjlQ', nickname: 'Practical Engineering', tags: [ 'materials', 'education' ] },
		{ id: 'UCMrMVIBtqFW6O0-MWq26gqw', nickname: 'my mechanics', tags: [ 'restoration', 'tools' ] },
		{ id: 'UCNqADXg6dTqov4klT703jYg', nickname: 'The Jérômes', tags: [ 'woodworking', 'home', 'restoration' ] },
		{ id: 'UCSju5G2aFaWMqn-_0YBtq5A', nickname: 'Stand Up Maths', tags: [ 'math' ] },
		{ id: 'UCyp-EzJrdTOd9uNPvmdst-w', nickname: 'shortoftheweek', tags: [ 'short films' ] },
		// { id: 'UCMOB6uDg7e-h8OuCw8dK2_Q', nickname: 'Alter Short Films', tags: [ 'short films' ] },
		//{ id: 'UCKMV8axq3zTUmiyXav2Ytew', nickname: 'Omeleto Drama', tags: [ 'short films' ] },
		{ id: 'UCTMt7iMWa7jy0fNXIktwyLA', nickname: 'Omeleto', tags: [ 'short films' ] },
		//{ id: 'UCVveEFTOd6khhSXXnRhxJmg', nickname: 'Fireball Tool', tags: [ 'fun', 'maker' ] },
		{ id: 'UCW39zufHfsuGgpLviKh297Q', nickname: 'DW Documentary', tags: [ 'history', 'documentary' ] },
		{ id: 'UCW5OrUZ4SeUYkUg1XqcjFYA', nickname: 'GeoWizard', tags: [ 'travel', 'fun' ] },
		{ id: 'UCafxR2HWJRmMfSdyZXvZMTw', nickname: 'LOOK MUM NO COMPUTER', tags: [ 'maker', 'electronics', 'music' ] },
		{ id: 'UCcUf33cEPky2GiWBgOP-jQA', nickname: 'Coffeehouse Crime', tags: [ 'true crime' ] },
		//{ id: 'UCckETVOT59aYw80B36aP9vw', nickname: 'Matthias Wandel', tags: [ 'woodworking', 'maker' ] },
		{ id: 'UCflg8pIElTb9qdFVaDC7gMQ', nickname: 'Dennis Davis Edu', tags: [ 'math' ] },
		{ id: 'UCfsznjef2zGJnrCRQBXqo6Q', nickname: 'Machine Thinking', tags: [ 'education', 'maker', 'machines' ] },
		{ id: 'UCg-_lYeV8hBnDSay7nmphUA', nickname: 'Tally Ho', tags: [ 'maker', 'restoration', 'boat' ] },
		{ id: 'UCgN4rDA3UNQ1OKQRXJd0nwg', nickname: 'SamSelikoff', tags: [ 'tutorials', 'code' ] },
		{ id: 'UCivA7_KLKWo43tFcCkFvydw', nickname: 'applied science', tags: [ 'maker', 'chemistry' ] },
		{ id: 'UCj1VqrHhDte54oLgPG4xpuQ', nickname: 'Stuff Made Here', tags: [ 'maker', 'technology' ] },
		{ id: 'UCl9I7RgD0i7JZ58CK17kKHQ', nickname: 'Soup Motoring', tags: [ 'maker', 'restoration', 'car' ] },
		{ id: 'UClN4WzXIXAbmxjnfZ7EOoeg', nickname: 'Not Terrible Restorations', tags: [ 'restoration', 'tools' ] },
		{ id: 'UClkUhTjFbQbtGfS14h9Vw5g', nickname: 'Martijn Doolaard', tags: [ 'home', 'renovation' ] },
		{ id: 'UCnkp4xDOwqqJD7sSM3xdUiQ', nickname: 'Adam Neely', tags: [ 'education', 'music' ] },
		{ id: 'UCoxcjq-8xIDTYp3uz647V5A', nickname: 'Numberphile', tags: [ 'math' ] },
		{ id: 'UCqA15hM9dweij6GQsuwgQvg', nickname: 'randomly', tags: [ 'corvair' ] },
		{ id: 'UCqNpjt_UcMPgm_9gphZgHYA', nickname: 'münecat', tags: [ 'criticism' ] },
		{ id: 'UCsXVk37bltHxD1rDPwtNM8Q', nickname: 'Kurzgesagt – In a Nutshell', tags: [ 'education' ] },
		{ id: 'UCt1iKYekebRPGVGmlCYN44A', nickname: 'Peter Zelinka', tags: [ 'astrophotography' ] },
		{ id: 'UCtwKon9qMt5YLVgQt1tvJKg', nickname: 'Objectivity', tags: [ 'travel', 'history' ] },
		{ id: 'UCuVLG9pThvBABcYCm7pkNkA', nickname: 'Climate Town', tags: [ 'criticism' ] },
	];
	const res = [];
	await asyncBatch(channels, async ({ id, nickname, tags }) => {
		const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`;
		try {
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
		} catch (e) {
			// channel probably removed
			// ignore and skip
		}
	}, Parallelism);
	const sorted = res?.sort((a, b) => new Date(b?.created) - new Date(a?.created)) || [];
	return { channels, items: sorted };
}
