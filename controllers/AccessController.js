const ac = require('../config/access_control');

module.exports = {
    isAdmin: (req, res, next) => {
        var url = req.url;
        var directory;
        switch (true) {
            case url == '/':
                directory = 'Dashboard'
                url = '/dashboard'
                break;
            case url == '/candidates':
                return next();
                break;
            case url.includes('-'):
                directory = url.substring(0, url.indexOf('-'))
                    .replace('/', '');
                directory = directory.charAt(0).toUpperCase() + directory.slice(1);
                url = url.replace('-', '_')
                break;
            default:
                directory = url.charAt(1).toUpperCase() + url.slice(2);
        }

        var permission = ac.can(req.user.role);
        if (permission.readAny('Admin').granted) {
            res.locals = { title: directory, permission };
            res.render(directory + url);
        } else {
            res.redirect('/Candidate');
        }
    }
}