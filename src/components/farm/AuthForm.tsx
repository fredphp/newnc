'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFarmStore } from '@/store/farmStore';
import { toast } from 'sonner';

export function AuthForm() {
  const { setUser, setLoading } = useFarmStore();
  const [isLoading, setIsLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    nickname: '',
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginForm.username || !loginForm.password) {
      toast.error('请填写用户名和密码');
      return;
    }

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
        toast.success('登录成功！');
      } else {
        toast.error(data.error || '登录失败');
      }
    } catch {
      toast.error('登录失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!registerForm.username || !registerForm.password) {
      toast.error('请填写用户名和密码');
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      toast.error('两次密码输入不一致');
      return;
    }

    if (registerForm.password.length < 6) {
      toast.error('密码长度至少6个字符');
      return;
    }

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
        toast.success('注册成功！');
      } else {
        toast.error(data.error || '注册失败');
      }
    } catch {
      toast.error('注册失败，请稍后重试');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <div className="text-5xl mb-4">🌾</div>
          <CardTitle className="text-2xl font-bold text-green-800">开心农场</CardTitle>
          <CardDescription>登录或注册开始你的农场之旅</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="login">登录</TabsTrigger>
              <TabsTrigger value="register">注册</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-username">用户名</Label>
                  <Input
                    id="login-username"
                    type="text"
                    placeholder="请输入用户名"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">密码</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="请输入密码"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                  {isLoading ? '登录中...' : '登录'}
                </Button>
                <p className="text-xs text-center text-gray-500">
                  测试账号: demo / demo123
                </p>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="register-username">用户名</Label>
                  <Input
                    id="register-username"
                    type="text"
                    placeholder="3-20个字符"
                    value={registerForm.username}
                    onChange={(e) => setRegisterForm({ ...registerForm, username: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-nickname">昵称（可选）</Label>
                  <Input
                    id="register-nickname"
                    type="text"
                    placeholder="你的农场昵称"
                    value={registerForm.nickname}
                    onChange={(e) => setRegisterForm({ ...registerForm, nickname: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-password">密码</Label>
                  <Input
                    id="register-password"
                    type="password"
                    placeholder="至少6个字符"
                    value={registerForm.password}
                    onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="register-confirm">确认密码</Label>
                  <Input
                    id="register-confirm"
                    type="password"
                    placeholder="再次输入密码"
                    value={registerForm.confirmPassword}
                    onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                  />
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700" disabled={isLoading}>
                  {isLoading ? '注册中...' : '注册'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
