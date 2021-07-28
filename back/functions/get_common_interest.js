function get_common_interest(interests1, interests2) {
    return new Promise(async (resolve, reject) => {
        try {
            let k = 0
            const array1 = interests1.split(",")
            const array2 = interests2.split(",")
            for (var i = 0; i < array1.length; i++) {
                for (var j = 0; j < array2.length; j++) {
                  if (array1[i] === array2[j]) {
                    k++;
                  }
                }
            }
            console.log(array1)
            console.log(array2)
            console.log(k)
            resolve (k);
        } catch (err) {
            console.error(err);
            reject(err)
          }

    })
}

module.exports = get_common_interest;