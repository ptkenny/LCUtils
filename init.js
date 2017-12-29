const remote = require('electron').remote;
require('./render').render(remote.getGlobal('plugins'));
require('./utils/manage_socket').initSocketHandler(remote.getGlobal('plugins'));
