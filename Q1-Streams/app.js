
const fs = require('fs');

const reader = fs.createReadStream('input.txt', 'utf8');
const writer = fs.createWriteStream('output.txt');

reader.on('data', (chunk) => {
    writer.write(chunk);
});

reader.on('end', () => {
    writer.end();
    console.log('File read and written successfully!');
});

reader.on('error', (err) => {
    console.log('Error:', err.message);
});

writer.on('finish', () => {
    console.log('Output file created successfully.');
});
