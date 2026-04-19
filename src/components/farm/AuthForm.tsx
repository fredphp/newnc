'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFarmStore } from '@/store/farmStore';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Sprout, ArrowRight, Loader2 } from 'lucide-react';

export function AuthForm() {
  const { setUser } = useFarmStore();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateLoginForm = () => {
    const newErrors: Record<string, string> = {};
    if (!loginForm.username) newErrors.username = '请输入用户名';
    if (!loginForm.password) newErrors.password = '请输入密码';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateRegisterForm = () => {
    const newErrors: Record<string, string> = {};
    if (!registerForm.username) newErrors.username = '请输入用户名';
    else if (registerForm.username.length < 3 || registerForm.username.length > 20) {
      newErrors.username = '用户名长度需在3-20个字符之间';
    }
    if (!registerForm.password) newErrors.password = '请输入密码';
    else if (registerForm.password.length < 6) newErrors.password = '密码长度至少6个字符';
    if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = '两次密码输入不一致';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLoginForm()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(loginForm),
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        toast.success('登录成功！', {
          description: `欢迎回来，${data.user.nickname || data.user.username}！`,
        });
      } else {
        setErrors({ form: data.error || '登录失败' });
        toast.error(data.error || '登录失败');
      }
    } catch {
      setErrors({ form: '网络错误，请稍后重试' });
      toast.error('登录失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegisterForm()) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: registerForm.username,
          password: registerForm.password,
          nickname: registerForm.nickname || registerForm.username,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        toast.success('注册成功！', {
          description: '欢迎加入开心农场！',
        });
      } else {
        setErrors({ form: data.error || '注册失败' });
        toast.error(data.error || '注册失败');
      }
    } catch {
      setErrors({ form: '网络错误，请稍后重试' });
      toast.error('注册失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 清除错误
  const clearError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100 p-4 relative overflow-hidden">
      {/* 背景装饰动画 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[
          { emoji: '🌾', top: '10%', left: '5%', size: '4rem', delay: 0 },
          { emoji: '🌻', top: '20%', right: '10%', size: '3.5rem', delay: 0.5 },
          { emoji: '🌽', bottom: '30%', left: '15%', size: '3rem', delay: 1 },
          { emoji: '🥕', bottom: '20%', right: '5%', size: '3.5rem', delay: 1.5 },
          { emoji: '🍅', top: '50%', left: '3%', size: '2.5rem', delay: 2 },
          { emoji: '🍓', top: '40%', right: '8%', size: '2.5rem', delay: 0.8 },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="absolute opacity-20"
            style={{
              top: item.top,
              left: item.left,
              right: item.right,
              bottom: item.bottom,
              fontSize: item.size,
            }}
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: item.delay,
            }}
          >
            {item.emoji}
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-xl overflow-hidden">
          {/* 顶部装饰 */}
          <div className="h-2 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500" />
          
          <CardHeader className="text-center pb-4 pt-6">
            <motion.div 
              className="text-7xl mb-4"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.05, 1]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              🌾
            </motion.div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              开心农场
            </CardTitle>
            <CardDescription className="text-gray-500 mt-2 text-base">
              登录或注册开始你的农场之旅
            </CardDescription>
          </CardHeader>
          
          <CardContent className="px-6 pb-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 p-1.5 rounded-xl h-12">
                <TabsTrigger 
                  value="login"
                  className="rounded-lg text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-green-700 transition-all"
                >
                  登录
                </TabsTrigger>
                <TabsTrigger 
                  value="register"
                  className="rounded-lg text-base font-medium data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-green-700 transition-all"
                >
                  注册
                </TabsTrigger>
              </TabsList>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: activeTab === 'login' ? -20 : 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: activeTab === 'login' ? 20 : -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'login' ? (
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-username" className="text-gray-600 font-medium">用户名</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="login-username"
                            type="text"
                            placeholder="请输入用户名"
                            value={loginForm.username}
                            onChange={(e) => {
                              setLoginForm({ ...loginForm, username: e.target.value });
                              clearError('username');
                            }}
                            className={`pl-10 h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 text-base ${
                              errors.username ? 'border-red-300 focus:border-red-500' : ''
                            }`}
                          />
                        </div>
                        {errors.username && (
                          <motion.p 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-500"
                          >
                            {errors.username}
                          </motion.p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="login-password" className="text-gray-600 font-medium">密码</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="login-password"
                            type="password"
                            placeholder="请输入密码"
                            value={loginForm.password}
                            onChange={(e) => {
                              setLoginForm({ ...loginForm, password: e.target.value });
                              clearError('password');
                            }}
                            className={`pl-10 h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 text-base ${
                              errors.password ? 'border-red-300 focus:border-red-500' : ''
                            }`}
                          />
                        </div>
                        {errors.password && (
                          <motion.p 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-500"
                          >
                            {errors.password}
                          </motion.p>
                        )}
                      </div>
                      
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <Button 
                          type="submit" 
                          className="w-full h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-lg font-semibold shadow-lg shadow-green-500/25"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="flex items-center gap-2">
                              <Loader2 className="w-5 h-5 animate-spin" />
                              登录中...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              登录
                              <ArrowRight className="w-5 h-5" />
                            </span>
                          )}
                        </Button>
                      </motion.div>
                      
                      <motion.div 
                        className="text-center text-sm text-gray-500 mt-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <p className="text-gray-400 mb-1">测试账号</p>
                        <p>
                          用户名: <span className="font-mono font-bold text-green-600">demo</span>
                          {' / '}
                          密码: <span className="font-mono font-bold text-green-600">demo123</span>
                        </p>
                      </motion.div>
                    </form>
                  ) : (
                    <form onSubmit={handleRegister} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="register-username" className="text-gray-600 font-medium">用户名</Label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="register-username"
                            type="text"
                            placeholder="3-20个字符"
                            value={registerForm.username}
                            onChange={(e) => {
                              setRegisterForm({ ...registerForm, username: e.target.value });
                              clearError('username');
                            }}
                            className={`pl-10 h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 text-base ${
                              errors.username ? 'border-red-300 focus:border-red-500' : ''
                            }`}
                          />
                        </div>
                        {errors.username && (
                          <motion.p 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-500"
                          >
                            {errors.username}
                          </motion.p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-nickname" className="text-gray-600 font-medium">昵称（可选）</Label>
                        <div className="relative">
                          <Sprout className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="register-nickname"
                            type="text"
                            placeholder="你的农场昵称"
                            value={registerForm.nickname}
                            onChange={(e) => setRegisterForm({ ...registerForm, nickname: e.target.value })}
                            className="pl-10 h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 text-base"
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-password" className="text-gray-600 font-medium">密码</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="register-password"
                            type="password"
                            placeholder="至少6个字符"
                            value={registerForm.password}
                            onChange={(e) => {
                              setRegisterForm({ ...registerForm, password: e.target.value });
                              clearError('password');
                            }}
                            className={`pl-10 h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 text-base ${
                              errors.password ? 'border-red-300 focus:border-red-500' : ''
                            }`}
                          />
                        </div>
                        {errors.password && (
                          <motion.p 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-500"
                          >
                            {errors.password}
                          </motion.p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="register-confirm" className="text-gray-600 font-medium">确认密码</Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <Input
                            id="register-confirm"
                            type="password"
                            placeholder="再次输入密码"
                            value={registerForm.confirmPassword}
                            onChange={(e) => {
                              setRegisterForm({ ...registerForm, confirmPassword: e.target.value });
                              clearError('confirmPassword');
                            }}
                            className={`pl-10 h-12 rounded-xl border-gray-200 focus:border-green-500 focus:ring-green-500 text-base ${
                              errors.confirmPassword ? 'border-red-300 focus:border-red-500' : ''
                            }`}
                          />
                        </div>
                        {errors.confirmPassword && (
                          <motion.p 
                            initial={{ opacity: 0, y: -5 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-sm text-red-500"
                          >
                            {errors.confirmPassword}
                          </motion.p>
                        )}
                      </div>
                      
                      <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                        <Button 
                          type="submit" 
                          className="w-full h-12 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-lg font-semibold shadow-lg shadow-green-500/25"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <span className="flex items-center gap-2">
                              <Loader2 className="w-5 h-5 animate-spin" />
                              注册中...
                            </span>
                          ) : (
                            <span className="flex items-center gap-2">
                              注册并开始游戏
                              <ArrowRight className="w-5 h-5" />
                            </span>
                          )}
                        </Button>
                      </motion.div>
                    </form>
                  )}
                </motion.div>
              </AnimatePresence>
            </Tabs>
          </CardContent>
        </Card>
        
        {/* 底部装饰 */}
        <motion.p 
          className="text-center text-sm text-gray-400 mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          🌱 种植 · 🌾 收获 · 💰 赚钱
        </motion.p>
      </motion.div>
    </div>
  );
}
