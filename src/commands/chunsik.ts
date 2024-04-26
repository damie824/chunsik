import {
  Guild,
  GuildMember,
  TextBasedChannel,
  TextChannel,
  User,
} from "discord.js";

const nicknames = [
  "춘식",
  "대식",
  "준식",
  "민식",
  "현식",
  "영식",
  "동식",
  "병식",
  "태식",
  "우식",
  "경식",
  "남식",
  "재식",
  "연식",
  "두식",
  "창식",
  "호식",
  "태식",
];

export default async function chunsik(
  user: GuildMember | User,
  channel: TextChannel | TextBasedChannel | null,
  guild: Guild | null
) {
  console.log(`${user.displayName}의 닉네임을 변경중이여`);

  try {
    const oldName = user.displayName;
    const newNickname = nicknames[Math.floor(Math.random() * nicknames.length)];
    if ("setNickname" in user) {
      await user.setNickname(newNickname);
    }
    if (user instanceof User) {
      if (guild) {
        const member = await guild.members.fetch(user.id);
        if (member) {
          await member.setNickname(newNickname);
        }
      }
    }

    console.log(`새 노예인 ${oldName}의 이름은 오늘부터 ${newNickname}이여.`);

    return newNickname;
  } catch (error) {
    channel?.send(`닉네임 변경에 실패했슈 : ${error}`);
    console.error(`닉네임 변경을 실패했슈 : ${error}`);
    console.log(error);
  }
}
