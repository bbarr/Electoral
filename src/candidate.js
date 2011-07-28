Electoral.Candidate = function(stats) {
	for (var key in stats) this[key] = stats[key];
	this.votes = [];
	this.ups = 0;
	this.downs = 0;
}

Electoral.Candidate.prototype = {

	up: function(meta) {
		this.ups++;
		var vote = new Electoral.Vote(1, meta);
		this.votes.push(vote);
		return vote;
	},

	down: function(meta) {
		this.downs++;
		var vote = new Electoral.Vote(0, meta);
		this.votes.push(vote);
		return vote;
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
	}
};