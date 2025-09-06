import prisma from '../database/prisma';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import config from '../config';

export class AuthService {
  async register(data: { email: string; password: string; name?: string; isSeller?: boolean }) {
    const existing = await prisma.user.findUnique({ where: { email: data.email }});
    if (existing) throw { status: 400, message: 'Email already in use' };
    const hashed = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({
      data: { email: data.email, password: hashed, name: data.name, isSeller: data.isSeller ?? false }
    });
    const token = this.generateToken(user.id, user.email);
    return { user: { id: user.id, email: user.email, name: user.name, isSeller: user.isSeller }, token };
  }

  async login(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email }});
    if (!user) throw { status: 401, message: 'Invalid credentials' };
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw { status: 401, message: 'Invalid credentials' };
    const token = this.generateToken(user.id, user.email);
    return { user: { id: user.id, email: user.email, name: user.name, isSeller: user.isSeller }, token };
  }

  generateToken(userId: number, email: string) {
    return jwt.sign({ userId, email }, config.jwtSecret, { expiresIn: '7d' });
  }
}
