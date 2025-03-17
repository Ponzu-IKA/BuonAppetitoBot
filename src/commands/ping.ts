import {isMessageInstance} from '@sapphire/discord.js-utilities';
import {Command} from '@sapphire/framework';

export class PingCommand extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {...options});
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand((builder) =>
            builder.setName('ping').setDescription('ボットが動作しているかどうかを確認するためにpingを送信します。')
        );
    }

    public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
        const msg = await interaction.reply({content: `Ping?`, ephemeral: true, fetchReply: true});

        if (isMessageInstance(msg)) {
            const diff = msg.createdTimestamp - interaction.createdTimestamp;
            const ping = Math.round(this.container.client.ws.ping);
            return interaction.editReply(`Pong 🏓! (往復にかかった時間: ${diff}ms. ハートビート: ${ping}ms.)`);
        }

        return interaction.editReply('ping を取得できませんでした :(');
    }
}