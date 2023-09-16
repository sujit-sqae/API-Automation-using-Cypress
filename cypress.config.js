const { defineConfig } = require('cypress');

const {downloadFile} = require('cypress-downloadfile/lib/addPlugin');
const { isFileExist } = require('cy-verify-downloads');
const { verifyDownloadTasks } = require('cy-verify-downloads');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: {
    charts: true,
    reportPageTitle: 'custom-title',
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  e2e: {
    setupNodeEvents(on, config) {
      on('task', {downloadFile})},
    setupNodeEvents(on, config) {
      on('task', {isFileExist})},
    setupNodeEvents(on, config) {
      on('task', {verifyDownloadTasks})},
    experimentalStudio: true,
    baseUrl: 'https://jsonplaceholder.typicode.com',
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});