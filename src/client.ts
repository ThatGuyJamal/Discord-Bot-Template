import { GatewayIntentBits } from 'discord.js';
import { Client } from 'discordx';
import { Logger } from './utils/logger.js';
import { EnvironmentData } from './main.js';
import { DiscordUtils } from './utils/discord.js';

export class Main {
	public client: Client;
	public logger;
	public utils;

	public constructor() {
		this.client = new Client({
			// Use this in prod
			// botGuilds: canaryVsProdCheck ? EnvironmentData.GUILDS_TO_REGISTER : undefined,
			botGuilds: [(client) => client.guilds.cache.map((guild) => guild.id)],

			// Discord intents to process message data
			intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
			// Debug logs are disabled in silent mode
			silent: false,
			shards: 'auto'
		});
		this.logger = new Logger(EnvironmentData, this.client);
		this.utils = new DiscordUtils(this);
	}
}
