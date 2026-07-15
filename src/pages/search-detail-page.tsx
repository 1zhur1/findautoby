import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Edit3, Pause, Trash2, Search, Clock, Bell, MapPin, RefreshCw } from 'lucide-react';
import { Text, Card, Badge, SourceBadge, Button, SectionHeader, EmptyState } from '@ui';
import { useSearch, useUpdateSearch, useDeleteSearch, useRunSearch, useSearchResults } from '@hooks';
import { CarCard } from '@widgets/favorites/car-card';
import { CarSearchIllustration } from '@ui/illustrations';
import { motion } from 'framer-motion';

export function SearchDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: search, isLoading } = useSearch(id);
  const updateSearch = useUpdateSearch();
  const deleteSearch = useDeleteSearch();
  const runSearch = useRunSearch();
  const { data: results = [] } = useSearchResults(id);

  const handleRun = () => {
    if (id) runSearch.mutate(id);
  };

  const handleToggleActive = () => {
    if (!search || !id) return;
    updateSearch.mutate({ id, patch: { isActive: !search.isActive } });
  };

  const handleDelete = () => {
    if (!id) return;
    deleteSearch.mutate(id, { onSuccess: () => navigate('/searches') });
  };

  if (isLoading) return null;

  if (!search) {
    return (
      <div className="flex flex-col items-center justify-center pt-20">
        <Text variant="h2" weight="bold" className="mb-2">
          Поиск не найден
        </Text>
        <Button variant="ghost" onClick={() => navigate('/searches')}>
          Вернуться к поискам
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-4">
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/searches')}
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
        <div className="flex items-center justify-between">
          <div>
            <Text variant="h1" weight="bold">
              {search.brand} {search.generation}
            </Text>
            <Text variant="body" color="secondary" className="mt-1">
              {search.model}
            </Text>
          </div>
          <div className="flex gap-2">
            <button className="rounded-xl bg-zinc-800 p-2.5 transition-colors hover:bg-zinc-700">
              <Edit3 className="h-5 w-5 text-zinc-400" />
            </button>
            <button
              onClick={handleDelete}
              className="rounded-xl bg-zinc-800 p-2.5 transition-colors hover:bg-zinc-700"
            >
              <Trash2 className="h-5 w-5 text-danger" />
            </button>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <Badge variant={search.isActive ? 'success' : 'default'} size="md">
            {search.isActive ? 'Активен' : 'Пауза'}
          </Badge>
          <span className="text-zinc-600">·</span>
          <Text variant="caption" color="tertiary">
            Создан {new Date(search.createdAt).toLocaleDateString()}
          </Text>
        </div>
      </motion.div>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.4, 0, 0.2, 1] }}
        className="mb-6 grid grid-cols-3 gap-3"
      >
        <Card padding="md" className="text-center">
          <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <Search className="h-4 w-4 text-primary" />
          </div>
          <Text variant="h3" weight="bold">{search.foundCount}</Text>
          <Text variant="caption" color="tertiary">Найдено</Text>
        </Card>
        <Card padding="md" className="text-center">
          <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-lg bg-info/10">
            <Clock className="h-4 w-4 text-info" />
          </div>
          <Text variant="h3" weight="bold">
            {Math.floor((Date.now() - new Date(search.lastCheckedAt).getTime()) / 60000)} мин
          </Text>
          <Text variant="caption" color="tertiary">Проверка</Text>
        </Card>
        <Card padding="md" className="text-center">
          <div className="mx-auto mb-1 flex h-9 w-9 items-center justify-center rounded-lg bg-success/10">
            <Bell className="h-4 w-4 text-success" />
          </div>
          <Text variant="h3" weight="bold">{search.sources.length}</Text>
          <Text variant="caption" color="tertiary">Источники</Text>
        </Card>
      </motion.div>

      {/* Details */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
        className="mb-6 space-y-3"
      >
        <SectionHeader title="Параметры поиска" />
        <Card padding="md">
          <div className="space-y-3">
            <DetailRow label="Цена" value={`${search.priceMin?.toLocaleString() || 0} - ${search.priceMax.toLocaleString()} ${search.currency}`} />
            <DetailRow label="Год" value={`${search.yearFrom || 'Любой'} - ${search.yearTo || 'Любой'}`} />
            <DetailRow label="Пробег" value={`до ${search.mileageTo?.toLocaleString() || '不限'} км`} />
            {search.engineType && <DetailRow label="Двигатель" value={search.engineType} />}
            {search.transmission && <DetailRow label="Коробка" value={search.transmission} />}
            {search.drive && <DetailRow label="Привод" value={search.drive} />}
            {search.bodyType && <DetailRow label="Кузов" value={search.bodyType} />}
            {search.color && <DetailRow label="Цвет" value={search.color} />}
            {search.city && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-zinc-500" />
                <Text variant="caption" color="tertiary">{search.city}</Text>
              </div>
            )}
          </div>
        </Card>
      </motion.div>

      {/* Sources */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25, ease: [0.4, 0, 0.2, 1] }}
        className="mb-6"
      >
        <SectionHeader title="Источники" />
        <div className="flex flex-wrap gap-2">
          {search.sources.map((src) => (
            <SourceBadge key={src} source={src as any} size="md" />
          ))}
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="flex gap-3"
      >
        <Button
          variant="secondary"
          size="lg"
          fullWidth
          leftIcon={<Pause className="h-5 w-5" />}
          onClick={handleToggleActive}
        >
          {search.isActive ? 'Приостановить' : 'Возобновить'}
        </Button>
        <Button
          variant="danger"
          size="lg"
          leftIcon={<Trash2 className="h-5 w-5" />}
          onClick={handleDelete}
        >
          Удалить
        </Button>
      </motion.div>

      {/* Найденные объявления */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
        className="mt-8"
      >
        <div className="mb-3 flex items-center justify-between">
          <SectionHeader
            title="Найденные объявления"
            subtitle={results.length ? `${results.length} авто` : undefined}
          />
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<RefreshCw className={`h-4 w-4 ${runSearch.isPending ? 'animate-spin' : ''}`} />}
            onClick={handleRun}
            disabled={runSearch.isPending}
          >
            {runSearch.isPending ? 'Ищем…' : 'Обновить'}
          </Button>
        </div>

        {runSearch.isError && (
          <Text variant="caption" color="tertiary" className="mb-3 block text-danger">
            Не удалось получить объявления. Попробуйте позже.
          </Text>
        )}

        {runSearch.data && (
          <div className="mb-4 flex flex-wrap gap-2">
            {runSearch.data.perSource.map((s) => (
              <Badge key={s.source} variant={s.ok && s.count > 0 ? 'success' : 'default'} size="sm">
                {s.source}: {s.ok ? s.count : '—'}
              </Badge>
            ))}
          </div>
        )}

        {results.length > 0 ? (
          <div className="space-y-3">
            {results.map((car, index) => (
              <CarCard key={car.id} car={car} index={index} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<CarSearchIllustration className="h-28 w-full text-zinc-600" />}
            title="Пока нет объявлений"
            description="Нажмите «Обновить», чтобы найти автомобили по этому поиску на площадках"
          />
        )}
      </motion.div>

      <div className="h-8" />
    </div>
  );
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <Text variant="caption" color="tertiary">{label}</Text>
      <Text variant="body" weight="medium">{value}</Text>
    </div>
  );
}