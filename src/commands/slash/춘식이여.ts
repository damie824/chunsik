import {
  CacheType,
  Client,
  CommandInteraction,
  Interaction,
  SlashCommandBuilder,
} from "discord.js";
import { chunsik } from "../../utils/chunsik";

export async function execute(client: Client, interaction: CommandInteraction) {
  const user = interaction.options.getUser("유저", true);
  if (!user) return;

  const newNickname = await chunsik(
    user,
    interaction.channel,
    interaction.guild
  );

  if (interaction.channel && interaction.guild) {
    await interaction.reply(
      `${user.username}(이)는 오늘부터 ${newNickname}이여`
    );
  }
}

export const data = new SlashCommandBuilder()
  .setName("춘식이여")
  .addUserOption((option) =>
    option.setName("유저").setDescription("바꿀 사람의 이름을 선택하세요")
  )
  .setDescription("이름을 변경합니다.");
