import "@/style/globals.css";

export const metadata = {
  title: "MobiController Demo",
  description: "Dies ist die Demo-Anwendung für den Mobi",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
