const request = require('request');
const convert = require('xml-js');
const fs =  require('fs');
const jsonexport = require('jsonexport')

//여기서부터 지역코드 나열 
var Seoul = [11110,11140,11170,11200,11215,11230,11260,11290,11305,11320,11350,11380,11410,11440,11470,11500,11530,11545,11560,11590,11620,11650,11680,11710,11740]
var Busan = [26110,26140,26170,26200,26230,26260,26290,26320,26350,26380,26410,26440,26470,26500,26530,26710]
var Daegu = [27110,27140,27170,27200,27230,27260,27290,27710]
var Incheon = [28110,28140,28177,28185,28200,28237,28245,28260,28710,28720]
var Gwangju = [29110,29140,29155,29170,29200]
var Daejeon = [30110,30140,30170,30200,30230]
var Ulsan = [31110,31140,31170,31200,31710]
var Gyeonggi = [41111,41113,41115,41117,41131,41133,41135,41150,41171,41173,41190,41210,41220,41250,41271,41273,41281,41285,41287,41290,41310,41360,41370,41390,41410,41430,41450,41461,41463,41465,41480,41500,41550,41570,41590,41610,41630,41650,41670,41800,41820,41830]
var Gangwon = [42110,42130,42150,42170,42190,42210,42230,42720,42730,42750,42760,42770,42780,42790,42800,42810,42820,42830]
var Chungbuk = [43111,43112,43113,43114,43130,43150,43720,43730,43740,43745,43750,43760,43770,43800]
var Chungnam = [44131,44133,44150,44180,44200,44210,44230,44250,44270,44710,44760,44770,44790,44800,44810,44825]
var Jeonbuk = [45111,45113,45130,45140,45180,45190,45210,45710,45720,45730,45740,45750,45770,45790,45800]
var Jeonnam = [46110,46130,46150,46170,46230,46710,46720,46730,46770,46780,46790,46800,46810,46820,46830,46840,46860,46870,46880,46890,46900,46910]
var Gyeongbuk = [47111,47113,47130,47150,47170,47190,47210,47230,47250,47280,47290,47720,47730,47750,47760,47770,47820,47830,47840,47850,47900,47920,47930,47940]
var Gyeongnam = [48121,48123,48125,48127,48129,48170,48220,48240,48250,48270,48310,48330,48720,48730,48740,48820,48840,48850,48860,48870,48880,48890]
var Jeju = [50110,50130]
var Sejong = [36110]


var regionn = ["Seoul","Busan", "Daegu", "Incheon", "Gwangju", "Daejeon", "Ulsan", "Gyeonggi", "Gangwon", "Chungbuk", "Chungnam", "Jeonbuk", "Jeonnam", "Gyeongbuk", "Gyeongnam", "Jeju", "Sejong"];
var arr = [Seoul, Busan, Daegu, Incheon, Gwangju, Daejeon, Ulsan, Gyeonggi, Gangwon,Chungbuk, Chungnam, Jeonbuk, Jeonnam, Gyeongbuk,Gyeongnam, Jeju, Sejong]
var yearr = ["06", "07", "08", "09", "10", "11", "12", "13", "14", "15", "16","17", "18", "19"];
var monthh = ["01", "02","03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
var delay = 1
for(var r = 0 ; r<regionn.length;r++){
    var region = regionn[r];
    for(var c = 0 ; c<arr[r].length ; c++){
        var citycode = arr[r][c];
        for(var y = 0 ; y<yearr.length ; y++){
            var year = yearr[y];
            for(var m = 0 ; m<monthh.length ; m++){
                var month = monthh[m];
                if(year =="19" && month=="09"){
                    break;
                }        
                delay+=1;
                (function(cnt, month, year, citycode, region) {
                    setTimeout(function() {
                            var url = `http://openapi.molit.go.kr/OpenAPI_ToolInstallPackage/service/rest/RTMSOBJSvc/getRTMSDataSvcAptTradeDev?serviceKey=&pageNo=1&numOfRows=1000&LAWD_CD=${citycode}&DEAL_YMD=20${year}${month}`
                            request.get(url, (err, res, body)=>{
                                    if(err){
                                        console.log(`err => ${err}`)
                                        return;
                                    }
                                    else {
                                        if(res.statusCode == 200){  
                                            var result = body
                                            if(result.length>0){
                                                var xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
                                                var jsonobject = JSON.parse(xmlToJson);
                                                jsonexport(jsonobject["response"]["body"]["items"]["item"],function(err, csv){
                                                    if(err) {
                                                        console.log(err);
                                                        return;
                                                    }
                                                    var csvfile = csv;
                                                    fs.writeFile(`./${region}/20${year}${month}-${citycode}.csv`, csvfile, 'utf-8',   function(err){
                                                        if(err) {
                                                            console.log(err);
                                                            return;
                                                        }
                                                        console.log(`${region}-20${year}${month}.-${citycode}csv is saved`);
                                                })  
                                            });
                                        }
                                    }
                                }
                            }
                        )
                    }, cnt*600);
                })(delay, month, year, citycode, region);                
            }
        }
    }
}