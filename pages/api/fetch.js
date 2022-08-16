import { fetchFeed } from '../../lib/feed';

const feed = async (req, res) => {
  res.statusCode = 200;
  res.json(await fetchFeed(req));
}

export default feed;
