// import { LoginFormSchema } from '@/app/lib/definition'
import { redirect } from 'next/navigation';

export async function login(credentials) {

  const response = await fetch("https://jk-go-52014148654.asia-southeast2.run.app/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials)
  })
  const data = await response.json();

  console.log(data)
  if (response.ok) {

    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data.user))

    redirect('/test');
    // console.log('hello')
    // return "Login Berhasil"
  } else {
    console.log('Login Gagal')
  }

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


  // Call the provider or db to create a user...
}