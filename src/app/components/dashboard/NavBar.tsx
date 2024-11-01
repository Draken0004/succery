"use client";

import { useRouter, usePathname } from "next/navigation";

type NavBarProps = {
  projectId: string;
}

export const NavBar = ({ projectId }: NavBarProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === `/projects/${projectId}${path}`;
  };

  return (
    <div className="flex flex-row py-3 px-3 md:px-10 gap-5">
      <button 
        className={`rounded-md px-3 py-2 ${isActive("") ? "bg-blue-200 text-blue-600" : "text-gray-500 hover:text-black"}`}
        onClick={() => router.push(`/projects/${projectId}`)}
      >
        Dashboard
      </button>
      <button 
        className={`rounded-md px-3 py-2 ${isActive("/settings") ? "bg-blue-200 text-blue-600" : "text-gray-500 hover:text-black"}`}
        onClick={() => router.push(`/projects/${projectId}/settings`)}
      >
        Settings
      </button>
    </div>
  );
}