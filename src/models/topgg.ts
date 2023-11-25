/** @format */

export async function post(data: any) {
  const stats = {
    server_count: data.stats.guildCount,
    shards: data.client.options.shards,
    // shard_id:0,
    shard_count: data.stats.shardCount || 1,
  };

  if (!data.options?.tokens.topgg)
    throw new Error(`For this method you're required to have a token`);

  const response = await fetch(
    `https://top.gg/api/bots/${data.client.user.id}/stats`,
    {
      method: "POST",
      headers: {
        Authorization: data.options?.tokens.topgg,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(stats),
    },
  )
    .then((res) => res.json())
    .catch(console.error);

  return { response, stats };
}

export async function votes(data: any) {
  if (!data.options?.tokens.topgg)
    throw new Error(`For this method you're required to have a token`);

  const response = await fetch(
    `https://top.gg/api/bots/${data.client.user.id}/votes`,
    {
      method: "GET",
      headers: {
        Authorization: data.options.tokens.topgg,
        "Content-Type": "application/json",
      },
    },
  )
    .then((res) => res.json())
    .catch(console.error);

  data.cache.voters = [];

  data.cache.voters.push(
    ...(response as Array<unknown>)?.map((user: any) => ({
      ...user,
      voted: true,
    })),
  );

  return { votes: (response as Array<string>)?.length, voters: response };
}

export async function validate(
  data: any,
  user: any,
  fetchUser: boolean = false,
) {
  if (!data.options?.tokens.topgg)
    throw new Error(`For this method you're required to have a token`);

  const id = user.id;

  if (fetchUser) {
    const voter = data.cache.voters.find((voter: any) => voter.id == id);

    if (!voter) {
      const response = await fetch(
        `https://top.gg/api/bots/${data.client.user.id}/check?userId=${id}`,
        {
          method: "GET",
          headers: {
            Authorization: data.options.tokens.topgg,
            "Content-Type": "application/json",
          },
        },
      )
        .then((res) => res.json())
        .catch(console.error);

      data.cache.voters.push({
        username: user.username,
        id: user.id,
        avatar: user.displayAvatarURL(),
        voted: !!(response as any).voted,
      });
    }
  }

  return data.cache.voters.find((voter: any) => voter.id == id)?.voted || false;
}
