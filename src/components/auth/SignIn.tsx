import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogIn, Eye, EyeOff } from "lucide-react";

interface SignInProps {
  onLogin?: (email: string, password: string) => void;
  onClose?: () => void;
  onSwitchToSignUp?: () => void;
}

const SignIn = ({
  onLogin = () => {},
  onClose = () => {},
  onSwitchToSignUp = () => {},
}: SignInProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Handle login form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");

    if (!loginEmail || !loginPassword) {
      setLoginError("Please fill in all fields");
      return;
    }

    // In a real app, this would validate with a backend
    // For demo, we'll simulate login with localStorage
    const users = JSON.parse(localStorage.getItem("asl-users") || "[]");
    const user = users.find((u: any) => u.email === loginEmail);

    if (!user || user.password !== loginPassword) {
      setLoginError("Invalid email or password");
      return;
    }

    // Store login session
    localStorage.setItem(
      "asl-current-user",
      JSON.stringify({
        name: user.name,
        email: user.email,
        loggedInAt: new Date().toISOString(),
      }),
    );

    onLogin(loginEmail, loginPassword);
    onClose();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              placeholder="your@email.com"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-password">Password</Label>
            <div className="relative">
              <Input
                id="login-password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {loginError && <p className="text-sm text-red-500">{loginError}</p>}

          <Button type="submit" className="w-full">
            <LogIn className="mr-2 h-4 w-4" />
            Sign In
          </Button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Don't have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-normal"
                onClick={onSwitchToSignUp}
              >
                Sign up
              </Button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignIn;
