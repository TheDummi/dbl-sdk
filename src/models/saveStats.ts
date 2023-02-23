import { Client } from '../types/interfaces.js';

export default function saveStats(client: Client, stats: Record<string, string | number | object>) {
    Object.entries(stats).map(([key, value]) => {
        client.stats[key] = value;

        client.stats.updatedAt = Number(Date.now());
    });
}
