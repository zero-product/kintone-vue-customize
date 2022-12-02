const { build, serve }  = require('esbuild');
const { create, exit }  = require('browser-sync');
const esbuildVue  = require('esbuild-vue');
const esbuildEnv  = require('esbuild-envfile-plugin');
const dotenv      = require('dotenv').config({path: "../env/.env"});
const path        = require('path');

const args    = process.argv.slice(2)
const server  = args.includes('--serve');
const env     = dotenv.parsed;
const outdir  = path.resolve(__dirname, '../dist')
console.log(outdir)

const builder = {
  entryPoints: [path.resolve('./source/index.js')],
  bundle: true,
  minify: !server,
  sourcemap: server,
  outfile: `${outdir}/app.min.js`,
  plugins: [esbuildVue(), esbuildEnv],
  // drop: ['console', 'debugger'],
  define: {
    'process.env': JSON.stringify(env),
    'process.env.NODE_ENV': process.env.NODE_ENV || 'development',
  },
  watch: !server ? false : {
    onRebuild (error, result) {
      if (error) console.error( 'watch build failed:', error)
      else console.log( 'updated' )
    },
  },
}
console.log('🔨 building  ===================')
if (server) {
  // fse.copyFileSync('./public/index.html', `./${outdir}/index.html`);
  build(builder).then(resp => {
    create().init({
      open  : false,
      watch : true,
      server: outdir,
      https : {
        key: 'localhost-key.pem',
        cert: 'localhost.pem'
      }
    }, (err) => {
      if (err) {
        console.log(err)
        exit();
      }
    })
  });
} else {
  build(builder)
}