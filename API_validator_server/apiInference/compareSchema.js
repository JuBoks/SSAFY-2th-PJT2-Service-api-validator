const isEmpty = (object) => {
  return Object.keys(object).length === 0;
};

const compareRootSchema = (source, criteria) => {
  const primitiveSet = new Set(["string", "number", "null", "boolean"]);
  
  const compareSchema = (data_1, data_2, key, score) => {
    let changes = {};

    // 1. 둘 다 Array일 때
    // 있어도 되고 없어도 된다.
    // 다만, 있는 것들끼리는 일치해야한다.
    if (Array.isArray(data_1) && Array.isArray(data_2)) {

      const all_changes= [];

      data_1.forEach((el) => {
        //기본 자료형일 때
        if(primitiveSet.has(el)) {
          if(!data_2.includes(el)) {
//            all_changes.push([el, null]);
            all_changes.push({afterfekjweklfl : el, beforeklfalkwe : null});
            //changes[key] = [el, null];
          }
        }
        //object 일 때
        else {
          let final_changes = {};
          let min_score = Number.MAX_SAFE_INTEGER;

          for(let i = 0; i<data_2.length; i++){
            const answer = data_2[i];
            
            //형식 맞는지 확인
            let [changes1, score1] = compareSchema(source[el], criteria[answer], el, score);

            //맞으면 break
            if(Object.keys(changes1).length === 0) {
              break;
            }
            //틀렸으면 changes 가 존재
            else {
              if(score1 < min_score) {
                final_changes = changes1;
                min_score = score1;
              }

              //마지막인데 아직 같은 값을 못찾았다? final_changes 도 changes 에 추가
              if(i === data_2.length-1) {
                if(final_changes[el] !== undefined) {
                  let changes_el = final_changes[el];
                  delete final_changes[el];
                  final_changes = Object.assign(final_changes, changes_el);
                }
                score = min_score;
                let object= {};
                object[el] = final_changes;
                //console.log("changes", final_changes);
                
                all_changes.push(object);
              }
            }
          }
        }
      })
      if(all_changes.length > 0) changes[key] = all_changes;

    }
    // 2. 둘 다 Object일 때
    // key가 둘 다 동일한 구성을 가져야하고,
    // value에는 자료형이 써있을텐데, 일치해야한다.
    else if (
      typeof data_1 === "object" &&
      !Array.isArray(data_1) &&
      typeof data_2 === "object" &&
      !Array.isArray(data_2)
    ) {
      const sub_change = {};
      const keys = new Set([...Object.keys(data_1), ...Object.keys(data_2)]);
      for (const sub_key of keys) {
        if (!(sub_key in data_1)) {
          // 1. data_1에 키가 없을 때 (새로운 필드가 생성되었을 때)
          sub_change[sub_key] = {afterfekjweklfl : null, beforeklfalkwe : data_2[sub_key]};
          score += 5;
        } else if (!(sub_key in data_2)) {
          // 2. data_1에만 키가 있을 때 (필드가 삭제되었을 때)
          sub_change[sub_key] = {afterfekjweklfl : data_1[sub_key], beforeklfalkwe : null };
          score += 5; 
        }
        //둘 중 하나라도 원시자료형일 때
        else if(primitiveSet.has(data_1[sub_key]) || primitiveSet.has(data_2[sub_key]) )  {
          //바로 비교
          if(data_1[sub_key] !== data_2[sub_key]) {
            score += 5; 
            sub_change[sub_key]= {afterfekjweklfl : data_1[sub_key], beforeklfalkwe : data_2[sub_key]};
          }
        }
        //둘 다 object일 때
        else {
          const data_type = data_1[sub_key];
          const data_type2 = data_2[sub_key];
          const [result, score1] = compareSchema(source[data_type], criteria[data_type2], data_type, score);
          if(Object.keys(result).length !== 0){
            changes = Object.assign(changes, result);
            score = score1;
          } 
        }
      }
      if (isEmpty(sub_change)) {
        return [changes, score];
      }
      changes[key] = sub_change;
    }
    // 3. 단일 자료형으로 적혀있는데 (문자열로), 서로 다른 형태일때
    else if (typeof data_1 === "string" && typeof data_2 === "string") {
      if (data_1 === data_2) return [changes, score];
      score+=5;
      changes[key] = {afterfekjweklfl : data_1, beforeklfalkwe: data_2};
    } else {
      score+=5;
      changes[key] = {afterfekjweklfl: data_1, beforeklfalkwe: data_2};
    }

    return [changes, score];
  };


  // root부터 검사하기
  const [changes, score] = compareSchema(source["root"], criteria["root"], "root", 0);
  return changes;
};

module.exports = compareRootSchema;
