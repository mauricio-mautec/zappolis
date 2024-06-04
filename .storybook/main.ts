import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: ['../src/**/stories.tsx'],
  addons: ['@storybook/addon-essentials', '@chromatic-com/storybook'],
  framework: {
    name: '@storybook/nextjs',
    options: {}
  },
  staticDirs: ['../public'],
  webpackFinal: (config) => {
    config.resolve?.modules?.push(`${process.cwd()}/src`)
    return config
  },
  docs: {
    autodocs: true
  }
}
export default config
