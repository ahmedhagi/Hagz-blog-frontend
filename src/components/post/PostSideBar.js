import TableOfContents from './TableOfContents';
import {NavigationContent} from '../navbar/Sidebar';
import SideBarContainer from "../navbar/SideBarContainer";
import { ProfileLink } from '../navbar/ProfileLink';

//custom sidebar for the Post Page
function PostSideBar() {

  return (
    <SideBarContainer>
        <TableOfContents/>
        <ProfileLink/>
        <div className='sidebarContent'>
                <NavigationContent/>
        </div>
    </SideBarContainer>
        
  
    
  )
}
export default PostSideBar