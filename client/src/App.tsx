import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Routes, Route } from 'react-router-dom'
import { SidebarProvider, SidebarInset } from './components/ui/sidebar'
import { Sidebar } from './components/sidebar/sidebar'
import { ThemeProvider } from './context/theme'
import { ProductsScreen } from './screens/products.screen'

function App() {
  const { i18n } = useTranslation()

  useEffect(() => {
    const dir = i18n.language === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.dir = dir
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  return (
    <ThemeProvider>
      <SidebarProvider>
        <Sidebar />
        <SidebarInset>
          <Routes>
            <Route path="/" element={<ProductsScreen />} />
          </Routes>
        </SidebarInset>
      </SidebarProvider>
    </ThemeProvider>
  )
}

export default App
