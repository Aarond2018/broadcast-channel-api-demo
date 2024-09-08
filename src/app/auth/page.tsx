"use client";

import { useSession } from "@/components/SessionProvider";

export default function Home() {
  const { isAuthenticated, login, logout } = useSession();

  return (
    <div className="p-4 my-12 w-full max-w-[30rem] text-center border">
      <h1 className="text-2xl font-semibold">Auth page</h1>

      {!isAuthenticated && (
        <button onClick={login} className="my-4 underline text-green-900">
          Login
        </button>
      )}

      {isAuthenticated && (
        <>
          <p className="my-2">You are logged in!</p>
          <button onClick={logout} className="my-2 underline text-red-500">
            Logout
          </button>
        </>
      )}
    </div>
  );
}
