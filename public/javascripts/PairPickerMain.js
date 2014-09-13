

_oUtil = {
	$ : function(query) {
		return document.querySelector(query);
	},

	$$ : function(query) {
		return document.querySelectorAll(query);
	},

	trim : function(str) {
		return str.replace(/^\s+|\s+$/g, '');
	},

	getArrayFromNodeList : function (nList) {
		return Array.prototype.slice.call(nList);
	},

	getUniqueRandom : function(len) { 
		var aMem = [];
		function _getRandomNumber(len) {
			var rn = Math.floor(Math.random()*len);
			if(aMem.indexOf(rn) > -1) { 
				rn = arguments.callee(len);
			}
			return rn;
		}
		for(var i=0 ; i < len ; i++) {
			aMem.push(_getRandomNumber(len));
		}
		return aMem;
	}
};


(function() {

	var _ = _oUtil;

	var elNameBox 		= null;
	var elTemplatStr1 	= null; 
	var elUL 			= null;
	var elPlusButton 	= null;
	var elBoard 		= null;
	var elShuffle 		= null;
	var elNameList 		= null;
        var socket = null;

	function makeHTMLString(str) {
		var sBaseHTML = elTemplatStr1.innerHTML;
		var sResult = sBaseHTML.replace(/\<\%\=name\%\>/g, str);
		return sResult;
	}

	function insertHTMLString(str) {
		var elBase = elUL;
		elBase.insertAdjacentHTML("afterbegin" , str);
	}

	function isRightValue(sPre) {
		return (sPre.length !== 0 && checkDup(sPre));
	}

	function getAllPeopleList() {
		var elNameList = _.$$("#board > ul > li > div:first-child");
		var aElNameList = _.getArrayFromNodeList(elNameList);
		return aElNameList;
	}

	function checkDup(sPre) {
		var aElNameList = getAllPeopleList();
		var bResult = aElNameList.every(function(v,i,o) {
			var str = _.trim(v.innerText);
			var str2 = _.trim(sPre);
			return (str !== str2);
		});
		return bResult;
	}

	function _addNameHandler() {
		var sPre = elNameBox.value;

                //socket: emit.
                socket.emit('name message', sPre);

		if(!isRightValue(sPre)) return;

		var sSet = makeHTMLString(sPre);
		insertHTMLString(sSet);
	}

	function _removeLiNodeHandler(el) {
		var elLi = el.parentNode;
		var elUl = elLi.parentNode;
		elUl.removeChild(elLi);
	}

	function setInitVariables() {
		elNameBox       = _.$('#nameBox');
		elTemplatStr1 	= _.$('#_myTS1');
		elUL 	        = _.$('#board > ul');
		elPlusButton 	= _.$('#adder > div')
		elBoard	        = _.$('#board');
		elShuffle       = _.$('#shuffleButton');
                socket          = io();
		//aElNameList 	= _.getArrayFromNodeList(_.$$("#board > ul > li > div:first-child"));
	}


	function assignCoupleString() {
		var aElNameList = getAllPeopleList();
		var aNameList = [];
		var str = "<span>";

		//문자열 배열을 만들고
		var aNameList = aElNameList.map(function(v,i,o) {
			return _.trim(v.innerText);
		});

		//랜덤한 순서로 추출해서
		var len = aNameList.length;
		var aOrderList = _.getUniqueRandom(len)
		for(var i = 0 ; i < len ; i++) {
			var _tempName = aNameList[aOrderList[i]];

			str += _tempName;
			if((i % 2) !== 0) str+="<br/>";
			else str+= ", ";
		}
		str += "</span>";

		return str;
	}


	document.addEventListener("DOMContentLoaded" , function() {

		setInitVariables();

		//bind Handler
		elPlusButton.addEventListener("click", function(e) {
			_addNameHandler();
			//this.value = "";
		},false);

		elBoard.addEventListener("click", function(e) {
			if (e.target.className !== "delName") return;
			_removeLiNodeHandler(e.target);
		},false);

		elNameBox.addEventListener("keydown" , function(e) {
			if(e.keyCode !== 13)  return;
			//this.blur();
			_addNameHandler();
			this.value = "";
                        //prevent form submit
                        e.preventDefault();
		}, false);

		//shuffle
		elShuffle.addEventListener("click" , function(e) {
			//본문에 넣을 문자열을 뽑고
			var _domstr = assignCoupleString();
			//본문에 넣는다
			_.$('#assignCouple').innerHTML = _domstr;
			//스크롤은 하단으로~
			window.scrollTo(100,document.body.scrollHeight);

		},false);

                //socket
                socket.on('name message', function(msg) {
                    var sSet = makeHTMLString(msg);
                    insertHTMLString(sSet);
                });
	});
})();















