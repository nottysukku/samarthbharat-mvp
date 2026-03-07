import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import LandingPage from './pages/LandingPage'
import ChatPage from './pages/ChatPage'
import StatsPage from './pages/StatsPage'
import SchemesPage from './pages/SchemesPage'
import FarmerDashboard from './pages/FarmerDashboard'
import StudentDashboard from './pages/StudentDashboard'
import StartupDashboard from './pages/StartupDashboard'
import MandiPricesPage from './pages/MandiPricesPage'
import ScholarshipFinderPage from './pages/ScholarshipFinderPage'
import FundingSchemesPage from './pages/FundingSchemesPage'
import WeatherPage from './pages/WeatherPage'
import CropDiagnosisPage from './pages/CropDiagnosisPage'
import StudyRoadmapPage from './pages/StudyRoadmapPage'
import ComplianceGuidePage from './pages/ComplianceGuidePage'
import SoilHealthPage from './pages/SoilHealthPage'
import LegalRightsPage from './pages/LegalRightsPage'
import MarketLinkagePage from './pages/MarketLinkagePage'
import TrainingVideosPage from './pages/TrainingVideosPage'
import NearbyServicesPage from './pages/NearbyServicesPage'
import WeatherAlertsPage from './pages/WeatherAlertsPage'
import FarmerSchemesPage from './pages/FarmerSchemesPage'
import ExamResourcesPage from './pages/ExamResourcesPage'
import StudentSchemesPage from './pages/StudentSchemesPage'
import CareerGuidancePage from './pages/CareerGuidancePage'

function App() {
  return (
    <BrowserRouter>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#000080',
            color: '#fff',
          },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard/farmer" element={<FarmerDashboard />} />
        <Route path="/dashboard/student" element={<StudentDashboard />} />
        <Route path="/dashboard/startup" element={<StartupDashboard />} />
        <Route path="/chat/:userType" element={<ChatPage />} />
        
        {/* Farmer Routes */}
        <Route path="/mandi-prices" element={<MandiPricesPage />} />
        <Route path="/weather" element={<WeatherPage />} />
        <Route path="/crop-diagnosis" element={<CropDiagnosisPage />} />
        <Route path="/schemes/farmer" element={<FarmerSchemesPage />} />
        <Route path="/soil-health" element={<SoilHealthPage />} />
        <Route path="/legal-rights" element={<LegalRightsPage />} />
        <Route path="/market-linkage" element={<MarketLinkagePage />} />
        <Route path="/training" element={<TrainingVideosPage />} />
        <Route path="/nearby-services" element={<NearbyServicesPage />} />
        <Route path="/weather-alerts" element={<WeatherAlertsPage />} />
        
        {/* Student Routes */}
        <Route path="/scholarships" element={<ScholarshipFinderPage />} />
        <Route path="/study-roadmap" element={<StudyRoadmapPage />} />
        <Route path="/exam-resources" element={<ExamResourcesPage />} />
        <Route path="/schemes/student" element={<StudentSchemesPage />} />
        <Route path="/career-guidance" element={<CareerGuidancePage />} />
        
        {/* Startup Routes */}
        <Route path="/funding-schemes" element={<FundingSchemesPage />} />
        <Route path="/compliance-guide" element={<ComplianceGuidePage />} />
        
        {/* General Routes */}
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/schemes" element={<SchemesPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
