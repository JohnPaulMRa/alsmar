import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LogIn, UserPlus, Eye, EyeOff } from "lucide-react";

interface AuthFormProps {
  onLogin?: (email: string, password: string) => void;
  onSignup?: (email: string, password: string, name: string) => void;
  onClose?: () => void;
}

const AuthForm = ({
  onLogin = () => {},
  onSignup = () => {},
  onClose = () => {},
}: AuthFormProps) => {
  const [activeTab, setActiveTab] = useState("login");
  const [showPassword, setShowPassword] = useState(false);

  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");

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

  // Handle signup form submission
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setSignupError("");

    if (
      !signupName ||
      !signupEmail ||
      !signupPassword ||
      !signupConfirmPassword
    ) {
      setSignupError("Please fill in all fields");
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setSignupError("Passwords do not match");
      return;
    }

    if (signupPassword.length < 6) {
      setSignupError("Password must be at least 6 characters");
      return;
    }

    // In a real app, this would create a user in a backend
    // For demo, we'll store in localStorage
    const users = JSON.parse(localStorage.getItem("asl-users") || "[]");

    // Check if email already exists
    if (users.some((u: any) => u.email === signupEmail)) {
      setSignupError("Email already in use");
      return;
    }

    // Add new user
    const newUser = {
      name: signupName,
      email: signupEmail,
      password: signupPassword,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("asl-users", JSON.stringify(users));

    // Auto login after signup
    localStorage.setItem(
      "asl-current-user",
      JSON.stringify({
        name: newUser.name,
        email: newUser.email,
        loggedInAt: new Date().toISOString(),
      }),
    );

    onSignup(signupEmail, signupPassword, signupName);
    onClose();
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          {activeTab === "login" ? "Sign In" : "Create Account"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login" className="flex items-center gap-2">
              <LogIn size={16} />
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex items-center gap-2">
              <UserPlus size={16} />
              Sign Up
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-0">
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

              {loginError && (
                <p className="text-sm text-red-500">{loginError}</p>
              )}

              <Button type="submit" className="w-full">
                <LogIn className="mr-2 h-4 w-4" />
                Sign In
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="mt-0">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="John Doe"
                  value={signupName}
                  onChange={(e) => setSignupName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="your@email.com"
                  value={signupEmail}
                  onChange={(e) => setSignupEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
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

              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password">
                  Confirm Password
                </Label>
                <Input
                  id="signup-confirm-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={signupConfirmPassword}
                  onChange={(e) => setSignupConfirmPassword(e.target.value)}
                  required
                />
              </div>

              {signupError && (
                <p className="text-sm text-red-500">{signupError}</p>
              )}

              <Button type="submit" className="w-full">
                <UserPlus className="mr-2 h-4 w-4" />
                Create Account
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AuthForm;
