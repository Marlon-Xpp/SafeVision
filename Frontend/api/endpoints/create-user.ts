// import { apiRequest } from "../http"

// export const createUser = async (formData: any) => {
//   return await apiRequest("settings/create/user/", {
//     method: "POST",
//     body: JSON.stringify(formData),
//   })
// }



// import { apiRequest } from "../http";

// export const createUser = async (formData: any, token: string) => {
//   if (!token) {
//     console.error("❌ No se obtuvo token de autenticación");
//     throw new Error("No se obtuvo token de autenticación");
//   }

//   try {
//     const res = await apiRequest("settings/create/user/", {
//       method: "POST",
//       body: JSON.stringify(formData),
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`, // ✅ envía token
//       },
//     });
//     return res;
//   } catch (error: any) {
//     console.error("❌ Error en createUser:", error.message || error);
//     throw new Error(error.message || "Error al comunicarse con el backend");
//   }
// };



// // frontend/api/endpoints/create-user.ts
// import { apiRequest } from "../http"; // tu función genérica para fetch con token

// // Función para crear un usuario en el backend
// export const createUser = async (formData: any) => {
//   try {
//     const response = await apiRequest("settings/create/user/", {
//       method: "POST",
//       body: JSON.stringify(formData),
//     });

//     return response; // el backend devuelve { success: true, message: "Usuario creado correctamente." }
//   } catch (error) {
//     throw error; // el modal lo capturará y mostrará los errores
//   }
// };




// import { apiRequest } from "../http";

// export const createUser = async (formData: any) => {
//   const token = localStorage.getItem("access"); // 👈 tu token de login

//   // Construimos las cabeceras
//   const headers: Record<string, string> = {
//     "Content-Type": "application/json",
//   };

//   if (token) {
//     headers["Authorization"] = `Bearer ${token}`;
//   }

//   return await apiRequest("settings/create/user/", {
//     method: "POST",
//     body: JSON.stringify(formData),
//     headers,
//   });
// };



// export const createUser = async (formData: any) => {
//   const token = localStorage.getItem("access");
//   if (!token) throw new Error("No se encontró token de autenticación");

//   return await fetch("settings/create/user/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}`, // importante el "Bearer"
//     },
//     body: JSON.stringify(formData),
//   }).then(async (res) => {
//     if (!res.ok) {
//       const data = await res.json();
//       throw data; // lanza el error del backend
//     }
//     return res.json();
//   });
// };
// import { apiRequest } from "../http";

// export const createUser = async (formData: any, token: string) => {
//   if (!token) throw new Error("No se proporcionó token de autenticación");

//   return apiRequest("/settings/create/user/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${token}` // token debe ser access token
//     }
//     // ✅ enviar como string JSON
//   });
// };





// // frontend/api/endpoints/create-user.ts
// import { API_URL } from "../config"

// /**
//  * Crea un nuevo usuario (solo para administradores)
//  */
// export const createUser = async (data: any) => {
//   const token = localStorage.getItem("access")
//   if (!token) throw new Error("No autorizado. Inicie sesión nuevamente.")

//   // 🔹 Adaptamos los campos para el backend
//   const payload = {
//     first_name: data.firstName,
//     last_name: data.lastName,
//     username: data.username,
//     email: data.email,
//     phone: data.phone,
//     password: data.password,
//     role: data.role.toLowerCase(),
//   }

//   const response = await fetch("http://127.0.0.1:8000/api/settings/create/user/", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//     body: JSON.stringify(payload),
//   })

//   const responseData = await response.json().catch(() => ({}))

//   // ✅ Manejo detallado de errores
//   if (!response.ok) {
//     let message = "Error al registrar el usuario"

//     // Si el backend devuelve errores del serializer
//     if (responseData.errors) {
//       const errorMessages = Object.entries(responseData.errors)
//         .map(([field, msgs]) => `${field}: ${(msgs as string[]).join(", ")}`)
//         .join(" | ")
//       message = errorMessages
//     } 
//     // Si el backend devuelve un mensaje general
//     else if (responseData.message) {
//       message = responseData.message
//     } 
//     // Si el backend devuelve un 'detail'
//     else if (responseData.detail) {
//       message = responseData.detail
//     }

//     throw new Error(message)
//   }

//   // ✅ Usuario creado correctamente
//   return responseData
// }
