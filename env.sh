#!/bin/bash

# ==========================================
# 开心农场 - 环境检测与部署脚本
# Happy Farm - Environment Detection & Deployment
# ==========================================

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
WHITE='\033[1;37m'
NC='\033[0m' # No Color

# 全局变量
OS_TYPE=""
OS_VERSION=""
ARCH_TYPE=""
NODE_VERSION_REQUIRED="18"
BUN_VERSION_REQUIRED="1"

# 打印函数
print_header() {
    echo ""
    echo -e "${PURPLE}==========================================${NC}"
    echo -e "${PURPLE}  $1${NC}"
    echo -e "${PURPLE}==========================================${NC}"
    echo ""
}

print_section() {
    echo ""
    echo -e "${CYAN}▶ $1${NC}"
    echo -e "${CYAN}----------------------------------------${NC}"
}

print_info() {
    echo -e "  ${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "  ${GREEN}[✓]${NC} $1"
}

print_warning() {
    echo -e "  ${YELLOW}[!]${NC} $1"
}

print_error() {
    echo -e "  ${RED}[✗]${NC} $1"
}

print_skip() {
    echo -e "  ${CYAN}[跳过]${NC} $1"
}

print_item() {
    echo -e "    ${WHITE}•${NC} $1"
}

# 检测操作系统
detect_os() {
    print_section "检测操作系统"
    
    if [ -f /etc/os-release ]; then
        . /etc/os-release
        OS_TYPE=$ID
        OS_VERSION=$VERSION_ID
        print_success "操作系统: $PRETTY_NAME"
    elif [ -f /etc/redhat-release ]; then
        OS_TYPE="rhel"
        OS_VERSION=$(cat /etc/redhat-release)
        print_success "操作系统: $OS_VERSION"
    elif [ -f /etc/debian_version ]; then
        OS_TYPE="debian"
        OS_VERSION=$(cat /etc/debian_version)
        print_success "操作系统: Debian $OS_VERSION"
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        OS_TYPE="macos"
        OS_VERSION=$(sw_vers -productVersion)
        print_success "操作系统: macOS $OS_VERSION"
    elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
        OS_TYPE="windows"
        print_success "操作系统: Windows (Git Bash/Cygwin)"
    else
        OS_TYPE="unknown"
        print_warning "未知操作系统类型: $OSTYPE"
    fi
    
    # 检测架构
    ARCH_TYPE=$(uname -m)
    print_success "系统架构: $ARCH_TYPE"
    
    # 内核版本
    KERNEL_VERSION=$(uname -r)
    print_item "内核版本: $KERNEL_VERSION"
}

# 检测已安装的开发环境
detect_dev_tools() {
    print_section "检测开发环境"
    
    # Node.js 环境
    print_info "Node.js 环境"
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js 已安装 (版本: $NODE_VERSION)"
        print_item "npm 版本: $(npm --version 2>/dev/null || echo '未安装')"
    else
        print_warning "Node.js 未安装"
    fi
    
    # Bun 环境
    print_info "Bun 运行时"
    if command -v bun &> /dev/null; then
        BUN_VERSION=$(bun --version)
        print_success "Bun 已安装 (版本: $BUN_VERSION)"
    else
        print_warning "Bun 未安装"
    fi
    
    # Git
    print_info "Git 版本控制"
    if command -v git &> /dev/null; then
        GIT_VERSION=$(git --version | awk '{print $3}')
        print_success "Git 已安装 (版本: $GIT_VERSION)"
    else
        print_warning "Git 未安装"
    fi
    
    # MySQL
    print_info "MySQL 数据库"
    if command -v mysql &> /dev/null; then
        MYSQL_VERSION=$(mysql --version | awk '{print $3}' | tr -d ',')
        print_success "MySQL 已安装 (版本: $MYSQL_VERSION)"
        
        # 检查 MySQL 服务状态
        if mysqladmin ping -h localhost --silent 2>/dev/null; then
            print_item "MySQL 服务: 运行中 ✓"
        else
            print_item "MySQL 服务: 未运行"
        fi
    else
        print_warning "MySQL 未安装"
    fi
    
    # Redis (可选)
    print_info "Redis 缓存 (可选)"
    if command -v redis-server &> /dev/null; then
        REDIS_VERSION=$(redis-server --version | awk '{print $3}' | cut -d'=' -f2)
        print_success "Redis 已安装 (版本: $REDIS_VERSION)"
    else
        print_skip "Redis 未安装 (项目不依赖)"
    fi
    
    # Docker (可选)
    print_info "Docker 容器 (可选)"
    if command -v docker &> /dev/null; then
        DOCKER_VERSION=$(docker --version | awk '{print $3}' | tr -d ',')
        print_success "Docker 已安装 (版本: $DOCKER_VERSION)"
    else
        print_skip "Docker 未安装"
    fi
}

# 检查 Node.js 是否已安装
check_node_installed() {
    command -v node &> /dev/null
}

# 检查 Bun 是否已安装
check_bun_installed() {
    command -v bun &> /dev/null
}

# 检查 MySQL 是否已安装
check_mysql_installed() {
    command -v mysql &> /dev/null
}

# 安装 Node.js 环境
install_node() {
    print_section "安装 Node.js 环境"
    
    # 检查是否已安装
    if check_node_installed; then
        local CURRENT_VERSION=$(node --version)
        print_skip "Node.js 已安装 (版本: $CURRENT_VERSION)"
        return 0
    fi
    
    case $OS_TYPE in
        ubuntu|debian|linuxmint|pop)
            print_info "使用 NodeSource 安装 Node.js..."
            print_item "运行以下命令:"
            echo ""
            echo "    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -"
            echo "    sudo apt-get install -y nodejs"
            echo ""
            ;;
        rhel|centos|fedora|rocky|almalinux)
            print_info "使用 NodeSource 安装 Node.js..."
            print_item "运行以下命令:"
            echo ""
            echo "    curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo bash -"
            echo "    sudo yum install -y nodejs"
            echo ""
            ;;
        macos)
            print_info "使用 Homebrew 安装 Node.js..."
            print_item "运行: brew install node"
            ;;
        *)
            print_warning "请手动安装 Node.js: https://nodejs.org/"
            ;;
    esac
}

# 安装 Bun
install_bun() {
    print_section "安装 Bun 运行时"
    
    # 检查是否已安装
    if check_bun_installed; then
        local CURRENT_VERSION=$(bun --version)
        print_skip "Bun 已安装 (版本: $CURRENT_VERSION)"
        return 0
    fi
    
    print_info "正在安装 Bun..."
    curl -fsSL https://bun.sh/install | bash
    
    if [ $? -eq 0 ]; then
        print_success "Bun 安装成功"
        print_info "请重新打开终端或运行: source ~/.bashrc"
    else
        print_error "Bun 安装失败"
    fi
}

# 安装数据库
install_mysql() {
    print_section "安装 MySQL 数据库"
    
    # 检查是否已安装
    if check_mysql_installed; then
        local CURRENT_VERSION=$(mysql --version | awk '{print $3}' | tr -d ',')
        print_skip "MySQL 已安装 (版本: $CURRENT_VERSION)"
        return 0
    fi
    
    case $OS_TYPE in
        ubuntu|debian|linuxmint|pop)
            print_info "使用 apt 安装 MySQL..."
            print_item "运行: sudo apt update && sudo apt install -y mysql-server"
            print_item "启动: sudo systemctl start mysql"
            print_item "安全配置: sudo mysql_secure_installation"
            ;;
        rhel|centos|fedora|rocky|almalinux)
            print_info "使用 yum/dnf 安装 MySQL..."
            print_item "运行: sudo dnf install -y mysql-server"
            print_item "启动: sudo systemctl start mysqld"
            ;;
        macos)
            print_info "使用 Homebrew 安装 MySQL..."
            print_item "运行: brew install mysql"
            print_item "启动: brew services start mysql"
            ;;
        *)
            print_warning "请手动安装 MySQL: https://dev.mysql.com/downloads/"
            ;;
    esac
}

# 配置数据库
config_database() {
    print_section "配置数据库"
    
    print_info "请在 MySQL 中执行以下 SQL 创建数据库:"
    echo ""
    echo "    CREATE DATABASE happy_farm CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
    echo "    CREATE USER 'farm_user'@'localhost' IDENTIFIED BY 'your_password';"
    echo "    GRANT ALL PRIVILEGES ON happy_farm.* TO 'farm_user'@'localhost';"
    echo "    FLUSH PRIVILEGES;"
    echo ""
    
    print_info "然后在项目根目录创建 .env 文件:"
    echo ""
    echo "    DATABASE_URL=\"mysql://farm_user:your_password@localhost:3306/happy_farm\""
    echo ""
}

# 生成环境报告
generate_report() {
    print_section "环境报告"
    
    echo ""
    echo -e "${WHITE}系统信息:${NC}"
    print_item "操作系统: ${OS_TYPE} ${OS_VERSION}"
    print_item "架构: ${ARCH_TYPE}"
    print_item "内核: $(uname -r)"
    
    echo ""
    echo -e "${WHITE}开发环境状态:${NC}"
    
    # Node.js
    if check_node_installed; then
        print_item "Node.js: $(node --version) ✓"
    else
        print_item "Node.js: 未安装 ✗"
    fi
    
    # Bun
    if check_bun_installed; then
        print_item "Bun: v$(bun --version) ✓"
    else
        print_item "Bun: 未安装 ✗"
    fi
    
    # Git
    if command -v git &> /dev/null; then
        print_item "Git: $(git --version | awk '{print $3}') ✓"
    else
        print_item "Git: 未安装 ✗"
    fi
    
    # MySQL
    if check_mysql_installed; then
        print_item "MySQL: $(mysql --version | awk '{print $3}' | tr -d ',') ✓"
    else
        print_item "MySQL: 未安装 ✗"
    fi
    
    # 项目依赖
    if [ -d "node_modules" ]; then
        print_item "项目依赖: 已安装 ✓"
    else
        print_item "项目依赖: 未安装"
    fi
    
    echo ""
}

# 显示帮助菜单
show_help() {
    print_header "开心农场 - 环境部署脚本"
    
    echo -e "${WHITE}用法:${NC} $0 [选项]"
    echo ""
    echo -e "${WHITE}选项:${NC}"
    echo "  detect          检测当前环境"
    echo "  install-node    安装 Node.js"
    echo "  install-bun     安装 Bun 运行时"
    echo "  install-mysql   安装 MySQL 数据库"
    echo "  config-db       显示数据库配置说明"
    echo "  install-all     一键安装所有必需环境"
    echo "  report          生成环境报告"
    echo "  help            显示此帮助信息"
    echo ""
    echo -e "${WHITE}项目依赖:${NC}"
    echo "  - Bun (必需) - 运行时"
    echo "  - Node.js (推荐) - 部分工具依赖"
    echo "  - MySQL (必需) - 数据库"
    echo ""
    echo -e "${WHITE}示例:${NC}"
    echo "  $0 detect       # 检测当前环境"
    echo "  $0 install-bun  # 安装 Bun"
    echo "  $0 install-all  # 一键安装所有环境"
    echo ""
}

# 一键安装所有环境
install_all() {
    print_header "开始一键部署开心农场环境"
    
    # 1. 检测环境
    detect_os
    detect_dev_tools
    echo ""
    
    # 2. 安装 Node.js
    if check_node_installed; then
        print_info "Node.js 已安装，跳过"
    else
        echo ""
        read -p "是否安装 Node.js？(y/n): " confirm
        if [[ "$confirm" =~ ^[Yy]$ ]]; then
            install_node
        fi
    fi
    
    # 3. 安装 Bun
    if check_bun_installed; then
        print_info "Bun 已安装，跳过"
    else
        echo ""
        read -p "是否安装 Bun？(y/n): " confirm
        if [[ "$confirm" =~ ^[Yy]$ ]]; then
            install_bun
        fi
    fi
    
    # 4. 安装 MySQL
    if check_mysql_installed; then
        print_info "MySQL 已安装，跳过"
    else
        echo ""
        read -p "是否安装 MySQL？(y/n): " confirm
        if [[ "$confirm" =~ ^[Yy]$ ]]; then
            install_mysql
        fi
    fi
    
    # 5. 数据库配置说明
    echo ""
    config_database
    
    # 生成报告
    generate_report
    
    print_header "环境检测完成！"
    
    echo -e "${CYAN}下一步:${NC}"
    echo "  1. 配置 .env 文件中的数据库连接"
    echo "  2. 运行 ./start.sh init 初始化项目"
    echo "  3. 运行 ./start.sh 启动服务器"
    echo ""
}

# 主函数
main() {
    case "${1:-help}" in
        detect)
            print_header "环境检测"
            detect_os
            detect_dev_tools
            ;;
        install-node)
            print_header "安装 Node.js"
            detect_os
            install_node
            ;;
        install-bun)
            print_header "安装 Bun"
            install_bun
            ;;
        install-mysql)
            print_header "安装 MySQL"
            detect_os
            install_mysql
            ;;
        config-db)
            print_header "数据库配置"
            config_database
            ;;
        install-all)
            install_all
            ;;
        report)
            print_header "环境报告"
            detect_os
            detect_dev_tools
            generate_report
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

# 运行
main "$@"
