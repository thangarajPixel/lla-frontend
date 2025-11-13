import axios, { type AxiosInstance, type AxiosError } from "axios"

const API_BASE_URL = "/api"

class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    })

    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        console.error("[API Error]", error.message)
        return Promise.reject(error)
      },
    )
  }

  async get<T>(url: string, config = {}): Promise<T> {
    const response = await this.client.get<T>(url, config)
    return response.data
  }

  async post<T>(url: string, data?: unknown, config = {}): Promise<T> {
    const response = await this.client.post<T>(url, data, config)
    return response.data
  }

  async put<T>(url: string, data?: unknown, config = {}): Promise<T> {
    const response = await this.client.put<T>(url, data, config)
    return response.data
  }

  async delete<T>(url: string, config = {}): Promise<T> {
    const response = await this.client.delete<T>(url, config)
    return response.data
  }

  async patch<T>(url: string, data?: unknown, config = {}): Promise<T> {
    const response = await this.client.patch<T>(url, data, config)
    return response.data
  }
}

export const apiClient = new ApiClient()
