import './styles/main.css';
import 'semantic-ui-css/semantic.min.css';

export const metadata = {
  title: 'Reactivities',
  description: '',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
