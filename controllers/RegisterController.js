const axios = require('axios').default;

module.exports = {
    store(req, res) {

        var url = `${process.env.API_URL}${req.body.role == "locator" ? "/Locator" : "/Tenant"}`;

        axios({
            method: 'post',
            url: url,
            headers: {
                'Content-Type': 'application/json'
            },
            data: req.body
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
                    var responseObj = {};
                    responseObj.success = false;
                    responseObj.paths = [];

                    retorno.response.data.error.forEach(err => {
                        responseObj.paths.push(err.path);
                    });

                    res.status(400);
                    res.json(responseObj);
                }
            });

    }
}