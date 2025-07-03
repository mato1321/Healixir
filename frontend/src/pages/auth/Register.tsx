import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Calendar, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    birth_date: "",  // 改為 birth_date 與後端一致
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 驗證密碼長度
    if (formData.password.length < 6) {
      toast({
        title: "密碼太短",
        description: "密碼至少需要6位字符",
        variant: "destructive",
      });
      return;
    }
    
    // 驗證密碼是否一致
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "密碼不一致",
        description: "請確認密碼輸入一致",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // 修正 API 端點
      const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          name: formData.name,
          gender: formData.gender,
          birth_date: formData.birth_date,  // 使用 birth_date
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // 註冊成功
        toast({
          title: "註冊成功",
          description: "歡迎加入！請登入您的帳戶",
        });
        navigate("/login");
      } else {
        // 註冊失敗
        toast({
          title: "註冊失敗",
          description: data.detail || "註冊過程中發生錯誤",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Register error:', error);
      toast({
        title: "連接錯誤",
        description: "無法連接到伺服器，請稍後再試",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm shadow-2xl border-0">
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
            <p className="text-xs text-gray-500">智能保健顧問</p>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">建立新帳戶</CardTitle>
          <CardDescription className="text-gray-600">
            請填寫您的個人資訊
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-gray-700">
                姓名
              </label>
              <Input
                id="name"
                type="text"
                placeholder="請輸入您的姓名"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-white/60 backdrop-blur-sm border-2 border-blue-200 focus:border-blue-400"
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">性別</label>
              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={() => handleInputChange("gender", "male")}
                  disabled={isLoading}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200 font-medium text-sm backdrop-blur-sm
                    ${formData.gender === "male" 
                      ? "border-blue-500 bg-blue-100/80 text-blue-700 shadow-md" 
                      : "border-blue-200 bg-white/60 text-gray-600 hover:border-blue-300 hover:bg-blue-50/80"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                  `}
                >
                  <span className="mr-2">👨</span>
                  男性
                </button>
                <button
                  type="button"
                  onClick={() => handleInputChange("gender", "female")}
                  disabled={isLoading}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200 font-medium text-sm backdrop-blur-sm
                    ${formData.gender === "female" 
                      ? "border-blue-500 bg-blue-100/80 text-blue-700 shadow-md" 
                      : "border-blue-200 bg-white/60 text-gray-600 hover:border-blue-300 hover:bg-blue-50/80"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                  `}
                >
                  <span className="mr-2">👩</span>
                  女性
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="birth_date" className="text-sm font-medium text-gray-700">
                出生日期
              </label>
              <div className="relative">
                <Input
                  id="birth_date"
                  type="date"
                  placeholder="YYYY-MM-DD"
                  value={formData.birth_date}
                  onChange={(e) => handleInputChange("birth_date", e.target.value)}
                  className="bg-white/60 backdrop-blur-sm border-2 border-blue-200 focus:border-blue-400"
                  required
                  disabled={isLoading}
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                電子郵件
              </label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="請輸入您的電子郵件"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="bg-white/60 backdrop-blur-sm border-2 border-blue-200 focus:border-blue-400"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                密碼
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="請輸入您的密碼（至少6位）"
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="bg-white/60 backdrop-blur-sm border-2 border-blue-200 focus:border-blue-400 pr-10"
                  required
                  minLength={6}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {formData.password.length > 0 && formData.password.length < 6 && (
                <p className="text-red-500 text-xs mt-1">密碼至少需要6位字符</p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                確認密碼
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="請輸入您的確認密碼"
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
                  className="bg-white/60 backdrop-blur-sm border-2 border-blue-200 focus:border-blue-400 pr-10"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  disabled={isLoading}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 shadow-lg hover:shadow-xl transition-all duration-300"
              disabled={isLoading}
            >
              {isLoading ? "註冊中..." : "註冊"}
            </Button>

            <div className="text-center text-sm text-gray-600">
              已經有帳號了？{" "}
              <Link to="/login" className="text-blue-600 hover:text-purple-600 hover:underline font-medium">
                立即登入
              </Link>
            </div>

            <div className="text-center text-xs text-gray-500 mt-4 pt-4 border-t">
              註冊即表示您同意我們的{" "}
              <Link to="/terms" className="text-blue-600 hover:text-purple-600 hover:underline">
                服務條款
              </Link>
              {" "}與{" "}
              <Link to="/privacy" className="text-blue-600 hover:text-purple-600 hover:underline">
                隱私政策
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;