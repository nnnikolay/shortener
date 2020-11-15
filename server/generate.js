const faker = require('faker')
const { nanoid } = require('nanoid')
const fs = require('fs');

const urls = []

console.log('Generating fake data...')

for (var i = 1; i <= 5000; i++) {
    urls.push({
        originalUrl: faker.internet.url() + faker.system.filePath(),
        shortUrl: nanoid(6)
    })
}

fs.writeFile("urls.json", JSON.stringify(urls), (err) => {
    if (err) {
        console.error(err);
    }
});
