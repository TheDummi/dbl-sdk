# DBL-SDK

## Install

```ts
npm install dbl-sdk
```

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
client.login('token');

// Create a new DBL instance.
new DBL(client, {
    topgg: {
        token: 'token',
    },
    dbl: {
        token: 'token',
    },
});

// The tokens provided in the options of the DBL instance are not the bot token, but the token provided from the respective bot list.
```

## Support

As far as languages go, TypeScript and JavaScript in both ESM and CJS should be supported.

### Bot Lists

-   [Top.gg](https://top.gg/user/me)
-   [Discordbotlists](https://discordbotlist.com/bots/mine)
-   [VoidBots](https://voidbots.net/me) (coming soon)

## Plans

-   Support more bot lists
-   Support votes
-   Support analytics
