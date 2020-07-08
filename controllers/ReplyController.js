const axios = require('axios').default;

module.exports = {
    store(req, res) {
        axios({
            method: 'post',
            url: `${process.env.API_URL}/Replies`,
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                url: req.body.github,
                description: req.body.description,
                candidateId: req.user.id
            }
        })
            .then((retorno) => {
                res.status(200);
                res.json({ success: true });
            })
            .catch((retorno) => {
                if (retorno.response.status == 500) {
                    res.status(500);
                    res.json({ success: false});
                } else {
                    res.status(400);
                    res.json(responseObj);
                }
            });
    },
    findAllByCandidateId(req, res) {
        var reply;
        axios({
            method: 'get',
            url: `${process.env.API_URL}/Replies/all`,
            params: { candidateId: req.query.candidateId }
        })
            .then((retorno) => {
                if (retorno.data.retorno != '') {
                    reply = retorno.data.retorno;
                    res.status(200);
                    res.locals = { replies: reply }
                    res.send(reply);
                } else {
                    var reply = {
                        url: '',
                        description: ''
                    };
                    res.status(200);
                    res.locals = { replies: reply }
                    res.send(reply);
                }
            })
    }
}