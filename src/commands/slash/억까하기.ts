import {
  CacheType,
  ChatInputCommandInteraction,
  Client,
  CommandInteraction,
  SlashCommandBuilder,
  TextChannel,
  User,
} from "discord.js";

export async function execute(
  client: Client,
  interaction: CommandInteraction<CacheType>
) {
  try {

    const user = interaction.options.getUser("유저");
    const member = await interaction.guild?.members.fetch(user?.id || "");
    const CatchedChannel = interaction.options.get("채널")?.channel;
    const message = interaction.options.get("메시지")?.value;
    console.log(`${user?.displayName}으로 전송 중`);
    const channel = await interaction.guild?.channels.fetch(
      CatchedChannel?.id || ""
    );

    if (channel instanceof TextChannel && user && message) {
      const webhook = await channel.createWebhook({
        name: member?.displayName || "",
        avatar: user?.avatarURL() || undefined,
      });
      console.log(`${member?.displayName}으로 전송 중`);
      await webhook?.send(`${message}`);
      webhook?.delete();
      interaction.reply({
        content: `성공적으로 전송했슈`,
        ephemeral: true,
      });
    }
  } catch (error) {
    console.log(error);
  }
}

export const data = new SlashCommandBuilder()
  .setName("억까하기")
  .addUserOption((option) =>
    option.setName("유저").setDescription("채팅을 보낼 사람을 선택하세요")
  )
  .addStringOption((option) =>
    option.setName("메시지").setDescription("보낼 메시지를 알려주세요.")
  )
  .addChannelOption((option) =>
    option.setName("채널").setDescription("보낼 채널을 알려주세요.")
  )
  .setDescription("다른 사람의 프로필로 메시지를 보냅니다.");
