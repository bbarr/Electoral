var Electoral = {};

Electoral.Election = function() {
	this.candidates = [];
}

Electoral.Election.prototype = {
	
	nominate: function(candidate) {

		if ( !(candidate instanceof Electoral.Candidate) ) {
			candidate = new Electoral.Candidate(candidate);
		}

		this.candidates.push(candidate);
	},

	drop: function(name) {
	
		var candidates = this.candidates,
		    len = candidates.length,
		    i = 0,
		    candidate;

		if (name instanceof Electoral.Candidate) {
			name = name.name;
		}

		for (; i < len; i++) {
			candidate = candidates[i];
			if (candidate.name === name) {
				candidates.splice(i, 1);
				return true;
			}
		}

		return false;
	}
}