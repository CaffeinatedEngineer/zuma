const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '.env.local' });

async function setupAllTables() {
  try {
    const sql = neon(process.env.DATABASE_URL);
    
    console.log('🔌 Connecting to NeonDB...');
    
    // Create users table
    console.log('👥 Creating users table...');
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email VARCHAR(255) UNIQUE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        full_name VARCHAR(255),
        customer_id VARCHAR(255) UNIQUE,
        price_id VARCHAR(255),
        status VARCHAR(50) DEFAULT 'inactive'
      )
    `;
    console.log('✅ Users table created successfully');
    
    // Create pdf_summaries table (already exists but ensuring it's there)
    console.log('📋 Creating pdf_summaries table...');
    await sql`
      CREATE TABLE IF NOT EXISTS pdf_summaries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id VARCHAR(255) NOT NULL,
        original_file_url TEXT NOT NULL,
        summary_text TEXT NOT NULL,
        status VARCHAR(50) DEFAULT 'completed',
        title TEXT,
        file_name TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ PDF summaries table created successfully');
    
    // Create payments table
    console.log('💳 Creating payments table...');
    await sql`
      CREATE TABLE IF NOT EXISTS payments (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        amount INTEGER NOT NULL,
        status VARCHAR(50) NOT NULL,
        stripe_payment_id VARCHAR(255) UNIQUE NOT NULL,
        price_id VARCHAR(255) NOT NULL,
        user_email VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;
    console.log('✅ Payments table created successfully');
    
    // Verify all tables were created
    console.log('🔍 Verifying all tables...');
    const tables = await sql`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_type = 'BASE TABLE'
      ORDER BY table_name
    `;
    
    console.log('📋 Available tables:');
    tables.forEach(table => {
      console.log(`  - ${table.table_name}`);
    });
    
    console.log('🎉 All database tables set up successfully!');
    
  } catch (error) {
    console.error('❌ Error setting up tables:', error.message);
  }
}

setupAllTables();
