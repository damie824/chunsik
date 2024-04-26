import { SlashCommandBuilder } from "@discordjs/builders";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";

const commands = [
  new SlashCommandBuilder()
    .setName("춘식이여")
    .addUserOption((option) =>
      option.setName("user").setDescription("바꿀 사람의 이름을 선택하세요")
    )
    .setDescription("이름을 변경합니다."),
].map((command) => command.toJSON());

export const registerCommands = (
  token: string,
  clientId: string,
  guildId: string
) => {
  const rest = new REST({ version: "9" }).setToken(token);

  rest
    .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log("Successfully registered application commands."))
    .catch(console.error);
};
