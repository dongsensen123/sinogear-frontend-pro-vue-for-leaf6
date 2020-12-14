const fetchUrl = '/api/test';

const getRandomValues = () =>
  Math.random()
    .toString(36)
    .substr(2, 6);

let getText = getRandomValues();
let postText = getRandomValues();

module.exports = {
  [`GET ${fetchUrl}`](req, res) {
    const { headers } = req;
    const { 'x-sg-if-none-match': flag } = headers;
    if (flag !== getText) {
      res.setHeader('x-sg-etag', getText);
      res.status(200).json({ get: getText });
    } else {
      res.status(304).json({});
    }
  },
  [`POST ${fetchUrl}`](req, res) {
    const { headers } = req;
    const { 'x-sg-if-none-match': flag } = headers;
    if (flag !== postText) {
      res.setHeader('x-sg-etag', postText);
      res.status(200).json({ post: postText });
    } else {
      res.status(304).json({});
    }
  },
  [`PUT ${fetchUrl}/get`](req, res) {
    getText = getRandomValues();
    res.json('');
  },
  [`PUT ${fetchUrl}/post`](req, res) {
    postText = getRandomValues();
    res.json('');
  }
};
