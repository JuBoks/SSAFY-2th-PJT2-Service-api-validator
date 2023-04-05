const analyzeErrorMessage = (errorMessage) => {
    const data = [];

    const dfs = ( key, nowData, location ) => {
        let element = {};
        let detail = "";
        let errorCode = -1;

        let nowKey = key;

            if(Array.isArray(nowData)) {
                //nowData 배열 안의 요소들이 객체일 때
                if(typeof nowData[0] === "object" && nowData[0] !== null) {
                    nowData.forEach((el) => {

                        if(Object.keys(el).includes("afterfekjweklfl") && Object.keys(el).includes("beforeklfalkwe")) {
                            let bef_value = el["beforeklfalkwe"];
                            let aft_value = el["afterfekjweklfl"];
                            if(typeof bef_value === "object" && bef_value !== null) bef_value = JSON.stringify(bef_value);
                            if(typeof aft_value === "object" && aft_value !== null) aft_value = JSON.stringify(aft_value);
        
                            if(aft_value === null || aft_value === "null") {
                                errorCode = 1;
                                detail = `(type : ${bef_value})`;
                            }
                            else if(bef_value === null) {
                                errorCode = 0;
                                detail = `(type : ${aft_value})`;
                            }
                            else {
                                errorCode = 2;
                                detail = `(before type : ${bef_value} , after type : ${aft_value})`;
                            }
        
                            element.location = location;
                            element.errorCode = errorCode; 
                            element.detail = detail;
        
                            data.push(element);
                        }
                        else {
                            nowKey = Object.keys(el)[0];
                            let array_location = location+` -> ${nowKey}`;
                            dfs(nowKey, el[nowKey], array_location);
                        }
                    })
                    return;
                }
            }
            //아님 객체일 때
            else if(typeof nowData === "object" && nowData !== undefined) {

                if(Object.keys(nowData).includes("afterfekjweklfl") && Object.keys(nowData).includes("beforeklfalkwe")) {
                    let bef_value = nowData["beforeklfalkwe"];
                    let aft_value = nowData["afterfekjweklfl"];
                    if(typeof bef_value === "object" && bef_value !== null) bef_value = JSON.stringify(bef_value);
                    if(typeof aft_value === "object" && aft_value !== null) aft_value = JSON.stringify(aft_value);

                    if(aft_value === null || aft_value === "null") {
                        errorCode = 1;
                        detail = `(type : ${bef_value})`;
                    }
                    else if(bef_value === null) {
                        errorCode = 0;
                        detail = `(type : ${aft_value})`;
                    }
                    else {
                        errorCode = 2;
                        detail = `(before type : ${bef_value} , after type : ${aft_value})`;
                    }

                    element.location = location;
                    element.errorCode = errorCode; 
                    element.detail = detail;

                    data.push(element);
                }
                else {

                    for(let key of Object.keys(nowData)) {
                        let object_location = location+` -> ${key}`;
                        dfs(key, nowData[key], object_location);
                    }
                }

            }

        return [element, location, errorCode];
    }
    

    for(let key of Object.keys(errorMessage)) {
        let location = `${key}`;
        //errorCode 는 0 은 add, 1 은 delete, 2 는 change
        let nowData = errorMessage[key];

        dfs(key, nowData, location);

    }

    return data;
}

module.exports = analyzeErrorMessage;