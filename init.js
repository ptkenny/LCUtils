let plugins = require('./utils/get_plugins');
require('./render').render(plugins);
require('./utils/manage_socket').initSocketHandler(plugins);
