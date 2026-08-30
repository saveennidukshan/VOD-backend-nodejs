import { createUserRecord, findUserByEmail, findUserById, updateUser } from './user.model.js';

export const normalizeEmail = (email) => String(email || '').trim().toLowerCase();

export const sanitizeUser = (user) => {
  if (!user) return null;
  return {
    id: user.id,
    email: user.email,
    role: user.role,
    isEmailVerified: user.isEmailVerified,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const createUser = ({ email, passwordHash, role, isEmailVerified }) => {
  return createUserRecord({
    email: normalizeEmail(email),
    passwordHash,
    role,
    isEmailVerified,
  });
};

export { findUserByEmail, findUserById, updateUser };
