const { handle } = require('../lib/api');

module.exports = (req, res) => {
  const route = req.query?.path;

  if (typeof route !== 'string' || !route) {
    return res.status(404).json({ error: 'API route not found' });
  }

  const query = new URL(req.url, 'http://localhost').searchParams;
  query.delete('path');

  const remainingQuery = query.toString();
  req.url = `/${route}${remainingQuery ? `?${remainingQuery}` : ''}`;

  return handle(req, res);
};