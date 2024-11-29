function SideBarContainer({children}) {

    return (
      <div className="tw-hidden xl:tw-flex tw-flex-shrink-0 tw-flex-col tw-w-60
                      tw-border-0 tw-border-solid tw-border-r
                       tw-border-gray-200 tw-p-0 
                       tw-h-screen
                       tw-overflow-auto tw-sticky tw-top-[75px] tw-max-h-[calc(100vh-100px)]">
         {children}
          
      </div>
    )
  }
  export default SideBarContainer