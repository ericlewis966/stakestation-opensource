export const removeNonObjectItemsFromArray = (array) => {
    var resultArray = [];

    for (var i = 0; i < array.length; i++) {
        if(typeof array[i] === 'object') {
            resultArray.push(array[i]);
        }
    }

    return resultArray;
}