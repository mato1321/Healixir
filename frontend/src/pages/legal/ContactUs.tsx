import { Link } from "react-router-dom";
import { MessageCircle, Phone, Mail, MapPin, Clock, Heart, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100">
      {/* 頂部導航 */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img 
                  src="/favicon.ico" 
                  alt="Logo" 
                  className="w-10 h-10 mr-3"
                />
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Healixir
                  </h1>
                  <p className="text-xs text-gray-500">專業保健顧問</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* 標題區域 */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <MessageCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            聯絡我們
          </h1>
          <p className="text-gray-600">我們提供專業的客戶服務，隨時為您解答健康相關問題</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 主要聯絡資訊 */}
          <div className="space-y-6">
            {/* 客服專線 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  客服專線
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-700 mb-2">
                    <Phone className="w-5 h-5 mr-3 text-green-600" />
                    <span className="font-semibold text-lg">(02) 2303-5179</span>
                  </div>
                  <div className="flex items-start text-gray-600 text-sm">
                    <Headphones className="w-4 h-4 mr-3 text-blue-600 mt-0.5" />
                    <span>營業時間由專業藥師回覆，其他時間由專業系統為您服務</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 電子信箱 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  電子信箱
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
                  <div className="flex items-center text-gray-700">
                    <Mail className="w-5 h-5 mr-3 text-blue-600" />
                    <div>
                      <p className="font-semibold">support@healixir.com</p>
                      <p className="text-sm text-gray-600">一般詢問與產品諮詢</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 公司地址 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0 hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  公司地址
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg space-y-3">
                  <div className="flex items-start text-gray-700">
                    <MapPin className="w-5 h-5 mr-3 text-orange-600 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">註冊地址</p>
                      <p className="text-sm">108 臺北市萬華區國興路104號</p>
                    </div>
                  </div>
                  <div className="flex items-start text-gray-700">
                    <MapPin className="w-5 h-5 mr-3 text-red-600 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">營業地址</p>
                      <p className="text-sm">108 臺北市萬華區</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 營業時間與服務說明 */}
          <div className="space-y-6">
            {/* 營業時間 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  營業時間
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg">
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">週一至週五</span>
                        <span className="text-blue-600 font-medium">09:00-13:00, 15:00-21:30</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">週六</span>
                        <span className="text-blue-600 font-medium">09:00-13:00, 15:00-18:00</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="font-semibold text-gray-700">週日</span>
                        <span className="text-gray-500 font-medium">公休</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 服務特色 */}
            <Card className="bg-white/80 backdrop-blur-sm shadow-xl border-0">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-800 flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  服務特色
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-lg space-y-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">專業藥師諮詢服務</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">24小時專業客服</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">個人化健康建議</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-orange-500 rounded-full mr-3"></div>
                      <span className="text-gray-700">快速回應客戶需求</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>


          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;