const { corruptFile } = require('../utils/corruptFile');
const fs = require('fs').promises;
const path = require('path');
// Test cases for corruptFile function
describe('corruptFile function', () => {
  it('should corrupt a file with random bytes', async () => {
    const inputFilePath = path.join(__dirname, 'test-files', 'input.txt');
    const outputFilePath = path.join(__dirname, 'test-files', 'output.txt');
    await corruptFile(inputFilePath, outputFilePath, 'random', 50);
    const inputContent = await fs.readFile(inputFilePath);
    const outputContent = await fs.readFile(outputFilePath);
    expect(inputContent).not.toEqual(outputContent);
  });

  it('should corrupt a file with repeating bytes', async () => {
    const inputFilePath = path.join(__dirname, 'test-files', 'input.txt');
    const outputFilePath = path.join(__dirname, 'test-files', 'output.txt');
    await corruptFile(inputFilePath, outputFilePath, 'repeating', 50);
    const inputContent = await fs.readFile(inputFilePath);
    const outputContent = await fs.readFile(outputFilePath);
    expect(inputContent).not.toEqual(outputContent);
  });

  it('should corrupt a file by missing bytes', async () => {
    const inputFilePath = path.join(__dirname, 'test-files', 'input.txt');
    const outputFilePath = path.join(__dirname, 'test-files', 'output.txt');
    await corruptFile(inputFilePath, outputFilePath, 'missing', 50);
    const inputContent = await fs.readFile(inputFilePath);
    const outputContent = await fs.readFile(outputFilePath);
    expect(inputContent).not.toEqual(outputContent);
  });

  it('should throw an error for an invalid corruption type', async () => {
    const inputFilePath = path.join(__dirname, 'test-files', 'input.txt');
    const outputFilePath = path.join(__dirname, 'test-files', 'output.txt');
    expect(async () => {
      await corruptFile(inputFilePath, outputFilePath, 'invalid');
    }).rejects.toThrow('Invalid corruption type: invalid');
  });
});
