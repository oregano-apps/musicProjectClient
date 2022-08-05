exports.getNewRoomData = (newData, setCode, setTitle) => {
    setCode(newData.code)
    setTitle(newData.roomName)
}

exports.userJoinedTheParty = (user, connectedUser, setConnectedUsers) => {
    setConnectedUsers([...connectedUser, user])
}