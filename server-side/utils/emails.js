import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SEND_GRID_API || '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');

export const sendEmail = async options => {
  console.log(options);
  const msg = {
    to: options.email,
    from: 'invest4you365@gmail.com',
    subject: options.subject,
    text: options.message,
    templateId: process.env.SENDGRID_TEMPLATE_ID || 'd-e486fe6ca16d47e782fbe8a4fc0eed8d' , // Replace with your dynamic template ID
    dynamicTemplateData: {
      name: options.firstname, // Replace with the actual recipient's name
    }
  };

  try {
    const info = await sgMail.send(msg);
    console.log('Email sent:', options.email);
  }
  catch (error) {
    console.log('Error: email ', error);
  }
};

export const sendInfoEmail = async options => {

  const msg = {
    to: options.email,
    from: 'invest4you365@gmail@gmail.com',
    subject: options.subject,
    templateId: options.templateId,
    dynamicTemplateData: {
      text: options.message,
    }
  };

  try {
    const info = await sgMail.send(msg);
  }
  catch (error) {
    console.log('Error: email ', error);
  }


}

  export default ({sendEmail, sendInfoEmail})