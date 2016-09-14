var readLine = require('readline');
var https = require('https');

read();

function read() {
    var rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
    });
    rl.prompt();

    rl.on('line', function(line) {
        var word = line.trim();
        if(word == null) {
            console.log('write something, please');
            rl.prompt();
        }
        search(word);
    }).on('close', function() {
        console.log('thank you');
        process.exit(0);
    });
}

function search(word) {
    var url = `https://ja.wikipedia.org/w/api.php?format=json&action=query&prop=revisions&titles=${encodeURI(word)}&rvprop=content`;
    https.get(url, function(res) {
        var body = '';
        res.setEncoding('utf8');

        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function(){
            var bodyJson = JSON.parse(body);
            console.log(bodyJson.query);
        });


    }).on('error', function(e){
        console.log('Got a error:',e.message);
    });
}
