#!/bin/bash

# 开心农场 - 一键启动脚本
# Happy Farm - One-click Start Script

echo "=========================================="
echo "   🌾 开心农场 - Happy Farm 🌾"
echo "=========================================="
echo ""

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# 检查 bun 是否安装
check_bun() {
    print_info "检查 Bun 运行时..."
    if command -v bun &> /dev/null; then
        BUN_VERSION=$(bun --version)
        print_success "Bun 已安装 (版本: $BUN_VERSION)"
        return 0
    else
        print_error "Bun 未安装！"
        echo ""
        echo "请访问 https://bun.sh 安装 Bun 运行时"
        echo "或者运行: curl -fsSL https://bun.sh/install | bash"
        return 1
    fi
}

# 检查 Node.js 是否安装（备用）
check_node() {
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_info "Node.js 版本: $NODE_VERSION"
        return 0
    else
        print_warning "Node.js 未安装"
        return 1
    fi
}

# 安装依赖
install_dependencies() {
    print_info "检查项目依赖..."
    
    if [ ! -d "node_modules" ]; then
        print_info "正在安装依赖..."
        bun install
        if [ $? -eq 0 ]; then
            print_success "依赖安装完成"
        else
            print_error "依赖安装失败"
            return 1
        fi
    else
        print_success "依赖已存在，跳过安装"
    fi
}

# 初始化数据库
init_database() {
    print_info "检查数据库..."
    
    if [ ! -f "prisma/dev.db" ]; then
        print_info "正在初始化数据库..."
        bun run db:push
        if [ $? -eq 0 ]; then
            print_success "数据库初始化完成"
            
            # 检查是否需要运行种子数据
            if [ -f "prisma/seed.ts" ]; then
                print_info "正在填充种子数据..."
                bun run prisma/seed.ts 2>/dev/null || true
            fi
        else
            print_warning "数据库初始化跳过（可能已存在）"
        fi
    else
        print_success "数据库已存在"
    fi
}

# 检查端口是否被占用
check_port() {
    PORT=${1:-3000}
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
        print_warning "端口 $PORT 已被占用"
        print_info "正在尝试停止占用端口的进程..."
        lsof -ti:$PORT | xargs kill -9 2>/dev/null || true
        sleep 1
    fi
}

# 停止已有进程
stop_existing() {
    print_info "检查并停止已有服务..."
    
    # 停止可能存在的进程
    pkill -f "next dev" 2>/dev/null || true
    pkill -f "bun run dev" 2>/dev/null || true
    
    sleep 1
    print_success "清理完成"
}

# 启动开发服务器
start_dev() {
    print_info "启动开发服务器..."
    echo ""
    echo "=========================================="
    echo ""
    print_success "🌾 开心农场启动成功！"
    echo ""
    echo "  本地访问: http://localhost:3000"
    echo "  网络访问: http://$(hostname -I | awk '{print $1}'):3000"
    echo ""
    echo "  按 Ctrl+C 停止服务器"
    echo ""
    echo "=========================================="
    echo ""
    
    # 启动服务器
    bun run dev
}

# 主函数
main() {
    echo ""
    
    # 1. 检查 Bun
    if ! check_bun; then
        exit 1
    fi
    
    # 2. 检查 Node.js（可选）
    check_node
    
    # 3. 安装依赖
    if ! install_dependencies; then
        exit 1
    fi
    
    # 4. 初始化数据库
    init_database
    
    # 5. 停止已有进程
    stop_existing
    
    # 6. 检查端口
    check_port 3000
    
    # 7. 启动服务
    start_dev
}

# 运行主函数
main
