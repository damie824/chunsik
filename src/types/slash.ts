import { SlashCommandBuilder } from "discord.js";

export interface SlashType {
  data: SlashCommandBuilder;
  execute: any;
}
