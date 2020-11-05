const fs = require('fs');

const stats = {
	
	statActions: {
		add: 'Добавление товара',
		del: 'Удаление товара'
	},

	addToStats: function(activity, name) {
		const date = new Date();
		const actionObj = {};

		actionObj.date = date.toLocaleString("ru", { year: 'numeric', month: 'long', day: 'numeric', hour12: false, hour: '2-digit', minute: '2-digit' });
		actionObj.action = this.statActions[activity];
		actionObj.product_name = name;

		this.writeStats(actionObj);
		
	},

	writeStats: (actionObj, file = './server/db/stats.json') => {
		fs.readFile(file, 'utf-8', (err, data) => {
			if (err) {
				res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
			} else {
				const stats = JSON.parse(data);
				stats.push(actionObj);
				const newStats = JSON.stringify(stats, null, 4);
				fs.writeFile(file, newStats, (err) => {
					if (err) {
						console.log(err);
					}
				});
			}
		});
	},

};

module.exports = stats;