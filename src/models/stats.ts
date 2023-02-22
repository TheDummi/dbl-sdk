import { Client, ConfigOptions } from '../main.js';

export default async function postStats(token: string, client: Client, host: 'top.gg' | 'dbl', config: ConfigOptions) {
    let request;

    const guilds = await client.guilds.fetch();

    console.log(`Loading servers this will take ${(guilds.size * 100) / 1000} seconds.`);

    await new Promise((resolve) => setTimeout(resolve, guilds.size * 100));

    const shardId = client.options.shards[0] || 0,
        shardCount = client.options.shardCount || client.ws.totalShards || client.options.shards.length,
        guildSize = guilds.size,
        userSize = (await Promise.all(guilds.map(async (g: Record<string, number>) => (await client.guilds.fetch(g.id)).memberCount || 0))).reduce((a, b) => (a += b));

    if (host === 'top.gg')
        request = {
            url: `https://top.gg/api/bots/stats`,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                server_count: guildSize,
                shard_id: shardId,
                shard_count: shardCount,
            }),
        };

    if (host === 'dbl') {
        request = {
            url: `https://discordbotlist.com/api/v1/bots/${client.user.id}/stats`,
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                guilds: guildSize,
                shard_id: shardId,
                users: userSize,
            }),
        };
    }

    if (!request) throw new Error(`Unknown Discord Bot List!`);

    const response = await fetchRequest(request);

    const data = await response.json();

    if (config.emits) {
        if (!response.ok) client.emit('webhookError', client, request.body, data, host);
        else client.emit('webhookPost', client, request.body, data, host);
    }
    if (config.logs) {
        if (!response.ok) console.log(`An error occurred while posting to ${host}. ${data}`);
        else console.log(`Successfully posted to ${host}. ${request.body}`);
    }
}

async function fetchRequest(request: Partial<FetchRequest>) {
    if (!request.url) throw new Error('No URL provided');

    const url = request.url;

    delete request.url;

    request.method = 'POST';

    return await fetch(url, request);
}

interface FetchRequest {
    url: string;
    method?: string;
    headers: {
        Authorization: string;
        'Content-Type'?: string;
    };
    body: string;
}
