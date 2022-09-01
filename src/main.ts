import 'reflect-metadata';

import { dirname, importx } from '@discordx/importer';
import { ProductionEnvironment } from './environment/env.js';
import { LocalEnvironment } from './environment/env.local.js';
import { Main } from './client.js';

// If true, the bot will load the env.local.js file.
// If false, the bot will load the env.js file.
export const canaryVsProdCheck = true;

// What type of data should be used for the environment
export const EnvironmentData = canaryVsProdCheck ? LocalEnvironment : ProductionEnvironment;

export const container = new Main();

async function run() {
	await importx(dirname(import.meta.url) + '/{commands,events}/**/*.{ts,js}');
	await container.client.login(EnvironmentData.BOT_TOKEN);
}

// This cant be async or the bot will not start
run();

process.on('unhandledRejection', (err) => {
	console.error(err);
	// process.exitCode = 1;
});

process.on('uncaughtException', (err) => {
	console.error(err);
	// process.exitCode = 1;
});
