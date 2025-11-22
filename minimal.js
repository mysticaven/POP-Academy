// Minimal Electron test
try {
    const electron = require('electron');
    console.log('Type of electron:', typeof electron);
    console.log('Electron keys:', Object.keys(electron || {}));

    if (typeof electron === 'string') {
        console.error('ERROR: electron is a string path, not an object!');
        process.exit(1);
    }

    const { app, BrowserWindow } = electron;
    console.log('App:', app);
    console.log('BrowserWindow:', BrowserWindow);

    if (!app) {
        console.error('ERROR: app is undefined!');
        process.exit(1);
    }

    app.whenReady().then(() => {
        const win = new BrowserWindow({ width: 400, height: 300 });
        win.loadURL('data:text/html,<h1>Electron Works!</h1>');
        console.log('SUCCESS: Electron is working!');
    });

    app.on('window-all-closed', () => app.quit());

} catch (error) {
    console.error('ERROR:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
}
