import React from "react";
import Head from "next/head";

import Card from "../../components/Card";
import projects from "../../data.json";
import Filter from "../../components/Filter";

const Projects = ({ projects }) => {
  const [filtered, setFiltered] = React.useState(projects);

  return (
    <>
      <Head>
        <title>Projets</title>
      </Head>

      <div>
        <h2 className="header mb-5">Projets</h2>

        <p className="text-center">
          <q>Talk is cheap. Show me the code</q>
          <br /> - Linus Torvalds
        </p>

        {/* <hr className="my-8" /> */}
        <div className="mt-6 mb-8 text-center">
          <Filter data={projects} setFiltered={setFiltered} />
        </div>

        <div className="flex flex-wrap justify-center">
          {filtered.map((project, i) => (
            <Card key={i} project={project} />
          ))}
        </div>
      </div>
    </>
  );
};

export async function getStaticProps() {
  return {
    props: {
      projects,
    },
  };
}

export default Projects;
