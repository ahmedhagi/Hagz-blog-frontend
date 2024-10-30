import HeadingsSideBar from "../navbar/HeadingsSideBar";
import { ProfileLink } from "../navbar/ProfileLink";
import {NavigationContent} from '../navbar/Sidebar';
import SideBarContainer from "../navbar/SideBarContainer";

//Custom Settings SideBar
function SettingsSideBar() {

  return (
    <SideBarContainer>
        <ProfileLink/>
        <HeadingsSideBar title={"Settings"}/>
        <div className='sidebarContent'>
                <NavigationContent/>
        </div>
    </SideBarContainer>
  )
}
export default SettingsSideBar