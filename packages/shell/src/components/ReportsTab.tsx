import React from 'react';

const ReportsTab: React.FC = () => {
  const reports = [
    {
      id: 1,
      title: 'Öğrenci Kayıt Raporu',
      description: 'Aylık öğrenci kayıt istatistikleri',
      type: 'monthly',
      lastGenerated: '2024-12-01',
      status: 'completed'
    },
    {
      id: 2,
      title: 'Akademik Başarı Raporu',
      description: 'Dönemlik not ortalamaları ve başarı oranları',
      type: 'semester',
      lastGenerated: '2024-11-15',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Devam Durumu Raporu',
      description: 'Öğrenci devam durumları ve istatistikleri',
      type: 'weekly',
      lastGenerated: '2024-12-05',
      status: 'pending'
    },
    {
      id: 4,
      title: 'Bölüm Bazlı Analiz',
      description: 'Bölümlere göre detaylı öğrenci analizi',
      type: 'custom',
      lastGenerated: '2024-11-20',
      status: 'completed'
    }
  ];

  const stats = [
    { label: 'Toplam Rapor', value: '24', change: '+3', trend: 'up' },
    { label: 'Aylık Rapor', value: '12', change: '+2', trend: 'up' },
    { label: 'Bekleyen Rapor', value: '3', change: '-1', trend: 'down' },
    { label: 'Otomatik Rapor', value: '8', change: '+1', trend: 'up' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Rapor Yönetimi</h2>
          <p className="text-sm text-gray-600">Sistem raporları ve analizler</p>
        </div>
        <div className="flex items-center space-x-3">
          <select className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option>Tüm Raporlar</option>
            <option>Aylık</option>
            <option>Dönemlik</option>
            <option>Özel</option>
          </select>
          <button 
            onClick={() => alert('Yeni rapor oluşturma özelliği yakında eklenecek!')}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Yeni Rapor</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`flex items-center space-x-1 text-sm ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <span>{stat.change}</span>
                <svg className={`w-4 h-4 ${stat.trend === 'up' ? 'transform rotate-0' : 'transform rotate-180'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17l9.2-9.2M17 17V7H7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Reports Table */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Son Raporlar</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rapor Adı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tip
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Son Oluşturma
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {reports.map((report) => (
                <tr key={report.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{report.title}</div>
                      <div className="text-sm text-gray-500">{report.description}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      report.type === 'monthly' ? 'bg-blue-100 text-blue-800' :
                      report.type === 'semester' ? 'bg-green-100 text-green-800' :
                      report.type === 'weekly' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-purple-100 text-purple-800'
                    }`}>
                      {report.type === 'monthly' ? 'Aylık' :
                       report.type === 'semester' ? 'Dönemlik' :
                       report.type === 'weekly' ? 'Haftalık' : 'Özel'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {new Date(report.lastGenerated).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      report.status === 'completed' ? 'bg-green-100 text-green-800' :
                      report.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {report.status === 'completed' ? 'Tamamlandı' :
                       report.status === 'pending' ? 'Beklemede' : 'Hata'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => alert(`${report.title} raporunu görüntüleme özelliği yakında eklenecek!`)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded-md hover:bg-blue-50 transition-colors"
                        title="Görüntüle"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => alert(`${report.title} raporunu indirme özelliği yakında eklenecek!`)}
                        className="text-green-600 hover:text-green-800 p-1 rounded-md hover:bg-green-50 transition-colors"
                        title="İndir"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => alert(`${report.title} raporunu yeniden oluşturma özelliği yakında eklenecek!`)}
                        className="text-gray-600 hover:text-gray-800 p-1 rounded-md hover:bg-gray-50 transition-colors"
                        title="Yenile"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsTab;