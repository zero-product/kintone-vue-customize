const { PowerShell } = require('node-powershell');
const auth = require('../env/auth.json');

const envdir    = './env/';
const args      = process.argv.slice(2);
const server    = args.includes('--serve');
const manifest  = envdir + (server ? 'manifest-dev.json' : 'manifest.json');
(async () => {
  if (!auth) {
    console.error('`envディレクトリにauth.jsonを作成し、kintoneの権限情報を設定してください。`');
    return;
  }
  console.log('⏫ deploying ===================');
  await PowerShell.$`node ./node_modules/@kintone/customize-uploader/bin/cli ${manifest} --domain ${auth.domain} --username ${auth.username} --password ${auth.password}`;
  console.log('✅ deployed  ===================');
})();