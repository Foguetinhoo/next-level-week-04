import nodemailer, { Transporter } from 'nodemailer';

import handlebars from 'handlebars'
import fs from 'fs';
class SendMailService {
    public nodeMailer = nodemailer;
    private client: Transporter
    constructor() {
        this.nodeMailer.createTestAccount().then((account) => {
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
    async execute(to: string, subject: string, variables:object,path:string) {
       
        const templateFileContent = fs.readFileSync(path).toString("utf-8");
        const mailTemplateParse = handlebars.compile(templateFileContent)

        const html = mailTemplateParse(variables)
        const message = await this.client.sendMail({
            from: "NPS <noreplay@nps.com.br>",
            to,
            html,
            subject
        })
        console.log('Message sent: %s', message.messageId);
        console.log('Preview URL: %s', this.nodeMailer.getTestMessageUrl(message));
        return message
    }
}

export default new  SendMailService 
