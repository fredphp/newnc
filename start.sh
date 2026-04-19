#!/bin/bash

# ==========================================
# 开心农场 - 一键启动脚本
# Happy Farm - One-click Start Script
# ==========================================

echo ""
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
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
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

print_step() {
    echo -e "${CYAN}[STEP]${NC} $1"
}

# 检查 Bun 是否安装
check_bun() {
    print_step "检查 Bun 运行时..."
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

# 检查 Node.js 是否安装
check_node() {
    print_step "检查 Node.js..."
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js 已安装 (版本: $NODE_VERSION)"
        return 0
    else
        print_warning "Node.js 未安装"
        return 1
    fi
}

# 检查 MySQL 是否运行
check_mysql() {
    print_step "检查 MySQL 服务..."
    if command -v mysql &> /dev/null; then
        if mysqladmin ping -h localhost --silent 2>/dev/null; then
            print_success "MySQL 服务运行中"
            return 0
        else
            print_warning "MySQL 服务可能未启动"
            print_info "请确保 MySQL 正在运行"
            return 1
        fi
    else
        print_warning "未检测到 MySQL 客户端"
        return 1
    fi
}

# 安装依赖
install_dependencies() {
    print_step "检查项目依赖..."
    
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
    print_step "初始化数据库..."
    
    # 检查 .env 文件
    if [ ! -f ".env" ]; then
        print_warning ".env 文件不存在，请配置数据库连接"
        print_info "DATABASE_URL=\"mysql://user:password@localhost:3306/happy_farm\""
        return 1
    fi
    
    # 生成 Prisma Client
    print_info "生成 Prisma Client..."
    bun run db:generate 2>/dev/null || true
    
    # 推送数据库结构
    print_info "同步数据库结构..."
    bun run db:push
    if [ $? -eq 0 ]; then
        print_success "数据库结构同步完成"
    else
        print_error "数据库同步失败，请检查 MySQL 连接配置"
        print_info "请确认 .env 文件中的 DATABASE_URL 配置正确"
        return 1
    fi
}

# 检查端口是否被占用
check_port() {
    PORT=${1:-3000}
    if lsof -Pi :$PORT -sTCP:LISTEN -t >/dev/null 2>&1; then
        print_warning "端口 $PORT 已被占用"
        print_info "正在停止占用端口的进程..."
        lsof -ti:$PORT | xargs kill -9 2>/dev/null || true
        sleep 1
        print_success "端口已释放"
    fi
}

# 停止已有进程
stop_existing() {
    print_step "清理已有服务..."
    
    # 停止可能存在的进程
    pkill -f "next dev" 2>/dev/null || true
    pkill -f "next-server" 2>/dev/null || true
    
    sleep 1
    print_success "清理完成"
}

# 启动开发服务器
start_dev() {
    print_step "启动开发服务器..."
    
    echo ""
    echo -e "${PURPLE}=========================================="
    echo -e "  🌾 开心农场启动成功！🌾"
    echo -e "==========================================${NC}"
    echo ""
    echo -e "  ${GREEN}本地访问:${NC} http://localhost:3000"
    echo -e "  ${GREEN}网络访问:${NC} http://$(hostname -I | awk '{print $1}'):3000"
    echo ""
    echo -e "  ${YELLOW}按 Ctrl+C 停止服务器${NC}"
    echo ""
    echo -e "${PURPLE}==========================================${NC}"
    echo ""
    
    # 启动服务器
    bun run dev
}

# 显示帮助信息
show_help() {
    echo ""
    echo -e "${CYAN}用法:${NC} $0 [选项]"
    echo ""
    echo -e "${CYAN}选项:${NC}"
    echo "  start       启动开发服务器 (默认)"
    echo "  init        初始化项目 (安装依赖 + 初始化数据库)"
    echo "  install     仅安装依赖"
    echo "  db          仅初始化数据库"
    echo "  stop        停止所有服务"
    echo "  help        显示帮助信息"
    echo ""
    echo -e "${CYAN}示例:${NC}"
    echo "  $0          # 启动开发服务器"
    echo "  $0 init     # 初始化项目"
    echo "  $0 stop     # 停止所有服务"
    echo ""
}

# 停止服务
stop_services() {
    print_step "停止所有服务..."
    pkill -f "next dev" 2>/dev/null || true
    pkill -f "next-server" 2>/dev/null || true
    print_success "所有服务已停止"
}

# 仅安装依赖
install_only() {
    if ! check_bun; then
        exit 1
    fi
    install_dependencies
}

# 仅初始化数据库
db_only() {
    init_database
}

# 初始化项目
init_project() {
    echo ""
    
    # 1. 检查 Bun
    if ! check_bun; then
        exit 1
    fi
    
    # 2. 检查 Node.js（可选）
    check_node
    
    # 3. 检查 MySQL
    check_mysql
    
    # 4. 安装依赖
    if ! install_dependencies; then
        exit 1
    fi
    
    # 5. 初始化数据库
    init_database
    
    echo ""
    print_success "项目初始化完成！"
    echo ""
    echo "运行 $0 start 或 $0 启动服务器"
    echo ""
}

# 主函数
main() {
    case "${1:-start}" in
        start)
            echo ""
            
            # 检查 Bun
            if ! check_bun; then
                exit 1
            fi
            
            # 安装依赖
            if ! install_dependencies; then
                exit 1
            fi
            
            # 停止已有进程
            stop_existing
            
            # 检查端口
            check_port 3000
            
            # 启动服务
            start_dev
            ;;
        init)
            init_project
            ;;
        install)
            install_only
            ;;
        db)
            db_only
            ;;
        stop)
            stop_services
            ;;
        help|--help|-h)
            show_help
            ;;
        *)
            print_error "未知选项: $1"
            show_help
            exit 1
            ;;
    esac
}

# 运行主函数
main "$@"
