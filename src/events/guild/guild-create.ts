import { EmbedBuilder } from "@discordjs/builders";
import { Client, Guild } from "discord.js";

import moment from "moment";

module.exports.run = async (client: Client, guild: Guild) => {
  const channel = guild.systemChannel;

  let owner = await guild.fetchOwner();

  const embed = new EmbedBuilder()
    .setAuthor({
      name: "춘식이를 사용할 권한을 부여받으셨어요!",
      iconURL: client.user?.displayAvatarURL(),
    })
    .addFields([
      { name: "Name", value: `\`\`\`${guild.name}\`\`\``, inline: true },
      { name: "ID", value: `\`\`\`${guild.id}\`\`\``, inline: true },
      {
        name: "Member Count",
        value: `\`\`\`${guild.memberCount} Members\`\`\``,
        inline: true,
      },
      {
        name: "Owner",
        value: `\`\`\`${
          guild.members.cache.get(owner.id) ? owner.user.tag : "Unknown user"
        } | ${owner.id}\`\`\``,
      },
      {
        name: "Creation Date",
        value: `\`\`\`${moment
          .utc(guild.createdAt)
          .format("DD/MMM/YYYY")}\`\`\``,
      },
      {
        name: `${client?.user?.username}'s Server Count`,
        value: `\`\`\`${client.guilds.cache.size} Servers\`\`\``,
      },
    ])
    .setTimestamp();

  if (guild.iconURL()) {
    embed.setThumbnail(guild.iconURL({ size: 2048 }));
  } else {
    embed.setThumbnail(client?.user?.displayAvatarURL({ size: 2048 }) || "");
  }

  if (guild.bannerURL()) {
    embed.setImage(guild.bannerURL());
  }

  channel?.send({ embeds: [embed] });
};
