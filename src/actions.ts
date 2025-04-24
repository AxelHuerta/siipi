// actions.ts
export async function directLogin(username: string, password: string) {
  try {
    // Configuración CORRECTA para no-cors
    const response = await fetch("https://siipi.izt.uam.mx/login_check", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        _username: username,
        _password: password,
        _remember_me: "on",
      }),
      mode: "no-cors",
      credentials: "include",
      redirect: "follow", // ¡Debe ser 'follow' cuando usas 'no-cors'!
    });

    console.log("Response:", response.body);

    // Nota: En modo 'no-cors' no podrás leer la respuesta directamente
    // Pero las cookies se guardarán automáticamente si son seguras/HttpOnly

    return { success: true };
  } catch (error) {
    console.error("Direct login error:", error);
    throw new Error("No se pudo completar el login");
  }
}
