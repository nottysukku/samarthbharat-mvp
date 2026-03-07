import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Phone, Clock, Navigation, Building2, Landmark, Stethoscope } from 'lucide-react'

export default function NearbyServicesPage() {
  const navigate = useNavigate()
  const [selectedType, setSelectedType] = useState('all')

  const serviceTypes = [
    { id: 'all', name: 'All', nameHi: 'सभी', icon: MapPin },
    { id: 'mandi', name: 'Mandis', nameHi: 'मंडी', icon: Building2 },
    { id: 'bank', name: 'Banks', nameHi: 'बैंक', icon: Landmark },
    { id: 'kvk', name: 'KVK', nameHi: 'केवीके', icon: Building2 },
    { id: 'hospital', name: 'Hospitals', nameHi: 'अस्पताल', icon: Stethoscope },
  ]

  const services = [
    {
      id: 1,
      type: 'mandi',
      name: 'Azadpur Mandi',
      nameHi: 'आजादपुर मंडी',
      address: 'Azadpur, Delhi',
      addressHi: 'आजादपुर, दिल्ली',
      distance: '5.2 km',
      phone: '+91-11-27676767',
      timing: '6 AM - 8 PM',
      timingHi: 'सुबह 6 - शाम 8',
      services: ['Wholesale Market', 'Cold Storage', 'Auction'],
      servicesHi: ['थोक बाजार', 'कोल्ड स्टोरेज', 'नीलामी'],
      rating: 4.5
    },
    {
      id: 2,
      type: 'mandi',
      name: 'Ghazipur Mandi',
      nameHi: 'गाजीपुर मंडी',
      address: 'Ghazipur, Delhi',
      addressHi: 'गाजीपुर, दिल्ली',
      distance: '8.5 km',
      phone: '+91-11-22222222',
      timing: '5 AM - 9 PM',
      timingHi: 'सुबह 5 - रात 9',
      services: ['Vegetable Market', 'Fruit Market', 'Grain Market'],
      servicesHi: ['सब्जी बाजार', 'फल बाजार', 'अनाज बाजार'],
      rating: 4.3
    },
    {
      id: 3,
      type: 'bank',
      name: 'State Bank of India',
      nameHi: 'भारतीय स्टेट बैंक',
      address: 'Main Road, Sector 15',
      addressHi: 'मुख्य सड़क, सेक्टर 15',
      distance: '2.1 km',
      phone: '+91-11-33333333',
      timing: '10 AM - 4 PM',
      timingHi: 'सुबह 10 - शाम 4',
      services: ['Kisan Credit Card', 'Crop Loan', 'Savings Account'],
      servicesHi: ['किसान क्रेडिट कार्ड', 'फसल ऋण', 'बचत खाता'],
      rating: 4.6
    },
    {
      id: 4,
      type: 'bank',
      name: 'Punjab National Bank',
      nameHi: 'पंजाब नेशनल बैंक',
      address: 'Market Complex, Sector 22',
      addressHi: 'मार्केट कॉम्प्लेक्स, सेक्टर 22',
      distance: '3.8 km',
      phone: '+91-11-44444444',
      timing: '10 AM - 4 PM',
      timingHi: 'सुबह 10 - शाम 4',
      services: ['Agricultural Loan', 'Insurance', 'Gold Loan'],
      servicesHi: ['कृषि ऋण', 'बीमा', 'गोल्ड लोन'],
      rating: 4.4
    },
    {
      id: 5,
      type: 'kvk',
      name: 'Krishi Vigyan Kendra - Delhi',
      nameHi: 'कृषि विज्ञान केंद्र - दिल्ली',
      address: 'IARI Campus, Pusa',
      addressHi: 'आईएआरआई कैंपस, पूसा',
      distance: '6.5 km',
      phone: '+91-11-25842940',
      timing: '9 AM - 5 PM',
      timingHi: 'सुबह 9 - शाम 5',
      services: ['Training Programs', 'Soil Testing', 'Expert Consultation'],
      servicesHi: ['प्रशिक्षण कार्यक्रम', 'मिट्टी परीक्षण', 'विशेषज्ञ परामर्श'],
      rating: 4.8
    },
    {
      id: 6,
      type: 'hospital',
      name: 'District Hospital',
      nameHi: 'जिला अस्पताल',
      address: 'Civil Lines, Delhi',
      addressHi: 'सिविल लाइन्स, दिल्ली',
      distance: '4.2 km',
      phone: '+91-11-55555555',
      timing: '24x7',
      timingHi: '24x7',
      services: ['Emergency', 'OPD', 'Pharmacy'],
      servicesHi: ['आपातकालीन', 'ओपीडी', 'फार्मेसी'],
      rating: 4.2
    },
    {
      id: 7,
      type: 'hospital',
      name: 'Primary Health Center',
      nameHi: 'प्राथमिक स्वास्थ्य केंद्र',
      address: 'Village Road, Sector 10',
      addressHi: 'गांव रोड, सेक्टर 10',
      distance: '1.5 km',
      phone: '+91-11-66666666',
      timing: '8 AM - 8 PM',
      timingHi: 'सुबह 8 - रात 8',
      services: ['General Medicine', 'Vaccination', 'Maternity'],
      servicesHi: ['सामान्य चिकित्सा', 'टीकाकरण', 'प्रसूति'],
      rating: 4.0
    }
  ]

  const filteredServices = selectedType === 'all' 
    ? services 
    : services.filter(s => s.type === selectedType)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="gov-header"></div>

      <header className="bg-pink-600 text-white shadow-lg border-b-4 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 hover:bg-white/20 px-3 py-2 rounded transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back</span>
            </button>
            <div className="text-center flex-1">
              <div className="flex items-center justify-center gap-2">
                <MapPin size={32} />
                <div>
                  <h1 className="text-xl font-bold">आस-पास की सेवाएं</h1>
                  <p className="text-sm opacity-90">Nearby Services</p>
                </div>
              </div>
            </div>
            <div className="w-20"></div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Location Info */}
        <div className="bg-gradient-to-r from-pink-600 to-rose-600 text-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Your Location / आपका स्थान</h2>
              <p className="text-lg opacity-90">Sector 15, Delhi / सेक्टर 15, दिल्ली</p>
            </div>
            <button className="bg-white text-pink-600 px-6 py-2 rounded-lg hover:bg-gray-100 transition-colors font-semibold flex items-center gap-2">
              <Navigation size={20} />
              Change Location
            </button>
          </div>
        </div>

        {/* Service Type Filter */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Filter by Type / प्रकार से फ़िल्टर करें</h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {serviceTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setSelectedType(type.id)}
                className={`p-4 rounded-lg border-2 transition-all ${
                  selectedType === type.id
                    ? 'border-pink-600 bg-pink-50'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <type.icon className="mx-auto mb-2 text-pink-600" size={32} />
                <p className="font-bold text-gray-900 text-sm">{type.nameHi}</p>
                <p className="text-xs text-gray-600">{type.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Services List */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Nearby Services / आस-पास की सेवाएं ({filteredServices.length})
          </h2>
          <div className="space-y-4">
            {filteredServices.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-3">
                      <div className="bg-pink-100 p-3 rounded-lg">
                        {service.type === 'mandi' && <Building2 className="text-pink-600" size={24} />}
                        {service.type === 'bank' && <Landmark className="text-pink-600" size={24} />}
                        {service.type === 'kvk' && <Building2 className="text-pink-600" size={24} />}
                        {service.type === 'hospital' && <Stethoscope className="text-pink-600" size={24} />}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{service.nameHi}</h3>
                        <p className="text-sm text-gray-600 mb-2">{service.name}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <MapPin size={16} />
                          <span>{service.addressHi}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div className="flex items-center gap-1">
                            <Navigation size={16} className="text-pink-600" />
                            <span className="font-semibold text-gray-900">{service.distance}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={16} className="text-gray-600" />
                            <span className="text-gray-700">{service.timingHi}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold mb-2">
                      ★ {service.rating}
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Services / सेवाएं:</p>
                  <div className="flex flex-wrap gap-2">
                    {service.servicesHi.map((s, idx) => (
                      <span key={idx} className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-xs">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200">
                  <button className="flex-1 bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition-colors font-semibold flex items-center justify-center gap-2">
                    <Phone size={18} />
                    Call / कॉल करें
                  </button>
                  <button className="flex-1 bg-gray-200 text-gray-900 py-2 rounded-lg hover:bg-gray-300 transition-colors font-semibold flex items-center justify-center gap-2">
                    <Navigation size={18} />
                    Get Directions / दिशा प्राप्त करें
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
