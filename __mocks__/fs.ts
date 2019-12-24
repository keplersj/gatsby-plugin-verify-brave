export const writeFile = jest
  .fn()
  .mockImplementation((outputPath, content, callback) => {
    callback();
  });
