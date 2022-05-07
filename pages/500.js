import Link from "next/link";
import Head from "next/head";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Server-side error occurred</title>
      </Head>

      <div className="mt-8 flex flex-col items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-32 sm:h-40 w-32 sm:w-40"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        <h2 className="my-5 text-xl text-center w-4/5 sm:w-full mx-auto sm:mx-auto">
          500 Server-side error occurred
        </h2>

        <Link href="/">
          <a className="hover:underline text-lg text-blue-600 hover:text-blue-500 font-bold">
            Retour à l{"'"}accueil
          </a>
        </Link>
      </div>
    </>
  );
}
