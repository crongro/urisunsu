(function() {
    var jsdom = require('jsdom');
    var mc = require('./mongoConnector.js');

    // Test mongodb connection
    //mc.insertSchedule();
    //mc.removeAllSchedule();
    //mc.getPlayerNames("마인츠");

    //TODO. External file
    var LEAGUE_INFO = ['프리미어리그', '캐피털 원 컵', 'FA컵', '분데스리가','유로파리그','챔피언스리그'];
    var CLUB_INFO   = ['카디프','선덜랜드','레버쿠젠','볼프스부르크','마인츠','아우크스부르크'];
    var BASE_URL    = "http://m.sports.naver.com/worldfootball/schedule/index.nhn?category=worldfootball&date=";

    var result_index = 0;

    var oJSDOM_ENV = {
        //url : "http://m.sports.naver.com/worldfootball/schedule/index.nhn?category=worldfootball&date=20130921",
        url : "",

        //encoding : 'binary',
        scripts: ["http://code.jquery.com/jquery.js"],
        //scripts: ["./jindo.desktop.min.js"],
        done: function (errors, window) {
            var $       = window.jQuery;
            var aDate_year_month = [];

            //2. m.sports.naver.com 
            // 2.1 date
            var sToday = $('div.days3 span.today').text();
            console.log("=======================================================================");
            console.log(sToday); //2013.09.26(목 )
            aDate_year_month= sToday.replace(/(.+)\(.+\)/,'$1').split('.'); //['2013','9','11']

            // 2.2 League
            $('div#ct section div.h2_area h2 span').each(function () {
                var sLeague = $(this).text();

                if ($.inArray(sLeague,LEAGUE_INFO) < 0) return;

                // 2.3 Club 
                $(this).parent().parent('div.h2_area').next('div.ct_wrp').find('ul li').each(function(index) {
                    var sTeam1 = oJSDOM_Utility._getGameText($(this), '.tm_info1 span');
                    var sTeam2 = oJSDOM_Utility._getGameText($(this), '.tm_info2 span');


                    if ($.inArray(sTeam1,CLUB_INFO) < 0 && $.inArray(sTeam2,CLUB_INFO) < 0) return;

                    var sTime = oJSDOM_Utility._getGameText($(this), '.dt_info span');
                    var aDate_result = aDate_year_month.concat(sTime.split(':')).concat([00]);  //[ '2013', '9', '14', '23', '00', 0 ]

                    oJSDOM_Utility.maketoDBData(aDate_result,sLeague,sTeam1, sTeam2, result_index);

                });
            });
        }
    } //end : oJSDOM_ENV

    var oJSDOM_Utility = {
        _getGameText : function(ctx, ur_selector) {
                return ctx.find(ur_selector).text().trim();
        },
        maketoDBData : function(aDate , sLeague , sClub1, sClub2, dummyIndex) {
            var jsonResult = null; 
            var sClubs = sClub1 +  " vs " + sClub2;
            var matchDate = this._getDateType.apply(null, aDate.map(function(v,i,arr){ return +v; }));  //Mon Oct 14 2013 22:30:00 GMT+0900 (KST)

            console.log('matchDate' , matchDate);

            var jsonResult = {
                                   'dummyIndex' : dummyIndex ,  // NUMBER 
                                   'matchDate'  : matchDate ,   // DATE 
                                   'matchClubs' : sClubs,       // STRING
                                   'league'     : sLeague,      // STRING
                                   'type'       : "soccer"
                             }

            mc.findPlayerNames(sClub1,sClub2, jsonResult, this._insertDBData);
            //mc.getPlayerNames(sClub2, jsonResult);

        },
        _getDateType : function() {
            return new Date(arguments[0],arguments[1]-1,arguments[2],arguments[3],arguments[4],00);  //arguments[1]-1 : for month calculating
        },
        _insertDBData : function (jsonResult) {
            console.log("jsonResult", jsonResult);
            mc.insertSchedule(jsonResult);
        }

    }

    var oDate = {
        getDateCusFormat : function(input) {
            //var result = input.getFullYear()+""+input.getMonth() +""+input.getDate();
            var oriMonth = ""+(input.getMonth()+1);  //2013912 . string
            var daMonth = (oriMonth.length == 1) ? 0+oriMonth : oriMonth;  //20130912 .string
            var result = ""+input.getFullYear()+daMonth+input.getDate();
            return result;
        }
    }

    // 현재시간을 구하고, 하루 더 더한 다음 날자(date)를 계산.
    // TODO. 7일 이내의 0702 식으로 값을 만들기 
    function getDateArrayForSearch() {
        var aResult= [];
        var now = new Date();
        for(var i = 0 ; i < 15 ; i++) {
            var newDate = new Date(now.getTime()+(24*60*60*1000*i));
            aResult.push(oDate.getDateCusFormat(newDate));
        }
        return aResult;
    }

    function runSearch() {
        var aDate = getDateArrayForSearch();  //[20130801, 20130802....20130807]
        console.log('aDATE ---->>>>>>> ' + aDate);

        //delete regacy Collection
        mc.removeSchedule();

        //7번 jsdom을 호출한다 
        aDate.forEach(function(value,i,arr) {
            oJSDOM_ENV.url = BASE_URL + value;
            jsdom.env(oJSDOM_ENV);
            oJSDOM_ENV.url = "";
        });
        result_index = 0; //reset 
    }

    runSearch(); 

}());

