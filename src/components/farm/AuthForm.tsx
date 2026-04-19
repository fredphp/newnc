'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useFarmStore } from '@/store/farmStore';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, Sprout, Loader2, Eye, EyeOff } from 'lucide-react';

export function AuthForm() {
  const { setUser } = useFarmStore();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState({ account: true, password: true });

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

  const clearError = (field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  };

  return (
    <div className="min-h-screen w-full relative overflow-hidden flex items-center justify-center">
      {/* 天空背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-sky-100" />
      
      {/* 云朵装饰 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 白云 */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              top: `${5 + i * 8}%`,
              left: `${-10 + i * 20}%`,
            }}
            animate={{
              x: [0, 30, 0],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: 'linear',
            }}
          >
            <div className="relative">
              <div className="w-20 h-8 bg-white rounded-full opacity-90" />
              <div className="absolute -top-3 left-4 w-12 h-12 bg-white rounded-full opacity-90" />
              <div className="absolute -top-1 left-12 w-10 h-10 bg-white rounded-full opacity-90" />
            </div>
          </motion.div>
        ))}
      </div>
      
      {/* 草地背景 */}
      <div className="absolute bottom-0 left-0 right-0 h-1/2">
        {/* 草地主体 */}
        <div className="absolute inset-0 bg-gradient-to-t from-green-500 via-green-400 to-green-300" />
        
        {/* 草地纹理 */}
        <div className="absolute inset-0 opacity-30">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 bg-green-600 rounded-t-full"
              style={{
                left: `${(i * 2) % 100}%`,
                bottom: `${Math.random() * 10}%`,
                height: `${10 + Math.random() * 20}px`,
                transform: `rotate(${-10 + Math.random() * 20}deg)`,
              }}
            />
          ))}
        </div>
        
        {/* 小白花装饰 */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-lg"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: `${5 + Math.random() * 20}%`,
            }}
            animate={{
              y: [0, -3, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          >
            🌼
          </motion.div>
        ))}
        
        {/* 小树装饰 */}
        <motion.div
          className="absolute text-5xl"
          style={{ left: '5%', bottom: '25%' }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          🌳
        </motion.div>
        <motion.div
          className="absolute text-4xl"
          style={{ right: '8%', bottom: '20%' }}
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
        >
          🌲
        </motion.div>
        
        {/* 小房子装饰 */}
        <motion.div
          className="absolute text-5xl"
          style={{ left: '15%', bottom: '15%' }}
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 5, repeat: Infinity }}
        >
          🏠
        </motion.div>
      </div>
      
      {/* 飘浮的装饰元素 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* 红气球 */}
        <motion.div
          className="absolute text-4xl"
          style={{ top: '15%', right: '15%' }}
          animate={{
            y: [0, -20, 0],
            x: [0, 10, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🎈
        </motion.div>
        
        {/* 小鸟 */}
        <motion.div
          className="absolute text-2xl"
          style={{ top: '20%', left: '20%' }}
          animate={{
            x: [0, 100, 200, 100, 0],
            y: [0, -20, 0, 20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          🐦
        </motion.div>
        
        {/* 蝴蝶 */}
        <motion.div
          className="absolute text-2xl"
          style={{ top: '35%', left: '25%' }}
          animate={{
            x: [0, 30, -20, 10, 0],
            y: [0, -20, 10, -15, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          🦋
        </motion.div>
      </div>

      {/* 主登录卡片 */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative z-10 w-full max-w-sm mx-4"
      >
        {/* 卡片主体 - 木质边框风格 */}
        <div 
          className="relative rounded-3xl p-1"
          style={{
            background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 25%, #8B4513 50%, #D2691E 75%, #8B4513 100%)',
            boxShadow: '0 8px 32px rgba(139, 69, 19, 0.4), inset 0 2px 4px rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* 木纹纹理 */}
          <div 
            className="absolute inset-0 rounded-3xl opacity-20 pointer-events-none"
            style={{
              background: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(0,0,0,0.1) 10px, rgba(0,0,0,0.1) 12px)',
            }}
          />
          
          {/* 内部卡片 */}
          <div 
            className="relative rounded-[20px] overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #FFF8DC 0%, #FAEBD7 50%, #FFEFD5 100%)',
            }}
          >
            {/* 顶部装饰条 */}
            <div 
              className="h-3"
              style={{
                background: 'linear-gradient(90deg, #8B4513, #D2691E, #8B4513)',
              }}
            />
            
            {/* 标题区域 */}
            <div className="text-center pt-6 pb-4 px-4">
              {/* 卡通装饰 - 小猪、金币 */}
              <div className="flex items-center justify-center gap-2 mb-2">
                <motion.span 
                  className="text-3xl"
                  animate={{ rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🐷
                </motion.span>
                <motion.span 
                  className="text-2xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  💰
                </motion.span>
                <motion.span 
                  className="text-3xl"
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  🐷
                </motion.span>
              </div>
              
              {/* 标题 - 木质浮雕风格 */}
              <div 
                className="relative inline-block px-6 py-2 rounded-xl"
                style={{
                  background: 'linear-gradient(180deg, #DEB887 0%, #D2B48C 50%, #BC8F8F 100%)',
                  boxShadow: 'inset 0 2px 4px rgba(255,255,255,0.3), inset 0 -2px 4px rgba(0,0,0,0.2), 0 4px 8px rgba(139,69,19,0.3)',
                }}
              >
                <h1 
                  className="text-2xl font-bold"
                  style={{
                    background: 'linear-gradient(180deg, #FFD700 0%, #FFA500 50%, #CD853F 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                    filter: 'drop-shadow(0 1px 1px rgba(255,215,0,0.5))',
                  }}
                >
                  开心农场
                </h1>
              </div>
              
              <p className="text-amber-800/70 mt-2 text-sm">
                欢迎来到你的农场世界
              </p>
            </div>

            {/* 标签切换 */}
            <div className="px-4 mb-4">
              <div className="flex gap-2 p-1 rounded-xl bg-amber-100/50">
                <button
                  onClick={() => setActiveTab('login')}
                  className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all duration-300 ${
                    activeTab === 'login'
                      ? 'text-white shadow-lg'
                      : 'text-amber-700 hover:bg-amber-200/50'
                  }`}
                  style={activeTab === 'login' ? {
                    background: 'linear-gradient(135deg, #CD853F 0%, #8B4513 100%)',
                  } : {}}
                >
                  登录
                </button>
                <button
                  onClick={() => setActiveTab('register')}
                  className={`flex-1 py-2 px-4 rounded-lg font-bold text-sm transition-all duration-300 ${
                    activeTab === 'register'
                      ? 'text-white shadow-lg'
                      : 'text-amber-700 hover:bg-amber-200/50'
                  }`}
                  style={activeTab === 'register' ? {
                    background: 'linear-gradient(135deg, #CD853F 0%, #8B4513 100%)',
                  } : {}}
                >
                  注册
                </button>
              </div>
            </div>

            {/* 表单区域 */}
            <div className="px-4 pb-4">
              <AnimatePresence mode="wait">
                {activeTab === 'login' ? (
                  <motion.form
                    key="login"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    onSubmit={handleLogin}
                    className="space-y-4"
                  >
                    {/* 用户名输入框 */}
                    <div className="relative">
                      <div 
                        className="flex items-center rounded-xl overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #FFFACD 0%, #FFE4B5 100%)',
                          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(255,255,255,0.8)',
                        }}
                      >
                        <div className="pl-3 pr-2 py-3 text-amber-700">
                          <User className="w-5 h-5" />
                        </div>
                        <Input
                          type="text"
                          placeholder="请输入用户名"
                          value={loginForm.username}
                          onChange={(e) => {
                            setLoginForm({ ...loginForm, username: e.target.value });
                            clearError('username');
                          }}
                          className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-amber-600/50 text-amber-900 h-11"
                        />
                        <div className="pr-2 text-amber-500">👤</div>
                      </div>
                      {errors.username && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-red-500 mt-1 pl-2"
                        >
                          {errors.username}
                        </motion.p>
                      )}
                    </div>

                    {/* 密码输入框 */}
                    <div className="relative">
                      <div 
                        className="flex items-center rounded-xl overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #FFFACD 0%, #FFE4B5 100%)',
                          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(255,255,255,0.8)',
                        }}
                      >
                        <div className="pl-3 pr-2 py-3 text-amber-700">
                          <Lock className="w-5 h-5" />
                        </div>
                        <Input
                          type={showPassword ? 'text' : 'password'}
                          placeholder="请输入密码"
                          value={loginForm.password}
                          onChange={(e) => {
                            setLoginForm({ ...loginForm, password: e.target.value });
                            clearError('password');
                          }}
                          className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-amber-600/50 text-amber-900 h-11"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="pr-3 text-amber-600 hover:text-amber-800"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                      {errors.password && (
                        <motion.p
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-xs text-red-500 mt-1 pl-2"
                        >
                          {errors.password}
                        </motion.p>
                      )}
                    </div>

                    {/* 记住选项 */}
                    <div className="flex items-center gap-4 py-1">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <div 
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                            rememberMe.account 
                              ? 'bg-amber-400 border-amber-500' 
                              : 'bg-amber-100 border-2 border-amber-300'
                          }`}
                          onClick={() => setRememberMe(prev => ({ ...prev, account: !prev.account }))}
                        >
                          {rememberMe.account && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-white text-xs"
                            >
                              ✓
                            </motion.span>
                          )}
                        </div>
                        <span className="text-sm text-amber-700">记住账号</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <div 
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                            rememberMe.password 
                              ? 'bg-amber-400 border-amber-500' 
                              : 'bg-amber-100 border-2 border-amber-300'
                          }`}
                          onClick={() => setRememberMe(prev => ({ ...prev, password: !prev.password }))}
                        >
                          {rememberMe.password && (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-white text-xs"
                            >
                              ✓
                            </motion.span>
                          )}
                        </div>
                        <span className="text-sm text-amber-700">记住密码</span>
                      </label>
                    </div>

                    {/* 登录按钮 - 木质箭头风格 */}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="w-full relative py-3 rounded-xl font-bold text-white overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, #D2691E 0%, #8B4513 50%, #A0522D 100%)',
                        boxShadow: '0 4px 12px rgba(139, 69, 19, 0.4), inset 0 2px 4px rgba(255,255,255,0.2)',
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* 木纹效果 */}
                      <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.1) 8px, rgba(0,0,0,0.1) 10px)',
                        }}
                      />
                      <span className="relative flex items-center justify-center gap-2 text-lg">
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            登录中...
                          </>
                        ) : (
                          <>
                            登 录 ➡
                          </>
                        )}
                      </span>
                    </motion.button>

                    {/* 测试账号提示 */}
                    <motion.div
                      className="text-center py-3 px-4 rounded-xl bg-amber-50/80 border border-amber-200"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <p className="text-amber-600 text-xs mb-1">🎮 测试账号</p>
                      <p className="text-amber-700 text-sm">
                        用户名: <span className="font-bold text-amber-800">demo</span>
                        {' / '}
                        密码: <span className="font-bold text-amber-800">demo123</span>
                      </p>
                    </motion.div>
                  </motion.form>
                ) : (
                  <motion.form
                    key="register"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    onSubmit={handleRegister}
                    className="space-y-3"
                  >
                    {/* 用户名 */}
                    <div className="relative">
                      <div 
                        className="flex items-center rounded-xl overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #FFFACD 0%, #FFE4B5 100%)',
                          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(255,255,255,0.8)',
                        }}
                      >
                        <div className="pl-3 pr-2 py-2 text-amber-700">
                          <User className="w-4 h-4" />
                        </div>
                        <Input
                          type="text"
                          placeholder="用户名 (3-20字符)"
                          value={registerForm.username}
                          onChange={(e) => {
                            setRegisterForm({ ...registerForm, username: e.target.value });
                            clearError('username');
                          }}
                          className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-amber-600/50 text-amber-900 h-10 text-sm"
                        />
                      </div>
                      {errors.username && (
                        <motion.p className="text-xs text-red-500 mt-1 pl-2">
                          {errors.username}
                        </motion.p>
                      )}
                    </div>

                    {/* 昵称 */}
                    <div className="relative">
                      <div 
                        className="flex items-center rounded-xl overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #FFFACD 0%, #FFE4B5 100%)',
                          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(255,255,255,0.8)',
                        }}
                      >
                        <div className="pl-3 pr-2 py-2 text-amber-700">
                          <Sprout className="w-4 h-4" />
                        </div>
                        <Input
                          type="text"
                          placeholder="昵称 (可选)"
                          value={registerForm.nickname}
                          onChange={(e) => setRegisterForm({ ...registerForm, nickname: e.target.value })}
                          className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-amber-600/50 text-amber-900 h-10 text-sm"
                        />
                      </div>
                    </div>

                    {/* 密码 */}
                    <div className="relative">
                      <div 
                        className="flex items-center rounded-xl overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #FFFACD 0%, #FFE4B5 100%)',
                          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(255,255,255,0.8)',
                        }}
                      >
                        <div className="pl-3 pr-2 py-2 text-amber-700">
                          <Lock className="w-4 h-4" />
                        </div>
                        <Input
                          type="password"
                          placeholder="密码 (至少6字符)"
                          value={registerForm.password}
                          onChange={(e) => {
                            setRegisterForm({ ...registerForm, password: e.target.value });
                            clearError('password');
                          }}
                          className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-amber-600/50 text-amber-900 h-10 text-sm"
                        />
                      </div>
                      {errors.password && (
                        <motion.p className="text-xs text-red-500 mt-1 pl-2">
                          {errors.password}
                        </motion.p>
                      )}
                    </div>

                    {/* 确认密码 */}
                    <div className="relative">
                      <div 
                        className="flex items-center rounded-xl overflow-hidden"
                        style={{
                          background: 'linear-gradient(135deg, #FFFACD 0%, #FFE4B5 100%)',
                          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(255,255,255,0.8)',
                        }}
                      >
                        <div className="pl-3 pr-2 py-2 text-amber-700">
                          <Lock className="w-4 h-4" />
                        </div>
                        <Input
                          type="password"
                          placeholder="确认密码"
                          value={registerForm.confirmPassword}
                          onChange={(e) => {
                            setRegisterForm({ ...registerForm, confirmPassword: e.target.value });
                            clearError('confirmPassword');
                          }}
                          className="flex-1 border-0 bg-transparent focus:ring-0 focus:outline-none placeholder:text-amber-600/50 text-amber-900 h-10 text-sm"
                        />
                      </div>
                      {errors.confirmPassword && (
                        <motion.p className="text-xs text-red-500 mt-1 pl-2">
                          {errors.confirmPassword}
                        </motion.p>
                      )}
                    </div>

                    {/* 注册按钮 */}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="w-full relative py-3 rounded-xl font-bold text-white overflow-hidden mt-2"
                      style={{
                        background: 'linear-gradient(135deg, #D2691E 0%, #8B4513 50%, #A0522D 100%)',
                        boxShadow: '0 4px 12px rgba(139, 69, 19, 0.4), inset 0 2px 4px rgba(255,255,255,0.2)',
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div 
                        className="absolute inset-0 opacity-20"
                        style={{
                          background: 'repeating-linear-gradient(90deg, transparent, transparent 8px, rgba(0,0,0,0.1) 8px, rgba(0,0,0,0.1) 10px)',
                        }}
                      />
                      <span className="relative flex items-center justify-center gap-2 text-lg">
                        {isLoading ? (
                          <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            注册中...
                          </>
                        ) : (
                          <>
                            注册 ⬆
                          </>
                        )}
                      </span>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        {/* 底部装饰文字 */}
        <motion.p
          className="text-center mt-4 text-amber-700/80 text-sm font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          🌱 种植 · 🌾 收获 · 💰 赚大钱
        </motion.p>
      </motion.div>
      
      {/* 太阳装饰 */}
      <motion.div
        className="absolute text-6xl"
        style={{ top: '5%', left: '10%' }}
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 60,
          repeat: Infinity,
          ease: 'linear',
        }}
      >
        ☀️
      </motion.div>
    </div>
  );
}
