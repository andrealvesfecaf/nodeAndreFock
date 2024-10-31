import { Pool } from "pg";
import database from "../config/database";
import { typeUser } from "../models/userModel";

export class UserRepository {
  private database: Pool;

  constructor() {
    this.database = database;
  }

  async addUser(name: string,email: string,passwordHash: string): Promise<typeUser> {
    const queryText = "INSERT INTO users(name, email, passwordhash) VALUES($1, $2, $3) RETURNING *";
    const { rows } = await this.database.query(queryText, [name,email,passwordHash]);
    return rows[0];
  }

  async getEmail(email: string): Promise<typeUser | null> {
    const { rows } = await this.database.query('SELECT name,email,passwordhash FROM users WHERE email = $1', [email]);
    return rows[0] || null;
  }
}