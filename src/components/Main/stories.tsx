import { Meta, StoryObj } from '@storybook/react'

import Main from '.'

export default {
  title: 'Main',
  component: Main,
  parameters: {
    layout: 'fullscreen'
  }
} as Meta

export const Default: StoryObj = {
  args: {
    title: 'ZappoliS',
    description: 'Commerce Club Community'
  }
}
