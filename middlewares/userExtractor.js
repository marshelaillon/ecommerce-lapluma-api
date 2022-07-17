const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  const authorization = request.get('authorization');
  let token = '';
  let decodedToken = {};

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7);
  }

  try {
    decodedToken = jwt.verify(token, 'plataforma.rojo.azul.messi');
  } catch {}

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }

  const { id: userId } = decodedToken;

  request.userId = userId;

  next();
};
