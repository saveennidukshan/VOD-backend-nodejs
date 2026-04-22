import transport from "../config/mail.js";

export const sendMail = async (data) => {
    try {
        const info = await transport.sendMail({
            from: '"Example Team" <team@example.com>', 
            to: data.email, 
            subject: "Hello", 
            text: "Hello world?", 
            html: `<b>${process.env.FRONTEND_PW_RESET_URL}?email=${data.email}&ts=${data.ts}&token=${data.hmac}</b>`
        });
        return true;
    } catch (err) {
        return false;
    }
}

