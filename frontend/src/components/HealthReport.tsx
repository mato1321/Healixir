import React from 'react';
import { Heart, Activity, Brain, Dumbbell, Apple, ArrowLeft } from 'lucide-react';

// HealthMetricCard 組件
interface HealthMetricCardProps {
  name: string;
  score: number;
  color: string;
  icon: any;
}

const HealthMetricCard = ({ name, score, color, icon: Icon }: HealthMetricCardProps) => {
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mr-3">
          <Icon className="w-5 h-5 text-white" />
        </div>
        <span className="text-gray-700 font-medium">{name}</span>
      </div>
      <div className="flex items-center space-x-3">
        <div className="w-32 bg-gray-200 rounded-full h-3 relative overflow-hidden">
          <div 
            className={`h-full rounded-full ${color} transition-all duration-1000 ease-out`}
            style={{ width: `${score}%` }}
          />
        </div>
        <span className="text-lg font-bold text-gray-800 w-8 text-right">{score}</span>
      </div>
    </div>
  );
};

// RecommendationCard 組件
interface RecommendationCardProps {
  number: number;
  title: string;
  content: string;
  color: string;
}

const RecommendationCard = ({ number, title, content, color }: RecommendationCardProps) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border-0">
      <div className="flex items-start space-x-4">
        <div className={`${color} text-white rounded-full w-10 h-10 flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-lg`}>
          {number}
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-gray-800 mb-3">{title}</h4>
          <p className="text-gray-600 leading-relaxed text-sm">{content}</p>
        </div>
      </div>
    </div>
  );
};

// 主要的 HealthReport 組件
const HealthReport = () => {
  const healthMetrics = [
    { name: '飲食', score: 70, color: 'bg-green-500', icon: Apple },
    { name: '作息', score: 85, color: 'bg-green-500', icon: Activity },
    { name: '心理', score: 25, color: 'bg-red-500', icon: Brain },
    { name: '體質', score: 58, color: 'bg-yellow-500', icon: Heart },
    { name: '運動', score: 9, color: 'bg-red-500', icon: Dumbbell },
  ];

  const recommendations = [
    {
      number: 1,
      title: '飲食方面 建議：',
      content: '您目前有不錯的飲食習慣，建議繼持續三餐均衡飲食，多重視充天然蔬果攝取營養，並避免過多的快餐與高油加工食品。',
      color: 'bg-gradient-to-r from-blue-600 to-purple-600'
    },
    {
      number: 2,
      title: '心理方面 建議：',
      content: '心理壓力較敏感，建議定期進行放鬆練習，如冥想、深呼吸、寫日記，或尋找讓您放心交流的朋友、若壓力持續過重，也可考慮尋求專心理諮詢。',
      color: 'bg-gradient-to-r from-purple-600 to-pink-600'
    },
    {
      number: 3,
      title: '作息方面 建議：',
      content: '作息健康程度良好，請繼持現有的作息時間，每晚盡量充足的7-9小時睡眠，並盡量在晚上11點前入睡，幫助身體修復和新陳代謝。',
      color: 'bg-gradient-to-r from-green-600 to-blue-600'
    },
    {
      number: 4,
      title: '體質方面 建議：',
      content: '整體體質維持良好，請繼續持續均衡的營養攝取與適度運動，如每週進行至少3次的有氧運動，有助於提升免疫力與身體機能。',
      color: 'bg-gradient-to-r from-orange-600 to-red-600'
    },
    {
      number: 5,
      title: '運動方面 建議：',
      content: '運動量明顯不足，建議每天至少10-15分鐘的基礎運動開始，逐步增加強度，可以選擇快走、瑜伽、健身等您喜愛的運動，循序漸進提升身體健康和活力。',
      color: 'bg-gradient-to-r from-blue-600 to-indigo-600'
    }
  ];

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 py-8">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* 返回按鈕 */}
        <button 
          onClick={handleGoBack}
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回上一頁
        </button>

        {/* 報告框架 */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* 報告頭部 */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-8">
            <div className="flex items-center justify-center mb-4">
              <img 
                src="/favicon.ico" 
                alt="Healixir Logo" 
                className="w-16 h-16 mr-4 bg-white rounded-lg p-2"
              />
              <div>
                <h1 className="text-3xl font-bold">Healixir</h1>
                <p className="text-blue-100">專業保健顧問</p>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-center mt-6">健康評估報告</h2>
            <p className="text-center text-blue-100 mt-2">報告生成日期：{new Date().toLocaleDateString('zh-TW')}</p>
          </div>

          {/* 報告內容 */}
          <div className="p-8">
            {/* 基本資料卡片 */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-8 border border-blue-100">
              <h3 className="text-lg font-bold text-gray-800 mb-4">基本資料</h3>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-gray-500 text-sm mb-1">年齡</p>
                  <p className="text-2xl font-bold text-blue-600">28</p>
                  <p className="text-gray-500 text-sm">歲</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-gray-500 text-sm mb-1">身高</p>
                  <p className="text-2xl font-bold text-purple-600">170</p>
                  <p className="text-gray-500 text-sm">公分</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-sm">
                  <p className="text-gray-500 text-sm mb-1">體重</p>
                  <p className="text-2xl font-bold text-green-600">61</p>
                  <p className="text-gray-500 text-sm">公斤</p>
                </div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left Side - Health Analysis */}
              <div className="space-y-6">
                {/* Overall Score Card */}
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800 flex items-center mb-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mr-3">
                          <Activity className="w-6 h-6 text-white" />
                        </div>
                        綜合分析結果
                      </h3>
                      <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">49分</div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-purple-600 mb-2">
                        <Heart className="w-5 h-5 mr-1" />
                        <span className="font-semibold">健康分析說明</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">您的綜合健康分數超過</p>
                      <p className="text-2xl font-bold text-blue-600">59% 的同齡人</p>
                    </div>
                  </div>

                  {/* Health Metrics */}
                  <div className="space-y-2 border-t pt-4">
                    {healthMetrics.map((metric, index) => (
                      <HealthMetricCard key={index} {...metric} />
                    ))}
                  </div>
                </div>

                {/* BMI Card */}
                <div className="bg-gradient-to-r from-green-500 to-blue-500 rounded-2xl p-6 text-white shadow-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/90 mb-1">您的身體質量指數為</p>
                      <p className="text-2xl font-bold">21.1 kg/m²</p>
                      <p className="text-white/90">屬於正常範圍</p>
                    </div>
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4">
                      <p className="text-green-600 font-bold text-lg">BMI: 21.1</p>
                      <span className="text-green-600 text-sm bg-green-100 px-3 py-1 rounded-full">正常範圍</span>
                    </div>
                  </div>
                </div>

                {/* Important Notice */}
                <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg">
                  <h4 className="font-bold text-lg mb-2 flex items-center">
                    <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center mr-3">
                      <span className="text-lg">⚠️</span>
                    </div>
                    需要改善的領域
                  </h4>
                  <p className="text-white/90 ml-11">心理和運動 方面需要特別關注</p>
                </div>
              </div>

              {/* Right Side - Recommendations */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-800 text-center mb-6">個人化健康建議</h3>
                {recommendations.map((recommendation, index) => (
                  <RecommendationCard key={index} {...recommendation} />
                ))}
              </div>
            </div>

            {/* 報告底部資訊 */}
            <div className="mt-12 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
              <p>本報告由 Healixir 專業健康評估系統生成</p>
              <p className="mt-2">如有任何疑問，請諮詢專業醫療人員</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthReport;