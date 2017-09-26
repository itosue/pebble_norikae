var UI = require('ui');

//発駅と着駅を設定してURLエンコード
//駅名はjorudanの乗換案内で検索した時に補完候補で出てくる名前で入力してください
var strFromSta="高槻";	//発駅
var strToSta="千早";	//着駅
var utf8strFromSta = encodeURIComponent(strFromSta);
var utf8strToSta = encodeURIComponent(strToSta);

//URLに埋め込む日付をパース
var today = new Date();
today.setMinutes(today.getMinutes() + 1);
var y=''+today.getFullYear();
var m=today.getMonth()+1;
m=m<10?'0'+m:''+m;
var d=today.getDate();
var hh=today.getHours();
var mm=today.getMinutes();
mm=mm<10?'0'+mm:''+mm;
var m1=mm[0];
var m2=mm[1];

var datetime1 = '';
var datetime2 = '';

var ajax = require('ajax');

var col1 = 'Blue';
var col2 = 'Blue';

//URLを作成して実行→結果からデータ取り出し
var url = 'http://www.jorudan.co.jp/norikae/cgi/nori.cgi?eki1='+utf8strFromSta+'&eki2='+utf8strToSta+'&eki3=&via_on=1&Dym='+y+m+'&Ddd='+d+'&Dhh='+hh+'&Dmn1='+m1+'&Dmn2='+m2+'&Cway=0&Cfp=1&C7=1&C2=0&C3=0&C1=0&C4=0&C6=2&S.x=44&S.y=9&S=%E6%A4%9C%E7%B4%A2&Cmap1=&rf=nr&pg=0&eok1=&eok2=&eok3=&Csg=1';
// console.log(url);
ajax({ url: url }, function(data){
	//console.log('test1'+data);
	
	// 電車の種類で色を変える時はここで指定
	if ( data.match(/新快速/) || data.match(/みずほ/)){
		col1='Red';
	}
	
	var j = data.match(/<div class="_time">(.*?)<\/div>/)[1];
	j=j.replace(/\d+\/\d+/g,'');
	j=j.replace(/\D/ig,'');
	datetime1='\n'+j[0]+j[1]+':'+j[2]+j[3]+'-'+j[4]+j[5]+':'+j[6]+j[7];
	
	
	//以下同様に次の列車を検索
	var ndate=new Date(y,m-1,d,j[0]+j[1],j[2]+j[3]);
	ndate.setMinutes(ndate.getMinutes()+1);

	var ny=''+ndate.getFullYear();
	var nm=today.getMonth()+1;
	nm=nm<10?'0'+nm:''+nm;
	var nd=today.getDate();				
	var nhh=ndate.getHours();
	var nmm=ndate.getMinutes();
	nmm=nmm<10?'0'+nmm:''+nmm;
	var nm1=nmm[0];
	var nm2=nmm[1];

	var nurl = 'http://www.jorudan.co.jp/norikae/cgi/nori.cgi?eki1='+utf8strFromSta+'&eki2='+utf8strToSta+'&eki3=&via_on=1&Dym='+ny+nm+'&Ddd='+nd+'&Dhh='+nhh+'&Dmn1='+nm1+'&Dmn2='+nm2+'&Cway=0&Cfp=1&C7=1&C2=0&C3=0&C1=0&C4=0&C6=2&S.x=44&S.y=9&S=%E6%A4%9C%E7%B4%A2&Cmap1=&rf=nr&pg=0&eok1=&eok2=&eok3=&Csg=1';
	ajax({ url: nurl }, function(data){ 
		// 電車の種類で色を変える時はここで指定
		if ( data.match(/新快速/) || data.match(/みずほ/)) {
			col2='Red';
		}
		var j = data.match(/<div class="_time">(.*?)<\/div>/)[1];
		j=j.replace(/\d+\/\d+/g,'');
		j=j.replace(/\D/ig,'');

		datetime2='\nnext\n'+j[0]+j[1]+':'+j[2]+j[3]+'-'+j[4]+j[5]+':'+j[6]+j[7];
	
	
		var main = new UI.Card({
			title: datetime1,
			subtitle: '',
			body: datetime2,
			titleColor: col1,
			subtitleColor: 'indigo', // Named colors
			bodyColor: col2 // Hex colors
		});

		main.show();	
	
	
	});
	

	
	
});



