import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Eye, EyeOff } from "lucide-react";

interface SignUpProps {
  onSignup?: (email: string, password: string, name: string) => void;
  onClose?: () => void;
  onSwitchToSignIn?: () => void;
}

const SignUp = ({
  onSignup = () => {},
  onClose = () => {},
  onSwitchToSignIn = () => {},
}: SignUpProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [signupError, setSignupError] = useState("");

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
        <CardTitle className="text-center">Create Account</CardTitle>
      </CardHeader>
      <CardContent>
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
            <Label htmlFor="signup-confirm-password">Confirm Password</Label>
            <Input
              id="signup-confirm-password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={signupConfirmPassword}
              onChange={(e) => setSignupConfirmPassword(e.target.value)}
              required
            />
          </div>

          {signupError && <p className="text-sm text-red-500">{signupError}</p>}

          <Button type="submit" className="w-full">
            <UserPlus className="mr-2 h-4 w-4" />
            Create Account
          </Button>

          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Button
                variant="link"
                className="p-0 h-auto font-normal"
                onClick={onSwitchToSignIn}
              >
                Sign in
              </Button>
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignUp;
