var process_manager,
	cp		= require('child_process'),
	events	= require('events'),
	path	= require('path'),
	util	= require('util');

module.exports = process_manager = function() {
	this.threads = {};
	this.names = {};
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

	if(typeof threads == Array) {
		// this is an array of 1 or more process spawns
		for ( i = 0; i < threads.length-1; i++ ) {
			if( !thread[i].hasOwnProperty('name') || !thread[i].name ) {
				thread[i].name = 'child' + i.toString();
			}
			this.start(threads[i]);
		}

	} else {
		// This should be just one process spawn
		// process thread info
		var {
			name = 'child' + i.toString(),
			file_path = __dirname+path.sep,
			file_name = 'child.js',
			args = []
		} = threads;

		// console.log(',___________________________________________' + '\n' +
		// 			'| New Forked Process:' + '\n' +
		// 			'|-------------------------------------------' + '\n' +
		// 			'| Name: ' + name + '\n' +
		// 			'| Path: ' + file_path + '\n' +
		// 			'| File: ' + file_name + '\n' +
		// 			'| Args: ' + args + '\n' +
		// 			'|___________________________________________'
		// );

		child = cp.fork(file_path + file_name);
		child.on('message',onMessage);
		child.on('error',onError);
		child.on('disconnect',onDisconnect);
		that.threads[child.pid] = child;
		that.names[name] = child.pid;
	}
};

process_manager.prototype.send = function(pid, msg) {
	// sned wrapper
};

process_manager.prototype.getPID = function(name) {
	// getPID of name
};

process_manager.prototype.getName = function(pid) {
	// get name of PID
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
