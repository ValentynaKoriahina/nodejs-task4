import amqplib from 'amqplib';
import EmailDTO from 'src/dto/email.dto';

/**
 * Sends the message to the RabbitMQ queue for further processing.
 */
export const publishMessage  = async (message: EmailDTO, queue: string) => {

  // Connect to RabbitMQ
  const connection = await amqplib.connect('amqp://localhost');
  const channel = await connection.createChannel();

  // Queue parameters
  await channel.assertQueue(queue, {
    durable: false,
  });

  const payload = JSON.stringify(message);

  channel.sendToQueue(queue, Buffer.from(payload));
  console.log(" [x] Sent %s", payload);

  setTimeout(() => {
    connection.close();
  }, 500);

};
