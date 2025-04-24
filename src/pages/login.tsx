import { GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { env } from "process";

const API_URL = env.API_URL || "http://localhost:3000/api";

export default function LoginPage() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { id, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  }

  async function handleForm() {
    const response = await axios
      .post(`${API_URL}/proxy-login`, data)
      .then((res) => res)
      .catch((err) => err);
    console.log(response.data);

    if (response.status === 200) {
      console.log("Login successful");

      console.log("cookies: ", response.data.cookies.length);
      if (response.data.cookies.length != 2) {
        console.error("Login failed");
        return;
      }
      const cookie1 = response.data.cookies[0];
      const cookieElements1 = cookie1.split(";");

      const cookie2 = response.data.cookies[1];
      const cookieElements2 = cookie2.split(";");

      const name1 = cookieElements1[0].split("=")[0];
      const value1 = cookieElements1[0].split("=")[1];
      const expires1 = cookieElements1[1].split("=")[1];

      const name2 = cookieElements2[0].split("=")[0];
      const value2 = cookieElements2[0].split("=")[1];
      const expires2 = cookieElements2[1].split("=")[1];

      document.cookie = `${name1}=${value1}; expires=${expires1}; path=/`;
      document.cookie = `${name2}=${value2}; expires=${expires2}; path=/`;

      navigate("/");
    } else {
      console.error("Login failed");
      // Aquí puedes mostrar un mensaje de error al usuario
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary/10 to-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="flex flex-col items-center space-y-2 text-center">
          <GraduationCap className="h-12 w-12 text-primary" />
          <h1 className="text-3xl font-bold">SIIPI2</h1>
          <p className="text-muted-foreground">
            Esta plataforma replica el SIIPI de la UAM-I, conectándose al
            servidor oficial. No almacena datos personales ni modifica el
            sistema real.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Iniciar Sesión</CardTitle>
            <CardDescription>
              Ingresa tus credenciales para acceder a la plataforma
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="matricula">Matrícula</Label>
              <Input
                id="username"
                placeholder="Ej. 2191234567"
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Contraseña</Label>
              </div>
              <Input
                id="password"
                type="password"
                onChange={handleChange}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" size="lg" onClick={handleForm}>
              Ingresar
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
