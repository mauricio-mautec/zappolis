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
## CRIANDO UM COMPONENTE E UM  TESTE
