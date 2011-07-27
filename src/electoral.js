var Electoral = {

	nominate: function(obj, options) {
		var candidate = new Electoral.Candidate(options);
		for (var key in candidate) obj[key] = candidate[key];
		return obj;
	}
}