import bcrypt from "bcryptjs";

export const createHash = async (password) => {
    return await bcrypt.hash(password, 10);
}

export const compareHash = async (password, hash) => {
    return await bcrypt.compare(password, hash);
}