export interface Client {
    options: {
        shards: Array<number>;
        shardCount: number;
    };
    ws: { totalShards: number };
    user: { id: string };
    guilds: Record<string, Function>;
    emit: Function;
    uptime: number;
    stats: Record<string, unknown>;
}

export interface Options {
    topgg?: { token: string } | null;
    dbl?: { token: string } | null;
    config?: ConfigOptions;
}

export interface ConfigOptions {
    emits?: boolean;
    logs?: boolean;
}

export interface FetchRequest {
    url?: string;
    method: 'POST' | 'GET';
    headers: {
        Authorization: string;
        'Content-Type'?: string;
    };
    body?: string;
}
