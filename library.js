var formatAliases = ["Blu-ray", "bd", "bdrip", "blu"];
var completeAliases = ["完", "合集", "全"];
var subtitleProviders = ["澄空学园", "华盟字幕社", "漫游字幕组", "雪飄工作室", "雪飘工作室", "千夏"];
var works = [
	["Sword Art Online"],
    ["ニセコイ", "伪恋", "Nisekoi"],
    ["あの夏で待ってる", "在那个夏天等待", "Ano Natsu"],
    ["失われた未来を求めて", "尋找失去的未來", "寻找遗失的未来", "Ushinawareta"],
    ["干物妹！うまるちゃん", "干物妹", "Himouto"],
    ["監獄学園", "监狱学园", "Prison_School", "Prison School"],
    ["下ネタという概念が存在しない退屈な世界", "沒有黃段子的無聊世界", "下流梗不存在的灰暗世界"],
    ["境界のRINNE", "境界之轮回", "Kyoukai no Rinne"],
    ["城下町のダンデライオン", "城下町的蒲公英", "Joukamachi"],
    ["食戟のソーマ", "食戟之灵", "Shokugeki"],
    ["実は私は", "其实我是", "其實我是", "Jitsu wa Watashi wa"],
    ["Working"],
	["響け！ユーフォニアム", "Sound!Euphonium", "吹响吧！悠风号"],
    ["マクロス"],
    ["3月のライオン", "3月的狮子"],
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