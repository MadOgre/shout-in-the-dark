module.exports = {
	database: {
		url: {
			development: 'mongodb://localhost/shout',
			production: 'mongodb://localhost/shout'			
		},
		credentials: {
			production: {
			  user: 'shout',
			  pass: 'password',
			  auth: {
			    authdb: 'admin'
				}					
			},
			development: {}
		}
	},
	default_transparency_path: process.cwd() + '/public/img/common/transparency.png'
};
