const logService = require("../services/logService");
const actionService = require("../services/actionService");

const getLogsByMetaId = async (req, res) => {
    const {metaId, startTime, endTime} = req.query;

    if(metaId == null) {
        return res
        .status(400)
        .send({ status: "FAILED", data: { error: "One of the following keys is missing or is empty in request parameter: 'metaId" } });
    }

    try {
        const data = await logService.getLogsByMetaId(metaId, startTime, endTime);

        res.status(200).send({ status: "OK", "data": data });
    }
    catch(error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}


const getLogByResultId = async (req, res) => {
    const {resultId} = req.params;

    if(resultId == null) {
        return res
        .status(400)
        .send({ status: "FAILED", data: { error: "One of the following keys is missing or is empty in request parameter: 'resultId" } });
    }

    try {
        const data = await logService.getLogByResultId(resultId);

        res.status(200).send({ status: "OK", "data": data });
    }
    catch(error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }
}

const getResultByMetaId = async (req, res) => {
    const {metaId} = req.params;
    const {month, week, day, startTime, endTime} = req.query;
    

    let unit = "";
    let cycle = 1;
    if(month !== undefined ) {
        unit = "month";
        cycle = month;
    }
    else if(week !== undefined) {
        unit = "week";
        cycle = week;
    }
    else {
       unit = "day";
        if(day === undefined) cycle = 1; //아무 값도 안들어왔다면 기본 1시간 주기
        else cycle = day;
    }


    if(metaId == null || startTime == null || endTime == null) {
        return res
        .status(400)
        .send({ status: "FAILED", data: { error: "One of the following keys is missing or is empty in request parameter: 'resultId' , 'startTime' , 'endTime' " } });
    }

    try {
        const data = await logService.getResultByMetaId(metaId, unit, cycle, startTime, endTime);

        res.status(200).send({ status: "OK", "data": data });
    }
    catch(error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }

}


const getResultByAction = async (req, res) => {
    const {startTime, endTime} = req.query;

    if(startTime === null || endTime === null) {
        return res
        .status(400)
        .send({ status: "FAILED", data: { error: "One of the following keys is missing or is empty in request parameter: 'startTime' , 'endTime' " } });
    }

    try {
        const data = await actionService.getActionsByDate(startTime, endTime);
        console.log(data);

        res.status(200).send({ status: "OK", "data": data });
    }
    catch(error) {
        res
        .status(error?.status || 500)
        .send({ status: "FAILED", data: { error: error?.message || error } });
    }

}



module.exports = {
    getLogsByMetaId,
    getLogByResultId,
    getResultByMetaId,
    getResultByAction
};