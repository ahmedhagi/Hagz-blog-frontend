import { useEffect, useState } from "react";

//Gets headings from body
export const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = useState([]);

  useEffect(() => {
    //finds all h2 and h3 headings elements
    const headingElements = Array.from(document.querySelectorAll("h2, h3"));

    //coverts headings into a json object indicating their order in the body
    const newNestedHeadings = getNestedHeadings(headingElements);

    //sets to result to be return
    setNestedHeadings(newNestedHeadings);
  }, []);

  return { nestedHeadings };
};

//Returns Json object array of nested Headings
const getNestedHeadings = (headingElements) => {
  const nestedHeadings = [];

  //goes through the list of heading Elements
  headingElements.forEach((heading, index) => {
    //heading to be evaluated
    const { innerText: title, id } = heading;

    if (heading.nodeName === "H2") {
      //heading is h2 create new json object with empty nested heading array "items"
      nestedHeadings.push({ id, title, items: [], level: 2 });
    } else if (heading.nodeName === "H3" && nestedHeadings.length > 0) {
      //h3 headings json object gets pushed into h2's nested heading array "items"
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id,
        title,
        level: 3,
      });
    }
  });

  return nestedHeadings;
};
