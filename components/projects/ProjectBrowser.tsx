'use client'

import { useState, useMemo } from 'react'
import { ProjectSummary } from '@/lib/types'
import ProjectCardGrid from './ProjectCardGrid'
import AdvancedGrid from '../common/AdvancedGrid'
import ContentSearch from '../common/ContentSearch'
import { filterProjects, getUniqueCategories, getUniqueYears } from '@/lib/project-filters'
import { motion, AnimatePresence } from 'framer-motion'

interface ProjectBrowserProps {
  initialProjects: ProjectSummary[]
}

export default function ProjectBrowser({ initialProjects }: ProjectBrowserProps) {
  const [category, setCategory] = useState('All')
  const [year, setYear] = useState('All')
  const [search, setSearch] = useState('')

  const categories = useMemo(() => getUniqueCategories(initialProjects), [initialProjects])
  const years = useMemo(() => getUniqueYears(initialProjects), [initialProjects])

  const filteredProjects = useMemo(() => {
    return filterProjects(initialProjects, { category, year, search })
  }, [initialProjects, category, year, search])

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-12">
        <div className="flex flex-wrap gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 block">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors border ${
                    category === c
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-transparent border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-500 block">Year</label>
            <div className="flex flex-wrap gap-2">
              {years.map((y) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={`px-3 py-1 text-sm rounded-full transition-colors border ${
                    year === y
                      ? 'bg-foreground text-background border-foreground'
                      : 'bg-transparent border-gray-200 dark:border-gray-800 hover:border-gray-400 dark:hover:border-gray-600'
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="w-full lg:w-64">
          <ContentSearch value={search} onChange={setSearch} />
        </div>
      </div>

      <AdvancedGrid columns={{ default: 1, md: 2 }}>
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectCardGrid {...project} />
            </motion.div>
          ))}
        </AnimatePresence>
      </AdvancedGrid>
      
      {filteredProjects.length === 0 && (
        <div className="text-center py-24 text-gray-500">
          <p className="text-xl mb-2">No projects found.</p>
          <p className="text-sm">Try adjusting your filters or search query.</p>
        </div>
      )}
    </div>
  )
}

