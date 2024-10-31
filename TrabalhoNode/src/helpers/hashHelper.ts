import crypto from 'crypto';

export const hashPassword = (password: string): string => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

export const comparePassword = (senha: string, passwordHash: string): boolean => {
  return hashPassword(senha) === passwordHash;
};