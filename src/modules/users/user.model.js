import crypto from 'crypto';
import { db, hasDatabase } from '../../configs/db.js';
import { inMemoryUsers } from '../../models/inMemoryStore.js';

let initialized = false;

const mapUserRow = (row) => {
  if (!row) return null;
  return {
    id: row.id,
    email: row.email,
    passwordHash: row.password_hash,
    role: row.role,
    isEmailVerified: Boolean(row.is_email_verified),
    failedLoginAttempts: Number(row.failed_login_attempts || 0),
    lockUntil: row.lock_until ? new Date(row.lock_until) : null,
    passwordChangedAt: row.password_changed_at ? new Date(row.password_changed_at) : null,
    tokenVersion: Number(row.token_version || 0),
    resetPasswordTokenHash: row.reset_password_token_hash,
    resetPasswordExpiresAt: row.reset_password_expires_at ? new Date(row.reset_password_expires_at) : null,
    emailVerificationTokenHash: row.email_verification_token_hash,
    emailVerificationExpiresAt: row.email_verification_expires_at ? new Date(row.email_verification_expires_at) : null,
    createdAt: row.created_at ? new Date(row.created_at) : null,
    updatedAt: row.updated_at ? new Date(row.updated_at) : null,
  };
};

export const initUsersTable = async () => {
  if (!hasDatabase || initialized) return;
  await db.execute(`
    CREATE TABLE IF NOT EXISTS users_auth (
      id VARCHAR(36) PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      password_hash VARCHAR(255) NOT NULL,
      role VARCHAR(32) NOT NULL DEFAULT 'user',
      is_email_verified BOOLEAN NOT NULL DEFAULT FALSE,
      failed_login_attempts INT NOT NULL DEFAULT 0,
      lock_until DATETIME NULL,
      password_changed_at DATETIME NULL,
      token_version INT NOT NULL DEFAULT 0,
      reset_password_token_hash VARCHAR(255) NULL,
      reset_password_expires_at DATETIME NULL,
      email_verification_token_hash VARCHAR(255) NULL,
      email_verification_expires_at DATETIME NULL,
      created_at DATETIME NOT NULL,
      updated_at DATETIME NOT NULL
    )
  `);
  initialized = true;
};

export const createUserRecord = async ({ email, passwordHash, role = 'user', isEmailVerified = false }) => {
  await initUsersTable();
  const user = {
    id: crypto.randomUUID(),
    email,
    passwordHash,
    role,
    isEmailVerified,
    failedLoginAttempts: 0,
    lockUntil: null,
    passwordChangedAt: null,
    tokenVersion: 0,
    resetPasswordTokenHash: null,
    resetPasswordExpiresAt: null,
    emailVerificationTokenHash: null,
    emailVerificationExpiresAt: null,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  if (!hasDatabase) {
    inMemoryUsers.set(email, user);
    return { ...user };
  }

  await db.execute(
    `INSERT INTO users_auth (
      id,email,password_hash,role,is_email_verified,failed_login_attempts,lock_until,password_changed_at,token_version,
      reset_password_token_hash,reset_password_expires_at,email_verification_token_hash,email_verification_expires_at,created_at,updated_at
    ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      user.id,
      user.email,
      user.passwordHash,
      user.role,
      user.isEmailVerified,
      user.failedLoginAttempts,
      user.lockUntil,
      user.passwordChangedAt,
      user.tokenVersion,
      user.resetPasswordTokenHash,
      user.resetPasswordExpiresAt,
      user.emailVerificationTokenHash,
      user.emailVerificationExpiresAt,
      user.createdAt,
      user.updatedAt,
    ]
  );

  return user;
};

export const findUserByEmail = async (email) => {
  await initUsersTable();
  if (!hasDatabase) {
    const user = inMemoryUsers.get(email);
    return user ? { ...user } : null;
  }

  const [rows] = await db.execute('SELECT * FROM users_auth WHERE email = ? LIMIT 1', [email]);
  return mapUserRow(rows[0]);
};

export const findUserById = async (id) => {
  await initUsersTable();
  if (!hasDatabase) {
    for (const user of inMemoryUsers.values()) {
      if (user.id === id) return { ...user };
    }
    return null;
  }

  const [rows] = await db.execute('SELECT * FROM users_auth WHERE id = ? LIMIT 1', [id]);
  return mapUserRow(rows[0]);
};

export const updateUser = async (id, updates) => {
  await initUsersTable();

  if (!hasDatabase) {
    let existing;
    let existingKey;
    for (const [key, value] of inMemoryUsers.entries()) {
      if (value.id === id) {
        existing = value;
        existingKey = key;
        break;
      }
    }

    if (!existing) return null;

    const merged = {
      ...existing,
      ...updates,
      updatedAt: new Date(),
    };

    const nextKey = merged.email;
    inMemoryUsers.delete(existingKey);
    inMemoryUsers.set(nextKey, merged);
    return { ...merged };
  }

  const mappedUpdates = {
    email: updates.email,
    password_hash: updates.passwordHash,
    role: updates.role,
    is_email_verified: updates.isEmailVerified,
    failed_login_attempts: updates.failedLoginAttempts,
    lock_until: updates.lockUntil,
    password_changed_at: updates.passwordChangedAt,
    token_version: updates.tokenVersion,
    reset_password_token_hash: updates.resetPasswordTokenHash,
    reset_password_expires_at: updates.resetPasswordExpiresAt,
    email_verification_token_hash: updates.emailVerificationTokenHash,
    email_verification_expires_at: updates.emailVerificationExpiresAt,
    updated_at: new Date(),
  };

  const entries = Object.entries(mappedUpdates).filter(([, value]) => value !== undefined);
  if (!entries.length) return findUserById(id);

  const sql = entries.map(([key]) => `${key} = ?`).join(', ');
  const values = entries.map(([, value]) => value);

  await db.execute(`UPDATE users_auth SET ${sql} WHERE id = ?`, [...values, id]);
  return findUserById(id);
};
