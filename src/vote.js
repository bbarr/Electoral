Electoral.Vote = function(value, meta) {

	for (var key in meta) this[key] = meta[key];

	this.value = value;
	this.id = this._generate_id();
}

Electoral.Vote._count = 0;

Electoral.Vote.prototype = {
	
	_generate_id: function() {
		return (Electoral.Vote._count++).toString();
	}	
};