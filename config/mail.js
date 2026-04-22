import nodemailer from 'nodemailer'

const transport = nodemailer.createTransport({
    service: "gmail",
    port: 547,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

try{
    transport.verify();
    console.log("email server working")
}catch(e){
    console.log("email error")
}


export default transport;