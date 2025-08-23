import { useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // 返回上一頁
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <button 
            onClick={handleGoBack}
            className="inline-flex items-center text-blue-600 hover:text-purple-600 transition-colors cursor-pointer"
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                Healixir
              </h1>
              <p className="text-xs text-gray-500">專業保健顧問</p>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-800">隱私政策</CardTitle>
            <p className="text-sm text-gray-600">Privacy Policy</p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">資料保護聲明</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                我們重視您的個人資料保護。本政策詳細說明我們如何收集、使用及保護您提供的資訊，請您詳閱本隱私條款。
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg shadow-lg">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">1</div>
                收集的資料類型
              </h4>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>• 個人基本資料：姓名、電子郵件、電話</li>
                <li>• 健康相關資料：問卷回答、健康狀況評估</li>
                <li>• 設備資料：瀏覽器類型、操作系統、網際網路協定位址</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">2</div>
                資料使用目的
              </h4>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>• 提供及改善我們的健康評估服務</li>
                <li>• 為您提供個人化的保健食品推薦</li>
                <li>• 向您發送相關產品資訊及服務更新</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">3</div>
                資料保護措施
              </h4>
              <div className="bg-green-100 p-3 rounded border-l-4 border-green-400 mb-3">
                <p className="text-green-800 text-sm font-medium">
                  🔒 我們採用業界標準的安全措施來保護您的個人資料
                </p>
              </div>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>• 使用加密技術保護資料傳輸過程</li>
                <li>• 僅授權人員才能存取個人資料檔案</li>
                <li>• 定期檢視及更新我們的資安防護措施</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-lg shadow-lg">
              <h4 className="font-semibold text-yellow-800 mb-2 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">4</div>
                資料分享與揭露
              </h4>
              <div className="bg-yellow-100 p-3 rounded border-l-4 border-yellow-400 mb-3">
                <p className="text-yellow-800 text-sm font-medium">
                  ⚠️ 除非法律要求或明確告知，我們不會與第三方分享您的個人資料
                </p>
              </div>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>• 僅在您明確同意的情況下才會分享資料</li>
                <li>• 為了遵守法律義務，特殊情況下會揭露您的個人資料</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">5</div>
                您的權利
              </h4>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>• 查詢：請求查閱、複製您的個人資料</li>
                <li>• 更正：更正或補充您的個人資料內容</li>
                <li>• 刪除：要求刪除您的個人資料</li>
                <li>• 暫停處理：在某些情況下暫停處理您的個人資料</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">6</div>
                Cookie 政策與技術
              </h4>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>• 使用 Cookie 記錄您的偏好設定及優化使用體驗</li>
                <li>• 收集匿名統計資料以改善我們的服務品質</li>
                <li>• 您可以通過瀏覽器設定管理或停用 Cookie 功能</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold mr-2">7</div>
                資料保存期間
              </h4>
              <ul className="text-gray-700 text-sm space-y-2">
                <li>• 我們僅在必要期間內保存您的個人資料</li>
                <li>• 帳戶關閉後，將依法定期間保存必要資料</li>
                <li>• 您可隨時要求刪除非法定保存之個人資料</li>
              </ul>
            </div>

            <div className="text-center text-sm text-gray-500 border-t pt-4">
              <p>最後更新時間：2025年7月1日</p>
              <p>本政策受中華民國個人資料保護法規範</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;