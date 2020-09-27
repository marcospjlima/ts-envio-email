import { Request, Response} from 'express';
import mail from '../services/mail';

class EmailController {

    async sendEmail( request: Request, response: Response) {
        try {
            const message = Object.assign({}, request.body);

            mail.to = message.to;
            mail.subject = message.subject;
            mail.message = message.message;

            let codRetorno = await mail.enviar();
            console.log('codRetorno: ' + codRetorno);

            if (Number(codRetorno) === 200){
                return response.status(200).json({
                    sucess: 'Enviado com sucesso'
                });
            } else {
                return response.status(450).json({
                    error: 'Unexpected error while sending new email'
                });
            }

        } catch (error) {
            return response.status(450).json({
                error: 'Unexpected error while sending new email'
            });
        }
    }
}

export default EmailController;