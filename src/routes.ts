import { Router }from 'express';
import EmailController from './controllers/EmailController';

const routes = Router();

const emailController = new EmailController();

routes.post ("/",  emailController.sendEmail);

export default routes;