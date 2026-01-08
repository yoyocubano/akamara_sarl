
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://obijleonxnpsgpmqcdik.supabase.co';
const serviceRoleKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9iaWpsZW9ueG5wc2dwbXFjZGlrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NjM2Mzg2MSwiZXhwIjoyMDgxOTM5ODYxfQ.xl1XRMOAypy6FMYxKbVTB_LKjui2Vq7rHULs1Z0o55g';

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function createAdmin() {
    const email = 'admin@akamara.cu';
    const password = 'akamara2026';

    console.log(`Attempting to create/update user: ${email}`);

    // Admin API to create user with auto-confirm
    const { data, error } = await supabase.auth.admin.createUser({
        email: email,
        password: password,
        email_confirm: true
    });

    if (error) {
        console.error('Error creating user:', error.message);
        // If user exists, update password
        if (error.message.includes('already registered')) {
            console.log('User exists. Updating password...');
            const { data: listData } = await supabase.auth.admin.listUsers();
            const user = listData.users.find(u => u.email === email);

            if (user) {
                const { error: updateError } = await supabase.auth.admin.updateUserById(
                    user.id,
                    { password: password }
                );
                if (updateError) console.error('Error updating password:', updateError);
                else console.log('Password updated successfully!');
            }
        }
    } else {
        console.log('User created successfully:', data);
    }
}

createAdmin();
