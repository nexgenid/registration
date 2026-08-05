"use server";

import pool from './neon';

export type UserRole = 'admin' | 'user' | string; // Adjust based on your actual database roles

export interface RegistrationResult {
  account_id: string;
  username: string;
  name: string;
  email: string;
  phone: string;
  type: string;
}

/**
 * Registers a new user into the account database.
 * 
 * Note: In a production environment, ensure that the `password` is hashed 
 * (e.g., using bcrypt) before calling this function or within this function 
 * if you add a hashing library to your project.
 */
export async function registerUser(
  username: string,
  name: string,
  email: string,
  phone: string,
  password: string,
  type: UserRole = 'member'
): Promise<RegistrationResult> {
  const query = `
    INSERT INTO account (username, name, email, phone_number, password, type)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING account_id, username, name, email, phone_number, type;
  `;

  const values = [username, name, email, phone, password, type];

  try {
    const result = await pool.query(query, values);
    const newUser = result.rows[0] as RegistrationResult;

    // Automatically add the user to registration_log with 'Registered' status
    try {
      const logQuery = `
        INSERT INTO registration_log (user_id, document, status, remark)
        VALUES ($1, false, 'Registered', NULL)
      `;
      await pool.query(logQuery, [newUser.account_id]);
    } catch (logError) {
      console.error('Error inserting into registration_log:', logError);
      // We log the error but still return the user, or you can throw if you want strict consistency
    }

    return newUser;
  } catch (error) {
    console.error('Error inserting into account:', error);
    throw new Error('Registration failed');
  }
}

export async function loginUser(email: string, password: string): Promise<RegistrationResult> {
  const query = `
    SELECT * 
    FROM account
    WHERE email = $1 AND password = $2;
  `;

  const values = [email, password];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      throw new Error('Email tidak ditemukan');
    }
    
    const user = result.rows[0];
    
    // Note: In a production environment, use a secure password comparison
    // like bcrypt.compare(password, user.password)
    if (user.password !== password) {
      throw new Error('Kata sandi salah');
    }
    
    // Omit password from result
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword as RegistrationResult;
  } catch (error: any) {
    console.error('Login error:', error);
    throw new Error(error.message || 'Login failed');
  }
}
