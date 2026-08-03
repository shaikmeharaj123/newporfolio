import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useMemo } from 'react';
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

/**
 * Custom hook to fetch and provide portfolio data from Redux
 * Returns the same data structure as the original resume.js
 */
export const usePortfolioData = () => {
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

  // Fetch data on component mount
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

  // Transform API data to match original format
  const transformedData = useMemo(
    () => ({
      personalInfo: transformPersonalInfo(rawPersonalInfo),
      experience: transformExperience(rawExperience),
      projects: transformProjects(rawProjects),
      skills: transformSkills(rawSkills),
      blogs: transformBlogs(rawBlogs),
      education: transformEducation(rawEducation),
      stats: transformStats(rawStats),
      socialLinks: transformSocialLinks(rawSocialLinks),
      roles: transformRoles(transformPersonalInfo(rawPersonalInfo)),
      deployment: transformDeployment(transformSkills(rawSkills)),
    }),
    [rawPersonalInfo, rawExperience, rawProjects, rawSkills, rawBlogs, rawEducation, rawStats, rawSocialLinks]
  );

  return {
    ...transformedData,
    loading,
    error,
  };
};

/**
 * Fallback data for when API is not available
 * This ensures the app doesn't break if the API is down
 */
export const fallbackData = {
  personalInfo: {
    name: 'Developer',
    title: 'Full Stack Developer',
    subtitle: 'UI/UX Designer',
    location: 'Location',
    phone: '+1 (555) 123-4567',
    email: 'contact@example.com',
    profileImage: '/profile.jpg',
    resumeUrl: '/resume.pdf',
    summary: 'Loading portfolio data...',
  },
  experience: [],
  projects: [],
  skills: {},
  blogs: [],
  education: [],
  stats: [],
  socialLinks: [],
  roles: ['Developer', 'Designer'],
  deployment: [
    { platform: 'Google Play Store', type: 'Mobile', icon: '📱' },
    { platform: 'Vercel', type: 'Web', icon: '▲' },
    { platform: 'Netlify', type: 'Web', icon: '◆' },
    { platform: 'Hostinger', type: 'Web', icon: '⬡' },
  ],
};

/**
 * Export individual data exports for backward compatibility
 * Components can still import these directly if needed
 */
export const personalInfo = fallbackData.personalInfo;
export const experience = fallbackData.experience;
export const projects = fallbackData.projects;
export const skills = fallbackData.skills;
export const blogs = fallbackData.blogs;
export const education = fallbackData.education;
export const stats = fallbackData.stats;
export const socialLinks = fallbackData.socialLinks;
export const roles = fallbackData.roles;
export const deployment = fallbackData.deployment;
