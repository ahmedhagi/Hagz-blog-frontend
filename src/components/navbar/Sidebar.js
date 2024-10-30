import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { GoHomeFill, GoHome } from "react-icons/go";

import { FaStar, FaRegStar } from "react-icons/fa";

import { FaNewspaper, FaRegNewspaper } from "react-icons/fa6";

import { MdSportsBasketball, MdOutlineSportsBasketball } from "react-icons/md";

import {
  PiForkKnifeFill,
  PiForkKnifeLight,
  PiGameControllerFill,
  PiGameControllerLight,
} from "react-icons/pi";

import "../../resources/css/SideBar.css";
import { ProfileLink } from "./ProfileLink";
import SideBarContainer from "./SideBarContainer";

const home_light = <GoHome />;
const home_fill = <GoHomeFill></GoHomeFill>;
const ent_light = <FaRegStar />;
const ent_fill = <FaStar />;
const news_light = <FaRegNewspaper />;
const news_fill = <FaNewspaper />;
const sports_light = <MdOutlineSportsBasketball />;
const sports_fill = <MdSportsBasketball />;
const food_light = <PiForkKnifeLight />;
const food_fill = <PiForkKnifeFill />;
const gaming_light = <PiGameControllerLight />;
const gaming_fill = <PiGameControllerFill></PiGameControllerFill>;

//Topic Icon for SideBar
function TopicIcon(props) {
  const styles = {
    padding: "0 0.3rem",
  };

  const [toggle, setToggle] = useState(true);

  let location = useLocation();

  //switches icon based on if location is the TopicIcon's Topic
  //fill for the TopicIcon's Topic and light everywhere else
  useEffect(() => {
    if (
      !location.pathname.includes(props.link) ||
      (props.link === "/" && location.pathname !== "/")
    ) {
      setToggle(false);
    } else {
      setToggle(true);
    }
  }, [location, props.link]);

  return (
    <span style={styles} className="topic-icon">
      {toggle ? props.fill : props.light}
    </span>
  );
}

//Navigation Links for SideBar
export const NavigationContent = () => {
  return (
    <>
      <h4 className="tw-text-lg tw-font-bold tw-m-0 tw-p-0 tw-mb-1 xl:tw-px-3 xl:tw-mt-2">
        Navigation
      </h4>
      <Link reloadDocument to={"/"}>
        <TopicIcon light={home_light} fill={home_fill} link="/" />
        Home
      </Link>
      <Link reloadDocument to={"/topic/news"}>
        <TopicIcon light={news_light} fill={news_fill} link="/topic/news" />
        News
      </Link>
      <Link reloadDocument to={"/topic/entertainment"}>
        <TopicIcon
          light={ent_light}
          fill={ent_fill}
          link="/topic/entertainment"
        />
        Entertainment
      </Link>
      <Link reloadDocument to={"/topic/sports"}>
        <TopicIcon
          light={sports_light}
          fill={sports_fill}
          link="/topic/sports"
        />
        Sports
      </Link>
      <Link reloadDocument to={"/topic/food"}>
        <TopicIcon light={food_light} fill={food_fill} link="/topic/food" />
        Food
      </Link>
      <Link reloadDocument to={"/topic/gaming"}>
        <TopicIcon
          light={gaming_light}
          fill={gaming_fill}
          link="/topic/gaming"
        />
        Gaming
      </Link>
    </>
  );
};

//Main SideBar used throught the application
const HagzSidebar = () => {
  return (
    <SideBarContainer>
      <ProfileLink />
     <div className="sidebarContent">
      <NavigationContent />
      </div>
      
    </SideBarContainer>
  );
};

export default HagzSidebar;
