import { RateLimit, TIME_UNIT } from "@discordx/utilities";
import { ActionRowBuilder, ButtonBuilder, ButtonInteraction, ButtonStyle, CommandInteraction } from "discord.js";
import { Discord, Guard, Slash, ButtonComponent } from "discordx";
import ms from "ms";
import { container } from "../main.js";

@Discord()
export class Commands {
    @Slash("ping", {
        description: "Sends the bots websocket & latency information",
        dmPermission: true,
    })
    @Guard(
        RateLimit(TIME_UNIT.seconds, 10, {
            message: (ctx, time) =>
                container.utils.createStripIndents(`
		**Command Rate Limited!**
		You can use this command again in \`${ms(time)}\`.
		`),
            rateValue: 2
        }),
    )
    async command(interaction: CommandInteraction): Promise<void> {
        // Create the button, giving it the id: "ping-btn"
        const helloBtn = new ButtonBuilder()
            .setLabel("Pong!")
            .setEmoji("🏓")
            .setStyle(ButtonStyle.Success)
            .setCustomId("ping-btn");

        // Create a MessageActionRow and add the button to that row.
        const row = new ActionRowBuilder<ButtonBuilder>().addComponents(helloBtn);

        await container.utils.replyOrFollowUp(interaction, {
            components: [row],
        })

        setTimeout(async () => {
            await interaction.deleteReply();
        }, 10000);
    }

    // register a handler for the button with id: "ping-btn"
    @ButtonComponent("ping-btn")
    public async pingBtn(interaction: ButtonInteraction) {
        await interaction.deferReply();

        const ping = await interaction.editReply('Pinging...');

        await ping
            .edit(
                `Discord Latency: ${ms(ping.createdTimestamp - interaction.createdTimestamp)} | Bot Websocket Latency: ${ms(
                    container.client.ws.ping
                )}`
            )
            .catch(() => { });

    }
}