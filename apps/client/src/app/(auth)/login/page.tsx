"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { LoginForm } from "@/components/forms/login-form";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const { isAuthenticated, hasHydrated } = useAuthStore();

  useEffect(() => {
    if (!hasHydrated) return;

    if (isAuthenticated) {
      router.push("/ordenes-ingreso");
    }
  }, [hasHydrated, isAuthenticated, router]);

  if (!hasHydrated || isAuthenticated) {
    return (
      <div className="flex h-screen items-center justify-center">
        Cargando...
      </div>
    );
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/assets/semilla1.jpg"
          alt="Fondo decorativo con semilla"
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>

      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <div className="flex justify-between items-center w-full">
            <div>
              <Image src="/assets/ministerio.png" width={80} height={80}  alt="Ministerio" />
            </div>
             <div>
              <Image src="/assets/iniaf.png" width={150} height={80} alt="INIAF" />
            </div>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
