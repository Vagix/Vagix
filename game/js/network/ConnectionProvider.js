function ConnectionProvider() {

}

ConnectionProvider.prototype.connect = function () {
    var ws = new WebSocket('ws://127.0.0.1:25500/nancy');
    ws.onopen = function() { console.log('Connected!'); };
    ws.onclose = function() { console.log('Lost connection'); };
    ws.onmessage = function(msg) { console.log(msg.data); };
};