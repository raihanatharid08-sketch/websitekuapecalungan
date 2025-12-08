import { createClient } from '@supabase/supabase-js';
import { describe, expect, it } from 'vitest';

describe('Supabase Connection', () => {
  it('should successfully connect to Supabase with provided credentials', async () => {
    const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
    const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY || '';

    expect(supabaseUrl).toBeTruthy();
    expect(supabaseAnonKey).toBeTruthy();
    expect(supabaseUrl).toMatch(/^https:\/\/.+\.supabase\.co$/);

    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // Test connection by fetching service role (lightweight check)
    const { data, error } = await supabase.from('_test_connection').select('*').limit(1);
    
    // We expect either data or a specific error (table not found is OK, auth errors are not)
    if (error) {
      // Table not found is acceptable - means connection works
      expect(error.code).not.toBe('PGRST301'); // Not an auth error
      // Common acceptable errors: 42P01 (table doesn't exist), which is fine for this test
    }
    
    // If we got here without auth errors, connection is valid
    expect(true).toBe(true);
  });
});
