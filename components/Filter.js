import { useState } from "react";

const LANGUAGES = ["All", "Java", "C#", "PHP", "JS"];

const Filter = ({ data, setFiltered }) => {
  const [active, setActive] = useState(0);
  const clsBtn =
    "focus:outline-none mb-2 py-1 px-2.5 rounded border-2 border-blue-700 border-solid font-bold dark:border-blue-800";

  const handleClick = (e, index) => {
    setActive(index);
    if (index === 0) {
      setFiltered(data);
    } else {
      const filtered = data.filter(
        (d) => d.language.toLowerCase() === LANGUAGES[index].toLowerCase()
      );
      setFiltered(filtered);
    }
  };

  return (
    <div className="space-x-3">
      {LANGUAGES.map((language, i) => (
        <button
          key={i}
          className={
            i !== active
              ? `${clsBtn} bg-blue-700 text-white hover:bg-blue-800 hover:border-blue-800 dark:hover:bg-blue-700 dark:hover:border-blue-700 dark:bg-blue-800`
              : `${clsBtn} bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-700 dark:text-blue-800`
          }
          onClick={(e) => handleClick(e, i)}
        >
          {language}
        </button>
      ))}
    </div>
  );
};

export default Filter;
