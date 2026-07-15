/**
 * Единая дизайн-система FindAuto
 * Все значения должны использоваться строго в рамках этих токенов
 */

export const DESIGN = {
  /** Радиусы */
  radius: {
    card: '20px',      // Основной радиус карточек
    cardSm: '16px',    // Маленькие карточки
    button: '14px',    // Кнопки
    input: '14px',     // Поля ввода
    badge: '8px',      // Бейджи/теги
    modal: '24px',     // Модальные окна
    full: '9999px',    // Полный радиус (круги)
  },

  /** Отступы внутри карточек */
  padding: {
    card: '20px',     // Обычная карточка
    cardSm: '16px',   // Маленькая карточка
    section: '24px',  // Расширенная
  },

  /** Внешние отступы */
  spacing: {
    section: '32px',      // Между секциями
    cards: '12px',        // Между карточками
    elements: '16px',     // Между элементами
    gridGap: '10px',      // Gap в grid
    contentX: '16px',     // px-* на main
  },

  /** Высота элементов */
  height: {
    button: '52px',    // Высота кнопок
    input: '52px',     // Высота полей 
    iconBox: '42px',   // Контейнер иконки
    iconBoxSm: '36px', // Маленький контейнер иконки
    iconBoxXs: '32px', // Маленький
  },

  /** Размеры иконок */
  icon: {
    sm: '16px',
    md: '20px',
    lg: '24px',
  },

  /** Типографика */
  text: {
    display: { size: '28px', lineHeight: '1.2', weight: '700' },
    h1: { size: '26px', lineHeight: '1.25', weight: '700' },
    h2: { size: '22px', lineHeight: '1.3', weight: '600' },
    h3: { size: '18px', lineHeight: '1.35', weight: '600' },
    h4: { size: '16px', lineHeight: '1.4', weight: '600' },
    body: { size: '15px', lineHeight: '1.45', weight: '400' },
    caption: { size: '13px', lineHeight: '1.4', weight: '400' },
    overline: { size: '11px', lineHeight: '1.3', weight: '600', tracking: '0.05em' },
  },

  /** Shadow для карточек */
  shadow: {
    card: '0 2px 16px rgba(0,0,0,0.08)',
    elevated: '0 8px 32px rgba(0,0,0,0.12)',
    glass: '0 4px 24px rgba(0,0,0,0.06)',
  },

  /** Анимации */
  animation: {
    spring: { type: 'spring' as const, stiffness: 300, damping: 28 },
    smooth: { duration: 0.35, ease: [0.4, 0, 0.2, 1] as const },
    fast: { duration: 0.18, ease: [0.4, 0, 0.2, 1] as const },
  },
} as const;