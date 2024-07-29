import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/App.tsx';
import de from './translations/de.yaml';
import { Intl, Logger } from '@spuxx/browser-utils';

// Set up `Logger` and test it
Logger.setLevel('debug');
Logger.debug('This is a debug message', 'TestApp');
Logger.info('This is an info message', 'TestApp');
Logger.warn('This is a warn message', 'TestApp');
Logger.error('This is an error message', 'TestApp');

// Set up `Intl`
Intl.setup({ dictionaries: [{ locale: 'de', values: de }], fallbackLocale: 'de' });

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
