const gulp = require('gulp');
const gulp_tslint = require('gulp-tslint');
const del = require('del');
const shell = require('gulp-shell');
const fs = require('fs-extra');
const path = require('path');

////////////////////////////////////////////////////

// 通过NODE_ENV来设置环境变量，如果没有指定则默认为开发环境
const DEV = 'development';
const PRO = 'production';

let env = process.env.NODE_ENV || DEV;
env = env.toLowerCase();

console.log(`The env is (${env})`);

////////////////////////////////////////////////////

gulp.task('default', ['build']);
gulp.task('start', ['build'], shell.task(['ts-node src/app/server.ts']));
gulp.task('build', ['deploy'], shell.task(['yarn run tsc']));

gulp.task('start:prod', ['build'], shell.task(['node build/app/server.js']));
gulp.task('test', ['tslint'], shell.task(['jest --config=jest.json']));
gulp.task('test:watch', ['tslint'], shell.task(['jest --watch --config=jest.json']));
gulp.task('test:coverage', ['tslint'], shell.task(['jest --config=jest.json --coverage --coverageDirectory=coverage']));
gulp.task('e2e', ['tslint'], shell.task(['jest --config=e2e/jest-e2e.json']));
gulp.task('e2e:watch', ['tslint'], shell.task(['jest --watch --config=e2e/jest-e2e.json']));

gulp.task('tslint', () => {
  return gulp
    .src(['./src/**/*.ts', '!**/*.d.ts', '!node_modules/**'])
    .pipe(
      gulp_tslint({
        formatter: 'verbose'
      })
    )
    .pipe(
      gulp_tslint.report({
        emitError: true,
        summarizeFailureOutput: true
      })
    );
});

////////////////////////////////////////////////////

function deploy() {
  const distFolder = path.join(__dirname, './build/lib');
  const appPackageConfig = path.join(__dirname, './package.json');
  const readme = path.join(__dirname, './README.md');

  fs.copySync(readme, `${distFolder}/README.md`);

  const packageConfig = fs.readJsonSync(appPackageConfig);
  delete packageConfig.devDependencies;
  delete packageConfig.scripts;
  fs.outputJson(distFolder + '/package.json', packageConfig);
}

///////////////////////////////////////////////////

gulp.task('clean', () => {
  return del('./build/', { force: true });
});

gulp.task('deploy', ['clean', 'tslint'], () => {
  return deploy();
});
