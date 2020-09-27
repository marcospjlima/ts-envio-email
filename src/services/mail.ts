import nodemailer from "nodemailer";

class Mail {

    constructor(
        public to?: string,
        public subject?: string,
        public message?: string) { }


    sendMail() {

        const from = process.env.V_FROM;
        const porta = process.env.V_PORTA;
        const smtpHost = process.env.V_HST;
        const usr = process.env.V_USR;
        const pwd = process.env.V_PWD;

        let mailOptions = {
            //from: "2e2300427c-f2af4a@inbox.mailtrap.io",            
            from: from,
            to: this.to,
            subject: this.subject,
            html: this.message
        };

        var transporter = nodemailer.createTransport({
            
            host: process.env.V_HST,
            port: Number(porta),            
            auth: {
              user: process.env.V_USR,
              pass: process.env.V_PWD
            },
            tls: { rejectUnauthorized: false }
        });
        
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return console.log('#Error: ' + error);
                //return error;
            } else {
                return  console.log('Message sent: %s', info.messageId);
                //return JSON.stringify("E-mail enviado com sucesso!");
            }
        });
    }

    async enviar() {

        const from = process.env.V_FROM;
        const porta = process.env.V_PORTA;
        const smtpHost = process.env.V_HST;
        const usr = process.env.V_USR;
        const pwd = process.env.V_PWD;

        let mailOptions = {
            //from: "2e2300427c-f2af4a@inbox.mailtrap.io",            
            from: from,
            to: this.to,
            subject: this.subject,
            html: this.message
        };

        // Generate test SMTP service account from ethereal.email
        // Only needed if you don't have a real mail account for testing
        //let testAccount = await nodemailer.createTestAccount();
      
        let transporter = nodemailer.createTransport({            
            host: process.env.V_HST,
            port: Number(porta),            
            auth: {
              user: process.env.V_USR,
              pass: process.env.V_PWD
            },
            tls: { rejectUnauthorized: false }
        });

        try {
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: from,
                to: this.to,
                subject: this.subject,
                html: this.message
            });
            
            console.log("Message sent: %s", info.messageId);
            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            
            // Preview only available when sending through an Ethereal account
            console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
            
            console.log('info.messageId: ' + info.messageId);
            return Number(200);
        } catch (error) {
            console.log('error: ' + error);
            return Number(401);
        }
        
    }
      
}

export default new Mail;