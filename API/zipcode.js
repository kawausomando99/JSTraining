'use strict'

const fs = require('fs');
const http = require('http');

console.log('郵便番号を入力して ctrl + D')
const input = fs.readFileSync('/dev/stdin', 'utf8');
getAdrresJson(input);

function getAdrresJson(zipcode) {
    const url = 'http://zipcloud.ibsnet.co.jp/api/search?zipcode=' + zipcode;
    http.get(url, function(res) {

        let body = '';
        res.setEncoding('utf8');

        res.on('data', function(chunk) {
            body += chunk;
        });

        res.on('end', function() {
            const addressJson = JSON.parse(body);
            addressJson.results.forEach((result) => {
                console.log(result.address1,result.address2,result.address3);
            });
        });

    }).on('error', function(e) {
        console.log(e.message);
    });
};
