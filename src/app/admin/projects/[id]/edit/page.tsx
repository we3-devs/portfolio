"use client";

import { useRouter } from "next/navigation";
import ProjectForm from "../../project-form";

export default function EditProject() {
  const router = useRouter();
  return <ProjectForm onSave={() => router.push("/admin/projects")} />;
}
