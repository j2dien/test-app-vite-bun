import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router";

import { registerSchema, type RegisterInput } from "../schemas/auth.schema";
import { useRegister } from "../hooks/use-auth.hooks";

import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { FormField } from "@/shared/components/ui/form-field";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";

// ─── Password strength rules ───────────────────────────────
const PASSWORD_RULES = [
  { label: "Minimal 8 karakter", test: (v: string) => v.length >= 8 },
  { label: "1 huruf kapital", test: (v: string) => /[A-Z]/.test(v) },
  { label: "1 angka", test: (v: string) => /[0-9]/.test(v) },
  { label: "1 karakter spesial", test: (v: string) => /[^a-zA-Z0-9]/.test(v) },
];

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const registerMutation = useRegister();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
    mode: "onTouched", // validasi saat blur, bukan onChange
  });

  const passwordValue = watch("password");

  const onSubmit = (data: RegisterInput) => {
    registerMutation.mutate(data);
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Buat Akun</CardTitle>
        <CardDescription>
          Daftar untuk memulai menggunakan layanan
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          {registerMutation.isError && (
            <div className="rounded-md bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {registerMutation.error.message}
            </div>
          )}

          <FormField label="Nama Lengkap" error={errors.name?.message} required>
            <Input
              type="text"
              placeholder="John Doe"
              autoComplete="name"
              {...register("name")}
            />
          </FormField>

          <FormField label="Email" error={errors.email?.message} required>
            <Input
              type="email"
              placeholder="email@example.com"
              autoComplete="email"
              {...register("email")}
            />
          </FormField>

          <FormField label="Password" error={errors.password?.message} required>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                autoComplete="new-password"
                className="pr-10"
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Password strength indicator */}
            {passwordValue && (
              <ul className="mt-2 space-y-1">
                {PASSWORD_RULES.map(({ label, test }) => {
                  const passed = test(passwordValue);
                  return (
                    <li
                      key={label}
                      className="flex items-center gap-1.5 text-xs"
                    >
                      {passed ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />
                      ) : (
                        <XCircle className="h-3.5 w-3.5 text-muted-foreground" />
                      )}
                      <span
                        className={
                          passed ? "text-green-600" : "text-muted-foreground"
                        }
                      >
                        {label}
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
          </FormField>

          <FormField
            label="Konfirmasi Password"
            error={errors.confirmPassword?.message}
            required
          >
            <Input
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              {...register("confirmPassword")}
            />
          </FormField>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || registerMutation.isPending}
          >
            {registerMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Daftar
          </Button>
        </form>
      </CardContent>

      <CardFooter className="justify-center text-sm">
        <p className="text-muted-foreground">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="font-medium text-primary hover:underline"
          >
            Masuk
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
