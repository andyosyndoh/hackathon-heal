import { apiClient } from './api';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

class AuthManager {
  private listeners: ((state: AuthState) => void)[] = [];
  private state: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true,
  };

  constructor() {
    this.initializeAuth();
  }

  private async initializeAuth() {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('heal_access_token');
    const userStr = localStorage.getItem('heal_user');

    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        // Verify token is still valid
        const profileResponse = await apiClient.getUserProfile();
        if (profileResponse.error) {
          this.logout();
        }
      } catch (error) {
        this.logout();
      }
    } else {
      this.setState({
        user: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  }

  private setState(newState: Partial<AuthState>) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach(listener => listener(this.state));
  }

  subscribe(listener: (state: AuthState) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  getState(): AuthState {
    return this.state;
  }

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    this.setState({ isLoading: true });

    try {
      const response = await apiClient.login(email, password);
      
      if (response.error) {
        this.setState({ isLoading: false });
        return { success: false, error: response.error };
      }

      if (response.data) {
        const { user } = response.data;
        apiClient.setCurrentUser(user);
        
        this.setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        return { success: true };
      }

      return { success: false, error: 'Login failed' };
    } catch (error) {
      this.setState({ isLoading: false });
      return { success: false, error: 'Network error occurred' };
    }
  }

  async register(data: {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
  }): Promise<{ success: boolean; error?: string }> {
    this.setState({ isLoading: true });

    try {
      const response = await apiClient.register(data);
      
      if (response.error) {
        this.setState({ isLoading: false });
        return { success: false, error: response.error };
      }

      if (response.data) {
        const { user } = response.data;
        apiClient.setCurrentUser(user);
        
        this.setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });

        return { success: true };
      }

      return { success: false, error: 'Registration failed' };
    } catch (error) {
      this.setState({ isLoading: false });
      return { success: false, error: 'Network error occurred' };
    }
  }

  async logout(): Promise<void> {
    try {
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }

    // Clear local storage
    if (typeof window !== 'undefined') {
      localStorage.removeItem('heal_access_token');
      localStorage.removeItem('heal_refresh_token');
      localStorage.removeItem('heal_user');
    }

    this.setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
  }

  async refreshToken(): Promise<boolean> {
    if (typeof window === 'undefined') return false;

    const refreshToken = localStorage.getItem('heal_refresh_token');
    if (!refreshToken) return false;

    try {
      // Implement refresh token logic here
      // For now, just logout if token is invalid
      return false;
    } catch (error) {
      this.logout();
      return false;
    }
  }
}

export const authManager = new AuthManager();
export default authManager;