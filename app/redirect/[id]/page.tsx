"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

export default function RedirectPage() {
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    const appUrl = `https://mumbai.polygonscan.com/address/${params?.id}`;

    // Perform the redirect
    window.location.href = appUrl; // For a full page reload redirect
    // Or use Next.js router for client-side redirect (comment out the line above if using this)
    // router.push(appUrl);
  }, [router]);

  return (
    <div>
      <p>Redirecting to NFT explorer ...</p>
    </div>
  );
}
