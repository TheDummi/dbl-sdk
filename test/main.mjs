import { DBL, hasVoted } from '../dist/mjs/main.js';
import { Client, GatewayIntentBits } from 'discord.js';
import config from './config.json' assert { type: 'json' };

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages] });

client.login(config.token).then(async () => {
    const dbl = new DBL(client, {
        topgg: {
            token: config['top.gg'],
        },
        dbl: {
            token: config.dbl,
        },
        config: { logs: true },
    });

    client.on('webhookInit', (client, stats) => {
        console.log('Initialized webhooks with', stats);
    });

    client.on('messageCreate', async (message) => {
        console.log(await hasVoted(message.author.id, client.user.id, dbl.options.topgg.token, 'top.gg'));
    });
});
