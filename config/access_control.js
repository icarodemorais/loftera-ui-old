const AccessControl = require('accesscontrol');

const ac = new AccessControl();

// UpperCase
ac
    .grant('candidate')
        .readOwn('Candidate')
    .grant('admin')
        .readAny('Admin')      
        .extend('candidate')
    .grant('locator')
        .readOwn('locator')      
    .grant('tenant')
        .readOwn('tenant')      
		
module.exports = ac;