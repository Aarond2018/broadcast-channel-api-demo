import { FormCtxProvider } from "@/components/FormCtxProvider";

export default function FormLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <FormCtxProvider>{children}</FormCtxProvider>
}
