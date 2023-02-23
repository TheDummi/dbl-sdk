import DBL from '../dist/main.js';
import { Client, GatewayIntentBits } from 'discord.js';
import config from './config.json' assert { type: 'json' };

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.login(config.token).then(async () => {
    new DBL(client, {
        topgg: {
            token: config['top.gg'],
        },
        dbl: {
            token: config.dbl,
        },
        config: { logs: true },
    });

    await new Promise((resolve) => setTimeout(resolve, 20000));

    console.log(client.stats);
});
