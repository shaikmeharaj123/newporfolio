/**
 * Transform API response data to match the expected format in resume.js
 */

export const transformPersonalInfo = (apiData) => {
  if (!apiData) return {};
  return {
    name: apiData.name || "",
    title: apiData.title || "",
    subtitle: apiData.subtitle || "",
    location: apiData.location || "",
    phone: apiData.phone || "",
    email: apiData.email || "",
    profileImage: apiData.profileImage || "/profile.jpg",
    resumeUrl: apiData.resumeUrl || "/resume.pdf",
    summary: apiData.summary || "",
  };
};

export const transformExperience = (apiDataArray) => {
  if (!Array.isArray(apiDataArray)) return [];
  // Create a copy before sorting to avoid mutating Redux state
  return [...apiDataArray]
    .sort((a, b) => (b.order || 0) - (a.order || 0))
    .map((item) => ({
      role: item.role || "",
      company: item.company || "",
      location: item.location || "",
      period: item.period || "",
      current: item.current || false,
      highlights: Array.isArray(item.highlights) ? item.highlights : [],
    }));
};

export const transformProjects = (apiDataArray) => {
  if (!Array.isArray(apiDataArray)) return [];
  // Create a copy before sorting to avoid mutating Redux state
  return [...apiDataArray]
    .sort((a, b) => (b.order || 0) - (a.order || 0))
    .map((item) => ({
      name: item.name || item.title || "",
      tagline: item.tagline || item.description || "",
      description: item.description || item.tagline || "",
      stack: Array.isArray(item.stack) ? item.stack : [],
      category: item.category || "Full Stack",
      color: item.color || "#6366f1",
      icon: item.icon || "💼",
      panels: Array.isArray(item.panels) ? item.panels : [],
      image: item.image || item.coverImage || "",
      link: item.link || item.url || "",
    }));
};

export const transformSkills = (apiDataArray) => {
  if (!Array.isArray(apiDataArray)) return {};

  const skillsMap = {};

  apiDataArray.forEach((item) => {
    const category = item.category || "Other";
    if (!skillsMap[category]) {
      skillsMap[category] = [];
    }
    if (item.name) {
      skillsMap[category].push(item.name);
    }
  });

  return skillsMap;
};

export const transformBlogs = (apiDataArray) => {
  if (!Array.isArray(apiDataArray)) return [];
  // Create a copy before sorting to avoid mutating Redux state
  return [...apiDataArray]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .map((item) => ({
      title: item.title || "",
      category: item.category || "Blog",
      date: item.issueDate
        ? new Date(item.issueDate).getFullYear()
        : new Date().getFullYear(),
      readTime: item.readTime || "5 min read",
      excerpt: item.excerpt || item.content?.substring(0, 150) || "",
      tags: Array.isArray(item.tags) ? item.tags : [],
      slug: item.slug || "",
    }));
};

export const transformEducation = (apiDataArray) => {
  if (!Array.isArray(apiDataArray)) return [];
  // Create a copy before sorting to avoid mutating Redux state
  return [...apiDataArray]
    .sort((a, b) => (b.order || 0) - (a.order || 0))
    .map((item) => ({
      degree: item.degree || "",
      institution: item.institution || "",
      period: item.period || "",
      cgpa: item.cgpa || "",
      location: item.location || "",
    }));
};

export const transformStats = (apiDataArray) => {
  if (!Array.isArray(apiDataArray)) return [];
  // Create a copy before sorting to avoid mutating Redux state
  // THIS WAS THE ORIGINAL ERROR - sorting directly on Redux state
  return [...apiDataArray]
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((item) => ({
      value: item.value || "0",
      label: item.label || "",
      icon: item.icon || "",
    }));
};

export const transformSocialLinks = (apiDataArray) => {
  if (!Array.isArray(apiDataArray)) return [];
  // Create a copy before sorting to avoid mutating Redux state
  return [...apiDataArray]
    .filter((item) => item.isActive !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((item) => ({
      platform: item.platform || "",
      url: item.url || "",
      username: item.username || "",
      icon: item.icon || "",
      color: item.color || "#000000",
    }));
};

export const transformRoles = (personalInfo) => {
  const roles = [];
  if (personalInfo?.title) roles.push(personalInfo.title);
  if (personalInfo?.subtitle) roles.push(personalInfo.subtitle);
  return roles.length > 0 ? roles : ["Developer", "Designer"];
};

export const transformDeployment = (skills) => {
  // Map common deployment platforms based on skills or static list
  const defaultDeployments = [
    { platform: "Google Play Store", type: "Mobile", icon: "📱" },
    { platform: "Vercel", type: "Web", icon: "▲" },
    { platform: "Netlify", type: "Web", icon: "◆" },
    { platform: "Hostinger", type: "Web", icon: "⬡" },
  ];
  return defaultDeployments;
};
