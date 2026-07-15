import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Text, Button, SectionHeader } from '@ui';
import { Plus } from 'lucide-react';
import { SearchCard } from '@widgets/search/search-card';
import { SearchIllustration } from '@ui/illustrations';
import { EmptyState } from '@ui';
import { searches as initialSearches } from '@mocks/searches';
import { motion } from 'framer-motion';

export function SearchesPage() {
  const navigate = useNavigate();
  const [searches, setSearches] = useState(initialSearches);

  const handleToggle = (id: string) => {
    setSearches(prev =>
      prev.map(search =>
        search.id === id ? { ...search, isActive: !search.isActive } : search,
      ),
    );
  };

  return (
    <div className="pt-5">
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      >
        <Text variant="h1" weight="bold" className="mb-1">
          Поиски
        </Text>
        <Text variant="body" color="secondary" className="mb-6">
          Управляйте вашими поисками
        </Text>

        <Button
          variant="primary"
          size="md"
          fullWidth
          leftIcon={<Plus className="h-5 w-5" />}
          onClick={() => navigate('/create-search')}
          className="mb-8"
        >
          Создать поиск
        </Button>
      </motion.div>

      {searches.length > 0 ? (
        <div className="space-y-4">
          <SectionHeader
            title="Активные поиски"
            subtitle={`${searches.filter(s => s.isActive).length} активных`}
          />
          {searches.map((search, index) => (
            <SearchCard
              key={search.id}
              search={search}
              index={index}
              onClick={() => navigate(`/searches/${search.id}`)}
              onToggle={() => handleToggle(search.id)}
            />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<SearchIllustration className="h-32 w-full text-zinc-600" />}
          title="Нет активных поисков"
          description="Создайте первый поиск, чтобы мы начали искать автомобили"
          action={{ label: 'Создать поиск', onClick: () => navigate('/create-search') }}
        />
      )}
    </div>
  );
}