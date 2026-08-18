import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unggah Foto",
  description: "Unggah dan sensor area sensitif pada foto Anda.",
};

export default function BlurLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
