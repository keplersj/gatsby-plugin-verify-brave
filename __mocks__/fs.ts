export const writeFile = jest
  .fn()
  .mockImplementation((outputPath, content, callback) => {
    callback();
  });

export const mkdir = jest.fn((path, options, callback) => {
  callback();
});

export const promises = {
  writeFile: jest.fn(),
  mkdir: jest.fn(),
};
