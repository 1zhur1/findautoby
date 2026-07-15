import { ArrowLeft, Car, Search, Fuel, Cog, MapPin, Globe, Check, ChevronDown, ChevronUp } from 'lucide-react';
import { BrandSelector } from '@widgets/search/brand-selector';
import { Text, Button, Input, Card } from '@ui';
import { SourceBadge } from '@ui';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@shared/utils';
import { useCreateSearch } from '@hooks';
import type { SearchInput } from '@shared/api/endpoints';

const FUEL_TYPES = ['Бензин', 'Дизель', 'Электро', 'Гибрид', 'Газ'];
const TRANSMISSIONS = ['Автомат', 'Механика', 'Робот', 'Вариатор'];
const DRIVES = ['Передний', 'Задний', 'Полный'];
const BODY_TYPES = ['Седан', 'Хэтчбек', 'Универсал', 'Купе', 'Кабриолет', 'Внедорожник', 'Минивэн', 'Пикап'];
const COLORS = ['Черный', 'Белый', 'Синий', 'Красный', 'Серый', 'Зеленый', 'Бежевый', 'Коричневый'];
const CITIES = ['Минск', 'Брест', 'Гродно', 'Гомель', 'Могилев', 'Витебск'];
const SOURCES = [
  { id: 'avby', label: 'AV.BY' },
  { id: 'kufar', label: 'Kufar' },
  { id: 'onliner', label: 'Onliner' },
] as const;

type SectionId = 'main' | 'engine' | 'body' | 'location' | 'sources' | 'additional';

const SECTIONS: { id: SectionId; title: string; subtitle: string }[] = [
  { id: 'main', title: 'Основное', subtitle: 'Марка, модель, цена' },
  { id: 'engine', title: 'Двигатель', subtitle: 'Тип, объем, мощность' },
  { id: 'body', title: 'Кузов', subtitle: 'Тип, цвет, двери' },
  { id: 'location', title: 'Местоположение', subtitle: 'Город, регион, радиус' },
  { id: 'sources', title: 'Источники', subtitle: 'Площадки для поиска' },
  { id: 'additional', title: 'Дополнительно', subtitle: 'Другие параметры' },
];

// Единое состояние формы, поднятое на уровень страницы
interface FormState {
  brand: string;
  models: string[];
  priceMin: string;
  priceMax: string;
  fuelType: string;
  transmission: string;
  drive: string;
  bodyType: string;
  color: string;
  city: string;
  sources: string[];
  vinRequired: boolean;
  noAccidents: boolean;
  originalMileage: boolean;
  oneOwner: boolean;
  onlyWithPhotos: boolean;
}

const initialForm: FormState = {
  brand: '',
  models: [],
  priceMin: '',
  priceMax: '',
  fuelType: '',
  transmission: '',
  drive: '',
  bodyType: '',
  color: '',
  city: '',
  sources: ['avby', 'onliner'],
  vinRequired: false,
  noAccidents: false,
  originalMileage: false,
  oneOwner: false,
  onlyWithPhotos: true,
};

type SetField = <K extends keyof FormState>(key: K, value: FormState[K]) => void;

function toSearchInput(form: FormState): SearchInput {
  const num = (v: string) => (v.trim() ? Number(v) : undefined);
  return {
    brand: form.brand,
    model: form.models.join(', '),
    priceMin: num(form.priceMin),
    priceMax: num(form.priceMax) ?? 0,
    currency: 'USD',
    engineType: form.fuelType || undefined,
    transmission: form.transmission || undefined,
    drive: form.drive || undefined,
    bodyType: form.bodyType || undefined,
    color: form.color || undefined,
    city: form.city || undefined,
    sources: form.sources,
    vinRequired: form.vinRequired,
    noAccidents: form.noAccidents,
    originalMileage: form.originalMileage,
    oneOwner: form.oneOwner,
    onlyWithPhotos: form.onlyWithPhotos,
    isActive: true,
  };
}

export function CreateSearchPage() {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<Set<SectionId>>(new Set(['main']));
  const [form, setForm] = useState<FormState>(initialForm);
  const createSearch = useCreateSearch();

  const setField: SetField = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const toggleSection = (id: SectionId) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = () => {
    setError(null);
    createSearch.mutate(toSearchInput(form), {
      onSuccess: (created) => {
        if (created?.id) navigate(`/searches/${created.id}`);
        else navigate('/searches');
      },
      onError: () => setError('Не удалось создать поиск. Проверьте соединение и попробуйте ещё раз.'),
    });
  };

  return (
    <div className="pb-8 pt-4">
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="mb-4 flex items-center gap-2 text-zinc-400 transition-colors hover:text-white"
      >
        <ArrowLeft className="h-5 w-5" />
        <Text variant="body">Назад</Text>
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="mb-6"
      >
        <Text variant="h1" weight="bold" className="mb-1">
          Создать поиск
        </Text>
        <Text variant="body" color="secondary">
          Настройте фильтр для поиска автомобилей
        </Text>
      </motion.div>

      {/* Wizard Sections */}
      <div className="space-y-3">
        {SECTIONS.map((section, sectionIndex) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.05 * sectionIndex, ease: [0.4, 0, 0.2, 1] }}
          >
            <Card padding="md">
              <button
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <SectionIcon id={section.id} />
                  <div className="text-left">
                    <Text variant="body" weight="semibold">
                      {section.title}
                    </Text>
                    <Text variant="caption" color="tertiary">
                      {section.subtitle}
                    </Text>
                  </div>
                </div>
                {expandedSections.has(section.id) ? (
                  <ChevronUp className="h-5 w-5 text-zinc-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-zinc-500" />
                )}
              </button>

              <AnimatePresence>
                {expandedSections.has(section.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="mt-4 border-t border-zinc-800 pt-4">
                      <SectionContent id={section.id} form={form} setField={setField} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        className="mt-6"
      >
        {error && (
          <Text variant="caption" className="mb-3 block text-center text-danger">
            {error}
          </Text>
        )}
        <Button
          variant="primary"
          size="xl"
          fullWidth
          disabled={createSearch.isPending}
          leftIcon={<Search className="h-5 w-5" />}
          onClick={handleSubmit}
        >
          {createSearch.isPending ? 'Создание…' : 'Создать поиск'}
        </Button>
      </motion.div>
    </div>
  );
}

function SectionIcon({ id }: { id: SectionId }) {
  const icons: Record<SectionId, typeof Car> = {
    main: Car,
    engine: Fuel,
    body: Cog,
    location: MapPin,
    sources: Globe,
    additional: Check,
  };
  const Icon = icons[id];
  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800">
      <Icon className="h-5 w-5 text-zinc-400" />
    </div>
  );
}

function PillsSelect({
  options,
  selected,
  onChange,
}: {
  options: readonly string[];
  selected: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(selected === opt ? '' : opt)}
          className={cn(
            'rounded-lg px-3 py-1.5 text-sm font-medium transition-colors',
            selected === opt
              ? 'bg-primary text-white'
              : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700',
          )}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function SectionContent({ id, form, setField }: { id: SectionId; form: FormState; setField: SetField }) {
  switch (id) {
    case 'main':
      return (
        <div className="space-y-3">
          <BrandSelector
            selectedBrand={form.brand}
            selectedModels={form.models}
            onBrandChange={(v) => setField('brand', v)}
            onModelsChange={(v) => setField('models', v)}
          />
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Text variant="caption" weight="semibold" className="mb-1.5 block text-zinc-400">
                Цена от
              </Text>
              <Input type="number" placeholder="10000" value={form.priceMin} onChange={(e) => setField('priceMin', e.target.value)} />
            </div>
            <div>
              <Text variant="caption" weight="semibold" className="mb-1.5 block text-zinc-400">
                Цена до
              </Text>
              <Input type="number" placeholder="50000" value={form.priceMax} onChange={(e) => setField('priceMax', e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Text variant="caption" weight="semibold" className="mb-1.5 block text-zinc-400">
                Год от
              </Text>
              <Input type="number" placeholder="2020" />
            </div>
            <div>
              <Text variant="caption" weight="semibold" className="mb-1.5 block text-zinc-400">
                Год до
              </Text>
              <Input type="number" placeholder="2025" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Text variant="caption" weight="semibold" className="mb-1.5 block text-zinc-400">
                Пробег от
              </Text>
              <Input type="number" placeholder="0" />
            </div>
            <div>
              <Text variant="caption" weight="semibold" className="mb-1.5 block text-zinc-400">
                Пробег до
              </Text>
              <Input type="number" placeholder="50000" />
            </div>
          </div>
        </div>
      );
    case 'engine':
      return (
        <div className="space-y-3">
          <div>
            <Text variant="caption" weight="semibold" className="mb-1.5 block text-zinc-400">
              Тип топлива
            </Text>
            <PillsSelect options={FUEL_TYPES} selected={form.fuelType} onChange={(v) => setField('fuelType', v)} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Text variant="caption" weight="semibold" className="mb-1.5 block text-zinc-400">
                Объем от
              </Text>
              <Input type="number" placeholder="1.0" />
            </div>
            <div>
              <Text variant="caption" weight="semibold" className="mb-1.5 block text-zinc-400">
                Объем до
              </Text>
              <Input type="number" placeholder="4.0" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Text variant="caption" weight="semibold" className="mb-1.5 block text-zinc-400">
                Мощность от
              </Text>
              <Input type="number" placeholder="100" />
            </div>
            <div>
              <Text variant="caption" weight="semibold" className="mb-1.5 block text-zinc-400">
                Мощность до
              </Text>
              <Input type="number" placeholder="300" />
            </div>
          </div>
          <div>
            <Text variant="caption" weight="semibold" className="mb-1.5 block text-zinc-400">
              Коробка передач
            </Text>
            <PillsSelect options={TRANSMISSIONS} selected={form.transmission} onChange={(v) => setField('transmission', v)} />
          </div>
          <div>
            <Text variant="caption" weight="semibold" className="mb-1.5 block text-zinc-400">
              Привод
            </Text>
            <PillsSelect options={DRIVES} selected={form.drive} onChange={(v) => setField('drive', v)} />
          </div>
        </div>
      );
    case 'body':
      return (
        <div className="space-y-3">
          <div>
            <Text variant="caption" weight="semibold" className="mb-1.5 block text-zinc-400">
              Тип кузова
            </Text>
            <PillsSelect options={BODY_TYPES} selected={form.bodyType} onChange={(v) => setField('bodyType', v)} />
          </div>
          <div>
            <Text variant="caption" weight="semibold" className="mb-1.5 block text-zinc-400">
              Цвет
            </Text>
            <PillsSelect options={COLORS} selected={form.color} onChange={(v) => setField('color', v)} />
          </div>
          <div>
            <Text variant="caption" weight="semibold" className="mb-1.5 block text-zinc-400">
              Количество дверей
            </Text>
            <div className="flex gap-3">
              {[2, 4, 5].map((d) => (
                <button
                  key={d}
                  className={cn(
                    'flex h-12 w-12 items-center justify-center rounded-xl text-sm font-medium transition-colors',
                    'bg-zinc-800 text-zinc-400 hover:bg-zinc-700',
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        </div>
      );
    case 'location':
      return (
        <div className="space-y-3">
          <div>
            <Text variant="caption" weight="semibold" className="mb-1.5 block text-zinc-400">
              Город / Регион
            </Text>
            <PillsSelect options={CITIES} selected={form.city} onChange={(v) => setField('city', v)} />
          </div>
          <div>
            <Text variant="caption" weight="semibold" className="mb-1.5 block text-zinc-400">
              Радиус поиска
            </Text>
            <input
              type="range"
              min="0"
              max="200"
              defaultValue="50"
              className="w-full accent-primary"
            />
            <div className="mt-1 flex justify-between text-xs text-zinc-500">
              <span>0 км</span>
              <span>100 км</span>
              <span>200 км</span>
            </div>
          </div>
        </div>
      );
    case 'sources':
      return (
        <div className="space-y-3">
          <Text variant="caption" weight="semibold" className="mb-1.5 block text-zinc-400">
            Площадки для поиска
          </Text>
          {SOURCES.map((src) => {
            const isSelected = form.sources.includes(src.id);
            return (
              <button
                key={src.id}
                onClick={() =>
                  setField(
                    'sources',
                    isSelected ? form.sources.filter((s) => s !== src.id) : [...form.sources, src.id],
                  )
                }
                className="flex w-full items-center justify-between rounded-xl bg-zinc-800 px-4 py-3 transition-colors hover:bg-zinc-700"
              >
                <div className="flex items-center gap-3">
                  <SourceBadge source={src.id as never} size="md" />
                  <Text variant="body">{src.label}</Text>
                </div>
                <div
                  className={cn(
                    'flex h-6 w-6 items-center justify-center rounded-md border-2 transition-colors',
                    isSelected ? 'border-primary bg-primary' : 'border-zinc-600',
                  )}
                >
                  {isSelected && <Check className="h-4 w-4 text-white" />}
                </div>
              </button>
            );
          })}
        </div>
      );
    case 'additional':
      return (
        <div className="space-y-3">
          {([
            { label: 'VIN обязателен', key: 'vinRequired' },
            { label: 'Без ДТП', key: 'noAccidents' },
            { label: 'Оригинальный пробег', key: 'originalMileage' },
            { label: 'Один владелец', key: 'oneOwner' },
            { label: 'Только с фотографиями', key: 'onlyWithPhotos' },
          ] as const).map((item) => {
            const value = form[item.key];
            return (
              <button
                key={item.label}
                onClick={() => setField(item.key, !value)}
                className="flex w-full items-center justify-between rounded-xl bg-zinc-800 px-4 py-3 transition-colors hover:bg-zinc-700"
              >
                <Text variant="body">{item.label}</Text>
                <div
                  className={cn(
                    'h-6 w-10 rounded-full p-0.5 transition-colors',
                    value ? 'bg-primary' : 'bg-zinc-600',
                  )}
                >
                  <div
                    className={cn(
                      'h-5 w-5 rounded-full bg-white shadow-sm transition-transform',
                      value ? 'translate-x-4' : 'translate-x-0',
                    )}
                  />
                </div>
              </button>
            );
          })}
        </div>
      );
    default:
      return null;
  }
}
