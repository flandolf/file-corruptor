const fs = require('fs');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

async function corruptFile(inputFilePath, type = 'random', strength = 50) {
    const fileContent = await readFile(inputFilePath);
    let corruptedContent;
    switch (type) {
        case 'random':
            corruptedContent = corruptFileRandom(fileContent, strength);
            break;
        case 'repeating':
            corruptedContent = corruptFileRepeating(fileContent, strength);
            break;
        case 'missing':
            corruptedContent = corruptFileMissing(fileContent, strength);
            break;
        default:
            throw new Error(`Invalid corruption type: ${type}`);
    }
    // Rename the file to contain no spaces
    let outputFilePath = inputFilePath.replace(/ /g, '_');
    outputFilePath = outputFilePath.replace(/\\/g, '/');
    await writeFile(outputFilePath, corruptedContent);

    return outputFilePath.toString();
}

function corruptFileRandom(fileContent, strength) {
    const corruptedContent = new Uint8Array(fileContent.length);
    for (let i = 0; i < fileContent.length; i++) {
        const r = Math.random();
        if (r < strength / 100) {
            corruptedContent[i] = Math.floor(Math.random() * 256);
        } else {
            corruptedContent[i] = fileContent[i];
        }
    }
    return corruptedContent;
}

function corruptFileRepeating(fileContent, strength) {
    // Move around the bytes in the file
    const corruptedContent = new Uint8Array(fileContent.length);
    for (let i = 0; i < fileContent.length; i++) {
        const r = Math.random();
        if (r < strength / 100) {
            const offset = Math.floor(Math.random() * 10);
            if (i + offset < fileContent.length) {
                corruptedContent[i] = fileContent[i + offset];
            } else {
                corruptedContent[i] = fileContent[i];
            }
        } else {
            corruptedContent[i] = fileContent[i];
        }
    }
    return corruptedContent;
}

function corruptFileMissing(fileContent, strength) {
    const corruptedContent = new Uint8Array(fileContent.length);
    for (let i = 0; i < fileContent.length; i++) {
        const r = Math.random();
        if (r < strength / 100) {
            continue;
        }
        corruptedContent[i] = fileContent[i];
    }
    return corruptedContent;
}

module.exports = {
    corruptFile,
};
