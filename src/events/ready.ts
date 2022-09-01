import { ActivityType } from 'discord.js';
import type { ArgsOf, Client } from 'discordx';
import { Discord, On } from 'discordx';
import { container, EnvironmentData } from '../main.js';

@Discord()
export class Event {
	@On({ event: 'ready' })
	async onEvent([data]: ArgsOf<'ready'>, _client: Client): Promise<void> {
		// Make sure all guilds are cached
		await container.client.guilds.fetch();
		// Synchronize applications commands with Discord
		await container.client.initApplicationCommands({
			guild: {
				disable: {
					add: !EnvironmentData.REGISTER_GUILD_COMMANDS,
					delete: EnvironmentData.CLEAR_GUILD_APPLICATION_COMMANDS_ONREADY,
					update: !EnvironmentData.UPDATE_GUILD_APPLICATION_COMMANDS_ONREADY
				},
				log: true
			},
			global: {
				disable: {
					add: !EnvironmentData.REGISTER_GLOBAL_COMMANDS,
					delete: EnvironmentData.CLEAR_GLOBAL_APPLICATION_COMMANDS_ONREADY,
					update: !EnvironmentData.UPDATE_GLOBAL_APPLICATION_COMMANDS_ONREADY
				},
				log: true
			}
		});

		if (EnvironmentData.CLEAR_GUILD_APPLICATION_COMMANDS_ONREADY) {
			await container.client.clearApplicationCommands(...container.client.guilds.cache.map((g) => g.id));
			container.logger.warn({ title: `Application Commands Clear`, description: 'Cleared all guild commands' }, true, true);
		} else if (EnvironmentData.CLEAR_GLOBAL_APPLICATION_COMMANDS_ONREADY) {
			await container.client.clearApplicationCommands();
			container.logger.warn({ title: `Global Application Commands Clear`, description: 'Cleared all guild commands' }, true, true);
		}

		let guild = data.guilds.cache.get('1007254258686640301');
		let memberCount = 0;

		if (guild) memberCount = guild.memberCount;

		container.client.user?.setPresence({
			status: 'online',
			activities: [
				{
					name: `${memberCount} members`,
					type: ActivityType.Watching
				}
			]
		});

		container.logger.info('Bot is online!', false, true);
	}
}
