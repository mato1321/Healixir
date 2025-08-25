import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 頁面載入時滾動到頂部
    window.scrollTo(0, 0);
  }, []);

  const handleGoBack = () => {
    navigate(-1); // 返回上一頁
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-50 to-cyan-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <button 
            onClick={handleGoBack}
            className="inline-flex items-center text-blue-600 hover:text-blue-600 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回上一頁
          </button>
        </div>
        
        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
          <CardHeader className="text-center">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/favicon.ico" 
                alt="Logo" 
                className="w-16 h-16 shadow-lg rounded-lg"
              />
            </div>
            <div className="mb-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
                Healixir
              </h1>
              <p className="text-xs text-gray-500">專業保健顧問</p>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">服務條款</CardTitle>
            <p className="text-sm text-gray-600">Terms of Service</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">數位服務本服務條款</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                數位服務本服務條款（以下稱「本條款」）約定於{' '}
                <span className="text-blue-600 font-medium">您取得並開始使用本服務時即具約束力，請您詳閱本服務條款。</span>
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg shadow-lg">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">1</div>
                服務簡介
              </h4>
              <p className="text-gray-700 text-sm">
                本服務提供各類數位服務及產品給您使用，其服務內容包括（但不限於）健康評估、保健食品推薦、個人化建議等功能。
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">2</div>
                條款修改及生效
              </h4>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>• 我們保留隨時修改這些條款的權利。</li>
                <li>• 修訂條款將透過適當管道通知用戶。</li>
                <li>• 當有任何修改時，我們會立即通知您相關變更。</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">3</div>
                使用者義務
              </h4>
              <ul className="text-gray-700 text-sm space-y-2">
                <li className="text-red-600">• 不得以任何方式干擾或破壞網站服務運作的功能性。</li>
                <li className="text-red-600">• 不得傳送下列任何內容：濫發、違法或不正當之內容。</li>
                <li className="text-red-600">• 不得在未經同意的情況下，取得他人資料或破壞系統。</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg shadow-lg">
              <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">4</div>
                免責聲明
              </h4>
              <div className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-400 mb-3">
                <p className="text-yellow-800 text-sm font-medium">
                  ⚠️ 本服務提供的建議僅供參考，不可替代專業醫療建議。
                </p>
              </div>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>• 本服務完全免費並僅供參考，請務必諮詢專業醫療人員。</li>
                <li className="bg-red-50 p-2 rounded text-red-700">• 敬請注意：本服務不能替代專業醫療診斷和治療。</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">5</div>
                終止條款
              </h4>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>• 本服務有權隨時終止服務提供予不當使用者。</li>
                <li>• 用戶也可隨時終止使用本服務。</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">6</div>
                健康資訊免責
              </h4>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>• 本平台提供的健康建議僅供一般參考，不構成醫療診斷</li>
                <li>• 使用者應就個人健康狀況諮詢合格的醫療專業人員</li>
                <li>• 我們不對依據本服務建議所做的任何決定承擔責任</li>
              </ul>
            </div>

            <div className="text-center text-sm text-gray-500 border-t pt-4">
              <p>最後更新時間：2025年7月1日</p>
              <p>本條款受中華民國法律管轄並依其解釋</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TermsOfService;