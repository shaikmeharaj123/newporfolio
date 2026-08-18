import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://portfolio-api-sage-nine.vercel.app/api';
const CACHE_KEY = 'portfolio-cache-v2';
const CACHE_TTL_MS = 1000 * 60 * 60 * 6;

const safeStorage = {
  read() {
    if (typeof window === 'undefined') return null;
    try {
      const raw = window.localStorage.getItem(CACHE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed?.cachedAt || Date.now() - parsed.cachedAt > CACHE_TTL_MS) {
        return null;
      }
      return parsed;
    } catch {
      return null;
    }
  },
  write(payload) {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.setItem(CACHE_KEY, JSON.stringify({
        ...payload,
        cachedAt: Date.now(),
      }));
    } catch {
      // Ignore storage quota or privacy mode failures.
    }
  },
  clear() {
    if (typeof window === 'undefined') return;
    try {
      window.localStorage.removeItem(CACHE_KEY);
    } catch {
      // Ignore storage failures.
    }
  },
};

const cached = safeStorage.read();

// Create axios instance
const apiClient = axios.create({
  baseURL: API_URL,
  timeout: 10000,
});

// Async thunks for fetching data
export const fetchPersonalInfo = createAsyncThunk(
  'portfolio/fetchPersonalInfo',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/personal-info');
      return response.data.data.docs[0] || {};
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch personal info');
    }
  }
);

export const fetchExperience = createAsyncThunk(
  'portfolio/fetchExperience',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/experience?limit=100');
      return response.data.data.docs || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch experience');
    }
  }
);

export const fetchProjects = createAsyncThunk(
  'portfolio/fetchProjects',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/projects?limit=100');
      return response.data.data.docs || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch projects');
    }
  }
);

export const fetchSkills = createAsyncThunk(
  'portfolio/fetchSkills',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/skills?limit=100');
      return response.data.data.docs || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch skills');
    }
  }
);

export const fetchBlogs = createAsyncThunk(
  'portfolio/fetchBlogs',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/blogs?limit=100');
      return response.data.data.docs || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch blogs');
    }
  }
);

export const fetchEducation = createAsyncThunk(
  'portfolio/fetchEducation',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/education?limit=100');
      return response.data.data.docs || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch education');
    }
  }
);

export const fetchStats = createAsyncThunk(
  'portfolio/fetchStats',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/stats?limit=100');
      return response.data.data.docs || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch stats');
    }
  }
);

export const fetchSocialLinks = createAsyncThunk(
  'portfolio/fetchSocialLinks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/social-links?limit=100');
      return response.data.data.docs || [];
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch social links');
    }
  }
);

export const fetchPortfolioMeta = createAsyncThunk(
  'portfolio/fetchPortfolioMeta',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/portfolio/meta');
      return response.data.data || {};
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch portfolio meta');
    }
  }
);

const initialState = cached
  ? {
      personalInfo: cached.personalInfo || {},
      experience: cached.experience || [],
      projects: cached.projects || [],
      skills: cached.skills || {},
      blogs: cached.blogs || [],
      education: cached.education || [],
      stats: cached.stats || [],
      socialLinks: cached.socialLinks || [],
      cacheVersion: cached.cacheVersion || null,
      loading: false,
      error: null,
    }
  : {
      personalInfo: {},
      experience: [],
      projects: [],
      skills: {},
      blogs: [],
      education: [],
      stats: [],
      socialLinks: [],
      cacheVersion: null,
      loading: false,
      error: null,
    };

const persistState = (state) => {
  safeStorage.write({
    personalInfo: state.personalInfo,
    experience: state.experience,
    projects: state.projects,
    skills: state.skills,
    blogs: state.blogs,
    education: state.education,
    stats: state.stats,
    socialLinks: state.socialLinks,
    cacheVersion: state.cacheVersion,
  });
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
    clearPortfolioCache: (state) => {
      safeStorage.clear();
      state.personalInfo = {};
      state.experience = [];
      state.projects = [];
      state.skills = {};
      state.blogs = [];
      state.education = [];
      state.stats = [];
      state.socialLinks = [];
      state.cacheVersion = null;
    },
  },
  extraReducers: (builder) => {
    const startLoading = (state) => {
      state.loading = true;
      state.error = null;
    };

    const stopLoading = (state) => {
      state.loading = false;
    };

    builder
      .addCase(fetchPersonalInfo.pending, startLoading)
      .addCase(fetchPersonalInfo.fulfilled, (state, action) => {
        stopLoading(state);
        state.personalInfo = action.payload;
        persistState(state);
      })
      .addCase(fetchPersonalInfo.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload;
      });

    builder
      .addCase(fetchExperience.pending, startLoading)
      .addCase(fetchExperience.fulfilled, (state, action) => {
        stopLoading(state);
        state.experience = action.payload;
        persistState(state);
      })
      .addCase(fetchExperience.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload;
      });

    builder
      .addCase(fetchProjects.pending, startLoading)
      .addCase(fetchProjects.fulfilled, (state, action) => {
        stopLoading(state);
        state.projects = action.payload;
        persistState(state);
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload;
      });

    builder
      .addCase(fetchSkills.pending, startLoading)
      .addCase(fetchSkills.fulfilled, (state, action) => {
        stopLoading(state);
        state.skills = action.payload;
        persistState(state);
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload;
      });

    builder
      .addCase(fetchBlogs.pending, startLoading)
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        stopLoading(state);
        state.blogs = action.payload;
        persistState(state);
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload;
      });

    builder
      .addCase(fetchEducation.pending, startLoading)
      .addCase(fetchEducation.fulfilled, (state, action) => {
        stopLoading(state);
        state.education = action.payload;
        persistState(state);
      })
      .addCase(fetchEducation.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload;
      });

    builder
      .addCase(fetchStats.pending, startLoading)
      .addCase(fetchStats.fulfilled, (state, action) => {
        stopLoading(state);
        state.stats = action.payload;
        persistState(state);
      })
      .addCase(fetchStats.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload;
      });

    builder
      .addCase(fetchSocialLinks.pending, startLoading)
      .addCase(fetchSocialLinks.fulfilled, (state, action) => {
        stopLoading(state);
        state.socialLinks = action.payload;
        persistState(state);
      })
      .addCase(fetchSocialLinks.rejected, (state, action) => {
        stopLoading(state);
        state.error = action.payload;
      });

    builder
      .addCase(fetchPortfolioMeta.fulfilled, (state, action) => {
        const nextVersion = action.payload?.version || null;
        if (nextVersion && state.cacheVersion !== nextVersion) {
          state.cacheVersion = nextVersion;
          persistState(state);
        }
      })
      .addCase(fetchPortfolioMeta.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const { resetError, clearPortfolioCache } = portfolioSlice.actions;
export default portfolioSlice.reducer;
