import {
  Client,
  Interaction,
  RESTPostAPIApplicationCommandsJSONBody,
} from "discord.js";
import { SlashType } from "../types/slash";
import { REST, Routes } from "discord.js";
import { readdirSync } from "fs";

const fs = require("node:fs");
const path = require("node:path");

const commands: RESTPostAPIApplicationCommandsJSONBody[] = [];
// 명령 폴더를 불러옵니다.
const commandsPath = path.join(__dirname, `../commands/slash/`);
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file: string) => file.endsWith(".ts"));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command: SlashType = require(filePath);
  if ("data" in command && "execute" in command) {
    commands.push(command.data.toJSON());
  } else {
    console.log(
      `[Warning] | The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(process.env.DISCORD_TOKEN || "");

// and deploy your commands!
export default async (client: Client) => {
  try {
    console.log(
      `[Client] | Started refreshing ${commands.length} application (/) commands.`
    );

    console.log(`[Debug] | DISCORD_CLIENT_ID:${process.env.DISCORD_CLIENT_ID}`);
    console.log(`[Debug] | DISCORD_GUILD_ID:${process.env.DISCORD_GUILD_ID}`);

    // The put method is used to fully refresh all commands in the guild with the current set
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.DISCORD_CLIENT_ID || "",
        process.env.DISCORD_GUILD_ID || ""
      ),
      { body: commands }
    );

    console.log(
      `[Client] | Successfully reloaded ${commands.length} application (/) commands.`
    );

    client.on("interactionCreate", async (interaction: Interaction) => {
      if (!interaction.isCommand()) return;

      const commandName = interaction.commandName;
      const command = commands.find((cmd) => cmd.name === commandName);

      if (command) {
        const commandModule: SlashType = require(`../commands/slash/${command.name}`);
        try {
          await commandModule.execute(client, interaction);
        } catch (e) {
          interaction.reply({ content: `에러남:${e}`, ephemeral: true });
          console.log(e);
        }
      }
    });
  } catch (error) {
    console.error(error);
  }
};
