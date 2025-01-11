import { createClient } from '@supabase/supabase-js';

import { supabase } from './supabaseClient'; // Import your Supabase client



const supabaseUrl = 'https://vsmkcqccghgjbeovtqom.supabase.co'; // Replace with your Supabase URL
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzbWtjcWNjZ2hnamJlb3Z0cW9tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY2MjYyNDksImV4cCI6MjA1MjIwMjI0OX0.XKAh7Yky0mrM94QpiFNVcEG9fXUGb8FTDuI5wNztu40'; // Replace with your Supabase anon key
export const supabase = createClient(supabaseUrl, supabaseKey);

document.getElementById('signup-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    // Create user with Supabase Auth
    const { user, error } = await supabase.auth.signUp({
      email,
      password,
    });
  
    if (error) {
      console.error('Error signing up:', error.message);
      return;
    }
  
    // Save additional user profile information
    const { data, error: profileError } = await supabase
      .from('users')
      .insert([{ user_id: user.id, username }]);
  
    if (profileError) {
      console.error('Error creating profile:', profileError.message);
    } else {
      console.log('Profile created:', data);
    }
  });
  