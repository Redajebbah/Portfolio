import "./globals.css";

export const metadata = {
  title: "Reda Jebbah — AI & Automation Engineer",
  description:
    "Portfolio of Reda Jebbah — AI & Automation Engineer specializing in QA, test automation, NLP chatbots, and full-stack systems. EMSI MIAGE Engineer, based in Morocco.",
  keywords: "Reda Jebbah, AI Engineer, Automation Engineer, QA Engineer, Morocco, NLP, Chatbot, Cypress, Selenium, Django, Angular",
  openGraph: {
    title: "Reda Jebbah — AI & Automation Engineer",
    description: "Engineer specializing in AI systems, test automation, and full-stack development.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&family=Fira+Code:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
