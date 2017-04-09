var process_manager,
	cp		= require('child_process'),
	events	= require('events'),
	path	= require('path'),
	util	= require('util');

module.exports = process_manager = function() {
	this.threads = {};
};

util.inherits(process_manager,events.EventEmitter);

process_manager.prototype.start = function(threads) {
	var i,
	child,
	that = this,
	onMessage = function(message) {
		that.emit('event','child message',this.pid,message);
	},
	onError = function(e) {
		that.emit('event','child error',this.pid,e);
	},
	onDisconnect = function(e) {
		that.emit('event','child disconnect',this.pid,'killing...');
		this.kill();
		delete that.threads[this.pid];
	};

	if(typeof threads == Number) {
		for ( i = 0; i < threads; i++ ) {
			child = cp.fork(__dirname+path.sep+'Child.js');
			child.on('message',onMessage);
			child.on('error',onError);
			child.on('disconnect',onDisconnect);
			that.threads[child.pid] = child;
		}
	} else {
		var {} = threads;
		child = cp.fork()
	}
};

process_manager.prototype.stop = function(pid) {
	var that = this;
	if ( typeof pid === 'undefined' ) {
		var allPids = Object.keys(this.threads);
		allPids.forEach(function(key,i,arr) {
			that.threads[key].disconnect();
		});
	} else if ( threads[pid] ) {
		that.threads[pid].disconnect();
	}
};

process_manager.prototype.destroy = function() {
	process.kill();
};
