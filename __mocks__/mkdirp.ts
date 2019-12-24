module.exports = jest.fn().mockImplementation((dir, callback) => {
  callback();
});
