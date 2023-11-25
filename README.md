<!-- @format -->

# DBL-SDK

## Install

```ts
npm install dbl-sdk
```

## Includes

- automatic statistics poster (top.gg, Discordbotlist)
- automatic vote counter (top.gg, Discordbotlist)

## Setup

Setup is extremely simple

```ts
// Import your normal discord package.
import { Client, GatewayIntentBits } from 'discord.js';

// Import the DBL-SDK package.
import DBL from 'dbl-sdk';

// Create a client instance.
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Login (this **must** be done before creating a connection to the discord bot lists).
client.login('token').then((client) => {
	// Create a new DBL instance.
	new DBL(client, {
		topgg: {
			token: 'token',
		},
		dbl: {
			token: 'token',
		},
	});
});

// The tokens provided in the options of the DBL instance are not the bot token, but the token provided from the respective bot list.
```

## Properties

@since 1.1.0

As of v1.1.0 you can get the cache stats in between updates with the `client.stats` property.

```ts
console.log(client.stats)

/* Output varies on the things you pass, these are all options when fully configured */

// Output

{
  createdAt: number, // The timestamp of the first post in this process
  updatedAt: number, // The timestamp of the most recent update in this process
  upvoteCount: number, // All votes combined between all hosts
  dbl: { upvotes: number, votes: Array<Record<string, string|number>> }, // The Discordbotlists data
  'top.gg': { upvotes: number, votes: Array<Record<string, string|number>> }, // The top.gg data
  shardId: number, // The id of the current shard
  shardCount: number, // The total count of shards
  guildCount: number, // The total number of guilds
  userCount: number // The total number of users
}
```

## Events (config.emits = true)

There is 3 events that can be emitted as of now.

### webhookCreate

@since 1.1.0  
@deprecated

This event is deprecated and should be replaced with `webhookInit`.

```ts
client.on('webhookCreate', (client, stats, response, host) => {
	/* Emitted whenever stats are updated */

	client: typeof Discord.Client; // The client after the update
	stats: Record<string, number>; // The stats used to update
	response: Record<string, string | number>; // The direct response from the host
	host: 'top.gg' | 'dbl'; // The host that was updated
});
```

### webhookInit

@since 1.2.0

```ts
client.on('webhookInit', (client, stats) => {
	/* Emitted whenever the first webhook update happens */

	client: typeof Discord.Client; // The client after the update
	stats: Record<string, number>; // The stats used to update
	response: Record<string, string | number>; // The direct response from the host
	host: 'top.gg' | 'dbl'; // The host that was updated
});
```

### webhookError

@since 1.0.0

```ts
client.on('webhookError', (client, stats, error, host) => {
	/* Emitted whenever a post request returns an error */

	client: typeof Discord.Client; // The client after the error
	stats: Record<string, number>; // The stats used to try to update
	error: Record<string, string | number>; // The error response from the host
	host: 'top.gg' | 'dbl'; // The host that errored
});
```

### webhookPost

@since 1.0.0

```ts
client.on('webhookPost', (client, stats, error) => {
	/* Emitted whenever an update post has happened */

	client: typeof Discord.Client; // The client after the post
	stats: Record<string, number>; // The stats used to post
	error: Record<string, string | number>; // The direct response of the host
	host: 'top.gg' | 'dbl'; // The host that posted
});
```

If your're using JavaScript, you can find out what [Record<K, T>](https://www.typescriptlang.org/docs/handbook/utility-types.html#recordkeys-type) is. (spoiler alert, it's a more specific object)

## Methods

### hasVoted(userId, botId, token, host)

@since 1.2.0

Will return whether the user has voted or not.

| name   | type   |
| ------ | ------ |
| userId | string |
| botId  | string |
| token  | string |
| host   | top.gg |

## Support

As far as languages go, TypeScript and JavaScript in both ESM and CJS should be supported.

### Bot Lists

- [Top.gg](https://top.gg/user/me)
- [Discordbotlists](https://discordbotlist.com/bots/mine)
- [VoidBots](https://voidbots.net/me) (coming soon)

## Plans

- Support more bot lists
- Support analytics
