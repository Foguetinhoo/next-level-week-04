import nodemailer, { Transporter } from 'nodemailer';

class SendMailService {
    public nodeMailer = nodemailer;
    private client: Transporter
    constructor() {
        nodemailer.createTestAccount().then((account) => {
            // if (err) {
            //     console.log('Failed mano', err.message)
            //     return process.exit(1)
            // }
            const transporter = this.nodeMailer.createTransport({
                host: account.smtp.host,
                port: account.smtp.port,
                secure: account.smtp.secure,
                auth: {
                    user: account.user,
                    pass: account.pass
                }
            })

            this.client = transporter
        })
    }
    async execute(to:string, subject:string, text:string) {
        const message = await this.client.sendMail({
            from: "NPS <noreplay@nps.com.br>",
            to,
            html: `<p> ${text}</p>`,
            subject
        })
        console.log('Message sent: %s', message.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', this.nodeMailer.getTestMessageUrl(message));
        return message
    }
}

export default new  SendMailService 
