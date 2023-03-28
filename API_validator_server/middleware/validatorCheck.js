const {validationResult} = require("express-validator");

const validationCheck = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const error_body =  new Set([]);
        const error_params = new Set([]);
        const error_query = new Set([]);
        errors.array().forEach(element => {
            if(element.location === 'body') {
                error_body.add(element.param);
            }
            else if(element.location === 'params') {
                error_params.add(element.param);
            }
            else if(element.location === 'query'){
                error_query.add(element.param)
            }
        })

        const error_msg = [];
        
        if(error_body.size > 0) error_msg.push(`One of the following keys is missing or is empty in request body: ${Array.from(error_body).join(', ')}`);
        if(error_params.size > 0) error_msg.push(`One of the following keys is missing or is empty in request path variable: ${Array.from(error_params).join(', ')}`);
        if(error_query.size > 0) error_msg.push(`One of the following keys is missing or is empty in request query: ${Array.from(error_query).join(', ')}`);

        return res.status(400).send({ "status" : "FAILED" , data: {error : error_msg.length==1? error_msg[0] : error_msg } });
    }
    else next();
  }


module.exports = {validationCheck};