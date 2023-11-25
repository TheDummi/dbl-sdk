/** @format */

import { post, votes, validate } from "../models/topgg.js";

export default class Client {
  private declare readonly client;
  private declare readonly options;
  public declare readonly stats;
  public declare readonly cache;

  public constructor(client: ClientType, options?: Options) {
    if (!client.stats) client.stats = options?.stats;

    if (!client.stats)
      throw new Error(
        `You need to specify a stats object on your client or parse this as second argument.`,
      );

    if (!client.stats.guildCount)
      client.stats.guildCount = client.guilds.cache.size;

    this.stats = client.stats;

    this.options = options;

    this.client = client;

    this.cache = { voters: [] };
  }

  public async post() {
    const responses: Record<string, unknown> = {};

    responses.topgg = await post(this);

    this.client.emit("dbl-post", this.client, responses);

    setInterval(async () => {
      responses.topgg = await post(this);

      this.client.emit("dbl-post", this.client, responses);
    }, 30 * 60000);

    return responses;
  }

  public async votes() {
    const responses: Record<string, unknown> = {};

    const get = async () => {
      delete responses.voteCount;

      responses.topgg = await votes(this);

      responses.voteCount = Object.keys(responses)
        .map((key) => (responses[key] as any).votes || 0)
        .reduce((a, b) => (a += b));

      return await this.client.emit("dbl-sync", this.client, responses);
    };

    get();

    setInterval(get, 60000);

    return responses;
  }

  public async validate(user: any) {
    return await validate(this, user);
  }

  public async init() {
    await this.post();
    await this.votes();
  }
}

interface Stats {
  guildCount: number;
  userCount: number;
  shardCount: number;
}

type ClientType = {
  stats?: Stats;
  user: { id: string };
  emit: Function;
  guilds: {
    cache: any;
  };
  options: {
    shards: unknown;
  };
};

type Options = {
  stats?: Stats;
  tokens: {
    topgg?: string;
  };
};
