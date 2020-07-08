const axios = require('axios').default;
const ac = require('../config/access_control');
var permission;

module.exports = {
    index(req, res) {
        
        axios({
            method: 'get',
            url: `${process.env.API_URL}/Replies/Candidate`,
            params: { candidateId: req.user.id }
        })
            .then((retorno) => {
                permission = ac.can(req.user.role);
                if (retorno.data.retorno != '') {
                    var reply = retorno.data.retorno[0];
                    res.status(200);
                    res.locals = { title: 'Candidate' };
                    res.render('Candidate/', { phase: req.user.phase, reply: reply, permission });
                } else {
                    var reply = {
                        url: '',
                        description: ''
                    }
                    res.status(200);
                    res.locals = { title: 'Candidate' };
                    res.render('Candidate/', { phase: req.user.phase, reply: reply, permission });
                }
            })
    },
    findAll(req, res, next) {
        axios({
            method: 'get',
            url: `${process.env.API_URL}/Candidates`,
            data: req
        })
            .then((retorno) => {
                var permission = ac.can(req.user.role);
                if (permission.readAny('Admin').granted) {
                    var candidates = retorno.data;
                    res.locals = { title: 'Candidate', permission, candidates };
                    res.render('Candidates/candidates');
                } else {
                    res.redirect('/Candidate');
                }
            })
    }
}