const ac = require('../config/access_control');
const axios = require('axios').default;


module.exports = {
    index(req, res) {
        var permission = ac.can(req.user.role);


        axios({
            method: 'get',
            url: `${process.env.API_URL}/RealEstate`,
        })
            .then((retorno) => {

                // console.log(retorno.data.retorno);
                res.locals = { title: 'Imóveis', permission };
                res.render('RealEstate/', { realEstate: retorno.data.retorno });
            })
    },

    findById(req, res) {
        var permission = ac.can(req.user.role);

        axios({
            method: 'get',
            url: `${process.env.API_URL}/RealEstate/${req.params.id}`,
        })
            .then((retorno) => {
                // console.log(retorno.data.retorno);
                res.locals = { title: 'Imóvel', permission };
                res.render('RealEstate/detail', { realEstate: retorno.data.retorno[0], realEstateId: req.params.id });
            })
    },

    storeSolicitation(req, res) {
        var user = ac.can(req.user);
        var data = {
            fromUserId: user._.id,
            realEstateId: req.body.realEstateId
        }

        axios({
            method: 'post',
            url: `${process.env.API_URL}/Solicitation/alternative`,
            data: data
        })
            .then((retorno) => {
                res.status(200).send();
            })
            .catch((retorno) => {
                res.status(500).send();
            })

    }
}