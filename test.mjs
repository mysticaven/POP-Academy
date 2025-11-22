import { app } from 'electron';
console.log('Electron version:', process.versions.electron);
console.log('App is:', app);
if (app) app.quit();
