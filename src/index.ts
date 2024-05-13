require("dotenv").config();
import {
  ActivityOptions,
  ActivityType,
  Client,
  GatewayIntentBits,
  GuildMember,
} from "discord.js";
import registerCommands from "./handler/slash";
import { chunsik } from "./utils/chunsik";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
  ],
});

registerCommands(client);

client.on("ready", () => {
  setInterval(() => {
    const status: ActivityOptions[] = [
      { name: "Rety - Obscure", type: ActivityType.Listening },
      { name: "염전에서 소금캐기", type: ActivityType.Playing },
      { name: "도망간 노예 잡기", type: ActivityType.Playing },
      {
        name: "The Big Stepper : 박수현 단독 콘서트",
        type: ActivityType.Watching,
      },
    ];

    client?.user?.setPresence({
      status: "idle",
      activities: [status[Math.floor(Math.random() * status.length)]],
    });
  }, 10000);
  console.log(`[Client] | 춘식이가 노동을 시작함.`);
});

client.on("guildMemberAdd", async (member) => {
  const defaultChannel = member.guild.systemChannel;
  member.roles.add("1233285147575717918", "노예 추가");
  const newNickname = await chunsik(member, defaultChannel, member.guild);
  defaultChannel?.send(
    `새 노예인 ${member.user.globalName}의 이름은 오늘부터 ${newNickname}이여.`
  );
  await member.send(
    "https://cdn.topstarnews.net/news/photo/202205/14695569_799939_590.jpg"
  );
  await member.send("들어올 떈 자유지만, 나갈 땐 아니란다");
  console.log(`[Event] | ${member.displayName}에게 디엠을 보냈슈`);
});

client.login(process.env.DISCORD_TOKEN);
