function Item() {
	this.name = "";
	this.source = "Blu-ray";
	this.resolution = "1080p";
	this.subtitleProvider = "";
	this.url = "";
	this.isNew = true;
	this.publishTime = "";
	this.isComplete = false;
	this.generalRanking = 5; // represent unranked
	// if not complete, the number of chapters
	this.magnetLink = "";
}

Item.prototype.isUnranked = function () {
	return (this.generalRanking === 5);
	// return true;
};

Item.prototype.getKey = function () {
	// Should transfer to magnetLink in the future
	return this.url;
};

Item.prototype.isEqual = function (item) {
	if (this.url && item.url && (this.url === item.url)) {
		return true;
	} else {
		if ((this.name === item.name) &&
			(this.source === item.source) &&
			(this.resolution === item.resolution) &&
			(this.subtitleProvider === item.subtitleProvider) &&
			(this.isComplete === item.isComplete)) {
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
    
    return rankDiff;
};

module.exports = Item;