const fse = require('fs-extra');
fse.copyFileSync('./env/.env.sample', `./env/.env`);
fse.copyFileSync('./env/auth.json.sample', `./env/auth.json`);
fse.copyFileSync('./env/manifest.json.sample', `./env/manifest.json`);
fse.copyFileSync('./env/manifest-dev.json.sample', `./env/manifest-dev.json`);
