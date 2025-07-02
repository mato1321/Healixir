
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ClipboardList } from "lucide-react";

const NutritionSurvey = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="flex items-center justify-between mb-4">
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回頁面
            </Link>
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800 mb-2">營養目標問卷</CardTitle>
          <CardDescription className="text-gray-600">
            請回答以下 48 個問題，系統將為您制定個人化的營養建議
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              本問卷大約需要 10-15 分鐘完成，請根據您的實際情況如實回答。
            </p>
            <p className="text-sm text-gray-500">
              您可以隨時返回修改答案，系統會自動保存您的進度。
            </p>
          </div>
          <Link to="/nutrition/question/1">
            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3">
              開始問卷
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionSurvey;
