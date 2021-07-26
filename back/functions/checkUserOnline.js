function checkUserOnline(clientObject, mail) {
    return (clientObject[mail] ? true : false);
}

module.exports= checkUserOnline;