'use strict';

var util=require('util');
var os = require('os');
var fs = require('fs');

var binary = require('binary');

var readStream=fs.createReadStream('./tmp/test2.log')

readStream.on('open',function(fd){
	var data=[];
	console.time('test');
	binary.stream(readStream)
		.loop(function(end,vars){
			this
				.scan('hi','\x0d\x0a')
				.tap(function(vars){
					// console.log(vars.hi.toString().search('AVL_INPUT'));
					if(vars.hi.toString().search('AVL_INPUT')!=-1){
						binary.parse(vars.hi)
							.scan('t',' |DEV |AVL_INPUT')
							.tap(function(vars){
								console.log(vars.t.toString());
							})
							.scan('g','|Data |')
							.tap(function(vars){
								console.log(vars.g.toString());
							})
					}
				});
			// console.log(util.inspect(this));
			// if(this.eof()){end();}

		});


			// binary.parse(vars.hi)
			// 	.loop(function(end,vars){
			// 		this
			// 			.word8bu('a')
			// 			.word8bu('b')
			// 			.tap(function(vars){
			// 				data.push(parseInt(String.fromCharCode(vars.a,vars.b),16));
			// 			});	
			// 		if(this.eof()){
			// 			// console.log(util.inspect(this));
			// 			end();
			// 			console.timeEnd('test');
			// 			console.log(data);
			// 		}				
			// 	});

		// });

});





// console.log(os.tmpdir());
// console.log(os.endianness());
// console.log(os.hostname());
// console.log(os.type());
// console.log(os.platform());
// console.log(os.arch());
// console.log(os.release());
// console.log(os.uptime());
// console.log(os.loadavg());
// console.log(os.totalmem());
// console.log(os.freemem());
// console.log(os.cpus());
// console.log(os.networkInterfaces());