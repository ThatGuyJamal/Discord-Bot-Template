import {
    type GuildMember,
    Interaction,
    Message,
    type Role,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle,
    ColorResolvable,
    EmbedBuilder,
    HexColorString,
    CacheType,
    CommandInteraction,
    Guild,
    TextChannel,
    InteractionReplyOptions,
    MessageComponentInteraction
} from 'discord.js';
import minIndent from 'min-indent';
import type { container } from '../main.js';

export const Constants = {
    default_embed_color: '#4D9CBE' as HexColorString
};

export interface ICustomEmbed {
    description?: string;
    footer?: string;
    color?: ColorResolvable;
    title?: string;
    fields?: { name: string; value: string }[];
    thumbnail?: string;
    image?: string;
    author?: { name: string; icon_url?: string };
    timestamp?: boolean;
}

export interface IErrorEmbedWithButton {
    errorMessage: string;
    errorURL: string;
    errorLabel?: string;
    errorTitle?: string;
}

export const ZeroWidthSpace = '\u200B';
export const LongWidthSpace = '\u3000';
export const anyMentionRegExp = /<(@[!&]?|#)(\d{17,19})>/g;

export class DiscordUtils {
    private container: typeof container;
    public constructor(c: typeof container) {
        this.container = c;
    }
    /**
     * Helpful function when working with advanced commands. We can search for the name of the sub command within the interaction data.
     * @param interaction
     * @param subCommandName The name of the subcommand to search for.
     * @returns A status result and message
     */
    public findApplicationCommandSubcommand(interaction: CommandInteraction<CacheType>, subCommandName: string) {
        if (!interaction.isChatInputCommand())
            return {
                status: false,
                message: 'This is not a application command!'
            };

        if (interaction.options.getSubcommand() !== subCommandName)
            return {
                status: false,
                message: 'Invalid subcommand'
            };

        return {
            message: 'Valid subcommand found',
            status: true
        };
    }
    /**
     * Checks if we have permissions to manage a role
     * @param role The role to check for.
     * @param context of the message / interaction data
     * @returns
     */
    public isRoleManageable(role: Role, context: Message | Interaction): boolean {
        if (role.managed) return false;

        // If we aren't in a guild, we can't manage roles. We can't do anything.
        if (!context.guild) return false;

        // Checks if the role is above the bots highest role.
        if (role.position > (context.guild.members.me as GuildMember).roles.highest.position) return false;

        return true;
    }

    /**
     * Picks a random value from an array.
     * @param array The array to pick from.
     * @returns {any} The random value from the array.
     */
    public pickRandomArray(array: Array<any>) {
        if (!array) throw new Error('No array was provided!');
        return array[Math.floor(Math.random() * array.length)];
    }
    /**
     * Generates a random number between a min and max.
     * @param min The minimum value.
     * @param max The maximum value.
     * @returns {number} A random number between the minimum and maximum value.
     */
    public randomNumberGenerator(min: number, max: number) {
        if (!min || !max) throw new Error('No min or max was provided!');
        if (min > max) throw new Error('Min cannot be greater than max!');
        if (max < min) throw new Error('Max cannot be less than min!');
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    public CreateCustomEmbed = ({ description, footer, color, title, author, thumbnail, image, fields, timestamp }: ICustomEmbed): EmbedBuilder => {
        const embed = new EmbedBuilder();

        if (description) {
            embed.setDescription(description);
        }

        if (footer) {
            embed.setFooter({
                text: footer
            });
        }

        if (color) {
            embed.setColor(color);
        } else {
            embed.setColor(Constants.default_embed_color);
        }
        if (title) {
            embed.setTitle(title);
        }
        if (fields) {
            embed.addFields(fields);
        }
        if (thumbnail) {
            embed.setThumbnail(thumbnail);
        }
        if (image) {
            embed.setImage(image);
        }
        if (author) {
            embed.setAuthor({
                name: author.name,
                iconURL: author.icon_url
            });
        }
        if (timestamp) {
            embed.setTimestamp();
        }

        return embed;
    };

    /**
     * Util function for creating simple error embeds.
     * @returns
     */
    public createErrorEmbedWithButton({ errorMessage, errorLabel, errorTitle, errorURL }: IErrorEmbedWithButton) {
        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel(errorLabel ?? 'Error')
                .setEmoji('❌')
                .setStyle(ButtonStyle.Link)
                .setURL(errorURL)
        );

        const embed = this.CreateCustomEmbed({
            title: errorTitle ?? 'Error occurred',
            description: errorMessage,
            color: 'Red',
            timestamp: true
        });

        return { row, embed };
    }
    /**
     * Allows for easy string indenting
     * @param str String to indent
     * @returns {string} The indented string
     */
    public createStripIndents(str: string) {
        const indent = minIndent(str);

        if (indent === 0) {
            return str;
        }

        const regex = new RegExp(`^[ \\t]{${indent}}`, 'gm');

        return str.replace(regex, '');
    }

    /**
     * Wraps the content inside a codeblock with the specified language
     * @param language The language for the codeblock
     * @param code The code to wrap
     * @returns The formatted string
     */
    public createCodeBlock(
        language:
            | 'asciidoc'
            | 'autohotkey'
            | 'bash'
            | 'coffeescript'
            | 'cpp'
            | 'cs'
            | 'css'
            | 'diff'
            | 'fix'
            | 'glsl'
            | 'ini'
            | 'json'
            | 'md'
            | 'ml'
            | 'prolog'
            | 'py'
            | 'tex'
            | 'xl'
            | 'js'
            | 'ts'
            | 'xml'
            | 'text',
        code: string
    ) {
        return `\`\`\`${language}\n${this.createStripIndents(code)}\`\`\``;
    }
    /**
     * Wraps the content inside \`backtick's\`, which formats it as inline code
     * @param content The content to wrap
     */
    public createInlineCode<C extends string>(content: C): `\`${C}\`` {
        return `\`${content}\``;
    }
    /**
     * Clean all mentions from a body of text
     * @param guild The guild for context
     * @param input The input to clean
     * @returns The input cleaned of mentions
     * @license Apache-2.0
     * @copyright 2019 Antonio Román
     */
    public cleanMentions(guild: Guild, input: string) {
        return input.replace(/@(here|everyone)/g, `@${ZeroWidthSpace}$1`).replace(/<(@[!&]?|#)(\d{17,19})>/g, (match, type, id) => {
            switch (type) {
                case '@':
                case '@!': {
                    const tag = guild.client.users.cache.get(id);
                    return tag ? `@${tag.username}` : `<${type}${ZeroWidthSpace}${id}>`;
                }
                case '@&': {
                    const role = guild.roles.cache.get(id);
                    return role ? `@${role.name}` : match;
                }
                case '#': {
                    const channel = guild.channels.cache.get(id);
                    return channel ? `#${channel.name}` : `<${type}${ZeroWidthSpace}${id}>`;
                }
                default:
                    return `<${type}${ZeroWidthSpace}${id}>`;
            }
        });
    }

    /**
     * Capitalizes the first letter of a string
     * @param word The word to capitalize
     * @returns The capitalized word
     */
    public capitalizeFirstLetter(word: string) {
        return word[0].toUpperCase() + word.slice(1);
    }
    /**
     * A markdown function to make hyperlinks in an embed message
     * @param name  The name of the link
     * @param url  The url of the link
     * @returns The hyperlink
     */
    public createHyperLink(name: string, url: string): string {
        if (url.length < 5 || !url.includes('https://' || 'http://')) return `~~broken link~~`;
        return `[${name}](${url})`;
    }

    /**
     * Stops a link from creating embedded content in discord.
     * @param str The string to format
     * @returns
     */
    public disableLinkEmbeddedContent(str: string) {
        return `<${str}>`;
    }

    /**
     * Sends messages to select channels
     * @param channelId The channel to send the message
     * @param context what to send to the channel
     * @returns
     */
    public async createChannelMessage(channelId: string, context: string | EmbedBuilder) {
        const channel = this.container.client.channels.cache.get(channelId) as TextChannel;
        if (!channel) return;
        if (typeof context === 'string') {
            await channel
                .send({
                    content: context
                })
                .catch(() => { });
        } else {
            await channel
                .send({
                    embeds: [context]
                })
                .catch(() => { });
        }
    }

    /**
     * format's a channel id into a link in discord.
     * @param id The id of the channel
     * @returns
     */
    public createChannelMention(id: string | null): string {
        if (id) {
            if (id.length < 1) {
                return 'No channel';
            }
            return `<#${id}>`;
        } else {
            return 'No channel';
        }
    }
    /**
     * format's a member id into a link in discord.
     * @param id The id of the member
     * @returns
     */
    public createMemberMention(id: string | null): string {
        if (id) {
            if (id.length < 1) {
                return 'No member';
            }
            return `<@${id}>`;
        } else {
            return 'No member';
        }
    }
    /**
     * format's a role into a link in discord.
     * @param id The id of the role
     * @returns The role mention
     */
    public createRoleMention(id: string | null): string {
        if (id) {
            if (id.length < 1) {
                return 'No role';
            }
            return `<@&${id}>`;
        } else {
            return 'No role';
        }
    }

    /**
     * Converts a color xCode to a hex string
     * @param color
     * @returns
     */
    public colorToStyle(color: Colors): string {
        return `color: #${color.toString(16)}`;
    }

    /**
     * Creates a random code from a given length and the current data time in milliseconds
     * @param length The length of the string
     * @returns
     */
    public generateRandomCode(length: number): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';

        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));

            // add the date to the end of the password to make it more unique
            result += new Date().getTime()

            // mix the characters up based on the length of the password
            result = result.split('').sort(() => 0.5 - Math.random()).join('');

            // remove the date from the end of the password
            result = result.substring(0, result.length - 10);
        }

        return result;
    }

    /**
     * handles interaction reply's with safely checks for the existence of the message
     * @param interaction The interaction
     * @param replyOptions The reply options
     * @returns
     */
    public async replyOrFollowUp(interaction: CommandInteraction | MessageComponentInteraction, replyOptions: (InteractionReplyOptions & { ephemeral?: boolean }) | string): Promise<void> {
        // if interaction is already replied
        if (interaction.replied) {
            await interaction.followUp(replyOptions);
            return;
        }

        // if interaction is deferred but not replied
        if (interaction.deferred) {
            await interaction.editReply(replyOptions);
            return;
        }

        // if interaction is not handled yet
        await interaction.reply(replyOptions);
    }
}

export enum Milliseconds {
    Year = 1000 * 60 * 60 * 24 * 30 * 12,
    Month = 1000 * 60 * 60 * 24 * 30,
    Week = 1000 * 60 * 60 * 24 * 7,
    Day = 1000 * 60 * 60 * 24,
    Hour = 1000 * 60 * 60,
    Minute = 1000 * 60,
    Second = 1000
}

/**
 * An enum with all the available faces from Discord's native slash commands
 */
export enum Faces {
    /**
     * ¯\\_(ツ)\\_/¯
     */
    Shrug = '¯\\_(ツ)\\_/¯',
    /**
     * (╯°□°）╯︵ ┻━┻
     */
    Tableflip = '(╯°□°）╯︵ ┻━┻',
    /**
     * ┬─┬ ノ( ゜-゜ノ)
     */
    Unflip = '┬─┬ ノ( ゜-゜ノ)'
}

export const enum Colors {
    White = 0xe7e7e8,
    Amber = 0xffc107,
    Amber300 = 0xffd54f,
    Blue = 0x2196f3,
    BlueGrey = 0x607d8b,
    Brown = 0x795548,
    Cyan = 0x00bcd4,
    DeepOrange = 0xff5722,
    DeepPurple = 0x673ab7,
    Green = 0x4caf50,
    Grey = 0x9e9e9e,
    Indigo = 0x3f51b5,
    LightBlue = 0x03a9f4,
    LightGreen = 0x8bc34a,
    Lime = 0xcddc39,
    Lime300 = 0xdce775,
    Orange = 0xff9800,
    Pink = 0xe91e63,
    Purple = 0x9c27b0,
    Red = 0xf44336,
    Red300 = 0xe57373,
    Teal = 0x009688,
    Yellow = 0xffeb3b,
    Yellow300 = 0xfff176
}