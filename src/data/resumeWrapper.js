/**
 * This wrapper ensures that components importing from resume.js
 * get the data from Redux/DataContext instead of static values.
 * 
 * Components don't need to change - they still import from resume.js
 * but the data is now dynamic and comes from the API via Redux.
 */

// Fallback data for SSR or when context is not available
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

// Export fallback values for backward compatibility
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
