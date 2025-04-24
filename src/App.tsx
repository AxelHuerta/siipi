import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { BookOpen, FileText, Heart, Info } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import Layout from "./components/layout";
import { env } from "process";

const API_URL = env.API_URL || "http://localhost:3000";

async function getUserData() {
  const api = axios.create({
    baseURL: `${API_URL}/api`,
    withCredentials: true, // Envía cookies automáticamente
  });

  const response = await api.get("/proxy-alumno");
  return response.data;
}
export interface Student {
  success: boolean;
  trimester: string;
  name: string;
  status: string;
  firstTrimester: string;
  studentId: string;
  dedication: string;
  lastTrimester: string;
  division: string;
  enrolledCredits: string;
  totalCredits: string;
  plan: string;
  planKey: string;
  email: string;
}

function App() {
  const isLoggedIn = document.cookie.includes("PHPSESSID");
  const [data, setData] = useState<Student>({
    success: false,
    trimester: "",
    name: "",
    status: "",
    firstTrimester: "",
    studentId: "",
    dedication: "",
    lastTrimester: "",
    division: "",
    enrolledCredits: "",
    totalCredits: "",
    plan: "",
    planKey: "",
    email: "",
  });

  useEffect(() => {
    async function fetchData() {
      const userData = await getUserData();
      setData(userData);
    }
    console.log("isLoggedIn", isLoggedIn);
    if (isLoggedIn) {
      fetchData();

      console.log("Fetching user data...");
    }
  }, []);

  if (!isLoggedIn) {
    console.log("No estás logueado");
    return <Navigate to="/login" />;
  }

  return (
    <Layout>
      <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight capitalize">
              ¡Hola, {data.name.split(" ")[0].toLowerCase()}!
            </h1>
            <p className="text-muted-foreground">
              Trimestre {data.trimester} - {data.plan}
            </p>
          </div>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle>Estado actual: {data.status}</AlertTitle>
          <AlertDescription>{data.email}</AlertDescription>
        </Alert>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Resumen</TabsTrigger>
            <TabsTrigger value="personal">Información Personal</TabsTrigger>
            <TabsTrigger value="academic">Información Académica</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Créditos Inscritos
                  </CardTitle>
                  <CardDescription>Trimestre actual</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {data.enrolledCredits}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Dedicación: {data.dedication}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Créditos Acumulados
                  </CardTitle>
                  <CardDescription>Total de créditos</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.totalCredits}</div>
                  <p className="text-xs text-muted-foreground">
                    Progreso aproximado en el plan
                  </p>
                  <Progress
                    value={Math.round((Number(data.totalCredits) * 100) / 477)}
                    className="mt-3"
                  />
                  {Math.round((Number(data.totalCredits) * 100) / 477)}%
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Trayectoria Académica
                  </CardTitle>
                  <CardDescription>Historial de trimestres</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Primer trimestre
                      </p>
                      <p className="font-medium">{data.firstTrimester}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">
                        Último trimestre
                      </p>
                      <p className="font-medium">{data.lastTrimester}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Actual</p>
                      <p className="font-medium">{data.trimester}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Accesos Rápidos</CardTitle>
                <CardDescription>
                  Enlaces a servicios frecuentes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  <Button
                    variant="outline"
                    className="h-24 flex-col items-center justify-center gap-2"
                  >
                    <FileText className="h-8 w-8 text-primary" />
                    <span>Tira de Materias</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col items-center justify-center gap-2"
                  >
                    <BookOpen className="h-8 w-8 text-primary" />
                    <span>Aulas Virtuales</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="h-24 flex-col items-center justify-center gap-2"
                  >
                    <Heart className="h-8 w-8 text-primary" />
                    <span>Ficha Médica</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="personal" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Información Personal</CardTitle>
                <CardDescription>Datos del estudiante</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 font-semibold">Nombre Completo</h3>
                    <p className="rounded-md border p-2">{data.name}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Matrícula</h3>
                    <p className="rounded-md border p-2">{data.studentId}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Correo Institucional</h3>
                    <p className="rounded-md border p-2">{data.email}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Estado</h3>
                    <p className="rounded-md border p-2">{data.status}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="academic" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Información Académica</CardTitle>
                <CardDescription>
                  Datos académicos del estudiante
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <h3 className="mb-2 font-semibold">División</h3>
                    <p className="rounded-md border p-2">{data.division}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Plan de Estudios</h3>
                    <p className="rounded-md border p-2">
                      {data.plan} (Clave: {data.planKey})
                    </p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Dedicación</h3>
                    <p className="rounded-md border p-2">{data.dedication}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-semibold">Trimestre Actual</h3>
                    <p className="rounded-md border p-2">{data.trimester}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Historial Académico</h3>
                  <div className="grid gap-2 md:grid-cols-3">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Primer Trimestre
                      </p>
                      <p className="rounded-md border p-2 text-center font-medium">
                        {data.firstTrimester}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Último Trimestre Cursado
                      </p>
                      <p className="rounded-md border p-2 text-center font-medium">
                        {data.lastTrimester}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Trimestre Actual
                      </p>
                      <p className="rounded-md border p-2 text-center font-medium">
                        {data.trimester}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Créditos</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Créditos Inscritos (Trimestre Actual)
                      </p>
                      <p className="rounded-md border p-2 text-center text-xl font-bold">
                        {data.enrolledCredits}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        Créditos Totales Acumulados
                      </p>
                      <p className="rounded-md border p-2 text-center text-xl font-bold">
                        {data.totalCredits}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 space-y-1">
                    <p className="text-sm text-muted-foreground">
                      Progreso aproximado en el plan de estudios
                    </p>
                    <Progress
                      value={Math.round(
                        (Number(data.totalCredits) * 100) / 477
                      )}
                    />
                    <p className="text-right text-sm text-muted-foreground">
                      {Math.round((Number(data.totalCredits) * 100) / 477)}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
}

export default App;
