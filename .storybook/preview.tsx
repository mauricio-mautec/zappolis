import React from 'react'
import GlobalStyles from '../src/styles/global'

export const decorators = [
  (Story) => (
    <>
      <GlobalStyles />
      <Story />
    </>
  )
]
// import type { Preview } from '@storybook/react'

// const preview: Preview = {
//   parameters: {
//     controls: {
//       matchers: {
//         color: /(background|color)$/i,
//         date: /Date$/i
//       }
//     }
//   }
// }

// export default preview
