# «Тұмар» — сайт детского ясли-сада

Лендинг на **Next.js + TypeScript + Tailwind CSS**, собирается в статические файлы (`out/`) и публикуется на **GitHub Pages**. Сервер, Vercel и платные сервисы не нужны.

- Русская версия — `/`, казахская — `/kk/` (переключатель RU / KZ в шапке).
- Разделы: главная, О нас, Группы, Питание, Кружки, Галерея, Документы, Контакты.

## Запуск локально

Нужен Node.js 20+ (рекомендуется 22).

```bash
npm install
npm run dev            # http://localhost:3000
```

Проверка сборки «как на GitHub Pages»:

```bash
BASE_PATH=/tumar-landing npm run build   # создаёт папку out/
npm run check                             # проверяет все ссылки, якоря и файлы в out/
npm run preview                           # http://localhost:4173/tumar-landing/
```

Также доступны `npm run lint` и `npm run typecheck`.

## Публикация на GitHub Pages

1. Создайте репозиторий на GitHub и отправьте в него проект (ветка `main`).
2. В репозитории: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Каждый `push` в `main` запускает `.github/workflows/deploy.yml`: `npm ci` → `npm run build` → публикация папки `out`.
   Запустить вручную можно во вкладке **Actions → Deploy to GitHub Pages → Run workflow**.

Сайт откроется по адресу `https://USERNAME.github.io/REPOSITORY/`. Подпуть (`basePath`) берётся автоматически из настроек Pages — имя репозитория в коде менять не нужно.

### Собственный домен (например, `tumar.edu.kz`)

Когда домен будет зарегистрирован:

1. У регистратора добавьте DNS-записи для GitHub Pages (CNAME на `USERNAME.github.io` для поддомена или A-записи GitHub для корневого домена — см. документацию GitHub Pages).
2. В **Settings → Pages → Custom domain** укажите домен и включите **Enforce HTTPS**.
3. Запустите публикацию заново (push или Run workflow).

Workflow сам получит новый адрес: `basePath` станет пустым, а canonical-ссылки, sitemap и Open Graph будут указывать на домен. Править код не нужно.

## Как обновлять содержимое

| Что | Где |
| --- | --- |
| Фото первого экрана | положите `public/main-page.png` (или `.jpg` / `.webp`). Пока файла нет — показывается иллюстрация |
| Галерея | любые PNG / JPG / WebP в `public/gallery/` — появятся автоматически. Пока папка пуста — показывается заглушка |
| Документы (PDF) | файлы в `public/documents/` появятся автоматически; названия на двух языках и ссылки на Google Drive — в `src/lib/documents.ts` |
| Логотип (необязательно) | `public/logo.png` или `logo.webp` заменит нарисованный знак в шапке |
| Тексты RU / KZ | `src/lib/i18n/ru.ts` и `src/lib/i18n/kk.ts` |
| Названия и возраст групп | `groups.items` в тех же файлах (сейчас временные «Группа 1 / 1-топ» …) |
| Телефон, Instagram, адрес, карта | `src/lib/site.ts` (там же можно указать координаты и ID 2GIS — тогда появится встроенная карта) |

Список фото и документов формируется скриптом `scripts/media-manifest.mjs` перед каждой сборкой, поэтому на сайте не бывает ссылок на несуществующие файлы.
