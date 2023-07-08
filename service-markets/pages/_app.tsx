import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Layout } from '@/components'

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#17441B',
        color: '#fff',
      },
    },
  },
  fonts: {
    subtitle: 'Oxygen Mono',
    body: 'Fira Mono',
    heading: 'Fira Mono',
  },
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp;