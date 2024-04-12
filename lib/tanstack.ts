import { QueryClient } from '@tanstack/react-query'
import { isAxiosError } from 'axios'

let displayedNetworkFailureError = false

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount) {
        if (failureCount >= 3) {
          if (displayedNetworkFailureError === false) {
            displayedNetworkFailureError = true
          }

          return false
        }

        return true
      },
    },
    mutations: {
      onError(error) {
        if (isAxiosError(error)) {
          if ('message' in error.response?.data) {
            console.log(error.response?.data.message)
          } else {
            console.log('Erro ao processar operação!')
          }
        }
      },
    },
  },
})