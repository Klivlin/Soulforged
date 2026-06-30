# Y2K Tech Site

Одностраничный сайт-визитка студии разработки сайтов в стиле Y2K/techno эстетика.

## Особенности

- **Стилистика**: Y2K/Techno + халфтон + wireframe-сетки
- **Технологии**: React 18 + TypeScript + Vite + GSAP
- **Визуальные эффекты**: Canvas wireframe grid, дизеринг, глитч, сканлайны, noise overlay, штрихкоды
- **Палитра**: Cotton (#ede8dd) / Cherry Red (#810100) / Maroon (#630000) / Noir Black (#181717)
- **Двуязычность**: RU/EN переключение контента
- **Адаптивность**: Mobile-first подход

## Структура проекта

```
src/
├── components/          # Секции сайта
│   ├── Header/         # Фиксированная навигация
│   ├── Hero/           # Главный экран с глитч-заголовком
│   ├── Services/       # Карточки услуг
│   ├── Process/        # Timeline процесса работы
│   ├── Cases/          # Портфолио проектов
│   ├── TechStack/      # Таблица технологий
│   ├── About/          # О студии
│   └── Contact/        # Форма контакта
├── effects/            # Визуальные эффекты
│   ├── WireframeGrid   # Canvas 3D-сетка
│   ├── GlitchText      # Глитч-эффект текста
│   ├── NoiseOverlay    # Шумовой оверлей
│   ├── ScanLines       # Горизонтальные линии
│   └── Barcode         # Генерируемый штрихкод
├── data/               # Контент RU/EN
└── styles/             # CSS-токены и глобальные стили
```

## Технические детали

### Палитра
- Cotton (#ede8dd) — основной текст, линии, wireframe
- Cherry Red (#810100) — акценты, сигналы
- Maroon (#630000) — глубокие блоки, тени
- Noir Black (#181717) — основной фон

### Типографика
- Display: Archivo Black (заголовки)
- Mono: IBM Plex Mono (технические метки)
- Body: Inter (основной текст)

### Визуальные эффекты

**WireframeGrid** — Canvas-сетка с волновой анимацией
**GlitchText** — RGB-смещение через CSS
**NoiseOverlay** — Точечный шум
**ScanLines** — Горизонтальные линии
**Barcode** — Генеративный штрихкод

## Лицензия

MIT
