'use client';

import { useEffect, useState } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { Users, Star } from 'lucide-react';
import { useCharacterStore } from '@/store/character-store';
import { useDebounce } from '@/hooks/useDebounce';
import { CharacterCard } from '@/components/character/character-card';
import { SearchBar } from '@/components/common/search-bar';
import { DropdownFilter } from '@/components/common/dropdown-filter';
import { Pagination } from '@/components/common/pagination';
import { CharacterGridSkeleton } from '@/components/common/loading-skeleton';
import { PageHeader } from '@/components/layout/page-header';
import { PageTransition } from '@/components/common/page-transition';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const {
    characters,
    loading,
    error,
    filters,
    totalPages,
    hasNextPage,
    fetchCharacters,
    setFilters,
  } = useCharacterStore(
    useShallow((state) => ({
      characters: state.characters,
      loading: state.loading,
      error: state.error,
      filters: state.filters,
      totalPages: state.totalPages,
      hasNextPage: state.hasNextPage,
      fetchCharacters: state.fetchCharacters,
      setFilters: state.setFilters,
    }))
  );

  // Filter options
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'alive', label: 'Alive' },
    { value: 'dead', label: 'Dead' },
    { value: 'unknown', label: 'Unknown' },
  ];

  const speciesOptions = [
    { value: '', label: 'All Species' },
    { value: 'Human', label: 'Human' },
    { value: 'Alien', label: 'Alien' },
    { value: 'Humanoid', label: 'Humanoid' },
    { value: 'Robot', label: 'Robot' },
    { value: 'Animal', label: 'Animal' },
    { value: 'Cronenberg', label: 'Cronenberg' },
    { value: 'Disease', label: 'Disease' },
  ];

  const genderOptions = [
    { value: '', label: 'All Genders' },
    { value: 'Female', label: 'Female' },
    { value: 'Male', label: 'Male' },
    { value: 'Genderless', label: 'Genderless' },
    { value: 'unknown', label: 'Unknown' },
  ];

  // Local search state for immediate UI updates
  const [searchQuery, setSearchQuery] = useState(filters.name);

  // Debounced search value
  const debouncedSearchQuery = useDebounce(searchQuery, 150);

  // Update filters when debounced search changes
  useEffect(() => {
    if (debouncedSearchQuery !== filters.name) {
      setFilters({ name: debouncedSearchQuery, page: 1 });
    }
  }, [debouncedSearchQuery]); // eslint-disable-line react-hooks/exhaustive-deps

  // Fetch characters on mount and when filters change
  useEffect(() => {
    fetchCharacters();
  }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (query: string) => {
    setSearchQuery(query); // Update local state immediately for UI responsiveness
  };

  const handleFilter = (status: string) => {
    setFilters({ status, page: 1 });
  };

  const handleSpeciesFilter = (species: string) => {
    setFilters({ species, page: 1 });
  };

  const handleGenderFilter = (gender: string) => {
    setFilters({ gender, page: 1 });
  };

  const handleFavoritesToggle = () => {
    setFilters({ favoritesOnly: !filters.favoritesOnly, page: 1 });
  };

  const handleNextPage = () => {
    setFilters({ page: filters.page + 1 });
  };

  const handlePrevPage = () => {
    if (filters.page > 1) {
      setFilters({ page: filters.page - 1 });
    }
  };

  const handleResetFilters = () => {
    setFilters({
      name: '',
      status: '',
      species: '',
      gender: '',
      favoritesOnly: false,
      page: 1,
    });
  };

  return (
    <PageTransition>
      <div className="min-h-screen transition-colors duration-500">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <header className="mb-8">
            <PageHeader
              title="Characters"
              subtitle="Explore the Multiverse"
              icon={<Users className="h-10 w-10" />}
            />

            {/* Search and Filters */}
            <div className="mt-4">
              {/* Compact Filter Bar */}
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-center gap-3">
                {/* Search Bar */}
                <div className="lg:mr-4">
                  <SearchBar
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Search characters..."
                  />
                </div>

                {/* Filter Dropdowns */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3">
                  <DropdownFilter
                    label="Status"
                    activeFilter={filters.status}
                    options={statusOptions}
                    onFilterChange={handleFilter}
                    colorTheme="green"
                  />

                  <DropdownFilter
                    label="Species"
                    activeFilter={filters.species}
                    options={speciesOptions}
                    onFilterChange={handleSpeciesFilter}
                    colorTheme="blue"
                  />

                  <DropdownFilter
                    label="Gender"
                    activeFilter={filters.gender}
                    options={genderOptions}
                    onFilterChange={handleGenderFilter}
                    colorTheme="purple"
                  />

                  {/* Favorites Toggle Button */}
                  <button
                    onClick={handleFavoritesToggle}
                    className={`
                    px-3 py-2 rounded-lg border text-xs font-medium transition-all duration-300
                    flex items-center gap-2
                    ${
                      filters.favoritesOnly
                        ? 'transform scale-105 shadow-lg text-white font-semibold'
                        : 'hover:scale-102 hover:shadow-md'
                    }
                  `}
                    style={{
                      backgroundColor: filters.favoritesOnly
                        ? 'var(--primary)'
                        : 'var(--card-bg)',
                      borderColor: filters.favoritesOnly
                        ? 'var(--primary)'
                        : 'var(--card-border)',
                      color: filters.favoritesOnly
                        ? 'white'
                        : 'var(--foreground)',
                    }}
                    onMouseEnter={(e) => {
                      if (!filters.favoritesOnly) {
                        e.currentTarget.style.borderColor = 'var(--primary)'
                        e.currentTarget.style.color = 'var(--primary)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!filters.favoritesOnly) {
                        e.currentTarget.style.borderColor = 'var(--card-border)'
                        e.currentTarget.style.color = 'var(--foreground)'
                      }
                    }}
                  >
                    <Star className="w-3 h-3" />
                    Favorites
                  </button>

                  {/* Clear Filters Button */}
                  {(filters.name ||
                    filters.status ||
                    filters.species ||
                    filters.gender ||
                    filters.favoritesOnly) && (
                    <button
                      onClick={handleResetFilters}
                      className="px-4 py-2 text-xs rounded-md border transition-all duration-300 hover:scale-105 hover:!bg-red-500 hover:!border-red-500 hover:!text-white"
                      style={{
                        color: 'var(--foreground-muted)',
                        borderColor: 'var(--card-border)',
                        backgroundColor: 'var(--card-bg)',
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Error State */}
          {error && (
            <div className="text-center py-12">
              <div className="rounded-lg p-6 max-w-md mx-auto glow-card dark:bg-red-900/20 dark:border-red-500/50 light:bg-red-50 light:border-red-200">
                <h3 className="text-xl font-semibold mb-2 dark:text-red-400 dark:text-glow light:text-red-700">
                  Oops! Something went wrong
                </h3>
                <p className="mb-4 dark:text-red-300 light:text-red-600">
                  {error}
                </p>
                <button
                  onClick={fetchCharacters}
                  className="px-4 py-2 text-white rounded-lg transition-all duration-300 hover:scale-105 dark:bg-red-600 dark:hover:bg-red-500 dark:shadow-lg dark:shadow-red-500/50 light:bg-red-600 light:hover:bg-red-500 light:shadow-md"
                >
                  Try again
                </button>
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="space-y-8">
              <CharacterGridSkeleton />
            </div>
          )}

          {/* Characters Grid */}
          {!loading && !error && characters.length > 0 && (
            <div className="space-y-8">
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                    },
                  },
                }}
              >
                <AnimatePresence mode="popLayout">
                  {characters.map((character) => (
                    <CharacterCard key={character.id} character={character} />
                  ))}
                </AnimatePresence>
              </motion.div>

              {/* Only show pagination when not filtering favorites */}
              {!filters.favoritesOnly && (
                <Pagination
                  currentPage={filters.page}
                  totalPages={totalPages}
                  hasNextPage={hasNextPage}
                  onPrevious={handlePrevPage}
                  onNext={handleNextPage}
                  loading={loading}
                />
              )}
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && characters.length === 0 && (
            <div className="text-center py-12">
              <div
                className="max-w-md mx-auto glow-card rounded-lg p-6"
                style={{ backgroundColor: 'var(--card-bg)' }}
              >
                <h3
                  className="text-xl font-semibold mb-2 dark:text-glow"
                  style={{ color: 'var(--foreground)' }}
                >
                  No characters found
                </h3>
                <p
                  className="mb-4"
                  style={{ color: 'var(--foreground-muted)' }}
                >
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-4 py-2 text-white rounded-lg transition-all duration-300 hover:scale-105 dark:shadow-lg dark:shadow-emerald-500/50 light:shadow-md"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  Reset filters
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}
