import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Luxury Portfolio",
  description: "A luxurious and elegant personal portfolio showcasing premium design and development work",
};

export default function LuxuryLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}