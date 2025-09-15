exports.handler = async (event, context) => {
  const seal = require('../../public/IgnisVow.json');
  return {
    statusCode: 200,
    body: JSON.stringify(seal)
  };
};
