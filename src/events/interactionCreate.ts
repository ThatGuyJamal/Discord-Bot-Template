import type { ArgsOf, Client } from 'discordx';
import { Discord, On } from 'discordx';
import { container } from '../main.js';

@Discord()
export class Event {
    @On("interactionCreate")
    async onEvent([interaction]: ArgsOf<"interactionCreate">, _client: Client): Promise<void> {
        try {
            await container.client.executeInteraction(interaction)
        } catch (err) {
            container.logger.error({
                title: 'Interaction Command Error',
                description: `${err instanceof Error ? err.message : err}`,
                timestamp: true
            }, true, false);
        }
    }
}