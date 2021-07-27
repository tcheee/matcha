function transformIdToArray(object, column_name) {
    var array = [];
    for (i in object) {
        let data = {
            target: object[i][column_name],
        }
        if (column_name === "case") {
            data.room = object[i]['room']
        }
        array[i] = data
    }
    return (array);
}

module.exports = transformIdToArray;