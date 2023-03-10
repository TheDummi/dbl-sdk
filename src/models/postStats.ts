import { Client, ConfigOptions, FetchRequest } from '../types/interfaces.js';
import { Host } from '../types/types.js';
import { fetchRequest } from './fetchRequest.js';
import saveStats from './saveStats.js';

export default async function postStats(token: string, client: Client, host: Host, config: ConfigOptions) {
    let request: FetchRequest | null = null;

    const guilds = await client.guilds.fetch();

    const shardId = client.options.shards[0] || 0,
        shardCount = client.options.shardCount || client.ws.totalShards || client.options.shards.length,
        guildCount = guilds.size,
        userCount = (await Promise.all(guilds.map(async (g: Record<string, number>) => (await client.guilds.fetch(g.id)).memberCount || 0))).reduce((a, b) => (a += b));

    saveStats(client, { shardId, shardCount, guildCount, userCount });

    if (host === 'top.gg')
        request = {
            url: `https://top.gg/api/bots/stats`,
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                server_count: guildCount,
                shard_id: shardId,
                shard_count: shardCount,
            }),
        };

    if (host === 'dbl') {
        request = {
            url: `https://discordbotlist.com/api/v1/bots/${client.user.id}/stats`,
            method: 'POST',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                guilds: guildCount,
                shard_id: shardId,
                users: userCount,
            }),
        };
    }

    if (!request) throw new Error(`Unknown Discord Bot List!`);

    const response = await fetchRequest(request);

    const data = await response.json();

    if (!request.body) return;

    if (config.emits) {
        if (!response.ok) client.emit('webhookError', client, JSON.parse(request.body), data, host);
        else client.emit('webhookPost', client, JSON.parse(request.body), data, host);
    }
    if (config.logs) {
        if (!response.ok) console.log(`An error occurred while posting to ${host}. ${data}`);
        else console.log(`Successfully posted to ${host}. ${request.body}`);
    }
}
