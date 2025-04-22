'use server';

import { query } from './db';

export async function testNetworkingSubcategories() {
  console.log("Testing subcategories for Networking (ID 1)");
  
  try {
    // Direct SQL query to get subcategories for category ID 1
    const queryStr = `
      SELECT * FROM categories WHERE parent_id = 1
    `;
    
    console.log("Executing direct SQL query:", queryStr);
    const data = await query(queryStr);
    console.log("Direct query result:", JSON.stringify(data));
    
    return data || [];
  } catch (error) {
    console.error("Error in test function:", error);
    return [];
  }
}
