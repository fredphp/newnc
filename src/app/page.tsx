'use client';

import { useState } from 'react';

export default function LoginPage() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [vcode, setVcode] = useState('');
  const [remember, setRemember] = useState(true);
  const [agree, setAgree] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');

  // 显示提示框
  const showTip = (msg: string) => {
    setAlertMsg(msg);
    setShowAlert(true);
  };

  // 关闭提示框
  const closeAlert = () => {
    setShowAlert(false);
  };

  // 登录处理
  const handleLogin = async () => {
    if (!phone) {
      showTip('请输入手机号');
      return;
    }
    if (!password) {
      showTip('请输入密码');
      return;
    }
    if (!vcode) {
      showTip('请输入验证码');
      return;
    }
    if (!agree) {
      showTip('请阅读并同意用户协议');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password, vcode }),
      });
      const data = await res.json();
      
      if (data.success) {
        showTip('登录成功！');
        setTimeout(() => {
          window.location.href = '/farm';
        }, 1500);
      } else {
        showTip(data.message || '登录失败');
      }
    } catch (error) {
      showTip('网络错误，请稍后重试');
    } finally {
      setLoading(false);
    }
  };

  // 注册处理
  const handleRegister = () => {
    window.location.href = '/register';
  };

  return (
    <div className="login-container">
      {/* Logo */}
      <img 
        src="/images/login/bz.png" 
        alt="开心农场" 
        className="logo animate-bounce-in-down"
      />
      
      {/* 登录框 */}
      <div className="login-box">
        <form onSubmit={(e) => e.preventDefault()}>
          {/* 手机号 */}
          <input
            type="tel"
            placeholder="请输入手机号"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="input-phone"
          />
          
          {/* 密码 */}
          <input
            type="password"
            placeholder="请输入密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-password"
          />
          
          {/* 验证码 */}
          <input
            type="text"
            placeholder="验证码"
            value={vcode}
            onChange={(e) => setVcode(e.target.value)}
            className="input-vcode"
          />
          
          {/* 验证码图片 */}
          <a href="javascript:;" className="vcode-link">
            <img 
              src="/api/auth/vcode" 
              alt="验证码" 
              onClick={(e) => {
                e.currentTarget.src = '/api/auth/vcode?t=' + Date.now();
              }}
              style={{
                width: '1.4rem',
                height: '0.6rem',
                position: 'absolute',
                left: 0,
                top: '0.1rem',
                border: 'none'
              }}
            />
          </a>
          
          {/* 记住密码 & 自动登录 */}
          <input
            type="checkbox"
            checked={remember}
            onChange={(e) => setRemember(e.target.checked)}
            className="checkbox-remember"
          />
          <img 
            src={remember ? "/images/login/dh.png" : "/images/login/dh.png"} 
            alt="" 
            className="check1"
            style={{ opacity: remember ? 1 : 0.3 }}
          />
          
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
            className="checkbox-agree"
          />
          <img 
            src={agree ? "/images/login/dh.png" : "/images/login/dh.png"} 
            alt="" 
            className="check2"
            style={{ opacity: agree ? 1 : 0.3 }}
          />
          
          {/* 注册按钮 */}
          <div 
            className="btn-register"
            onClick={handleRegister}
          />
          
          {/* 登录按钮 */}
          <div 
            className="btn-submit"
            onClick={handleLogin}
          />
        </form>
        
        {/* 忘记密码 */}
        <a href="javascript:;" className="forgot-link"></a>
      </div>
      
      {/* 提示框 */}
      {showAlert && (
        <div className="shade">
          <div className="alert-box animate-bounce-in">
            <img 
              src="/images/login/xm.png" 
              alt="" 
              className="alert-icon animate-pulse"
            />
            <p>{alertMsg}</p>
            <div className="alert-submit" onClick={closeAlert} />
          </div>
        </div>
      )}
      
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html {
          font-size: calc(100vw / 7.5);
        }
        
        @media (min-width: 750px) {
          html {
            font-size: 100px;
          }
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        }
      `}</style>
      
      <style jsx>{`
        .login-container {
          width: 100%;
          min-height: 100vh;
          background: url('/images/login/bj.jpg') center top / cover no-repeat;
          overflow-x: hidden;
          position: relative;
        }
        
        .logo {
          width: 7.5rem;
          height: 4.92rem;
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          top: 0;
          z-index: 100;
        }
        
        .login-box {
          width: 6.16rem;
          height: 8.97rem;
          background: url('/images/login/dl.png') center / cover no-repeat;
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          top: 2.76rem;
        }
        
        .input-phone {
          width: 3.85rem;
          height: 0.82rem;
          background: none;
          border: none;
          position: absolute;
          left: 1.58rem;
          top: 2.51rem;
          color: #6c3011;
          font-size: 0.25rem;
          outline: none;
          padding: 0 0.2rem;
        }
        
        .input-phone::placeholder {
          color: #6c3011;
        }
        
        .input-password {
          width: 3.85rem;
          height: 0.82rem;
          background: none;
          border: none;
          position: absolute;
          left: 1.58rem;
          top: 3.79rem;
          color: #6c3011;
          font-size: 0.25rem;
          outline: none;
          padding: 0 0.2rem;
        }
        
        .input-password::placeholder {
          color: #6c3011;
        }
        
        .input-vcode {
          width: 1.79rem;
          height: 0.82rem;
          background: none;
          border: none;
          position: absolute;
          left: 1.58rem;
          top: 5.05rem;
          color: #6c3011;
          font-size: 0.25rem;
          outline: none;
          padding: 0 0.2rem;
        }
        
        .input-vcode::placeholder {
          color: #6c3011;
        }
        
        .vcode-link {
          width: 1.41rem;
          height: 0.8rem;
          position: absolute;
          left: 4rem;
          top: 5.05rem;
          font-size: 0.25rem;
          line-height: 0.82rem;
          text-align: center;
          display: block;
          cursor: pointer;
        }
        
        .checkbox-remember {
          width: 0.41rem;
          height: 0.41rem;
          background: none;
          border: none;
          position: absolute;
          left: 4.07rem;
          top: 6.34rem;
          z-index: 10;
          opacity: 0;
          cursor: pointer;
        }
        
        .checkbox-agree {
          width: 0.41rem;
          height: 0.41rem;
          background: none;
          border: none;
          position: absolute;
          left: 4.07rem;
          top: 7.1rem;
          z-index: 10;
          opacity: 0;
          cursor: pointer;
        }
        
        .check1 {
          width: 0.43rem;
          height: 0.4rem;
          position: absolute;
          left: 4.1rem;
          bottom: 2.28rem;
          pointer-events: none;
        }
        
        .check2 {
          width: 0.43rem;
          height: 0.4rem;
          position: absolute;
          left: 4.1rem;
          bottom: 1.53rem;
          pointer-events: none;
        }
        
        .forgot-link {
          width: 1.7rem;
          height: 1.38rem;
          background: url('/images/login/wjmm.png') center / cover no-repeat;
          position: absolute;
          left: -1rem;
          bottom: 0.9rem;
          transform: rotate(45deg);
        }
        
        .btn-submit {
          width: 2.23rem;
          height: 0.98rem;
          background: url('/images/login/dlan.png') center / cover no-repeat;
          position: absolute;
          right: 0.44rem;
          top: 8.1rem;
          cursor: pointer;
          outline: none;
          transition: transform 0.2s;
        }
        
        .btn-submit:active {
          transform: scale(0.95);
        }
        
        .btn-register {
          width: 2.23rem;
          height: 0.99rem;
          background: url('/images/login/3.png') center / cover no-repeat;
          position: absolute;
          left: 0.44rem;
          top: 8.1rem;
          cursor: pointer;
          outline: none;
          transition: transform 0.2s;
        }
        
        .btn-register:active {
          transform: scale(0.95);
        }
        
        .shade {
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          position: fixed;
          left: 0;
          top: 0;
          z-index: 998;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .alert-box {
          width: 6.21rem;
          height: 5.01rem;
          background: url('/images/login/kk.png') center / cover no-repeat;
          position: relative;
        }
        
        .alert-icon {
          width: 1.92rem;
          height: 1.49rem;
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          top: 0.6rem;
        }
        
        .alert-box p {
          width: 5.23rem;
          height: 0.82rem;
          position: absolute;
          line-height: 0.82rem;
          font-size: 0.25rem;
          color: #6c3011;
          text-align: center;
          left: 0.51rem;
          top: 2.44rem;
        }
        
        .alert-submit {
          width: 2.49rem;
          height: 1.17rem;
          background: url('/images/login/qd.png') center / cover no-repeat;
          position: absolute;
          left: 0;
          right: 0;
          margin: auto;
          bottom: -0.3rem;
          cursor: pointer;
        }
        
        @keyframes bounceInDown {
          0% {
            opacity: 0;
            transform: translateY(-2rem);
          }
          60% {
            opacity: 1;
            transform: translateY(0.3rem);
          }
          80% {
            transform: translateY(-0.1rem);
          }
          100% {
            transform: translateY(0);
          }
        }
        
        @keyframes bounceIn {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }
        
        .animate-bounce-in-down {
          animation: bounceInDown 0.8s ease-out;
        }
        
        .animate-bounce-in {
          animation: bounceIn 0.5s ease-out;
        }
        
        .animate-pulse {
          animation: pulse 1s infinite;
        }
      `}</style>
    </div>
  );
}
