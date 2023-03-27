require("dotenv").config();

const authCheck = async(req, res, next) => {

    const chk = req.get('chk');
    
    if (chk === process.env.CHECK ) {
        next();
    }
    else {
        res
        .status(403)
        .send({ status: "FAILED", data: { error : "cannot access this resource" } });
    }

}

module.exports = {authCheck};

