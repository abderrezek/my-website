import Link from "next/link";
import Image from "next/image";

import Badget from "./Badget";
import dynamic from "next/dynamic";

const LessThan = (txt, lg = 100) => {
  if (txt.length <= lg) {
    return txt;
  }
  return txt.substring(0, lg) + "...";
};

const url = (path) => `/projects/${path}`;
const img = (name) => `/img/${name}`;

const Card = ({ project }) => {
  return (
    <div className="m-2 flex-1 flex flex-col min-w-[280px] overflow-hidden bg-white dark:bg-gray-900 rounded-md border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-900">
      {/* image */}
      <Link href={url(project.id)}>
        <a className="bg-gray-50 dark:bg-gray-800">
          <Image
            className="w-full"
            src={img(project.cover.src)}
            alt={project.title}
            width="100%"
            height="60"
            layout="responsive"
            objectFit="contain"
            placeholder="blur"
            blurDataURL={img(project.cover.blur)}
            priority
          />
        </a>
      </Link>

      <div className="px-6 py-4">
        {/* title */}
        <Link href={url(project.id)} passHref>
          <a className="mb-2 text-2xl font-bold tracking-tight text-gray-900 hover:text-blue-800 dark:text-white dark:hover:text-blue-600">
            {project.title}
          </a>
        </Link>
        {/* description */}
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 break-all">
          {LessThan(project.description)}
        </p>
        {/* technologys */}
        {project.technologys.map((t, i) => (
          <Badget key={i}>{t}</Badget>
        ))}
      </div>
    </div>
  );
};

export default Card;
