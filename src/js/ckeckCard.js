export function checkCard(param, inputNum) {
  for (let key in param) {
    let arr = param[key];
    let result = arr.find(element => inputNum.startsWith(element));
    if (result !== undefined) {
        return key;    
    }
  }
  return null;
}