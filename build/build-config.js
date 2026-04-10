/**
 * @module Build-config
 */


// build/build-config.js
/**
 * Build configuration constants used throughout the build scripts.
 *

 * @typedef {Object} BuildConfig
 * @property {string} SRC_DIR - Root source directory.
 * @property {string} PUBLIC_DIR - Directory where built assets are emitted.
 * @property {string} APPS_SRC - Path to the source apps directory.
 * @property {string} APPS_PUBLIC - Path to the public apps output directory.
 */

/** @type {BuildConfig} */
module.exports = {
  SRC_DIR: './src',
  PUBLIC_DIR: './public',
  APPS_SRC: './src/apps',
  APPS_PUBLIC: './public/apps',
};