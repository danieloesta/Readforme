import './styles.css';

export const metadata = {
  title: 'Læs for mig',
  description: 'Få artikler og tekst oversat til dansk og læst højt.'
};

export default function RootLayout({ children }) {
  return <html lang="da"><body>{children}</body></html>;
}
