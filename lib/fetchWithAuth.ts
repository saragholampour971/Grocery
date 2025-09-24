import {redirect} from "next/navigation";

export async function fetchWithAuth(url: string, options?: RequestInit) {
  const res = await fetch(url, options);

  if (res.status === 401) {
    if (typeof window === "undefined") {
      // ✅ Server-side
      redirect("/login",);
    } else {
      // ✅ Client-side
      // window.location.href = "/login";
      throw new Error("Unauthorized");

    }
  }

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    console.log(data, 'data');
    throw new Error(data?.error || "Network error");
  }

  return res.json();
}
