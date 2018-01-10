const fs = require('fs');
const path = require('path');
const omitDeep = require('omit-deep');
const srcDir = path.resolve(__dirname, "src");

fs.readdirSync(srcDir).forEach(file => {
    if (path.extname(file) !== ".json") {
        return;
    }

    const obj = omitDeep(JSON.parse(fs.readFileSync(path.resolve(srcDir, file), 'utf8')), ['meta-description', 'meta-deprecated', 'meta-example', 'meta-default']);

    fs.writeFile(path.resolve(__dirname, `dist/${path.basename(file)}`), JSON.stringify(obj), function (err) {
        if (err) {
            console.log('ERROR OCCURRED.');
            return console.error(err);
        }

        console.log(`Schema ${path.basename(file)} processed.`);
    });
});
