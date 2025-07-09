const sanitizeUser = (doc) => {
  const { __v, password, ...user } = doc;
  return user;
};

module.exports = sanitizeUser;
