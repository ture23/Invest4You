// import nodemailer from 'nodemailer';
// import sendgridTransport from 'nodemailer-sendgrid-transport';

// export const sendEmail = async options => {
//   console.log('sendEmail');
//   // 1) Create a transporter
//  const transporter = nodemailer.createTransport(
//   sendgridTransport({
//     auth: {
//       api_key: process.env.SEND_GRID_API
//     }
//   })
// );
//   console.log('after transporter', process.env.SEND_GRID_API);
//   // 2) Define the email options
//   const mailOptions = {
//     from: 'invest4you365@gmail.com',
//     to: options.email,
//     subject: options.subject,
//     text: options.message
//     // html:
//   };
//   console.log('after mailOptions');
//   // 3) Actually send the email
//   // await transporter.sendMail(mailOptions);
//     try {
//     const info = await transporter.sendMail(mailOptions);
//     console.log('Email sent:', options.email);
//   } catch (error) {
//     console.log('Error:', error);
//   }

//   console.log('after sendMail');
// };

// export default  sendEmail;



// // host: process.env.EMAIL_HOST,
//     // port: process.env.EMAIL_PORT,



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


 export default  sendEmail