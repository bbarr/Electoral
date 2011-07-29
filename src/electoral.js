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
	},

	_each: function(arr, fn, scope) {	
		
		var len = arr.length,
		    i = 0,
		    scope = scope || this,
		    returned;
	
		for (; i < len; i++) {
			returned = fn.call(scope, arr[i], i);
			if (returned) {
				return returned;
			}
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
		var candidate = this.find(id);
		if (candidate) {
			return this.candidates.splice(candidate._last_known_index, 1);
		}
	},

	find: function(id) {

		if (id instanceof Electoral.Candidate) {
			id = id.id;
		}

		return Electoral._each(this.candidates, function(candidate, i) {
			if (candidate.id === id) {
				candidate._last_known_index = i;
				return candidate;
			}
		});
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
		var vote = this.find(vote_id);
		if (vote) {
			return this.votes.splice(vote._last_known_index)
		}
	},

	find: function(id) {
		
		if (id instanceof Electoral.Vote) {
			id = id.id;
		}

		return Electoral._each(this.votes, function(vote, i) {
			if (vote.id === id) {
				vote._last_known_index = i;
				return vote;
			}
		});
	},

	reduce: function(fn) {

		var reduced = [];

		Electoral._each(this.votes, function(vote, i) {
			var reduced_vote = fn(vote);
			if (reduced_vote) {
				reduced.push(reduced_vote);
			}
		});

		return reduced;
	},

	average: function() {
		var average = 0;
		Electoral._each(this.votes, function(vote, i) { average += vote.value });
		return Math.floor((average / this.votes.length) * 100) / 100;
	}
};

Electoral.Vote = function(value, meta) {
	
	this.value = value;
	this.id = Electoral._generate_id();
	
	for (var key in meta) this[key] = meta[key];
}

Electoral.Vote.prototype = {};