interface IContainer {
    children: React.ReactNode,
    footer?: React.ReactNode
  }
  
  export function Container({ children, footer } : IContainer) {
    return (
      <div className='flex flex-col h-full'>
        <div className='grow content-section'>
          {children}
        </div>
        <div className='flex p-4 cursor-pointer footer-section'>
          {footer}
        </div>
      </div>
    )
  }