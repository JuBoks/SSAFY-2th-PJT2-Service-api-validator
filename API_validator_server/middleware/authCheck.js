
const authCheck = async(req, res, next) => {
    console.log("authCheck 실행");
    const {chk} = req.query;
    if (chk == 1) {

        next();
    }
    else {
        res
        .status(403)
        .send({ status: "FAILED", data: { error : "cannot access this resource" } });
    }

}

module.exports = {authCheck};

