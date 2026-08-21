import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { DemoRoleBanner } from './components/common/DemoRoleBanner';
import { ProductDetailModal } from './components/common/ProductDetailModal';
import { OrderModal } from './components/common/OrderModal';
import { QrCodeModal } from './components/common/QrCodeModal';
import { AiChatDrawer } from './components/common/AiChatDrawer';

// Pages
import { HomePage } from './pages/public/HomePage';
import { MarketplacePage } from './pages/public/MarketplacePage';
import { AiPriceAdvisorPage } from './pages/public/AiPriceAdvisorPage';
import { GroupSellingPage } from './pages/public/GroupSellingPage';
import { MarketPricesPage } from './pages/public/MarketPricesPage';
import { CentersStoragePage } from './pages/public/CentersStoragePage';
import { TraceabilityPage } from './pages/public/TraceabilityPage';
import { HowItWorksPage } from './pages/public/HowItWorksPage';
import { AboutPage } from './pages/public/AboutPage';
import { LoginPage } from './pages/auth/LoginPage';
import { FarmerLoginPage } from './pages/auth/FarmerLoginPage';
import { BuyerLoginPage } from './pages/auth/BuyerLoginPage';
import { AdminLoginPage } from './pages/auth/AdminLoginPage';
import { RegisterPage } from './pages/auth/RegisterPage';
import { FarmerDashboard } from './pages/dashboard/FarmerDashboard';
import { FarmerAddProductPage } from './pages/dashboard/FarmerAddProductPage';
import { BuyerDashboard } from './pages/dashboard/BuyerDashboard';
import { AdminDashboard } from './pages/dashboard/AdminDashboard';
import { Product } from './types';

const MainAppContent: React.FC = () => {
  const { user } = useAuth();
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [navPayload, setNavPayload] = useState<any>(null);

  // Modals state
  const [detailProduct, setDetailProduct] = useState<Product | null>(null);
  const [orderProduct, setOrderProduct] = useState<Product | null>(null);
  const [qrBatchId, setQrBatchId] = useState<string | null>(null);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  // Hash-based navigation support for QR codes & direct links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash) return;

      if (hash.startsWith('traceability')) {
        const urlParams = new URLSearchParams(hash.split('?')[1]);
        const batch = urlParams.get('batch');
        setCurrentTab('traceability');
        if (batch) setNavPayload({ batchId: batch });
      } else if (hash.includes('?')) {
        const [tab, query] = hash.split('?');
        setCurrentTab(tab);
      } else if (hash) {
        setCurrentTab(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (tab: string, payload?: any) => {
    setCurrentTab(tab);
    setNavPayload(payload || null);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenDetail = (product: Product) => {
    setDetailProduct(product);
  };

  const handleOpenOrder = (product: Product) => {
    setDetailProduct(null);
    setOrderProduct(product);
  };

  const handleOpenQr = (batchId: string) => {
    setQrBatchId(batchId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-emerald-200 selection:text-emerald-900">
      
      {/* 1-Click Prototype Persona Switcher */}
      <DemoRoleBanner onNavigate={handleNavigate} currentTab={currentTab} />

      {/* Main Global Navigation */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        onOpenAiChat={() => setIsAiChatOpen(true)}
      />

      {/* Main Page Routing */}
      <main className="flex-1">
        {currentTab === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenDetail={handleOpenDetail}
            onOpenOrder={handleOpenOrder}
            onOpenQr={handleOpenQr}
          />
        )}

        {currentTab === 'marketplace' && (
          <MarketplacePage
            onNavigate={handleNavigate}
            onOpenDetail={handleOpenDetail}
            onOpenOrder={handleOpenOrder}
            onOpenQr={handleOpenQr}
          />
        )}

        {currentTab === 'ai-price-advisor' && (
          <AiPriceAdvisorPage
            initialCrop={navPayload?.crop}
            onNavigate={handleNavigate}
          />
        )}

        {currentTab === 'group-selling' && (
          <GroupSellingPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'market-prices' && (
          <MarketPricesPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'centers-storage' && (
          <CentersStoragePage />
        )}

        {currentTab === 'traceability' && (
          <TraceabilityPage initialBatchId={navPayload?.batchId || 'KLN-2026-TM-049'} />
        )}

        {currentTab === 'how-it-works' && (
          <HowItWorksPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'about' && (
          <AboutPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'login' && (
          <LoginPage initialRole={navPayload?.role || 'farmer'} onNavigate={handleNavigate} />
        )}

        {currentTab === 'login-farmer' && (
          <FarmerLoginPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'login-buyer' && (
          <BuyerLoginPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'login-admin' && (
          <AdminLoginPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'register' && (
          <RegisterPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'farmer-dashboard' && (
          <FarmerDashboard
            onNavigate={handleNavigate}
            onOpenQr={handleOpenQr}
          />
        )}

        {currentTab === 'farmer-add-product' && (
          <FarmerAddProductPage onNavigate={handleNavigate} />
        )}

        {currentTab === 'buyer-dashboard' && (
          <BuyerDashboard
            onNavigate={handleNavigate}
            onOpenQr={handleOpenQr}
          />
        )}

        {currentTab === 'admin-dashboard' && (
          <AdminDashboard />
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals and Overlays */}
      {detailProduct && (
        <ProductDetailModal
          product={detailProduct}
          onClose={() => setDetailProduct(null)}
          onOrder={() => handleOpenOrder(detailProduct)}
          onViewQr={(batchId) => {
            setDetailProduct(null);
            handleOpenQr(batchId);
          }}
          onCheckAiPrice={(crop) => {
            setDetailProduct(null);
            handleNavigate('ai-price-advisor', { crop });
          }}
        />
      )}

      {orderProduct && (
        <OrderModal
          product={orderProduct}
          onClose={() => setOrderProduct(null)}
          onSuccess={() => {
            if (user?.role === 'buyer') {
              handleNavigate('buyer-dashboard');
            }
          }}
        />
      )}

      {qrBatchId && (
        <QrCodeModal
          batchId={qrBatchId}
          onClose={() => setQrBatchId(null)}
          onViewDetails={(batch) => {
            setQrBatchId(null);
            handleNavigate('traceability', { batchId: batch });
          }}
        />
      )}

      {/* Kisan AI Saathi Chatbot Drawer */}
      <AiChatDrawer
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        onNavigate={handleNavigate}
      />

    </div>
  );
};

export function App() {
  return (
    <AuthProvider>
      <MainAppContent />
    </AuthProvider>
  );
}

export default App;
