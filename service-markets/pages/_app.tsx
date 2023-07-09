import type { AppProps } from 'next/app'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { Layout } from '@/components'
import { WagmiConfig, createConfig, configureChains, mainnet } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { goerli } from 'wagmi/chains'
import { InjectedConnector } from '@wagmi/core'

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

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [publicProvider()],
)

const config = createConfig({
  autoConnect: true,
  connectors: [new InjectedConnector({ chains })],
  publicClient,
  webSocketPublicClient,
})

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <ChakraProvider theme={theme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </WagmiConfig>
  )
}

export default MyApp;