import React, { memo } from 'react'

function DragContainer({children}) {
  return (
    <div>{children}</div>
  )
}

export default memo(DragContainer) 