const path = require('path');
const del = require('del');
const fs = require('fs');

const gulp = require('gulp'),
  gulpTs = require('gulp-typescript'),
  gulpMin = require('gulp-minify');

const dotenvResult = require('dotenv').config();

const environment = process.env.NODE_ENV;

if (dotenvResult.error) {
  throw 'Missing .env file!';
} else if (!environment) {
  throw "Missing 'NODE_ENV' environment variable.";
} else if (
  typeof environment !== 'string' ||
  (environment !== 'production' && environment !== 'development')
) {
  throw "Invalid 'NODE_ENV' environment variable.";
}

const b4aEmail = process.env.B4A_EMAIL;
const b4aProjectName = process.env.B4A_PROJECT_NAME;
const b4aProjectId =
  environment === 'production'
    ? process.env.B4A_PROD_PROJECT_ID
    : process.env.B4A_SANDBOX_PROJECT_ID;

async function validateEnvVar(name, val) {
  if (!val) {
    throw `Missing '${name}' environment variable.`;
  } else if (typeof val !== 'string' || val.length < 1) {
    throw `Invalid '${name}' environment variable.`;
  }
}

validateEnvVar('B4A_EMAIL', b4aEmail);
validateEnvVar('B4A_PROJECT_NAME', b4aProjectName);
validateEnvVar(
  `B4A_${environment === 'production' ? 'PROD' : 'SANDBOX'}_PROJECT_ID`,
  b4aProjectId
);

async function clean(cb) {
  await del(path.resolve('dist'));
  fs.mkdirSync(path.resolve('dist'));

  cb();
}

function build(cb) {
  gulp
    .src('src/**/*.ts')
    .pipe(
      gulpTs({
        noImplicitAny: false,
        outDir: path.resolve('dist', 'cloud'),
        esModuleInterop: true,
      })
    )
    .pipe(
      gulpMin({
        noSource: true,
        ext: {
          min: '.js',
        },
      })
    )
    .pipe(gulp.dest(path.resolve('dist', 'cloud')));

  cb();
}
async function minify(cb) {
  // await gulpMin();
  cb();
}

function copyStaticAssets(cb) {
  gulp.src('assets/*').pipe(gulp.dest(path.resolve('dist', 'cloud')));

  cb();
}

function generateProjectFiles(cb) {
  fs.writeFileSync(
    path.resolve('dist', '.parse.project'),
    JSON.stringify({
      project_type: 1,
      parse: {
        jssdk: '2.2.25',
      },
      email: b4aEmail,
    })
  );

  fs.writeFileSync(
    path.resolve('dist', '.parse.local'),
    JSON.stringify({
      applications: {
        [b4aProjectName]: {
          applicationId: b4aProjectId,
        },
        _default: {
          link: b4aProjectName,
        },
      },
    })
  );

  cb();
}

exports.clean = clean;
exports.build = build;
exports.minify = minify;
exports.copyStaticAssets = copyStaticAssets;
exports.generateProjectFiles = generateProjectFiles;

exports.default = gulp.series(
  clean,
  build,
  copyStaticAssets,
  generateProjectFiles
);
