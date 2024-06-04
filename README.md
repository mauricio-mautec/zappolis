## CRIAR PROJETO NEXT.JS
- npx create-next-app@latest
## CONFIGURAR EDITORCONFIG
- criar um arquivo .editorconfig
```
#editorconfig.org
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true
```
## CONFIGURAR O ESLINT
- npm init @eslint/config
.eslintrc.json
```
{
  "extends": "next/core-web-vitals"
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "next/core-web-vitals",
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "react"
    ],
    "rules": {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off"
    }
}
```
.eslintignore
```
!.storybook
!.jest
```
## CONFIGURAR O PRETTIER
- npm install --save-dev --save-exact prettier

.prettierrc.json
```
{
  "trailingComma": "none",
  "semi": false,
  "singleQuote": true
}
```
.prettierignore
```
!.storybook
!.jest
build
coverage
.next
```
- ativar o prettier no eslintrc.json
.eslintrc.json
```
{
    "env": {
      "browser": true,
      "es2021": true
    },
    "extends": [
      "next/core-web-vitals",
      "eslint:recommended",
      "plugin:@typescript-eslint/recommended",
      "plugin:react/recommended",
      "prettier"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
      "ecmaVersion": "latest",
      "sourceType": "module"
    },
    "plugins": ["@typescript-eslint", "react"],
    "rules": {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/prop-types": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off"
    }
}
```
- formatar o código quando salvar no vscode
.vscode/settings.json
```
{
  "editor.formatOnSave": true
}
```
- ativar o prettier para ler a configuração e alterar algum arquivo / teste com double quotes ""
- npx prettier src --write
- para funcionar o prettier com a configuração do vscode para rodar quando salvar, o vscode primeiro precisa de ter configurado quem é o formatador. Para tal bangunce um arquivo qualquer, como o page.tsx e com ele aberto faça Option + Shift + F O Vscode pergunta sobre o formatador e você indica o prettier. A partir daí, passa a funcionar quando salvar o arquivo.
- configurar o prettier para não conflitar com o eslint (eslint-config-prettier):
  npm install --save-dev eslint-config-prettier
  tem haver com o "prettier" na extends key do .eslintrc.json

## CONFIGURAR GITHOOKS COM HUSKY E LINT-STAGED
- npm install --save-dev husky lint-staged
- npx husky-init && npm install
- editar .husky/_/pre-commit para executar o lint-staged:
```
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npm --no-install lint-staged
````
- criar uma configuracao para o lint-staged: .lintstagedrc.js
```
module.exports = {
  // Lint & Prettify TS and JS files
  '*.{js,jsx,ts,tsx}': (filenames) => [
    `prettier --write ${filenames.join(' ')}`,
    `npm run lint --fix . ${filenames.join(' --file')}`
  ]
}
```
- para testar o lint-staged: coloque false em editor.formatOnSave no vscode, altere um arquivo, p.e. src/page.tsx, e salve.
  faça um git add .  e tente fazer o commit. A configuração vai impedir o commit de acontecer até que o arquivo seja formatado e corrigido as pendências.

## CONFIGURAR O JEST -  TYPES JEST - JEST ENVIRONMENT JSDOM
- npm install  --save-dev jest-environment-jsdom jest @types/jest
- criar o arquivo jest.config.js
```
module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts(x)?'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  modulePaths: ['<rootDir>/src/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  }
}
```
- acrescentar em package.json, scripts o "test": "jest":
```
"scripts": {
    "dev": "next dev",
    "build": "next build",
    "test": "jest --maxWorkers=50% --passWithNoTests",
    "test:watch": "jest --watch --maxWorkers=25%",
    "test:ci": "jest --runInBand",
    "start": "next start",
```
- criar um arquivo setup.ts em .jest/setup.ts, inicialmente vazio.
- configurar tsconfig.json para que o jest consiga encontrar o types do jest:
```
"include": [".jest/setup.ts", "next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
```

##  CONFIGURAR O REACT TESTING LIBRARY
- npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
-  importar a biblioteca em .jest/setup.ts:
```
import '@testing-library/jest-dom'
```
## CRIANDO UM COMPONENTE E UM TESTE
- criar a pasta src/components e dentro dela criar a pasta Main representando o componente
  dentro da pasta Main criar o arquivo Main.tsx e test.tsx

## CONFIGURAR O LINT-STAGED PARA RODAR O TEST: .lintstagedrc.js
```
`npm test -- --findRelatedTests ${filenames.join(' ')}`
```
- agora ao fazer o commit ele deverá rodar o prettier o lint e depois o test.
- quebre o projeto e tent novamente fazer o commit.
- se precisar commit mesmo com erro, acrescente ao final do commit o --no-verify.

## CONFIGURAR O STYLED COMPONENTS
- se tiver tailwind, remova primeiro
- npm install --save-dev styled-components
- registrar os styled components criando o arquivo registry.tsx em src/lib
```
'use client'

import React, { useState } from 'react'
import { useServerInsertedHTML } from 'next/navigation'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  // Only create stylesheet once with lazy initial state
  // x-ref: https://reactjs.org/docs/hooks-reference.html#lazy-initial-state
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  if (typeof window !== 'undefined') return <>{children}</>

  return (
    <StyleSheetManager sheet={styledComponentsStyleSheet.instance}>
      {children}
    </StyleSheetManager>
  )
}
```
- agora é preciso importar e registrar os styled components na aplicação.
  edite src/app/layout.tsx e adicione:
```
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  )
```
- edite src/app/page.tsx para incluir o componente Main:
```
import Main from '@/components/Main'

export default function Home() {
  return <Main />
}
```
- crie o arquivo styles.ts dentro  src/components/Main e adicione:
```
'use client'

import styled from 'styled-components'

export const Wrapper = styled.main`
background-color: #06092b;
color: #fff;
width: 100%;
height: 100%;
padding: 3rem;
text-align: center;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
```
- no componente Main, edite a index.tsx carregando os estilos como S e altere:
```
import * as S from './styles'
const Main = () => (
  <S.Wrapper>
    <h1>ZAPPOLIS MAIN</h1>
  </S.Wrapper>
)

export default Main
```
- rodar o test:watch para atualizar o snapshot com 'u': npm run test:watch
- anular alguns arquivos que não deve ser testados editando o jest.config.js na chave collectCoverageFrom:
```
module.exports = {
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: ['/node_modules/', '/.next/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts(x)?',
    '!src/app/**', // should be tested in e2e
    '!src/lib/registry.tsx'
  ],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  modulePaths: ['<rootDir>/src/'],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }]
  }
}
```
- commit e push para o repositório.

## CRIANDO UM GLOBAL STYLE
- crie o arquivo src/styles/global.ts:
```
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%; // 1rem = 10px 10px/16px = 62.5% (1.4rem = 14px)
  }

  html, body, #__next {
    height: 100%;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`

export default GlobalStyles
```
- adicione o arquivo providers.tsx em src/app:
```
import { PropsWithChildren } from 'react'

export function Providers({ children }: PropsWithChildren) {
  return (
    <>
    <GlobalStyles />
    {children}
    </>
    )
}
```
- incluir providers.tsx dentro de layout.tsx
```
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Providers>{children}</Providers>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
```
## MELHOR CONFIGURAÇÃO DO JEST COM STYLED COMPONENTS
- npm install --save-dev jest-styled-components
- adicione o arquivo jest-styled-components.d.ts em src/types:
  ele vai prover os types e matchers do jest styled components
```
declare module 'jest-styled-components' {
  export * from '@testing-library/jest-dom/matchers'
}
```
// Types provided from the official repo:
// https://github.com/styled-components/jest-styled-components/blob/master/typings/index.d.ts

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/ban-types */
import { NewPlugin } from 'pretty-format'
import { css } from 'styled-components'

declare global {
  namespace jest {
    interface AsymmetricMatcher {
      $$typeof: Symbol
      sample?: string | RegExp | object | Array<any> | Function
    }

    type Value = string | number | RegExp | AsymmetricMatcher | undefined

    interface Options {
      media?: string
      modifier?: string | ReturnType<typeof css>
      supports?: string
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface Matchers<R, T> {
      toHaveStyleRule(property: string, value?: Value, options?: Options): R
    }
  }
}

export interface StyledComponentsSerializerOptions {
  addStyles?: boolean
  classNameFormatter?: (index: number) => string
}

export declare const styleSheetSerializer: NewPlugin & {
  setStyleSheetSerializerOptions: (
    options?: StyledComponentsSerializerOptions
  ) => void
}
```
- importar no setup  do jest: .jest/setup.ts o jest-styled-components.d.ts
```
import '@testing-library/jest-dom'
import 'jest-styled-components'
```
- adicionar na configuração do jest (jest.config.js) o  moduleNameMapper:
```
  moduleNameMapper: {
  'styled-components': 'styled-components/dist/styled-components.browser.cjs.js'
  }
```
- ignorar a pasta types e styles na cobertura do test em jest.config.ts:
  adicione '!src/types/**' e '!src/styles/**' no arquivo
- teste do componente pode agora incluir a cor de fundo src/components/Main/test.tsx:
```
import { render, screen } from '@testing-library/react'

import Main from '.'

describe('<Main />', () => {
  it('should render the heading', () => {
    // renderiza o  componente
    const { container } = render(<Main />)
    // busca o elemento e verifica a existencia
    expect(
      screen.getByRole('heading', { name: /ZAPPOLIS/i })
    ).toBeInTheDocument()

    // gerar snapshot
    expect(container.firstChild).toMatchSnapshot()
  })

  it('should render the colors correctly', () => {
    const { container } = render(<Main />)
    expect(container.firstChild).toHaveStyle({ 'background-color': '#ffb8b8' })
  })
})
```
## CONFIGURAÇÃO DO STORYBOOK
- npx storybook@latest init
- apaga diretorio stories
- configura .storybook/main.ts
```
import type { StorybookConfig } from '@storybook/nextjs'

const config: StorybookConfig = {
  stories: ['../src/**/stories.tsx'],
  addons: [
    '@storybook/addon-essentials',
    '@chromatic-com/storybook'
  ],
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
```
- cria um storie.tsx para o componente Main:
```
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
    description: 'The Commerce Community'
  }
}
```
- configuar o .storybook/preview.tsx (era preview.ts e mudou para tsx) para carregar o global style como acontece no layout.tsx
```
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
```

## CONFIGURAÇÃO DO PLOP
- npm install --save-dev plop
- criar arquivo generators/plopfile.js:
```
module.exports = (plop) => {
  // create your generators here
  plop.setGenerator('component', {
    description: 'Create a component',
    prompts: [{
      "type": "input",
      "name": "name",
      "message": "What is the component name?"
    }], // array of inquirer prompts
    actions: []  // array of actions
  });
};
```
- configurar package.json:
```
    "test:ci": "jest --runInBand",
    "generate": "npx --no plop --plopfile generators/plopfile.js",
    "start": "next start",
```
