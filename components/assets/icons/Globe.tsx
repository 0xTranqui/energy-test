import React from 'react'
import { IconProps } from './types'

function Globe({ className }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M12 4c-4.411 0-8 3.589-8 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm-1.415 11.077a11.792 11.792 0 01-.392-2.462h3.614c-.043.83-.174 1.655-.392 2.462h-2.83zm2.425 1.23c-.27.689-.604 1.357-1.01 1.992a11.586 11.586 0 01-1.01-1.991h2.02zm-7.748-3.692h3.702c.04.829.147 1.653.343 2.462h-3.33a6.714 6.714 0 01-.716-2.462zm8.154-3.692c.217.807.348 1.632.39 2.462h-3.613c.043-.83.174-1.655.392-2.462h2.83zm-2.426-1.23c.27-.689.605-1.357 1.01-1.992.405.635.74 1.303 1.01 1.991h-2.02zm-2.026 3.692H5.262c.08-.88.33-1.711.716-2.462h3.33a13.089 13.089 0 00-.344 2.462zm6.072 1.23h3.702c-.08.88-.331 1.711-.717 2.462h-3.329c.197-.809.307-1.633.345-2.462zm0-1.23a13.093 13.093 0 00-.343-2.462h3.33a6.72 6.72 0 01.716 2.462h-3.703zm2.181-3.693h-2.896c-.284-.81-.65-1.595-1.099-2.344a6.76 6.76 0 013.996 2.344zm-6.439-2.346c-.45.751-.815 1.536-1.1 2.346H6.784a6.767 6.767 0 013.995-2.346zM6.783 16.308h2.896c.284.81.65 1.595 1.099 2.346a6.773 6.773 0 01-3.995-2.346zm6.44 2.344c.448-.75.815-1.535 1.098-2.344h2.896a6.77 6.77 0 01-3.995 2.344z"
      ></path>
    </svg>
  )
}

export default React.memo(Globe)
