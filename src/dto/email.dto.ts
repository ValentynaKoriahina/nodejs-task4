export interface EmailDTO {
  recipient: string;
  subject: string;
  content: string;
  datetime: Date;
}

export default EmailDTO;