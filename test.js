console.log('Electron version:', process.versions.electron);
console.log('Node version:', process.versions.node);
const { app } = require('electron');
console.log('App is:', app);
if (app) app.quit();
