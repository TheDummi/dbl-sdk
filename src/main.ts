import { z } from 'zod';

import postStats from './models/stats.js';

export default class DBL {
    public client;
    public options;
    constructor(client: Client, options: Options) {
        this.client = client;

        z.object({
            topgg: z
                .object({
                    token: z.string(),
                })
                .optional(),
            dbl: z
                .object({
                    token: z.string(),
                })
                .optional(),
            config: z
                .object({
                    emits: z.boolean().optional(),
                    logs: z.boolean().optional(),
                })
                .optional(),
        }).parse(options);

        this.options = options;

        if (!options.topgg) options.topgg = null;
        if (!options.dbl) options.dbl = null;

        this.post();

        setInterval(() => {
            this.post();
        }, 1800000);
    }

    post() {
        if (this.options.topgg) postStats(this.options.topgg.token, this.client, 'top.gg', this.options.config);
        if (this.options.dbl) postStats(this.options.dbl.token, this.client, 'dbl', this.options.config);
    }
}

export interface Client {
    options: {
        shards: Array<number>;
        shardCount: number;
    };
    ws: { totalShards: number };
    user: { id: string };
    guilds: Record<string, Function>;
    emit: Function;
}

interface Options {
    topgg: { token: string } | null;
    dbl: { token: string } | null;
    config: ConfigOptions;
}

export interface ConfigOptions {
    emits?: boolean;
    logs?: boolean;
}
