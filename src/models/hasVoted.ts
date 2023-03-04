import { Host } from '../types/types.js';
import { z } from 'zod';
import { fetchRequest } from './fetchRequest.js';

export default async function hasVoted(userId: string, botId: string, token: string, host: Host) {
    z.object({
        userId: z.string(),
        botId: z.string(),
        token: z.string(),
        host: z.string(),
    }).parse({ userId, botId, token, host });

    if (host === 'top.gg') {
        const response = await fetchRequest({ url: `https://top.gg/api/bots/${botId}/check?userId=${userId}`, method: 'GET', headers: { Authorization: token, 'Content-Type': 'application/json' } });

        if (!response.ok) return;
        const data = await response.json();

        return !!data.voted;
    }
}
