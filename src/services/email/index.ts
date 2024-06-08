import amqplib from 'amqplib';
import EmailDTO from 'src/dto/email.dto';

export const sendEmail = async (recipient: string, subject: string, content: string ) => {

  try {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const queue = 'emailQueue';

    const newEmail: EmailDTO = {
      recipient,
      subject,
      content,
      datetime: new Date(),
    };

    const message = JSON.stringify(newEmail);

    // Queue parameters
    await channel.assertQueue(queue, {
      durable: false,
    });

    channel.sendToQueue(queue, Buffer.from(message));
    console.log(" [x] Sent %s", message);

    setTimeout(() => {
      connection.close();
    }, 500);

  } catch (error) {
    console.error("Failed to send message", error);
  }
};