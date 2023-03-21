const logService = require("../services/logService");

const getLogsByMetaId = async (req, res) => {
    const {metaId, startTime, endTime} = req.params;

    try {
        const data = await logService.getLogsByMetaId(metaId, startTime, endTime);

        res.status(200).send({ status: "OK", "meta_id": meta_id });
    }
    catch(error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}