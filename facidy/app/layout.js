export const metadata = {
  title: "Facidy",
  description: "Visual tool to build mini applications with React components",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
