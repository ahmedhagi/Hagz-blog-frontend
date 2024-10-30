import { useEffect, useState, useRef } from 'react';
import { useSelector } from "react-redux";

//Handles the active heading on the page
export function useHeadsObserver() {

  const headingElementsRef = useRef({});
  const [activeId, setActiveId] = useState('')
  let { post} = useSelector((state) => state.post);

  useEffect(() => {
    if(post != null){
    
    //stores all currently visible headings into a map
    const handleObsever = (headings) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      const visibleHeadings = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        //gets heading element from list of viiable headings
        const headingElement = headingElementsRef.current[key];
        //if intersecting(visable) push heading into visibleHeading array
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      //finds the index in headingElements given an id
      const getIndexFromId = (id) =>
        headingElements.findIndex((heading) => heading.id === id);

      //Sets "activeId" based on values from from visible Headings
      if (visibleHeadings.length === 1) {
        //sets active to the only visible heading available
        setActiveId(visibleHeadings[0].target.id);
      } else if (visibleHeadings.length > 1) {
        //sorts visible headings from lowest to highest index in headingElement array
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
        );
        //sets "activeId" to first element in the sorted visible headings array
        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };
    
    //observer object checks if elements are currently visible during scroll
    //calls the handleObsever function to ensure what headings are visible
    const observer = new IntersectionObserver(handleObsever, {
      rootMargin: '-64px 0px -40% 0px',
      }
    )

    //gets all h2, h3 elements from page
    const headingElements = Array.from(document.querySelectorAll("h2, h3"));
    //observes all the h2 and h3 element on page
    headingElements.forEach((element) => observer.observe(element));

    //disconnect observer when component unmounts
    return () => observer.current?.disconnect()
  }
  }, [post])

  return {activeId}
}