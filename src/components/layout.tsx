import { useState } from "react";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router";
import { Sheet, SheetContent, SheetTrigger } from "./../components/ui/sheet";
import { Button } from "./../components/ui/button";
import { ThemeProvider } from "./../components/theme-provider";
import {
  Menu,
  Home,
  BookOpen,
  Calendar,
  GraduationCap,
  MessageSquare,
  Heart,
  LogOut,
} from "lucide-react";
import { ModeToggle } from "./../components/mode-toggle";

interface AppProps {
  children: React.ReactNode;
}

export default function Layout({ children }: AppProps) {
  const [open, setOpen] = useState(false);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const navigate = useNavigate();

  function logout() {
    // Obtener todas las cookies
    const cookies = document.cookie.split(";");

    // Eliminar cada cookie estableciendo una fecha de expiración en el pasado
    cookies.forEach((cookie) => {
      const cookieName = cookie.split("=")[0].trim();
      document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
    });

    // Redirigir al login
    navigate("/login");
  }

  return (
    <ThemeProvider>
      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <nav className="grid gap-2 text-lg font-medium">
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-primary hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  Inicio
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  <BookOpen className="h-5 w-5" />
                  Aulas Virtuales
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  <Calendar className="h-5 w-5" />
                  Horario
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  <GraduationCap className="h-5 w-5" />
                  Plan de Estudios
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
                  onClick={() => setOpen(false)}
                >
                  <MessageSquare className="h-5 w-5" />
                  Tutorías
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 text-destructive hover:bg-accent"
                  onClick={() => {
                    setOpen(false);
                    logout();
                  }}
                >
                  <LogOut className="h-5 w-5" />
                  Cerrar Sesión
                </a>
              </nav>
              <div className="mt-auto">
                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
          <a href="#" className="flex items-center gap-2 font-semibold">
            <GraduationCap className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SIIPI2</span>
          </a>
          <div className="ml-auto flex items-center gap-2">
            {!isMobile && <ModeToggle />}
            <Button
              variant="outline"
              size="sm"
              className="hidden md:flex"
              onClick={logout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Cerrar Sesión
            </Button>
          </div>
        </header>
        <div className="flex flex-1">
          <aside className="hidden w-64 shrink-0 border-r bg-background md:block">
            <div className="flex h-full flex-col gap-2 p-4">
              <nav className="grid gap-1">
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg bg-accent px-3 py-2 text-primary"
                >
                  <Home className="h-5 w-5" />
                  Inicio
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
                >
                  <BookOpen className="h-5 w-5" />
                  Aulas Virtuales
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
                >
                  <Calendar className="h-5 w-5" />
                  Horario
                </a>

                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
                >
                  <GraduationCap className="h-5 w-5" />
                  Plan de Estudios
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
                >
                  <MessageSquare className="h-5 w-5" />
                  Tutorías
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-accent"
                >
                  <Heart className="h-5 w-5" />
                  Ficha Médica
                </a>
              </nav>
            </div>
          </aside>
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </ThemeProvider>
  );
}
