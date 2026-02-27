import './global.css';

export const metadata = {
  title: 'Staypedia - Your Digital House Manual',
  description: 'Create beautiful, warm digital house manuals for your short-term rental guests',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="font-sans">
      <body className="antialiased">{children}</body>
    </html>
  );
}
