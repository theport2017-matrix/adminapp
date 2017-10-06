import React from 'react';
import ReactDOM from 'react-dom';

import AdminApp from './adminapp';

import AdminConsole from './components/AdminConsole';

const adminApp = new AdminApp();

ReactDOM.render(
  <AdminConsole app={adminApp} />,
  document.getElementById('announce-root')
);
