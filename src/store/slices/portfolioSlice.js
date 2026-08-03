import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://portfolio-api-sage-nine.vercel.app/api';

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

const initialState = {
  personalInfo: {},
  experience: [],
  projects: [],
  skills: {},
  blogs: [],
  education: [],
  stats: [],
  socialLinks: [],
  loading: false,
  error: null,
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Personal Info
    builder
      .addCase(fetchPersonalInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPersonalInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.personalInfo = action.payload;
      })
      .addCase(fetchPersonalInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Experience
    builder
      .addCase(fetchExperience.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExperience.fulfilled, (state, action) => {
        state.loading = false;
        state.experience = action.payload;
      })
      .addCase(fetchExperience.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Projects
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.loading = false;
        state.projects = action.payload;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Skills
    builder
      .addCase(fetchSkills.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSkills.fulfilled, (state, action) => {
        state.loading = false;
        state.skills = action.payload;
      })
      .addCase(fetchSkills.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Blogs
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Education
    builder
      .addCase(fetchEducation.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEducation.fulfilled, (state, action) => {
        state.loading = false;
        state.education = action.payload;
      })
      .addCase(fetchEducation.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Stats
    builder
      .addCase(fetchStats.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStats.fulfilled, (state, action) => {
        state.loading = false;
        state.stats = action.payload;
      })
      .addCase(fetchStats.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Social Links
    builder
      .addCase(fetchSocialLinks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSocialLinks.fulfilled, (state, action) => {
        state.loading = false;
        state.socialLinks = action.payload;
      })
      .addCase(fetchSocialLinks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetError } = portfolioSlice.actions;
export default portfolioSlice.reducer;
