import { z } from 'zod';
import { Client, ConfigOptions, Options } from '../types/interfaces.js';
import { getVotes } from './getVotes.js';
import postStats from './postStats.js';

export default class DBL {
    public client;
    public options;
    constructor(client: Client, options: Options) {
        this.client = client;

        this.client.stats = {
            createdAt: Number(Date.now()),
            updatedAt: Number(Date.now()),
        } as const;

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

        if (!this.options.topgg) this.options.topgg = null;
        if (!this.options.dbl) this.options.dbl = null;
        if (!this.options.config) this.options.config = { emits: false, logs: false };

        setInterval(() => {
            this.post();

            this.get();
        }, 1800000);

        // Instants
        this.get();

        // after client load
        (async () => {
            const guilds = await client.guilds.fetch(),
                time = guilds.size * 100;

            if (options.config?.logs) console.info(`Loading servers this will take ${time / 1000} seconds.`);

            await new Promise((resolve) => setTimeout(resolve, time));

            await this.post();

            await client.emit('webhookInit', client, client.stats);
        })();
    }

    post() {
        if (this.options.topgg) postStats(this.options.topgg.token, this.client, 'top.gg', this.options.config as ConfigOptions);
        if (this.options.dbl) postStats(this.options.dbl.token, this.client, 'dbl', this.options.config as ConfigOptions);
    }

    get() {
        if (this.options.topgg) getVotes(this.options.topgg.token, this.client, 'top.gg');
        if (this.options.dbl) getVotes(this.options.dbl.token, this.client, 'dbl');
    }
}
