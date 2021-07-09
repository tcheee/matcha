module.exports = (io) => {
    const printMessage = function (data) {
        console.log(data);
      }

    return {
        printMessage
    }
  }