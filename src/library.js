var formatAliases = ["Blu-ray", "bd", "bdrip", "blu"];
var excluding = ["WEBDL", "DBD-Raws"];
var completeAliases = ["完", "合集", "全"];
var subtitleProviders = ["澄空学园", "华盟字幕社", "漫游字幕组", "雪飄工作室", "雪飘工作室", "千夏"];
var works = [
	["Working", "迷糊餐厅", "迷糊餐廳"],
	["響け！ユーフォニアム", "Sound!Euphonium", "吹响吧！悠风号"],
	["3月のライオン", "3月的狮子"],
	["暦物語", "历物语"],
	["昭和元禄落語心中", "昭和元禄落语心中"],
	["Re:ゼロから始める異世界生活", "从零开始的异世界生活"],
	["小林さんちのメイドラゴン", "小林家的妹抖龙"],
	["この素晴らしい世界に祝福を!", "为美好的世界献上祝福"],
	["政宗くんのリベンジ", "政宗君的复仇"],
	["SEIREN", "清恋"],
	["幼女戦記", "幼女战记"],
	["エロマンガ先生", "情色漫", "黄漫", "Eromanga-sensei"],
	["終末なにしてますか? 忙しいですか? 救ってもらっていいですか?", "末日時", "Shuumatsu Nani Shitemasuka"],
	["夏目友人帳" ,"友人帳", "友人帐"],
	["冴えない彼女の育てかた" ,"眼女主", "眼女主"],
	["有頂天家族" , "天家"]
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
		return works.map(function (workNames) {
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
	},

	getExcluding: function () {
		return excluding.slice();
	}
};
