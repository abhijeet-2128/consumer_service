import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConsumerService } from './consumer.service';
import * as nodemailer from 'nodemailer';
@Injectable()
export class KafkaService {
    constructor(private readonly consumerService:ConsumerService){}
    public async fun(){
        await this.consumerService.consume(
          
          { topics: ['orders'] },
          {
              eachMessage: async({ topic, partition, message })=>{          

                const transporter = nodemailer.createTransport({
                  service: 'gmail',
                  host: 'smtp.gmail.com',
                  port: 465,
                  secure: true,
                  auth: {
                    user: 'abhijeet.srivastava@appinventiv.com',
                    pass: 'rroaiegawtshpbed',
                  },
                });
                const mailOptions = {
                  from: 'abhijeet.srivastava@appinventiv.com',
                  to: 'abhijeet.srivastava@appinventiv.com',
                  subject: 'Order confirmation email',
                  html: `
                  <html>
                      <head>
                          <style>
                              body {
                                  font-family: 'Arial', sans-serif;
                              }
                              .container {
                                  max-width: 600px;
                                  margin: 0 auto;
                                  padding: 20px;
                                  border: 1px solid #ccc;
                                  border-radius: 5px;
                              }
                              .header {
                                  font-size: 18px;
                                  font-weight: bold;
                                  margin-bottom: 20px;
                              }
                              .order-details {
                                  font-size: 16px;
                                  margin-bottom: 10px;
                              }
                          </style>
                      </head>
                      <body>
                          <div class="container">
                              <div class="header">Order placed successfully</div>
                              <div class="order-details">
                                  ${message.value.toString()}
                              </div>
                          </div>
                      </body>
                  </html>
              `,
          };
                transporter.sendMail(mailOptions, (error, info) => {
                  if (error)
                    throw new InternalServerErrorException('Error sending email');
                  else
                    console.log('Email sent: ' + info.response);
                })
              }
    
          }
      )
               
      }
}