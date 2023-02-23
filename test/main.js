import DBL from '../dist/main.js';
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.login('ODgxNjc4ODI2OTA2NzMwNTQ3.GoiIBa.OJmriCBj_qZfUC3Cd3B6cxMeNmU0klFyLxlB7Q').then(async () => {
    new DBL(client, {
        topgg: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg4MTY3ODgyNjkwNjczMDU0NyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjU1NjUyMzM1fQ.FZIvpGjdWCfVqrh2H27dShfJLPo4aHBZEZLCCo0ch8s',
        },
        dbl: {
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoxLCJpZCI6Ijg4MTY3ODgyNjkwNjczMDU0NyIsImlhdCI6MTY3NzA2ODc2NH0.mfdL02QUc_RQ9hM24CEWHATGAXTcn9m-5DPEVxfEiTc',
        },
        config: { logs: true },
    });

    await new Promise((resolve) => setTimeout(resolve, 20000));

    console.log(client.stats);
});
