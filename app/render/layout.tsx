import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Render slide",
  robots: { index: false, follow: false },
};

export default function RenderLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-0 overflow-hidden bg-black p-0" style={{ width: 1080, height: 1080 }}>
      {children}
    </div>
  );
}
