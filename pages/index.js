import React from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import img from "../public/img/me.jpg";

export default function Home() {
  return (
    <>
      <Head>
        <title>Abderrezek Gallal</title>
      </Head>

      <div className="flex flex-col items-center justify-center mt-20 space-y-4">
        <Image
          src={img}
          width="200"
          height="250"
          alt="abderrezek gallal"
          placeholder="blur"
          className="rounded-md"
          priority
        />

        <div className="text-center space-y-2">
          <div>
            <h1>
              <span className="text-xl">Bonjour je suis</span> <br />
              <span className="font-bold text-2xl">Abderrezek Gallal</span>
            </h1>
            <p className="text-xl">Ingénieure en Informatique</p>
          </div>

          <div className="flex flex-col md:flex-row space-x-0 md:space-x-2 space-y-2 md:space-y-0">
            <a
              className="btn inline-block"
              href="/abderrezek_gallal_cv.pdf"
              target="_blank"
            >
              TÉLÉCHARGER CV
            </a>

            <Link href="/contact">
              <a className="btn inline-block">CONTACTEZ MOI</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
