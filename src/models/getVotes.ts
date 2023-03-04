import { Client, FetchRequest } from '../types/interfaces.js';
import { Host } from '../types/types.js';
import { fetchRequest } from './fetchRequest.js';
import saveStats from './saveStats.js';

export async function getVotes(token: string, client: Client, host: Host) {
    let request: FetchRequest | null = null;

    if (host === 'top.gg')
        request = {
            url: `https://top.gg/api/bots/${client.user.id}/votes`,
            method: 'GET',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        };

    if (host === 'dbl')
        request = {
            url: `https://discordbotlist.com/api/v1/bots/${client.user.id}/upvotes`,
            method: 'GET',
            headers: {
                Authorization: token,
                'Content-Type': 'application/json',
            },
        };

    if (!request) throw new Error('No request found to be made!');

    const response = await fetchRequest(request);

    const data = await response.json();

    if (!response.ok) console.error(`Couldn't get most recent votes! ${data.error || data.message}`);
    else {
        saveStats(client, {
            upvoteCount: (client.stats?.upvoteCount || 0) + (data?.length || data?.total) || 0,
            [host]: {
                upvotes: data?.length || data?.total || 0,
                votes: data?.upvotes || data,
            },
        });
    }
}
