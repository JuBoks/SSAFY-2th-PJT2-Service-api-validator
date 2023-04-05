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
                        nowKey = Object.keys(el)[0];
                        let array_location = location+` -> ${nowKey}`;
                        dfs(nowKey, el[nowKey], array_location);
                    })
                    return;
                }
                else if(nowData.length == 2){
                    if(nowData[0] === null) {
                        errorCode = 1;
                        detail = `(type : ${nowData[1]})`;
                    }
                    else if(nowData[1] === null) {
                        errorCode = 0;
                        detail = `(type : ${nowData[0]})`;
                    }
                    else {
                        errorCode = 2;
                        detail = `(before type : ${nowData[1]} , after type : ${nowData[0]})`;
                    }

                    element.location = location;
                    element.errorCode = errorCode; 
                    element.detail = detail;

                    data.push(element);
                }
            }
            //아님 객체일 때
            else if(typeof nowData === "object") {

                for(let key of Object.keys(nowData)) {
                    let object_location = location+` -> ${key}`;
                    dfs(key, nowData[key], object_location);
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