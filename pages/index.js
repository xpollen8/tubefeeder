import { useEffect, useState } from 'react';
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
const Parser = require('rss-parser');
import ta from 'time-ago';

const parser = new Parser();

export async function getServerSideProps(context) {

	const since = 0;
	const channels = [
		{ id: 'UCHnyfMqiRRG1u-2MsSQLbXA', nickname: 'Vertasium', tags: [ 'education' ] },
		{ id: 'UCBa659QWEk1AI4Tg--mrJ2A', nickname: 'Tom Scott', tags: [ 'travel', 'history' ] },
		{ id: 'UCHC4G4X-OR5WkY-IquRGa3Q', nickname: 'Tom Scott Plus', tags: [ 'travel', 'history' ] },
		{ id: 'UCivA7_KLKWo43tFcCkFvydw', nickname: 'applied science', tags: [ 'maker', 'chemistry' ] },
		{ id: 'UCt1iKYekebRPGVGmlCYN44A', nickname: 'Peter Zelinka', tags: [ 'astrophotography' ] },
		{ id: 'UCLNBX6IEkvtuSoaJBbdQWsw', nickname: 'universal video', tags: [ 'movies' ] },
		{ id: 'UC4EQCwfH54ieNPswtXh5K0w', nickname: 'my mechanics insights', tags: [ 'restoration' ] },
		{ id: 'UCMrMVIBtqFW6O0-MWq26gqw', nickname: 'my mechanics', tags: [ 'restoration' ] },
		{ id: 'UCpoTXOogFTivQw1aG5W1mTQ', nickname: 'Si-finds Thames Mudlark', tags: [ 'mudlarking' ] },
		{ id: 'UCqA15hM9dweij6GQsuwgQvg', nickname: 'randomly', tags: [ 'corvair' ] },
		{ id: 'UC19YG_LFFW4PGPpNKww4ARA', nickname: 'Ben Ben', tags: [ 'corvair' ] },
		{ id: 'UCqNpjt_UcMPgm_9gphZgHYA', nickname: 'münecat', tags: [ 'criticism' ] },
		{ id: 'UCG5h8yHSUS4n7zPnh0dG0SA', nickname: 'Georg Rockall-Schmidt', tags: [ 'criticism' ] },
		{ id: 'UCMIqrmh2lMdzhlCPK5ahsAg', nickname: 'Jack Rhysider', tags: [ 'security', 'podcast' ] },
		{ id: 'UCMOqf8ab-42UUQIdVoKwjlQ', nickname: 'Practical Engineering', tags: [ 'materials', 'education' ] },
		{ id: 'UCVveEFTOd6khhSXXnRhxJmg', nickname: 'Fireball Tool', tags: [ 'fun', 'maker' ] },
		{ id: 'UCW39zufHfsuGgpLviKh297Q', nickname: 'DW Documentary', tags: [ 'history', 'documentary' ] },
		{ id: 'UCgN4rDA3UNQ1OKQRXJd0nwg', nickname: 'SamSelikoff', tags: [ 'tutorials', 'UX' ] },
		{ id: 'UCwRH985XgMYXQ6NxXDo8npw', nickname: 'Kurzgesagt – In a Nutshell', tags: [ 'education' ] },
		{ id: 'UCfsznjef2zGJnrCRQBXqo6Q', nickname: 'Machine Thinking', tags: [ 'education', 'maker', 'machines' ] },
		{ id: 'UCg-_lYeV8hBnDSay7nmphUA', nickname: 'Tally Ho', tags: [ 'maker', 'restoration', 'boat' ] },
		{ id: 'UCl9I7RgD0i7JZ58CK17kKHQ', nickname: 'Soup Motoring', tags: [ 'maker', 'restoration', 'car' ] },
		{ id: 'UCHvBHWBzzB7NyU5tIiEZHBg', nickname: 'Project Binky', tags: [ 'maker', 'restoration', 'car' ] },
		{ id: 'UCHkYrJ2Fbe7pBjEZvkFzi3A', nickname: 'Mr Chickadee', tags: [ 'japanese', 'woodworking', 'construction' ] },
		{ id: 'UCckETVOT59aYw80B36aP9vw', nickname: 'Matthias Wandel', tags: [ 'woodworking', 'maker' ] },
		{ id: 'UC3_VCOJMaivgcGqPCTePLBA', nickname: 'frank howarth', tags: [ 'woodworking', 'maker' ] },
		{ id: 'UClkUhTjFbQbtGfS14h9Vw5g', nickname: 'Martijn Doolaard', tags: [ 'woodworking', 'restoration' ] },
		{ id: 'UCNqADXg6dTqov4klT703jYg', nickname: 'The Jérômes', tags: [ 'woodworking', 'restoration' ] },
		{ id: 'UC0T7tvy44mlQCjaTtparOZw', nickname: 'Jer Schmidt', tags: [ 'woodworking', 'maker' ] },
		{ id: 'UCA4vCk59oUmlBvyvXNiXQ7w', nickname: 'MAGNETFILM', tags: [ 'short films' ] },
		{ id: 'UCTMt7iMWa7jy0fNXIktwyLA', nickname: 'Omeleto', tags: [ 'short films' ] },
		{ id: 'UCCKDHzGUWhVXxdx0sZG7DCw', nickname: 'joshua w finn', tags: [ 'model airplanes' ] },
		{ id: 'UCz2iUx-Imr6HgDC3zAFpjOw', nickname: 'David Bennet Piano', tags: [ 'education', 'music' ] },
		{ id: 'UCnkp4xDOwqqJD7sSM3xdUiQ', nickname: 'Adam Neely', tags: [ 'education', 'music' ] },
		{ id: 'UCfsznjef2zGJnrCRQBXqo6Q', nickname: 'Machine Thinking', tags: [ 'education', 'maker', 'tools' ] },
		{ id: 'UCafxR2HWJRmMfSdyZXvZMTw', nickname: 'LOOK MUM NO COMPUTER', tags: [ 'maker', 'electronics', 'music' ] },
		{ id: 'UCC9EjyMN_hx5NdctLBx5X7w', nickname: 'Scammer Payback', tags: [ 'whitehat' ] },
		{ id: 'UCW5OrUZ4SeUYkUg1XqcjFYA', nickname: 'GeoWizard', tags: [ 'travel', 'fun' ] },
		{ id: 'UC_tEw87mHCr0CtcIwlNiijw', nickname: 'RetroTV', tags: [ 'movies', 'television' ] },
		{ id: 'UC5I2hjZYiW9gZPVkvzM8_Cw', nickname: 'Techmoan', tags: [ 'technology', 'gadgets' ] },
		{ id: 'UC-pXDHjnYErWtivKCjqw3JA', nickname: 'KINOPAN0RAMA', tags: [ 'movies' ] },
		{ id: 'UCj1VqrHhDte54oLgPG4xpuQ', nickname: 'Stuff Made Here', tags: [ 'maker', 'technology' ] },
		{ id: 'UC8VkNBOwvsTlFjoSnNSMmxw', nickname: 'Smarter Everyday', tags: [ 'maker', 'technology' ] },
		{ id: 'UCuVLG9pThvBABcYCm7pkNkA', nickname: 'Climate Town', tags: [ 'criticism' ] },
		{ id: 'UCflg8pIElTb9qdFVaDC7gMQ', nickname: 'Dennis Davis Edu', tags: [ 'math' ] },
		{ id: 'UCtwKon9qMt5YLVgQt1tvJKg', nickname: 'Numberphile', tags: [ 'math' ] },
		{ id: 'UCoxcjq-8xIDTYp3uz647V5A', nickname: 'Computerphile', tags: [ 'computers' ] },
		{ id: 'UCDRmGMSgrtZkOsh_NQl4_xw', nickname: 'Secret Base', tags: [ 'sports' ] },
		{ id: 'UC1V-DYqsaj764uBis9-UDug', nickname: 'Foureyes Furniture', tags: [ 'furniture', 'maker' ] },
	];
	const res = [];
	await Promise.all(channels.map(async ({ id, nickname, tags }) => {
		const rss = await parser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${id}`);
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
	}));
	const sorted = res?.sort((a, b) => new Date(b?.created) - new Date(a?.created)) || [];
  return {
    props: { channels, items: sorted}, // will be passed to the page component as props
  }
}

export default function Home({ channels, items }) {
	const [ videos, setVideos ] = useState(items);
  return (
    <div className={styles.container}>
      <Head>
        <title>Tube Feeder</title>
        <meta name="description" content="show most recent 'tube videos from feed" />
      </Head>

      <main className={styles.main}>
				<div className={styles.grid}>
					{videos.map(it => {
						return <div key={it?.videoLink} className={styles.card}>
								<div>
									{ta.ago(it?.created)}
								</div>
								<div>
									<a href={it?.videoLink} target="new"><img src={it?.thumbnail} alt="thumb" width={240} height={180} /></a>
								</div>
								<div>
									<b>{it?.channel}</b>
								</div>
								<div>
									{it?.title}
								</div>
								<div>
									<i>"{it?.tags?.join('", "')}"</i>
								</div>
						</div>
					})}
				</div>
				<div className={styles.grid}>
					<ol>{channels.map(({ id, nickname }) =>  {
						return <li key={id}>
							<a href={`https://youtube.com/channel/${id}/videos`} target="new">{nickname}</a>
						</li>
					})}</ol>
				</div>
			</main>
		</div>
  )
}
