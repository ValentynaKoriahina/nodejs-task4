import EmailDTO from 'src/dto/email.dto';
import { publishMessage } from 'src/services/messageBroker';


/**
 * Sends the email message to the RabbitMQ queue for further processing.
 *
 * @param {string} recipient - Email address of the recipient.
 * @param {string} subject - Subject of the email.
 * @param {string} content - The content of the email.
 */
export const sendEmail = async (recipient: string, subject: string, content: string ) => {

  try {
  
    const newEmail: EmailDTO = {
      recipient,
      subject,
      content,
      datetime: new Date(),
    };

    // Sending an e-mail via Message Broker to a separate e-mail service
    publishMessage(newEmail, 'emailQueue');


  } catch (error) {
    console.error("Failed to send message", error);
  }
};
