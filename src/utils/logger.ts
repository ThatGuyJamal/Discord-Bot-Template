import { Client, EmbedBuilder, TextChannel } from "discord.js";
import type { EnvironmentData } from "../main.js";
import {Colors} from "./discord.js";

type messageOptions = {
    title?: string,
    description: string,
    timestamp?: boolean,
}

export class Logger {
    private env: typeof EnvironmentData
    private bot: Client
    public constructor(I_ENV: typeof EnvironmentData, client: Client) {
        this.env = I_ENV;
        this.bot = client;
    }

    /**
     *
     * @param message The message to log in infos
     * @param sendToChannel Whether or not to send the message to the channel logs in discord
     * @param sendToConsole Whether or not to send the message to the console
     * @returns
     */
    public info(message: string | messageOptions | EmbedBuilder, sendToChannel: boolean, sendToConsole: boolean) {
        if (!this.env.LOGS.info.enabled) return;

        if (sendToChannel) {
            let fetchChannel = this.bot.channels.cache.get(this.env.LOGS.info.channelId) as TextChannel
            if (fetchChannel) {
                if (typeof message === "string") {
                    fetchChannel.send({ content: message }).catch(() => { });
                } else if (message instanceof EmbedBuilder) {
                    fetchChannel.send({ embeds: [message] }).catch(() => { });
                } else {
                    let embed = new EmbedBuilder().setColor(Colors.White)

                    if (message.title) embed.setTitle(message.title)
                    if (message.description) embed.setDescription(message.description)
                    if (message.timestamp) embed.setTimestamp()

                    fetchChannel.send({
                        embeds: [embed]
                    }).catch(() => { });
                }
            }
        }

        if (sendToConsole) {
            if (message instanceof EmbedBuilder) {
                console.log(message.toJSON());
            } else {
                console.log(message);
            }
        }
    }

    /**
     *
     * @param message The message to log in warnings
     * @param sendToChannel Whether or not to send the message to the channel logs in discord
     * @param sendToConsole Whether or not to send the message to the console
     * @returns
     */
    public warn(message: string | messageOptions | EmbedBuilder, sendToChannel: boolean, sendToConsole: boolean) {
        if (!this.env.LOGS.warn.enabled) return;

        if (sendToChannel) {
            let fetchChannel = this.bot.channels.cache.get(this.env.LOGS.warn.channelId) as TextChannel
            if (fetchChannel) {
                if (typeof message === "string") {
                    fetchChannel.send({ content: message }).catch(() => { });
                } else if (message instanceof EmbedBuilder) {
                    fetchChannel.send({ embeds: [message] }).catch(() => { });
                } else {
                    let embed = new EmbedBuilder().setColor(Colors.Orange)

                    if (message.title) embed.setTitle(message.title)
                    if (message.description) embed.setDescription(message.description)
                    if (message.timestamp) embed.setTimestamp()

                    fetchChannel.send({
                        embeds: [embed]
                    }).catch(() => { });
                }
            }
        }

        if (sendToConsole) {
            if (message instanceof EmbedBuilder) {
                console.log(message.toJSON());
            } else {
                console.log(message);
            }
        }
    }

    /**
     *
     * @param message The message to log in errors
     * @param sendToChannel Whether or not to send the message to the channel logs in discord
     * @param sendToConsole Whether or not to send the message to the console
     * @returns
     */
    public error(message: string | messageOptions | EmbedBuilder, sendToChannel: boolean, sendToConsole: boolean) {
        if (!this.env.LOGS.error.enabled) return;

        if (sendToChannel) {
            let fetchChannel = this.bot.channels.cache.get(this.env.LOGS.error.channelId) as TextChannel
            if (fetchChannel) {
                if (typeof message === "string") {
                    fetchChannel.send({ content: message }).catch(() => { });
                } else if (message instanceof EmbedBuilder) {
                    fetchChannel.send({ embeds: [message] }).catch(() => { });
                } else {
                    let embed = new EmbedBuilder().setColor(Colors.Red)

                    if (message.title) embed.setTitle(message.title)
                    if (message.description) embed.setDescription(message.description)
                    if (message.timestamp) embed.setTimestamp()

                    fetchChannel.send({
                        embeds: [embed]
                    }).catch(() => { });
                }
            }
        }

        if (sendToConsole) {
            if (message instanceof EmbedBuilder) {
                console.log(message.toJSON());
            } else {
                console.log(message);
            }
        }
    }

    /**
     *
     * @param message The message to log in debugs
     * @param sendToChannel Whether or not to send the message to the channel logs in discord
     * @param sendToConsole Whether or not to send the message to the console
     * @returns
     */
    public debug(message: string | messageOptions | EmbedBuilder, sendToChannel: boolean, sendToConsole: boolean) {
        if (!this.env.DEBUG_MODE || !this.env.LOGS.debug.enabled) return;

        if (sendToChannel) {
            let fetchChannel = this.bot.channels.cache.get(this.env.LOGS.debug.channelId) as TextChannel
            if (fetchChannel) {
                if (typeof message === "string") {
                    fetchChannel.send({ content: message }).catch(() => { });
                } else if (message instanceof EmbedBuilder) {
                    fetchChannel.send({ embeds: [message] }).catch(() => { });
                } else {
                    let embed = new EmbedBuilder().setColor(Colors.Amber300)

                    if (message.title) embed.setTitle(message.title)
                    if (message.description) embed.setDescription(message.description)
                    if (message.timestamp) embed.setTimestamp()

                    fetchChannel.send({
                        embeds: [embed]
                    }).catch(() => { });
                }
            }
        }

        if (sendToConsole) {
            if (message instanceof EmbedBuilder) {
                console.log(message.toJSON());
            } else {
                console.log(message);
            }
        }
    }
}