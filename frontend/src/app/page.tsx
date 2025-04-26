"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { parseData } from "@/lib/utils";
import { useUserStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

export default function Home() {
  const router = useRouter();
  const { user } = useUserStore();
  const { domain, firstName, lastName } = parseData(
    user?.email || "",
    user?.name || ""
  );

  const handleLogout = () => {
    Cookies.remove("access-token");
    router.push("/login");
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">User Logged In</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-semibold mt-4">
                Welcome Back {firstName} {lastName}
              </h2>
              <p className="text-gray-600 text-center">
                You are successfully logged in with domain:{" "}
                <span className="text-xl font-bold">{domain}</span>
              </p>
              <Button className="mt-4 w-full" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
