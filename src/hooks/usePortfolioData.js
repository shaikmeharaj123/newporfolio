import { useData } from '../context/DataContext';

/**
 * Custom hook that provides portfolio data from Redux/DataContext
 * Components can use this hook to get live data instead of importing static values
 * 
 * Usage in components:
 * const { personalInfo, experience, projects, skills, blogs, education, stats, roles, deployment } = usePortfolioData();
 */
export const usePortfolioData = () => {
  return useData();
};
