function Item() {
	this.name = "";
	this.workName = "";
	this.source = "Blu-ray";
	this.resolution = "1080p";
	this.subtitleProvider = "";
	this.url = "";
	this.isNew = true;
	this.publishTime = "";
	this.isComplete = false;
	this.generalRanking = 5; // 5 represent unranked
	// if not complete, the number of chapters
	this.magnetLink = "";
}

Item.prototype.isUnranked = function () {
	return (this.generalRanking === 5);
};

Item.prototype.getKey = function () {
	// Should transfer to magnetLink in the future
	return this.url;
};

Item.prototype.isEqual = function (item) {
	if (this.url && item.url && (this.url === item.url)) {
		if (this.publishTime == item.publishTime) {
			return true;
		}
	}

	return false;
};

Item.initialize = function (record) {
	var item = new Item();
	Object.keys(record).forEach(function (attribute) {
		item[attribute] = record[attribute];
	});
	item.publishTime = new Date(item.publishTime);
	item.isNew = false;
	return item;
};

Item.sort = function (a, b) {
	var rankDiff = (a.generalRanking - b.generalRanking);
	if (rankDiff === 0) {
		return (b.publishTime.getTime() - a.publishTime.getTime());
	} else {
		return rankDiff;
	}
};

module.exports = Item;