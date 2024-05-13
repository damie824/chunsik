import {
  CacheType,
  ChatInputCommandInteraction,
  Client,
  CommandInteraction,
  CommandInteractionOption,
  SlashCommandBuilder,
  User,
} from "discord.js";
import { nicknames } from "../../utils/nickname";
export async function execute(
  client: Client,
  interaction: CommandInteraction<CacheType>
) {
  const userOption = interaction.options.getUser("유저", true);
  const member = await interaction.guild?.members.fetch(userOption.id);
  let oldName = member?.nickname?.split("(")[0] || "";

  if (nicknames.indexOf(oldName) === -1) {
    oldName = nicknames[Math.floor(Math.random() * nicknames.length)];
  }

  const newName = `${oldName}(${
    interaction.options.get("바꿀이름", true).value
  })`;
  try {
    await member?.edit({ nick: newName });
    await interaction.reply({
      content: `${oldName}의 닉네임을 ${newName}(으)로 변경했슈`,
      ephemeral: true,
    });
  } catch (e) {
    interaction.reply({ content: "닉네임 변경에 실패했슈", ephemeral: true });
    console.log(e);
  }
}

export const data = new SlashCommandBuilder()
  .setName("이름부여")
  .addUserOption((option) =>
    option.setName("유저").setDescription("바꿀 사람의 이름을 선택하세요")
  )
  .addStringOption((option) =>
    option.setName("바꿀이름").setDescription("바꿀이름을 입력합니다.")
  )
  .setDescription("이름을 부여합니다.");
