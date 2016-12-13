var http = require('http');
var express = require('express');
//var mongodb = require('mongodb');
var utility = require('./utility');
var port = process.env.port || 1337;
var app = new express();
http.createServer(app).listen(port, function () {
    console.log("Express server started");
});

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

app.get("/", function (req, res) {

    res.end("Welcome... we are not exposing all the apis...Contact to admin to get the list");
})
    //get trains
app.get("/trains", function (req, res) {
    var filters = JSON.parse(req.query["erail"]);
    filters.stnfrom = filters.stnfrom.substring(filters.stnfrom.indexOf("(") + 1, filters.stnfrom.indexOf(")"));
    filters.stnto = filters.stnto.substring(filters.stnto.indexOf("(") + 1, filters.stnto.indexOf(")"));
    var url = utility.format("{0}/trains/?key={1}&stnfrom={2}&stnto={3}&datefrom={4}", utility.config.BaseUrl, utility.config.Key, filters.stnfrom, filters.stnto, filters.date);
    utility.getData(url, function (r) {
        res.end(r);
    });
});
    //get stations
app.get("/stations", function (req, res) {
    var url = utility.format("{0}/stations/?key={1}", utility.config.BaseUrl, utility.config.Key);
    utility.getData(url, function (r) {
        res.end(r);
    });
});

app.get("/routes", function (request, response) {
    var filters = JSON.parse(request.query["erail"]);
    var url = utility.format("{0}/route/?key={1}&trainno={2}", utility.config.BaseUrl, utility.config.Key, filters.trainno);
    utility.getData(url, function (r) {
        if(r!="")
            response.end(r);
        response.end({"Status":"ok","result":"No Data"})
    });
})

app.get("/fullroutes", function (request, response) {
    var filters = JSON.parse(request.query["erail"]);
    var url = utility.format("{0}/fullroute/?key={1}&trainno={2}", utility.config.BaseUrl, utility.config.Key, filters.trainno);
    utility.getData(url, function (r) {
        if (r != "")
            response.end(r);
        response.end({ "Status": "ok", "result": "No Data" })
    });
})

app.get("/pnrstatus", function (request, response) {
    var filters = JSON.parse(request.query["erail"]);
    var url = utility.format("{0}/pnr/?key={1}&pnr={2}", utility.config.BaseUrl, utility.config.Key, filters.pnr);
    utility.getData(url, function (r) {
        if (r != "") {
            response.end(r);
        }
    });
})

app.get("/fare", function (request, response) {
    var filters = JSON.parse(request.query["erail"]);
    var url = utility.format("{0}/fare/?key={1}&trainno={2}&stnfrom={3}&stnto={4}&age={5}&quota={6}&class={7}&date={8}",
                            utility.config.BaseUrl,
                            utility.config.Key,
                            filters.trainno,
                            filters.stnfrom,
                            filters.stnto,
                            filters.age,
                            filters.quota,
                            filters.class,
                            filters.date
                            );
    utility.getData(url, function (r) {
        if (r != "")
            response.end(r);
        response.end({ "Status": "ok", "result": "No Data" })
    });
})

app.get("/livestatus", function (request, response) {
    var filters = JSON.parse(request.query["erail"]);
    var url = utility.format("{0}/live/?key={1}&trainno={2}&stnfrom={3}&date={4}",
                              utility.config.BaseUrl,
                              utility.config.Key,
                              filters.trainno,
                              filters.stnfrom,
                              filters.date
                              );
    utility.getData(url, function (r) {
        if (r != "")
            response.end(r);
        response.end({ "Status": "ok", "result": "No Data" })
    });
})

app.get("/seats", function (request, response) {
    var filters = JSON.parse(request.query["erail"]);
    filters.stnfrom = filters.stnfrom.substring(filters.stnfrom.indexOf("(") + 1, filters.stnfrom.indexOf(")"));
    filters.stnto = filters.stnto.substring(filters.stnto.indexOf("(") + 1, filters.stnto.indexOf(")"));
    var url = utility.format("{0}/seats/?key={1}&trainno={2}&stnfrom={3}&stnto={4}&quota={5}&class={6}&date={7}",
                              utility.config.BaseUrl,
                              utility.config.Key,
                              filters.trainno,
                              filters.stnfrom,
                              filters.stnto,
                              filters.quota,
                              filters.class,
                              filters.date
                              );
    utility.getData(url, function (r) {
        if (r != "")
            response.end(r);
        response.end({ "Status": "ok", "result": "No Data" })
    });
})


