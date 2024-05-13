import {
  Client,
  CommandInteraction,
  EmbedBuilder,
  SlashCommandBuilder,
} from "discord.js";

export async function execute(client: Client, interaction: CommandInteraction) {
  await interaction.reply({ content: ".", ephemeral: true });

  const embed = new EmbedBuilder().setDescription(
    `\`🏓\` | **Pong:** \`${Math.round(client.ws.ping)}ms\``
  );

  return interaction.editReply({ embeds: [embed] });
}

export const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("봇의 연결 상태를 확인합니다..");
