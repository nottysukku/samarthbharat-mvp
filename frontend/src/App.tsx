import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { LanguageProvider } from './contexts/LanguageContext'
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
import JobSearchPage from './pages/JobSearchPage'
import VideoLecturesPage from './pages/VideoLecturesPage'
import ExamCalendarPage from './pages/ExamCalendarPage'
import SkillDevelopmentPage from './pages/SkillDevelopmentPage'
import MentorshipPage from './pages/MentorshipPage'
import CollegeFinderPage from './pages/CollegeFinderPage'
import EmergencyHelplinePage from './pages/EmergencyHelplinePage'
import BusinessRegistrationPage from './pages/BusinessRegistrationPage'
import MarketResearchPage from './pages/MarketResearchPage'
import IncubatorsPage from './pages/IncubatorsPage'
import MentorshipNetworkPage from './pages/MentorshipNetworkPage'
import BusinessResourcesPage from './pages/BusinessResourcesPage'
import NetworkingEventsPage from './pages/NetworkingEventsPage'
import PitchDeckBuilderPage from './pages/PitchDeckBuilderPage'
import LegalSupportPage from './pages/LegalSupportPage'
import HiringResourcesPage from './pages/HiringResourcesPage'

function App() {
  return (
    <LanguageProvider>
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
        <Route path="/job-search" element={<JobSearchPage />} />
        <Route path="/emergency-helpline" element={<EmergencyHelplinePage />} />
        <Route path="/video-lectures" element={<VideoLecturesPage />} />
        <Route path="/exam-calendar" element={<ExamCalendarPage />} />
        <Route path="/skill-development" element={<SkillDevelopmentPage />} />
        <Route path="/mentorship" element={<MentorshipPage />} />
        <Route path="/college-finder" element={<CollegeFinderPage />} />
        
        {/* Startup Routes */}
        <Route path="/funding-schemes" element={<FundingSchemesPage />} />
        <Route path="/compliance-guide" element={<ComplianceGuidePage />} />
        <Route path="/business-registration" element={<BusinessRegistrationPage />} />
        <Route path="/market-research" element={<MarketResearchPage />} />
        <Route path="/incubators" element={<IncubatorsPage />} />
        <Route path="/mentorship-network" element={<MentorshipNetworkPage />} />
        <Route path="/business-resources" element={<BusinessResourcesPage />} />
        <Route path="/networking-events" element={<NetworkingEventsPage />} />
        <Route path="/pitch-deck" element={<PitchDeckBuilderPage />} />
        <Route path="/legal-support" element={<LegalSupportPage />} />
        <Route path="/hiring-resources" element={<HiringResourcesPage />} />
        
        {/* General Routes */}
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/schemes" element={<SchemesPage />} />
      </Routes>
    </BrowserRouter>
    </LanguageProvider>
  )
}

export default App
