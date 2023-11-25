/** @format */

import DBL from '../dist/main.js';
import XernerxClient, { XernerxIntents } from 'xernerx';

new (class Client extends XernerxClient {
	constructor() {
		super(
			{ intents: XernerxIntents.Default },
			{
				log: true,
				local: '',
			}
		);

		this.connect('ODgxNjc4ODI2OTA2NzMwNTQ3.Gr9tgQ.T04JRu6xxiyK7BN49RfrI7pUo-57unNFjONYKA').then(async () => {
			const dbl = new DBL(this, {
				tokens: { topgg: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg4MTY3ODgyNjkwNjczMDU0NyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjc3MTg2NjU4fQ.9RWtRcb-m0M59lAlanRlb_1pVzpSI41FY1cO80nhRyU' },
			});

			dbl.votes();

			this.on('dbl-sync', (client, responses) => {
				console.log(`Updated!`, responses);
			});

			this.on('messageCreate', async (message) => {
				// console.log(this.stats);

				if (message.author.id == '482513687417061376' || message.author.id == '541015870072422410') console.log(message.author.username, await dbl.validate(message.author));
			});
		});
	}
})();
