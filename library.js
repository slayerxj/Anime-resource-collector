var formatAliases = ["Blu-ray", "bd", "bdrip", "blu"];
var completeAliases = ["完", "合集", "全"];
var subtitleProviders = ["澄空学园", "华盟字幕社", "漫游字幕组", "雪飄工作室", "雪飘工作室", "千夏"];
var works = [
	["Sword Art Online"],
    ["ニセコイ", "伪恋", "Nisekoi"],
    ["干物妹！うまるちゃん", "干物妹", "Himouto"],
    ["監獄学園", "监狱学园", "Prison_School", "Prison School"],
    ["境界のRINNE", "境界之轮回", "Kyoukai no Rinne"],
    ["食戟のソーマ", "食戟之灵", "Shokugeki"],
    ["Working", "迷糊餐厅", "迷糊餐廳"],
	["響け！ユーフォニアム", "Sound!Euphonium", "吹响吧！悠风号"],
    ["マクロス", "Macross"],
    ["Charlotte", "夏洛特"],
    ["3月のライオン", "3月的狮子"],
    ["少女たちは荒野を目指す", "少女们向荒野进发", "Girls Beyond the Wasteland"],
    ["暦物語", "历物语"],
    ["やはり俺の青春ラブコメはまちがっている", "我的青春恋爱物语果然有问题", "Yahari Ore no Seishun Love Come wa Machigatteiru"],
    ["ヘヴィーオブジェクト", "重裝武器", "Heavy Object"],
    ["昭和元禄落語心中", "昭和元禄落语心中"],
    ["無彩限のファントム・ワールド", "無彩限的幻靈世界", "無彩限的幻影世界", "无彩限的幻灵世界", "无彩限的怪异世界"]
];

module.exports = {
	getUnifiedName: function (name) {
		for (var i = 0; i < works.length; i++) {
            if (works[i].some(function (alias) {
				return (name.toUpperCase() === alias.toUpperCase());
			})) {
				return works[i][0];
			}
        }
	},
    
    getPreferedWorks: function () {
        return works.map(function(workNames){
            return workNames[0];
        })
	},

	getWorkNames: function () {
		if (!this.allWorkNames) {
			this.allWorkNames = works.reduce(function (previousValue, currentValue, index, array) {
				return previousValue.concat(currentValue);
			}, []);
		}
		
		return this.allWorkNames;
	},

	getFormatAliases: function () {
		return formatAliases.slice();
	},

	getCompleteAliases: function () {
		return completeAliases.slice();
	},

	getSubtitleProviders: function () {
		return subtitleProviders.slice();
	}
};