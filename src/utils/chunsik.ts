import {
  Guild,
  GuildMember,
  TextBasedChannel,
  TextChannel,
  User,
} from "discord.js";
import { nicknames } from "./nickname";

export async function chunsik(
  user: GuildMember | User,
  channel: TextChannel | TextBasedChannel | null,
  guild: Guild | null
) {
  console.log(`[Chunsik] | ${user.displayName}의 닉네임을 변경중이여`);
  try {
    const oldName =
      user instanceof GuildMember ? user.user.globalName : user.globalName;
    const newNickname = nicknames[Math.floor(Math.random() * nicknames.length)];
    if (user instanceof GuildMember) {
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

    console.log(
      `[Chunsik] | 새 노예인 ${oldName}의 이름은 오늘부터 ${newNickname}이여.`
    );

    return newNickname;
  } catch (error) {
    channel?.send(`[AntiCrash] | 닉네임 변경에 실패했슈 : ${error}`);
    console.error(`[AntiCrash] | 닉네임 변경을 실패했슈 : ${error}`);
    console.log(error);
  }
}
