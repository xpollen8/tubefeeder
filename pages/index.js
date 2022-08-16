import { useEffect, useState } from 'react';
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import ta from 'time-ago';

export default function Home() {
	const [ videos, setVideos ] = useState([]);
	const [ channels, setChannels ] = useState([]);

	useEffect(() => {
		const get = async () => {
			await fetch(`/api/fetch`)
				.then(res => res.json())
				.then(({ channels = [], items = [] }) => {
					setVideos(items);
					setChannels(channels);
				});
		}
		if (!videos?.length) {
			get();
		}
	}, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Tube Feeder</title>
        <meta name="description" content="show most recent 'tube videos from feed" />
      </Head>

      <main className={styles.main}>
				<div className={styles.grid}>
					{!videos?.length && <h1>Loading..</h1>}
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
