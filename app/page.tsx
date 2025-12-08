'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { useShallow } from 'zustand/react/shallow';
import { useCharacterStore } from '@/store/character-store';
import { CharacterCard } from '@/components/character/character-card';
import { SearchBar } from '@/components/common/search-bar';
import { DropdownFilter } from '@/components/common/dropdown-filter';
import { Pagination } from '@/components/common/pagination';
import { CharacterGridSkeleton } from '@/components/common/loading-skeleton';
import { ThemeToggle } from '@/components/layout/theme-toggle';

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
  } = useCharacterStore(useShallow((state) => ({
    characters: state.characters,
    loading: state.loading,
    error: state.error,
    filters: state.filters,
    totalPages: state.totalPages,
    hasNextPage: state.hasNextPage,
    fetchCharacters: state.fetchCharacters,
    setFilters: state.setFilters,
  })));

  // Filter options
  const statusOptions = [
    { value: '', label: 'All Status' },
    { value: 'alive', label: 'Alive' },
    { value: 'dead', label: 'Dead' },
    { value: 'unknown', label: 'Unknown' }
  ];

  const speciesOptions = [
    { value: '', label: 'All Species' },
    { value: 'Human', label: 'Human' },
    { value: 'Alien', label: 'Alien' },
    { value: 'Humanoid', label: 'Humanoid' },
    { value: 'Robot', label: 'Robot' },
    { value: 'Animal', label: 'Animal' },
    { value: 'Cronenberg', label: 'Cronenberg' },
    { value: 'Disease', label: 'Disease' }
  ];

  const genderOptions = [
    { value: '', label: 'All Genders' },
    { value: 'Female', label: 'Female' },
    { value: 'Male', label: 'Male' },
    { value: 'Genderless', label: 'Genderless' },
    { value: 'unknown', label: 'Unknown' }
  ];

  // Fetch characters on mount and when filters change
  useEffect(() => {
    fetchCharacters();
  }, [filters.name, filters.status, filters.species, filters.gender, filters.page]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSearch = (query: string) => {
    setFilters({ name: query, page: 1 });
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

  const handleNextPage = () => {
    setFilters({ page: filters.page + 1 });
  };

  const handlePrevPage = () => {
    if (filters.page > 1) {
      setFilters({ page: filters.page - 1 });
    }
  };

  const handleResetFilters = () => {
    setFilters({ name: '', status: '', species: '', gender: '', page: 1 });
  };

  return (
    <div className="min-h-screen transition-colors duration-500">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1
                className="text-4xl md:text-5xl font-bold transition-colors duration-300"
                style={{ color: 'var(--foreground)' }}
              >
                Rick & Morty
                <span
                  className="block text-2xl md:text-3xl font-light text-primary dark:text-glow"
                  style={{ color: 'var(--primary)' }}
                >
                  Character Explorer
                </span>
              </h1>
              <div className="flex gap-4 mt-4">
                <Link
                  href="/episodes"
                  className="px-4 py-2 rounded-lg border transition-all duration-300 hover:scale-105 dark:hover:text-glow"
                  style={{
                    borderColor: 'var(--card-border)',
                    backgroundColor: 'var(--card-bg)',
                    color: 'var(--foreground-muted)',
                  }}
                >
                  Browse Episodes
                </Link>
              </div>
            </div>
            <ThemeToggle />
          </div>

          {/* Search and Filters */}
          <div className="space-y-6 mt-8">
            {/* Search Bar */}
            <div className="flex justify-center">
              <SearchBar
                value={filters.name}
                onChange={handleSearch}
                placeholder="Search characters..."
              />
            </div>
            
            {/* Filter Dropdowns */}
            <div className="flex flex-wrap items-center justify-center gap-4">
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
            </div>

            {/* Clear Filters Button */}
            {(filters.name || filters.status || filters.species || filters.gender) && (
              <div className="flex justify-center">
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-3 text-sm rounded-lg border transition-all duration-300 hover:scale-105 dark:hover:text-glow light:hover:shadow-md"
                  style={{
                    color: 'var(--foreground-muted)',
                    borderColor: 'var(--card-border)',
                    backgroundColor: 'var(--card-bg)',
                  }}
                >
                  Clear All Filters
                </button>
              </div>
            )}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
            </div>

            <Pagination
              currentPage={filters.page}
              totalPages={totalPages}
              hasNextPage={hasNextPage}
              onPrevious={handlePrevPage}
              onNext={handleNextPage}
              loading={loading}
            />
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
              <p className="mb-4" style={{ color: 'var(--foreground-muted)' }}>
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
  );
}
