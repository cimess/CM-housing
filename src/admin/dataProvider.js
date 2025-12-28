
import simpleRestProvider from "@refinedev/simple-rest";
import axios from "axios";
import { getAccessToken } from "@/utils/authStore";

const API_URL =import.meta.env.MODE === "production" ? "https://cm-housing.onrender.com/api" : "http://localhost:4000/api";

const axiosAuth = axios.create({
    withCredentials: true // Ensure cookies are sent
});

axiosAuth.interceptors.request.use((config) => {
  const token = getAccessToken();
  // console.log("DEBUG: dataProvider token:", token ? "Found" : "Missing");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

const baseDataProvider = simpleRestProvider(API_URL, axiosAuth);

export const dataProvider = {
  ...baseDataProvider,
  getList: async ({ resource, pagination, filters, sorters, meta }) => {
    let url = `${API_URL}/${resource}`;

    // Map resource names to API endpoints if they differ
    if (resource === "users") {
        url = `${API_URL}/user`;
    }

    const { current = 1, pageSize = 10 } = pagination ?? {};

    // Query parameters for the backend
    const query = {
      _start: (current - 1) * pageSize,
      _end: current * pageSize,
    };

    // Handle Sorting
    if (sorters && sorters.length > 0) {
      query._sort = sorters[0].field;
      query._order = sorters[0].order.toUpperCase(); // ASC or DESC
    }

    // Handle Filters
    if (filters && filters.length > 0) {
      filters.forEach((filter) => {
        if (filter.operator === "eq") {
           // For exact matches like role="admin"
           query[filter.field] = filter.value;
        } else if (filter.operator === "contains") {
           // For search capability
           query[filter.field] = filter.value;
        }
      });
    }

    try {
        // console.log(`DEBUG: Fetching ${resource}`, url, query);
        const { data } = await axiosAuth.get(url, { params: query });
        // console.log(`DEBUG: Response for ${resource}`, data);

        // Standardize response structure based on resource
        if (resource === "users") {
            // Backend returns { data: [...], total: N }
            return {
                data: data.data || [],
                total: data.total || 0,
            };
        }

        if (resource === "houses") {
            // Backend returns { houses: [...], hasMore: ... }
            // Ideally backend should return total count.
            // If not available, we can rely on length, but pagination won't be perfect without total.
             return {
                data: data.houses || [],
                total: data.total || (data.houses?.length || 0) + (data.hasMore ? 100 : 0),
            };
        }

        if (resource === "reports") {
             return {
                data: data || [],
                total: (data || []).length,
            };
        }

        // Fallback
        return {
            data: Array.isArray(data) ? data : (data.data || []),
            total: Array.isArray(data) ? data.length : (data.total || 0),
        };
    } catch (error) {
        console.error("Data Provider Error:", error);
        throw error;
    }
  },

  getOne: async ({ resource, id }) => {
    let url = `${API_URL}/${resource}/${id}`;
    if (resource === "users") url = `${API_URL}/user/${id}`;

    try {
        const { data } = await axiosAuth.get(url);
        return { data };
    } catch (error) {
        console.error("GetOne Error:", error);
        throw error;
    }
  },

  deleteOne: async ({ resource, id, variables }) => {
    let url = `${API_URL}/${resource}/${id}`;
    if (resource === "users") url = `${API_URL}/user/${id}`;

    try {
        const { data } = await axiosAuth.delete(url);
        return { data };
    } catch (error) {
        console.error("Delete Error:", error);
        throw error;
    }
  },

  update: async ({ resource, id, variables }) => {
    let url = `${API_URL}/${resource}/${id}`;
    if (resource === "users") url = `${API_URL}/user/${id}`;

    try {
        const { data } = await axiosAuth.put(url, variables);
        return { data };
    } catch (error) {
        // Fallback for PATCH if PUT fails or vice versa
        try {
             const { data } = await axiosAuth.patch(url, variables);
             return { data };
        } catch (patchError) {
             console.error("Update Error:", error);
             throw error;
        }
    }
  },
};
