# React Site Brief: Tech Brutal / Y2K Studio Card

## 1. Цель

Создать одностраничный сайт-визитку для компании/студии по разработке сайтов.

Сайт должен выглядеть как цифровой постер/технический интерфейс: брутализм, Y2K/techno, монохромная графика, халфтон, дизеринг, wireframe-сетки, крупная типографика, глитч, технические подписи, штрихкоды, координаты, псевдо-сканеры и UI-маркировка.

Важно: все визуальные решения должны быть реализованы средствами кода: React, CSS, SVG, Canvas/WebGL. Не использовать готовые декоративные растровые изображения как основу дизайна.

Допускаются:

- CSS-фоны, паттерны, маски, blend modes.
- SVG-формы, фильтры, линии, сетки, noise/displacement.
- Canvas/WebGL-генеративная графика.
- CSS/SVG/Canvas-дизеринг.
- Текстовые и типографические композиции.
- Иконки, если они построены в коде или из библиотеки.

Не использовать:

- Стоковые фоны.
- Готовые постеры как изображения.
- Фотографии как основной визуальный носитель.
- Иллюстрации, вставленные картинками.
- Декоративные картинки, имитирующие эффекты, которые можно сделать кодом.

## 2. Технологический стек

Базовый стек:

- React.
- TypeScript.
- Vite.
- GSAP.
- ScrollTrigger.
- CSS Modules или обычный SCSS/CSS с понятной структурой.

Дополнительно по необходимости:

- Three.js или React Three Fiber для wireframe-сцены.
- Canvas 2D для дизеринга, точечных полей, графиков, шумовых карт.
- SVG filters для grain, displacement, turbulence, threshold-like эффектов.
- Lenis или нативный smooth scroll, если не конфликтует с ScrollTrigger.

Рекомендуемая структура:

```txt
src/
  app/
    App.tsx
    routes.ts
  components/
    Header/
    Hero/
    Services/
    Process/
    Cases/
    TechStack/
    About/
    Contact/
    LanguageToggle/
    VisualSystem/
  effects/
    DitherCanvas.tsx
    WireGridCanvas.tsx
    GlitchText.tsx
    Barcode.tsx
    NoiseOverlay.tsx
    ScanLines.tsx
  data/
    content.ru.ts
    content.en.ts
  styles/
    tokens.css
    globals.css
    typography.css
```

## 3. Визуальное направление

Общее настроение:

- Темный цифровой плакат.
- Постерная плотность, но с UX-логикой сайта.
- Интерфейс лаборатории/терминала/техно-афиши.
- Сочетание грубой сетки, точечной графики и строгой типографики.
- Контраст: почти черный фон, белые технические элементы, красный как сигнал/акцент.

Ключевые мотивы:

- Халфтон-портреты и скульптуры, но не картинками, а алгоритмически или через маски.
- 3D wireframe landscape.
- Псевдо-научные графики.
- Осциллограммы.
- Штрихкоды.
- Координатные сетки.
- Технические подписи мелким шрифтом.
- Перевернутые/вертикальные крупные слова.
- Рамки, тонкие линии, угловые маркеры.
- Глитч-сдвиги текста.
- Низкоуровневый шум, scanlines, posterization.

## 4. Цветовая система

Палитра взята из референса с цветовой карточкой.

```css
:root {
  --color-cotton: #ede8dd;
  --color-cherry-red: #810100;
  --color-maroon: #630000;
  --color-noir-black: #181717;

  --color-white: #f7f3ea;
  --color-black: #050505;
  --color-line: rgba(237, 232, 221, 0.72);
  --color-line-soft: rgba(237, 232, 221, 0.22);
  --color-red-glow: rgba(129, 1, 0, 0.72);
}
```

Основное распределение:

- Noir Black / почти черный: 70-80%.
- Cotton / теплый белый: 15-20%.
- Cherry Red: 5-8%.
- Maroon: 3-5%.

Правила применения:

- Красный использовать как сигнал, не как общий фон.
- Cotton использовать для основного текста, линий, рамок, wireframe.
- Maroon применять для глубоких блоков, hover-состояний, подложек, затемненных акцентов.
- Черный фон должен быть не идеально плоским: добавить noise, scanlines, subtle grain.

Запрещено:

- Уходить в яркий неон, если он ломает палитру.
- Делать много синего/фиолетового synthwave, кроме микроскопических технических акцентов при необходимости.
- Использовать бежево-кремовую тему как основной стиль. Cotton здесь только контрастный технический цвет.

## 5. Типографика

Нужны 2-3 шрифтовые роли.

Роль 1: крупный гротеск для заголовков.

- Очень жирный.
- Сжатый или широкий.
- Верхний регистр.
- Подходит для слов типа `WEB`, `SYSTEMS`, `INTERFACE`, `DISCIPLINE`, `BUILD`.

Варианты:

- `Archivo Black`
- `Anton`
- `Bebas Neue`
- `Druk` / аналог, если есть лицензия
- `Space Grotesk` с высоким weight

Роль 2: моноширинный тех-шрифт.

- Для меток, координат, меню, подписей, псевдокода, карточек услуг.

Варианты:

- `IBM Plex Mono`
- `JetBrains Mono`
- `Space Mono`
- `Roboto Mono`

Роль 3: читаемый текстовый шрифт.

- Для описаний, кейсов, process-блоков.

Варианты:

- `Inter`
- `Suisse Intl` / аналог
- `Manrope`

Типографические правила:

- Заголовки в uppercase.
- Letter-spacing не делать отрицательным.
- Не использовать viewport-based font-size напрямую.
- Использовать `clamp()`, но с разумными min/max.
- Внутри карточек и панелей не ставить hero-size текст.
- Вертикальный текст допустим для маркировки секций.
- Повторяющиеся outline-слова можно использовать как декоративный слой.

Пример токенов:

```css
:root {
  --font-display: "Archivo Black", "Arial Black", sans-serif;
  --font-mono: "IBM Plex Mono", monospace;
  --font-body: "Inter", system-ui, sans-serif;

  --text-xs: 0.72rem;
  --text-sm: 0.875rem;
  --text-md: 1rem;
  --text-lg: 1.25rem;
  --text-xl: 1.75rem;
  --text-hero: clamp(4rem, 12vw, 11rem);
}
```

## 6. Layout-система

Сайт одностраничный, со скролл-навигацией.

Глобальная сетка:

- Desktop: 12 колонок.
- Tablet: 8 колонок.
- Mobile: 4 колонки.
- Внешние поля: `clamp(16px, 3vw, 48px)`.
- Межколоночный gap: `16px` или `24px`.

Композиция:

- Не делать стандартные маркетинговые "карточки в карточках".
- Секции должны ощущаться как разные фрагменты одного большого технического плаката.
- Использовать рамки, разделители, координатные линии, угловые маркеры.
- Контентные блоки могут быть плотными, но иерархия должна оставаться ясной.

Рамки:

```css
.tech-panel {
  border: 1px solid var(--color-line-soft);
  background:
    linear-gradient(rgba(237, 232, 221, 0.025), rgba(237, 232, 221, 0.025)),
    var(--color-black);
}
```

Угловые маркеры:

```css
.corner-frame {
  position: relative;
}

.corner-frame::before,
.corner-frame::after {
  content: "";
  position: absolute;
  width: 18px;
  height: 18px;
  border-color: var(--color-cherry-red);
  border-style: solid;
  pointer-events: none;
}

.corner-frame::before {
  top: 0;
  left: 0;
  border-width: 1px 0 0 1px;
}

.corner-frame::after {
  right: 0;
  bottom: 0;
  border-width: 0 1px 1px 0;
}
```

## 7. Страница и информационные блоки

### 7.1 Header

Назначение:

- Фиксированная навигация.
- Переключатель RU/EN.
- Якоря по секциям.
- Короткий тех-статус: `ONLINE`, `BUILDING DIGITAL SYSTEMS`, `UTC+...`.

Состав:

- Логотип/название студии.
- `Services`
- `Process`
- `Cases`
- `Stack`
- `Contact`
- RU/EN toggle.
- CTA: `Start project` / `Обсудить проект`.

Визуально:

- Тонкая рамка снизу.
- Моноширинный шрифт.
- Можно добавить мини-штрихкод или бегущую координатную строку.

### 7.2 Hero

Назначение:

- Первый экран должен сразу показывать стиль и специализацию.

Контент:

RU:

- H1: `РАЗРАБАТЫВАЕМ САЙТЫ, КОТОРЫЕ ВЫГЛЯДЯТ КАК СИСТЕМЫ`
- Subtext: `Дизайн, frontend, backend и запуск цифровых продуктов для брендов, сервисов и команд.`
- CTA 1: `Обсудить проект`
- CTA 2: `Смотреть подход`

EN:

- H1: `WE BUILD WEBSITES THAT FEEL LIKE SYSTEMS`
- Subtext: `Design, frontend, backend and launch for brands, services and product teams.`
- CTA 1: `Start a project`
- CTA 2: `View process`

Графика:

- Фоновая full-bleed wireframe-сетка.
- Поверх сетки: крупный typographic layer.
- В углу: псевдо-интерфейс с координатами, fps, build id, scan marker.
- Canvas noise/dither overlay.
- Большое вертикальное слово: `WEB` / `SYSTEM`.

Анимация:

- При загрузке: заголовок собирается через glitch/clip-path.
- Wireframe двигается медленно, как поверхность.
- Красный сигнал/маркер пульсирует.
- При скролле: hero уходит через parallax и scale-down.

### 7.3 Services

Назначение:

- Базовые услуги, без финального контента.

Карточки/панели:

1. `Web Design`
2. `Frontend`
3. `Backend`
4. `E-commerce`
5. `Landing Pages`
6. `Support / Iteration`

RU-заглушки:

- `Проектируем интерфейс, структуру и визуальную систему сайта.`
- `Собираем быстрый адаптивный frontend на React.`
- `Разрабатываем серверную логику, API и интеграции.`
- `Подключаем платежи, каталоги, личные кабинеты и CRM.`
- `Делаем посадочные страницы под продукт, услугу или запуск.`
- `Поддерживаем, улучшаем и развиваем сайт после релиза.`

EN-заглушки:

- `We design interface, structure and visual system.`
- `We build fast responsive React frontends.`
- `We develop backend logic, APIs and integrations.`
- `We connect payments, catalogs, accounts and CRM.`
- `We create landing pages for products, services and launches.`
- `We support, improve and iterate after release.`

Визуально:

- Панели как технические модули.
- Каждая услуга имеет номер: `SVC-01`.
- Мини-график или SVG-паттерн внутри панели.
- Hover: тонкий красный border, сканирующая линия, легкий сдвиг текста.

### 7.4 Process

Назначение:

- Показать этапы работы.

Этапы:

1. `Audit / Discovery`
2. `Structure`
3. `Visual System`
4. `Development`
5. `Launch`
6. `Iteration`

RU-заглушки:

- `Разбираем задачу, аудиторию, ограничения и бизнес-цель.`
- `Собираем карту страниц, сценарии и контентные блоки.`
- `Создаем визуальную систему и интерактивные состояния.`
- `Разрабатываем frontend, backend и интеграции.`
- `Тестируем, оптимизируем и выпускаем проект.`
- `Собираем данные и улучшаем продукт после запуска.`

Визуально:

- Горизонтальная или вертикальная timeline-сетка.
- Этапы как строки терминала.
- При скролле активный этап подсвечивается красным.
- ScrollTrigger pinning допустим на desktop.

Анимация:

- Линия процесса дорисовывается при скролле.
- Номера этапов переключаются как счетчик.
- Фоновый waveform реагирует на прогресс секции.

### 7.5 Cases / Work

Назначение:

- Блок под будущие кейсы.

Структура кейса:

- Название проекта.
- Тип: `Landing`, `Corporate`, `E-commerce`, `Web App`.
- Год.
- Роль: `Design / Frontend / Backend / Launch`.
- Краткое описание.
- Метрики/результаты.
- Стек.

Заглушки:

```ts
const cases = [
  {
    id: "case-001",
    title: "Project Name",
    type: "Corporate website",
    year: "2026",
    role: "Design / Frontend / Backend",
    summary: "Short project description will be placed here.",
    metrics: ["Metric 01", "Metric 02", "Metric 03"],
    stack: ["React", "Node.js", "CMS"]
  }
];
```

Визуально:

- Не использовать изображения как превью.
- Превью кейсов строить из кода:
  - CSS-сетка.
  - Wireframe thumbnail.
  - Генеративный barcode.
  - SVG-график.
  - Текстовый mock-интерфейс.
- По hover можно показывать "сканирование" превью.

### 7.6 Tech Stack

Назначение:

- Показать технологии и подход.

Группы:

- `Frontend`: React, TypeScript, Vite, GSAP.
- `Backend`: Node.js, API, database, auth.
- `CMS`: Headless CMS, admin panels.
- `Design`: UI systems, responsive layouts, motion.
- `Infrastructure`: deploy, analytics, performance.

Визуально:

- Табличный блок, похожий на спецификацию.
- Мелкий моноширинный текст.
- Колонки: `Layer`, `Tools`, `Purpose`, `Status`.

Анимация:

- Строки таблицы проявляются через mask reveal.
- Hover подсвечивает строку красным.
- Можно добавить псевдо-terminal cursor.

### 7.7 About / Studio

Назначение:

- Коротко объяснить позиционирование.

RU-заглушка:

`Мы проектируем и разрабатываем сайты как работающие цифровые системы: от структуры и визуального языка до frontend, backend, интеграций и запуска.`

EN-заглушка:

`We design and build websites as working digital systems: from structure and visual language to frontend, backend, integrations and launch.`

Визуально:

- Большой текстовый блок.
- Рядом генеративная точечная форма: рельеф, waveform, dither field.
- Внутри блока: короткие тезисы.

Тезисы:

- `Design with structure`
- `Frontend with motion`
- `Backend with integrations`
- `Launch with measurement`

### 7.8 Contact

Назначение:

- Финальный CTA.

Контент:

RU:

- H2: `ЗАПУСТИМ ВАШ СЛЕДУЮЩИЙ САЙТ`
- Text: `Опишите задачу, сроки и желаемый формат работы. Мы вернемся с вопросами, оценкой и первым планом.`
- Fields: `Имя`, `Контакт`, `Что нужно разработать?`, `Бюджет`, `Срок`
- Button: `Отправить заявку`

EN:

- H2: `LET'S LAUNCH YOUR NEXT WEBSITE`
- Text: `Tell us about the task, timeline and preferred workflow. We will respond with questions, estimate and first plan.`
- Fields: `Name`, `Contact`, `What should we build?`, `Budget`, `Timeline`
- Button: `Send request`

Визуально:

- Форма как технический терминал.
- Inputs с тонкой рамкой.
- Focus-state красный.
- Под формой: email, Telegram, location/timezone.
- Финальный большой barcode / build stamp.

## 8. Навигация и UX

Одностраничная навигация:

- Header links scroll to anchors.
- Active section подсвечивается.
- На mobile меню компактное, без сложной анимации.
- CTA всегда доступен: fixed или в header.

Поведение:

- Скролл должен быть выразительным, но не мешать чтению.
- Все анимации должны иметь reduced-motion fallback.
- Контент должен оставаться понятным без WebGL.
- Важные тексты не должны зависеть от canvas.

Reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}
```

## 9. Эффекты

### 9.1 Noise overlay

Реализация:

- CSS pseudo-element на `body` или `AppShell`.
- Использовать SVG filter или CSS radial/linear gradients.
- Opacity: `0.04-0.12`.
- `mix-blend-mode: screen` или `overlay` осторожно.

Пример:

```css
.noise-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  pointer-events: none;
  opacity: 0.08;
  background-image:
    radial-gradient(circle at 20% 30%, rgba(237, 232, 221, 0.18) 0 1px, transparent 1px),
    radial-gradient(circle at 70% 80%, rgba(237, 232, 221, 0.12) 0 1px, transparent 1px);
  background-size: 3px 3px, 5px 5px;
}
```

### 9.2 Scanlines

```css
.scanlines {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 999;
  background: repeating-linear-gradient(
    to bottom,
    rgba(237, 232, 221, 0.035) 0,
    rgba(237, 232, 221, 0.035) 1px,
    transparent 1px,
    transparent 4px
  );
}
```

### 9.3 Glitch text

Принцип:

- Текст дублируется через `::before` и `::after`.
- Один слой Cotton, второй Cherry Red.
- Сдвиги через `transform`.
- Маска через `clip-path`.
- Использовать коротко, только на hero и CTA.

```css
.glitch {
  position: relative;
}

.glitch::before,
.glitch::after {
  content: attr(data-text);
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.glitch::before {
  color: var(--color-cherry-red);
  transform: translate(2px, 0);
  clip-path: inset(0 0 62% 0);
}

.glitch::after {
  color: var(--color-cotton);
  transform: translate(-1px, 0);
  clip-path: inset(64% 0 0 0);
}
```

### 9.4 Halftone / dither

Варианты:

1. CSS radial pattern для простых зон.
2. SVG pattern для точечной маски.
3. Canvas 2D для real-time dither.
4. WebGL shader для threshold/noise.

Использование:

- В hero как фоновые поля.
- В About как абстрактная точечная форма.
- В Cases как превью без картинок.

Важно:

- Не пытаться имитировать конкретные лица или скульптуры изображением.
- Если нужна человеческая/скульптурная форма, строить ее как SVG contour/wireframe или генеративную silhouette mask.
- Для сайта-визитки достаточно абстрактных дither-полей, waveform и mesh.

### 9.5 Wireframe grid

Графика:

- Перспективная сетка.
- Рельеф/волна.
- Белые линии на черном.
- Красный маркер пути или активной точки.

Реализация:

- Canvas 2D: проще и быстрее.
- Three.js: если нужна настоящая 3D-камера и parallax.

Canvas approach:

- Сетка из линий по X/Z.
- Высота через `Math.sin`, noise или simplex.
- Проекция 3D-точек в 2D.
- На scroll менять cameraY/cameraZ.

### 9.6 Barcode

Использование:

- В header.
- В footer/contact.
- На service cards.

Реализация:

- React-компонент, генерирующий div-полосы из массива чисел.
- Не вставлять картинку.

```tsx
type BarcodeProps = {
  value?: string;
  bars?: number[];
};

export function Barcode({ bars = [2, 1, 3, 1, 1, 4, 2, 2, 1, 3] }: BarcodeProps) {
  return (
    <div className="barcode" aria-hidden="true">
      {bars.map((width, index) => (
        <span key={index} style={{ width }} />
      ))}
    </div>
  );
}
```

## 10. Анимационная система

Использовать GSAP + ScrollTrigger.

Глобальные принципы:

- Анимация должна поддерживать смысл секции.
- Не анимировать все элементы одновременно.
- Не делать постоянный сильный glitch.
- Не ухудшать читаемость.
- На mobile часть pin-анимаций отключить.

Основные паттерны:

- `clip-path reveal` для заголовков.
- `scrub` для wireframe/canvas.
- `pin` для Process на desktop.
- `stagger` для services/cards/table rows.
- `counter` для технических чисел.
- `marquee` для служебной строки, но медленно.

Пример:

```tsx
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function ServicesSection() {
  const rootRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from("[data-service-card]", {
        y: 32,
        opacity: 0,
        stagger: 0.08,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top 72%"
        }
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return <section ref={rootRef}>...</section>;
}
```

## 11. Bilingual content

Контент должен быть двуязычным: RU/EN.

Подход:

- Хранить тексты в `data/content.ru.ts` и `data/content.en.ts`.
- Переключатель языка меняет content object.
- Не размазывать тексты по компонентам.

Пример:

```ts
export const contentRu = {
  nav: {
    services: "Услуги",
    process: "Процесс",
    cases: "Кейсы",
    stack: "Стек",
    contact: "Контакт"
  },
  hero: {
    title: "Разрабатываем сайты, которые выглядят как системы",
    text: "Дизайн, frontend, backend и запуск цифровых продуктов для брендов, сервисов и команд.",
    primaryCta: "Обсудить проект",
    secondaryCta: "Смотреть подход"
  }
};
```

```ts
export const contentEn = {
  nav: {
    services: "Services",
    process: "Process",
    cases: "Work",
    stack: "Stack",
    contact: "Contact"
  },
  hero: {
    title: "We build websites that feel like systems",
    text: "Design, frontend, backend and launch for brands, services and product teams.",
    primaryCta: "Start a project",
    secondaryCta: "View process"
  }
};
```

## 12. Компоненты

Минимальный набор:

- `AppShell`
- `Header`
- `LanguageToggle`
- `SectionLabel`
- `Hero`
- `ServicesGrid`
- `ServiceCard`
- `ProcessTimeline`
- `CaseGrid`
- `CaseCard`
- `TechTable`
- `AboutBlock`
- `ContactForm`
- `Footer`
- `NoiseOverlay`
- `ScanLines`
- `GlitchText`
- `Barcode`
- `WireGridCanvas`
- `DitherCanvas`

Компонент `SectionLabel`:

- Номер секции.
- Название.
- Короткий статус.

Пример:

```tsx
type SectionLabelProps = {
  index: string;
  title: string;
  status?: string;
};

export function SectionLabel({ index, title, status = "ACTIVE" }: SectionLabelProps) {
  return (
    <div className="section-label">
      <span>{index}</span>
      <span>{title}</span>
      <span>{status}</span>
    </div>
  );
}
```

## 13. Формы и интерактивные состояния

Inputs:

- Черный фон.
- Cotton border.
- Red focus.
- Моноширинные labels.
- Ошибки через красный текст и технический код: `ERR_FIELD_REQUIRED`.

Buttons:

- Основная кнопка: Cotton background, black text.
- Hover: Cherry Red background, Cotton text.
- Secondary: transparent, Cotton border.
- В кнопках можно использовать маленькие технические маркеры: `>` `/` `[]`.

Не делать:

- Большие скругленные pill-кнопки.
- Мягкие SaaS-карточки.
- Градиентные CTA.

## 14. Responsive

Desktop:

- Максимально выразительная постерная композиция.
- Можно использовать pinned sections и сложный parallax.

Tablet:

- Сохранять сетку, уменьшить плотность технических деталей.

Mobile:

- Секции идут линейно.
- Вертикальные слова либо скрыть, либо уменьшить.
- Header сделать компактным.
- Wireframe/canvas не должен мешать чтению.
- Отключить тяжелые scroll-pin сценарии.
- Не допускать горизонтального overflow.

Проверять:

- 360px.
- 390px.
- 768px.
- 1024px.
- 1440px.

## 15. Performance

Требования:

- Canvas/WebGL не должен рендериться в скрытых секциях без необходимости.
- Использовать `requestAnimationFrame` только когда элемент видим.
- Учитывать `prefers-reduced-motion`.
- Не создавать тяжелые SVG filters на больших full-screen слоях без тестов.
- Шрифты загружать с `font-display: swap`.
- Lazy-load тяжелые визуальные компоненты.

Цели:

- Lighthouse Performance: 85+.
- CLS: минимальный.
- LCP: hero text должен быть доступен быстро.
- JS bundle не раздувать тяжелыми библиотеками без необходимости.

## 16. Accessibility

Обязательно:

- Семантические секции.
- Один `h1`.
- Контраст текста достаточный.
- Canvas/SVG decoration `aria-hidden="true"`.
- Форма с label для каждого поля.
- Навигация с keyboard focus.
- Focus styles заметные.
- Язык страницы меняется через `lang`.

Не полагаться только на цвет:

- Ошибки формы должны иметь текст.
- Активные состояния должны иметь border/shape/label.

## 17. SEO-база

Для сайта-визитки:

- Title RU/EN.
- Description.
- OpenGraph.
- Canonical.
- Structured data `Organization` при наличии данных.
- Контакты текстом, не только в canvas.

Пример title:

RU: `Студия разработки сайтов | Design, Frontend, Backend`

EN: `Website Development Studio | Design, Frontend, Backend`

## 18. Тон коммуникации

Стиль текста:

- Точный.
- Технологичный.
- Без чрезмерного маркетинга.
- Уверенный, но не агрессивный.
- Короткие фразы.

Подходящие слова:

- `система`
- `структура`
- `интерфейс`
- `запуск`
- `итерация`
- `производительность`
- `интеграции`
- `цифровой продукт`

Избегать:

- `уникальный уникальный`
- `лучшие решения`
- `команда профессионалов`
- `мы воплотим мечты`
- пустые обещания без конкретики.

## 19. Must-have детали из референсов

Обязательно перенести:

- Черный фон + Cotton линии/текст.
- Cherry Red как точечный сигнал.
- Халфтон/дизеринг.
- Wireframe-сетка/рельеф.
- Большая постерная типографика.
- Моноширинные технические подписи.
- Штрихкод.
- Тонкие рамки.
- Вертикальный крупный текст.
- Scanlines/noise.
- Псевдо-графики/осциллограммы.
- Scroll-driven reveal.

Не переносить буквально:

- Чужие постеры.
- Фотографии людей/луны.
- Готовые изображения скульптур.
- Случайные японские надписи без смысла.
- Мотивирующие цитаты из референсов.

## 20. Первичная реализация: порядок работ

1. Создать Vite React TypeScript проект.
2. Подключить глобальные CSS tokens.
3. Подключить шрифты.
4. Собрать `content.ru.ts` и `content.en.ts`.
5. Создать `AppShell`, `Header`, `LanguageToggle`.
6. Собрать hero с typographic layout.
7. Добавить `NoiseOverlay` и `ScanLines`.
8. Реализовать `WireGridCanvas`.
9. Собрать sections: Services, Process, Cases, Stack, About, Contact.
10. Подключить GSAP/ScrollTrigger.
11. Добавить reduced-motion fallback.
12. Проверить mobile layout.
13. Проверить performance.
14. Добавить базовые SEO-теги.

## 21. Definition of Done

Сайт считается готовым на первом дизайн-техническом этапе, если:

- Есть одностраничная React-структура.
- Все основные секции существуют.
- RU/EN контент переключается.
- Нет зависимости от декоративных растровых изображений.
- Палитра соответствует Cotton / Cherry Red / Maroon / Noir Black.
- Есть code-based noise, scanlines, halftone или dither.
- Есть code-based wireframe/grid visual.
- GSAP/ScrollTrigger управляет reveal/scroll-анимациями.
- Mobile-версия читаема.
- Canvas/SVG не ломают доступность.
- Есть базовая форма контакта.
- Есть заглушки под реальные кейсы и услуги.

