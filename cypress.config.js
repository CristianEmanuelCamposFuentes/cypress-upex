const { defineConfig } = require("cypress");
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const createEsbuildPlugin = require('@badeball/cypress-esbuild-preprocessor/esbuild');
const {downloadFile} = require('cypress-downloadfile/lib/addPlugin')

async function setupNodeEvents(on, config){
  // This is required fon the preprocessor to be able to generate JSON reports after each run, and more
  await preprocessor.addCucumberPreprocessorPlugin(on, config);

  on('task', {downloadFile})

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin.default(config)],
    })
  )

  // Make sure to return the config object as it might been modified by the plugin
  return config
}

module.exports = defineConfig({

  // Cypress dashboard para ver las ejecuciones en la web
  projectId: '',
  // 1280x720 resolution is considered to be the most suitable screen resolution for the desktop
  viewportWidth: 1280,
  viewportHeight: 720,
  // Whether Cypress will watch and restart tests on test file changes
  watchForFileChanges: false,
  // Caso Testing en SUT con seguridad web
  chromeWebSecurity: false,
  //multi-reporters: one report.xml + mochawesome.json per file.
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
configFile: 'jsconfig.json',
},
  // Number of times to retry a failed test. If a number is set, tests will retry in both runMode and openMode:
  retries: 0,
  // Whether Cypres will record a video of the test run when running on headless
  video: false,
  //E2E Testing Runner
  e2e: {
    // Glob pattern to determinate what test files to load:
    specPattern: ['**/*.feature', 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}'],
    // Use Cypress puglins
    setupNodeEvents,

    baseURL: "https://opensource-demo.orangehrmlive.com/web/index.php",
    env: {
      AdminUser:{
        username: "Admin",
        password: "admin123"
      },
      endpoint: "/auth/login"
    },
},

});
