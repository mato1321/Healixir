import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ArrowRight, User } from "lucide-react";
import { HealthAnalysisService } from "@/services/healthAnalysis";

const PersonalInfo = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    gender: "",
    birthYear: "",
    birthMonth: "",
    birthDay: "",
    height: "",
    weight: "",
    occupation: ""
  });

  const professions = [
    "學生", "工程師", "醫師", "護理師", "教師", "律師", "會計師", "設計師",
    "銷售人員", "行政人員", "經理", "主管", "服務業", "製造業", "金融業",
    "媒體業", "藝術工作者", "自由業", "退休", "家管", "其他"
  ];

  // 自動清除舊的評估數據，開始新評估
  useEffect(() => {
    if (HealthAnalysisService.hasOngoingAssessment()) {
      HealthAnalysisService.clearAllData();
    }
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.gender && formData.birthYear && formData.birthMonth && formData.birthDay && formData.height && formData.weight && formData.occupation) {
      // 保存用戶健康信息
      const age = calculateAge();
      if (age) {
        HealthAnalysisService.saveUserInfo({
          age,
          height: parseFloat(formData.height),
          weight: parseFloat(formData.weight)
        });
      }
      
      navigate("/nutrition/health-goals");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const calculateAge = () => {
    if (formData.birthYear && formData.birthMonth && formData.birthDay) {
      const today = new Date();
      const birthDate = new Date(parseInt(formData.birthYear), parseInt(formData.birthMonth) - 1, parseInt(formData.birthDay));
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age;
    }
    return null;
  };

  const isFormValid = formData.gender && formData.birthYear && formData.birthMonth && formData.birthDay && formData.height && formData.weight && formData.occupation;
  const age = calculateAge();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50">
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
                  <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
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
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            填寫基本資訊
          </h1>
          <p className="text-gray-600 text-lg">請提供您的基本資料，這將幫助我們為您提供更精準的健康建議</p>
        </div>
        
        <Card className="bg-white/80 backdrop-blur-sm shadow-2xl border-0">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-10">
              {/* 性別 */}
              <div className="space-y-6">
                <div className="text-center">
                  <Label className="text-xl font-semibold text-gray-700">生理性別</Label>
                </div>
                <RadioGroup 
                  value={formData.gender} 
                  onValueChange={(value) => handleInputChange("gender", value)}
                  className="flex justify-center space-x-6"
                >
                  <div className={`relative flex items-center justify-center p-6 bg-white/60 backdrop-blur-sm border-2 rounded-xl transition-all cursor-pointer min-w-[140px] ${
                    formData.gender === "男" 
                      ? "border-blue-500 bg-blue-50/80 shadow-lg" 
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50/50"
                  }`}>
                    <RadioGroupItem value="男" id="male" className="sr-only" />
                    <Label htmlFor="male" className="text-lg cursor-pointer font-medium text-gray-700 flex items-center">
                      <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.gender === "男" 
                          ? "border-blue-500 bg-blue-500" 
                          : "border-gray-300"
                      }`}>
                        {formData.gender === "男" && (
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        )}
                      </div>
                      👨 男性
                    </Label>
                  </div>
                  <div className={`relative flex items-center justify-center p-6 bg-white/60 backdrop-blur-sm border-2 rounded-xl transition-all cursor-pointer min-w-[140px] ${
                    formData.gender === "女" 
                      ? "border-pink-500 bg-pink-50/80 shadow-lg" 
                      : "border-gray-200 hover:border-pink-300 hover:bg-pink-50/50"
                  }`}>
                    <RadioGroupItem value="女" id="female" className="sr-only" />
                    <Label htmlFor="female" className="text-lg cursor-pointer font-medium text-gray-700 flex items-center">
                      <div className={`w-6 h-6 rounded-full border-2 mr-3 flex items-center justify-center ${
                        formData.gender === "女" 
                          ? "border-pink-500 bg-pink-500" 
                          : "border-gray-300"
                      }`}>
                        {formData.gender === "女" && (
                          <div className="w-3 h-3 rounded-full bg-white"></div>
                        )}
                      </div>
                      👩 女性
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* 出生年月日 */}
              <div className="space-y-6">
                <div className="text-center">
                  <Label className="text-xl font-semibold text-gray-700">西元出生年月日</Label>
                </div>
                <div className="flex justify-center items-center">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <Input 
                        type="text" 
                        placeholder="" 
                        value={formData.birthYear}
                        onChange={(e) => handleInputChange("birthYear", e.target.value)}
                        className="w-20 text-center text-lg bg-white/60 backdrop-blur-sm border-gray-200 h-12 font-medium"
                      />
                      <span className="text-gray-600 font-medium text-lg">年</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input 
                        type="text" 
                        placeholder="" 
                        value={formData.birthMonth}
                        onChange={(e) => handleInputChange("birthMonth", e.target.value)}
                        className="w-16 text-center text-lg bg-white/60 backdrop-blur-sm border-gray-200 h-12 font-medium"
                      />
                      <span className="text-gray-600 font-medium text-lg">月</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Input 
                        type="text" 
                        placeholder="" 
                        value={formData.birthDay}
                        onChange={(e) => handleInputChange("birthDay", e.target.value)}
                        className="w-16 text-center text-lg bg-white/60 backdrop-blur-sm border-gray-200 h-12 font-medium"
                      />
                      <span className="text-gray-600 font-medium text-lg">日</span>
                    </div>
                    {age && (
                      <div className="ml-6 bg-gradient-to-r from-blue-100 to-purple-100 border border-blue-200 px-4 py-2 rounded-full">
                        <span className="text-blue-700 font-semibold text-lg">
                          🎂 {age} 歲
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* 身高體重 */}
              <div className="space-y-6">
                <div className="text-center">
                  <Label className="text-xl font-semibold text-gray-700">身高體重</Label>
                </div>
                <div className="flex justify-center items-center space-x-8">
                  <div className="flex items-center space-x-3">
                    <Label className="text-lg font-medium text-gray-600">身高</Label>
                    <Input 
                      type="text" 
                      placeholder="" 
                      value={formData.height}
                      onChange={(e) => handleInputChange("height", e.target.value)}
                      className="w-24 text-center text-lg bg-white/60 backdrop-blur-sm border-gray-200 h-12 font-medium"
                    />
                    <span className="text-gray-600 font-medium text-lg">公分</span>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Label className="text-lg font-medium text-gray-600">體重</Label>
                    <Input 
                      type="text" 
                      placeholder="" 
                      value={formData.weight}
                      onChange={(e) => handleInputChange("weight", e.target.value)}
                      className="w-24 text-center text-lg bg-white/60 backdrop-blur-sm border-gray-200 h-12 font-medium"
                    />
                    <span className="text-gray-600 font-medium text-lg">公斤</span>
                  </div>
                </div>
              </div>

              {/* 職業 */}
              <div className="space-y-6">
                <div className="text-center">
                  <Label className="text-xl font-semibold text-gray-700">職業</Label>
                </div>
                <div className="flex justify-center">
                  <Select value={formData.occupation} onValueChange={(value) => handleInputChange("occupation", value)}>
                    <SelectTrigger className="w-72 text-center bg-white/60 backdrop-blur-sm border-gray-200 h-12 text-lg font-medium">
                      <SelectValue placeholder="💼 請選擇您的職業" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm max-h-60">
                      {professions.map((profession) => (
                        <SelectItem key={profession} value={profession} className="text-center hover:bg-blue-50 cursor-pointer">
                          {profession}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 提交按鈕 */}
              <div className="flex justify-center pt-8">
                <Button
                  type="submit"
                  disabled={!isFormValid}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:bg-gray-300 disabled:opacity-50 text-white px-16 py-4 rounded-full text-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <span className="mr-3">開始評估</span>
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

    </div>
  );
};

export default PersonalInfo;