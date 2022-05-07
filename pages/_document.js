import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        <link href="/img/favicon.ico" rel="icon" />
        <meta name="description" content="Portfolio Abderrezek Gallal" />
        <meta name="author" content="Abderrezek Gallal" />
        <meta
          content="CV Abderrezek Gallal,Abderrezek Gallal,Portfolio Abderrezek Gallal,SiteWeb Abderrezek Gallal"
          name="keywords"
        />
      </Head>
      <body className="text-gray-700 transaction-all min-h-screen dark:bg-gray-800 dark:text-gray-200">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
