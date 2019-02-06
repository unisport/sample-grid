const fs = require ('fs');
const fetch = require('node-fetch');
var arraySort = require('array-sort');


module.exports = function (app) {

app.get('/', function (req, res) {


   fetch('https://www.unisport.dk/api/products/batch/?list=179249,179838,174351,180011,180020,178429')
    .then(res => res.json()
        
        
        ).then(json =>
            {
                let products = json;
                

                res.render('pages/index', { data: products});
            });
        
        
        
    });

    // ================================================================


};
