# Режим разработки и привлекаемые инструменты

- режим TDD

# Последовательность действий

- так как по условию задачи, данные хранятся в файле и при изменении данных происходит перезапись файла(аналог базы данных), при каждом запуске приложеня в среде test, development или production происходит создание рабочего файла из файла источника, если файл не был создан ранее. (nuxt.config.ts). возврат к исходным данным - команда "make reset_working_data". Данные затипизированы для исключения внесения не валидных данных.

- проверка типов данных от ответа сервера через zod

- api получения данных с файла, отправка новых данных для записи в файл

- язык по умолчанию берётся на основе данных 'accept-language' header и пищется в cookies, изменение языка из интерфейса.

# Использованые доп библиотеки

- zod - проверка типов данных от сервера

---

# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
