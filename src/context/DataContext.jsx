import { createContext, useContext, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchPersonalInfo,
  fetchExperience,
  fetchProjects,
  fetchSkills,
  fetchBlogs,
  fetchEducation,
  fetchStats,
  fetchSocialLinks,
} from '../store/slices/portfolioSlice';
import {
  transformPersonalInfo,
  transformExperience,
  transformProjects,
  transformSkills,
  transformBlogs,
  transformEducation,
  transformStats,
  transformSocialLinks,
  transformRoles,
  transformDeployment,
} from '../utils/dataTransform';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const dispatch = useDispatch();
  const {
    personalInfo: rawPersonalInfo,
    experience: rawExperience,
    projects: rawProjects,
    skills: rawSkills,
    blogs: rawBlogs,
    education: rawEducation,
    stats: rawStats,
    socialLinks: rawSocialLinks,
    loading,
    error,
  } = useSelector((state) => state.portfolio);

  // Fetch data on mount
  useEffect(() => {
    dispatch(fetchPersonalInfo());
    dispatch(fetchExperience());
    dispatch(fetchProjects());
    dispatch(fetchSkills());
    dispatch(fetchBlogs());
    dispatch(fetchEducation());
    dispatch(fetchStats());
    dispatch(fetchSocialLinks());
  }, [dispatch]);

  // Transform data to match original format
  const transformedPersonalInfo = transformPersonalInfo(rawPersonalInfo);
  const transformedExperience = transformExperience(rawExperience);
  const transformedProjects = transformProjects(rawProjects);
  const transformedSkills = transformSkills(rawSkills);
  const transformedBlogs = transformBlogs(rawBlogs);
  const transformedEducation = transformEducation(rawEducation);
  const transformedStats = transformStats(rawStats);
  const transformedSocialLinks = transformSocialLinks(rawSocialLinks);
  const transformedRoles = transformRoles(transformedPersonalInfo);
  const transformedDeployment = transformDeployment(transformedSkills);

  const value = {
    personalInfo: transformedPersonalInfo,
    experience: transformedExperience,
    projects: transformedProjects,
    skills: transformedSkills,
    blogs: transformedBlogs,
    education: transformedEducation,
    stats: transformedStats,
    socialLinks: transformedSocialLinks,
    roles: transformedRoles,
    deployment: transformedDeployment,
    loading,
    error,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
};
