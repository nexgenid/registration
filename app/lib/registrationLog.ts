"use server";

import pool from './neon';

export async function updateDocumentStatus(accountId: string) {
  try {
    // Check if a row for this user already exists
    const checkQuery = `SELECT * FROM registration_log WHERE user_id = $1`;
    const checkRes = await pool.query(checkQuery, [accountId]);

    if (checkRes.rows.length > 0) {
      // Update existing row (set status back to processing when re-submitting)
      const updateQuery = `UPDATE registration_log SET document = true, status = 'processing' WHERE user_id = $1`;
      await pool.query(updateQuery, [accountId]);
    } else {
      // Insert new row
      const insertQuery = `INSERT INTO registration_log (user_id, document, status) VALUES ($1, true, 'processing')`;
      await pool.query(insertQuery, [accountId]);
    }
    
    return { success: true };
  } catch (error: any) {
    console.error("Error updating document status:", error);
    return { success: false, error: error.message || "Failed to update status" };
  }
}

export async function getRegistrationStatus(accountId: string) {
  try {
    const query = `SELECT document, status, remark FROM registration_log WHERE user_id = $1`;
    const res = await pool.query(query, [accountId]);
    if (res.rows.length > 0) {
      return { success: true, data: res.rows[0] };
    }
    return { success: true, data: { document: false, status: 'pending', remark: null } };
  } catch (error: any) {
    console.error("Error fetching registration status:", error);
    return { success: false, error: error.message || "Failed to fetch status" };
  }
}
