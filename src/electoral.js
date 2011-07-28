var Electoral = {

	_generate_id: function() {
		var _id = 0;
		return function() {
			return (_id++).toString();
		}
	}(),

	_confirm_instance_of: function(should, is) {
		if ( !(is instanceof should) ) {
			throw new Error(is.toString() + ' should have been an instance of ' + should.toString());
		}
	}
};

Electoral.Election = function() {
	this.candidates = [];
	this.id = Electoral._generate_id();
}

Electoral.Election.prototype = {
	
	nominate: function(candidate) {
		Electoral._confirm_instance_of(Electoral.Candidate, candidate);
		this.candidates.push(candidate);
	},

	drop: function(id) {
	
		var candidates = this.candidates,
		    len = candidates.length,
		    i = 0,
		    candidate;

		if (id instanceof Electoral.Candidate) {
			id = id.id;
		}

		for (; i < len; i++) {
			candidate = candidates[i];
			if (candidate.id === id) {
				candidates.splice(i, 1);
				return true;
			}
		}

		return false;
	},

	find: function(id) {
		
		var candidates = this.candidates,
		    len = candidates.length,
		    i = 0,
		    candidate;

		if (id instanceof Electoral.Candidate) {
			id = id.id;
		}

		for (; i < len; i++) {
			candidate = candidates[i];
			if (candidate.id === id) {
				return candidate;
			}
		}

		return false;
	}
}

Electoral.Candidate = function() {
	this.votes = [];
	this.id = Electoral._generate_id();
}

Electoral.Candidate.prototype = {

	receive: function(vote) {
		Electoral._confirm_instance_of(Electoral.Vote, vote);
		this.votes.push(vote);
	},

	strike: function(vote_id) {
		
		var votes = this.votes,
		    len = votes.length,
		    i = 0,
		    vote;

		if (vote_id instanceof Electoral.Vote) {
			vote_id = vote_id.id;
		}

		for (; i < len; i++) {
			vote = votes[i];
			if (vote.id == vote_id) {
				this[ (vote.value) ? 'ups' : 'downs']--;
				votes.splice(i, 1);
				return true;
			}
		}

		return false;
	},

	reduce: function(fn) {},

	average: function() {
		
		var votes = this.votes,
		    len = votes.length,
		    i = 0,
		    vote,
		    average = 0;

		for (; i < len; i++) {
			vote = votes[i];
			average += vote.value;
		}

		return Math.floor((average / len) * 100) / 100;
	}
};

Electoral.Vote = function(value, meta) {
	
	this.value = value;
	this.id = Electoral._generate_id();
	
	for (var key in meta) this[key] = meta[key];	
}

Electoral.Vote.prototype = {};