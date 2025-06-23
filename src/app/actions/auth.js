// import { LoginFormSchema } from '@/app/lib/definition'
import { redirect } from 'next/navigation';
 
export async function login(state, formData) {


  // Validate form fields
//   const validatedFields = LoginFormSchema.safeParse({
//     email: formData.get('email'),
//     password: formData.get('password'),
//   })
 
//   // If any form fields are invalid, return early
//   if (!validatedFields.success) {
//     return {
//       errors: validatedFields.error.flatten().fieldErrors,
//     }
//   }

   redirect('/test');
 
  // Call the provider or db to create a user...
}