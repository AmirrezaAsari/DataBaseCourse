import { Inject, Injectable } from '@nestjs/common';
import { Pool, RowDataPacket, FieldPacket, OkPacket } from 'mysql2/promise';

@Injectable()
export class UserService {
  constructor(
    @Inject('DATABASE_CONNECTION') private readonly connection: Pool,
  ) {}

  async findAll(): Promise<any[]> {
    const [rows, fields]: [RowDataPacket[], FieldPacket[]] =
      await this.connection.query('SELECT * FROM user');
    return rows;
  }

  async findOne(id: number): Promise<any> {
    const [rows, fields]: [RowDataPacket[], FieldPacket[]] =
      await this.connection.query('SELECT * FROM user WHERE id = ?', [id]);
    return rows[0];
  }

  async create(user: any): Promise<OkPacket> {
    const [result]: [OkPacket, FieldPacket[]] = await this.connection.query(
      'INSERT INTO user (name, email, password, type) VALUES (?, ?, ?, ?)',
      [user.name, user.email, user.password, user.type],
    );
    return result;
  }

  async update(id: number, user: any): Promise<OkPacket> {
    const [result]: [OkPacket, FieldPacket[]] = await this.connection.query(
      'UPDATE user SET name = ?, email = ?, password = ?, type = ? WHERE id = ?',
      [user.name, user.email, user.password, user.type, id],
    );
    return result;
  }

  async delete(id: number): Promise<OkPacket> {
    const [result]: [OkPacket, FieldPacket[]] = await this.connection.query(
      'DELETE FROM user WHERE id = ?',
      [id],
    );
    return result;
  }

  async findByEmail(email: string): Promise<any> {
    const [rows, fields]: [RowDataPacket[], FieldPacket[]] =
      await this.connection.query('SELECT * FROM user WHERE email = ?', [email]);
    return rows[0];
  }
}
