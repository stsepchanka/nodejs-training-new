const bcrypt = require('bcrypt');

const encrypt = async text => {
  const saltRounds = 10;
  const encryptedText = await bcrypt.hash(text, saltRounds);
  return encryptedText;
};

const compare = async (text, encryptedText) => {
  const match = await bcrypt.compare(text, encryptedText);
  return match;
};

module.exports = { encrypt, compare };
