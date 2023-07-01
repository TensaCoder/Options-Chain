const eventSource = new EventSource("http://localhost:9011")
function updateMessage(message) {
    //send this message to client
}

eventSource.onmessage = function (event) {
    console.log(event.data);
    updateMessage(event.data);
}

eventSource.onerror = function () {
    updateMessage("EventSource failed.");
    eventSource.close();
}
