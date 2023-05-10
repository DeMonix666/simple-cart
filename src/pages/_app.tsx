import 'styles/global.css'

import { Provider } from 'react-redux'
import store, { persistor } from 'store'
import { PersistGate } from 'redux-persist/integration/react';
import Layout from 'components/Layout'

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page: any) => page)

  return getLayout(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  )
}
