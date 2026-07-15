import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Check, ChevronRight, Car, Plus, XCircle } from 'lucide-react';
import { Text, Input } from '@ui';
import { cn } from '@shared/utils';
import { BRANDS_DATA } from '@mocks/brands-data';

interface BrandSelectorProps {
  selectedBrand: string;
  selectedModels: string[];
  onBrandChange: (brand: string) => void;
  onModelsChange: (models: string[]) => void;
}

export function BrandSelector({ selectedBrand, selectedModels, onBrandChange, onModelsChange }: BrandSelectorProps) {
  const [brandSearch, setBrandSearch] = useState('');
  const [modelSearch, setModelSearch] = useState('');
  const [showBrandList, setShowBrandList] = useState(false);

  const filteredBrands = useMemo(() => {
    if (!brandSearch) return BRANDS_DATA;
    const q = brandSearch.toLowerCase();
    return BRANDS_DATA.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.models.some((m) => m.toLowerCase().includes(q)),
    );
  }, [brandSearch]);

  const selectedBrandData = BRANDS_DATA.find((b) => b.name === selectedBrand);

  const toggleModel = (model: string) => {
    if (selectedModels.includes(model)) {
      onModelsChange(selectedModels.filter((m) => m !== model));
    } else {
      onModelsChange([...selectedModels, model]);
    }
    setModelSearch('');
  };

  const removeModel = (model: string) => {
    onModelsChange(selectedModels.filter((m) => m !== model));
  };

  return (
    <div className="space-y-4">
      {/* Brand selection */}
      <div>
        <Text variant="caption" weight="semibold" className="mb-2 block text-zinc-400">
          Марка
        </Text>
        <button
          onClick={() => setShowBrandList(true)}
          className="flex w-full items-center justify-between rounded-xl bg-zinc-800 px-4 py-3.5 transition-colors hover:bg-zinc-700"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-700">
              <Car className="h-5 w-5 text-zinc-400" />
            </div>
            <div className="text-left">
              <Text variant="body" weight="medium" className={selectedBrand ? '' : 'text-zinc-500'}>
                {selectedBrand || 'Выберите марку'}
              </Text>
              {selectedBrand && (
                <Text variant="caption" color="tertiary">
                  {selectedModels.length > 0
                    ? `Выбрано ${selectedModels.length} моделей`
                    : `${BRANDS_DATA.find((b) => b.name === selectedBrand)?.models.length || 0} моделей`}
                </Text>
              )}
            </div>
          </div>
          <ChevronRight className="h-5 w-5 text-zinc-500" />
        </button>
      </div>

      {/* Selected models tags */}
      {selectedModels.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedModels.map((model) => (
            <span
              key={model}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary/10 px-3 py-1.5 text-sm text-primary"
            >
              {model}
              <button onClick={() => removeModel(model)} className="text-primary/60 hover:text-primary transition-colors">
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
          {selectedModels.length > 0 && (
            <button
              onClick={() => onModelsChange([])}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm text-zinc-500 transition-colors hover:text-zinc-300"
            >
              <XCircle className="h-3.5 w-3.5" />
              Очистить
            </button>
          )}
        </div>
      )}

      {/* Model selection */}
      {selectedBrand && (
        <div>
          <Text variant="caption" weight="semibold" className="mb-2 block text-zinc-400">
            Модель
          </Text>
          <div className="relative">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                placeholder="Поиск модели..."
                value={modelSearch}
                onChange={(e) => setModelSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="mt-2 flex max-h-48 flex-col gap-1 overflow-y-auto no-scrollbar">
              {(selectedBrandData?.models || [])
                .filter((m) => !modelSearch || m.toLowerCase().includes(modelSearch.toLowerCase()))
                .map((model) => {
                  const isSelected = selectedModels.includes(model);
                  return (
                    <button
                      key={model}
                      onClick={() => toggleModel(model)}
                      className={cn(
                        'flex w-full items-center justify-between rounded-lg px-4 py-2.5 text-left text-sm transition-colors',
                        isSelected
                          ? 'bg-primary/10 text-primary'
                          : 'text-zinc-300 hover:bg-zinc-800',
                      )}
                    >
                      <span>{model}</span>
                      <div
                        className={cn(
                          'flex h-5 w-5 items-center justify-center rounded border-2 transition-colors',
                          isSelected ? 'border-primary bg-primary' : 'border-zinc-600',
                        )}
                      >
                        {isSelected && <Check className="h-3.5 w-3.5 text-white" />}
                      </div>
                    </button>
                  );
                })}
              {selectedBrandData &&
                selectedBrandData.models.filter((m) => !modelSearch || m.toLowerCase().includes(modelSearch.toLowerCase()))
                  .length === 0 && (
                  <Text variant="caption" color="tertiary" className="py-3 text-center">
                    Модели не найдены
                  </Text>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen brand picker modal */}
      <AnimatePresence>
        {showBrandList && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
            onClick={() => setShowBrandList(false)}
          >
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="flex max-h-[85vh] w-full max-w-lg flex-col overflow-hidden rounded-t-2xl bg-zinc-900"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Handle */}
              <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-zinc-700" />

              {/* Header */}
              <div className="flex shrink-0 items-center justify-between border-b border-zinc-800 px-5 pb-3 pt-4">
                <Text variant="h4" weight="bold">
                  Выберите марку
                </Text>
                <button
                  onClick={() => setShowBrandList(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 transition-colors hover:bg-zinc-700"
                >
                  <X className="h-4 w-4 text-zinc-400" />
                </button>
              </div>

              {/* Search */}
              <div className="shrink-0 px-5 pb-2 pt-3">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    placeholder="Поиск марки..."
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    autoFocus
                    className="w-full rounded-xl bg-zinc-800 py-3 pl-10 pr-4 text-sm text-white placeholder-zinc-500 outline-none ring-1 ring-zinc-700 transition-all focus:ring-primary"
                  />
                </div>
              </div>

              {/* Brand list */}
              <div className="min-h-0 flex-1 overflow-y-auto px-3 pb-6 no-scrollbar">
                {filteredBrands.length > 0 ? (
                  <div className="flex flex-col gap-0.5">
                    {filteredBrands.map((brand) => {
                      const isSelected = brand.name === selectedBrand;
                      return (
                        <button
                          key={brand.name}
                          onClick={() => {
                            onBrandChange(brand.name);
                            onModelsChange([]);
                            setBrandSearch('');
                            setShowBrandList(false);
                          }}
                          className={cn(
                            'flex w-full items-center justify-between rounded-xl px-3 py-3.5 text-left transition-all',
                            isSelected
                              ? 'bg-primary/10 text-primary'
                              : 'text-zinc-300 hover:bg-zinc-800/70',
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={cn(
                                'flex h-10 w-10 items-center justify-center rounded-lg text-lg font-bold',
                                isSelected ? 'bg-primary/15 text-primary' : 'bg-zinc-800 text-zinc-400',
                              )}
                            >
                              {brand.name.charAt(0)}
                            </div>
                            <div>
                              <Text variant="body" weight="medium">
                                {brand.name}
                              </Text>
                              <Text variant="caption" color="tertiary">
                                {brand.models.length} моделей
                              </Text>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary">
                              <Check className="h-3.5 w-3.5 text-white" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center py-8 text-zinc-500">
                    <Search className="mb-2 h-8 w-8" />
                    <Text variant="body" color="tertiary">
                      Ничего не найдено
                    </Text>
                    <Text variant="caption" color="tertiary">
                      Попробуйте изменить запрос
                    </Text>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}