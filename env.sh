#!/bin/bash

# ==========================================
# 开心农场 - 环境检测与一键部署脚本
# Happy Farm - Environment Detection & Deployment Script
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
GO_VERSION_REQUIRED="1.21"
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
    
    # Go 环境
    print_info "Go 语言环境"
    if command -v go &> /dev/null; then
        GO_VERSION=$(go version | awk '{print $3}' | sed 's/go//')
        print_success "Go 已安装 (版本: $GO_VERSION)"
        print_item "GOROOT: $(go env GOROOT 2>/dev/null || echo '未设置')"
        print_item "GOPATH: $(go env GOPATH 2>/dev/null || echo '未设置')"
    else
        print_warning "Go 未安装"
    fi
    
    # Node.js 环境
    print_info "Node.js 环境"
    if command -v node &> /dev/null; then
        NODE_VERSION=$(node --version)
        print_success "Node.js 已安装 (版本: $NODE_VERSION)"
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
    
    # pnpm
    print_info "pnpm 包管理器"
    if command -v pnpm &> /dev/null; then
        PNPM_VERSION=$(pnpm --version)
        print_success "pnpm 已安装 (版本: $PNPM_VERSION)"
    else
        print_warning "pnpm 未安装"
    fi
    
    # Git
    print_info "Git 版本控制"
    if command -v git &> /dev/null; then
        GIT_VERSION=$(git --version | awk '{print $3}')
        print_success "Git 已安装 (版本: $GIT_VERSION)"
    else
        print_warning "Git 未安装"
    fi
    
    # Docker
    print_info "Docker 容器"
    if command -v docker &> /dev/null; then
        DOCKER_VERSION=$(docker --version | awk '{print $3}' | tr -d ',')
        print_success "Docker 已安装 (版本: $DOCKER_VERSION)"
    else
        print_warning "Docker 未安装"
    fi
    
    # MySQL
    print_info "MySQL 数据库"
    if command -v mysql &> /dev/null; then
        MYSQL_VERSION=$(mysql --version | awk '{print $3}' | tr -d ',')
        print_success "MySQL 已安装 (版本: $MYSQL_VERSION)"
    else
        print_warning "MySQL 未安装"
    fi
    
    # Redis
    print_info "Redis 缓存"
    if command -v redis-server &> /dev/null; then
        REDIS_VERSION=$(redis-server --version | awk '{print $3}' | cut -d'=' -f2)
        print_success "Redis 已安装 (版本: $REDIS_VERSION)"
    else
        print_warning "Redis 未安装"
    fi
}

# 检查 Go 是否已安装
check_go_installed() {
    if command -v go &> /dev/null; then
        return 0
    fi
    if [ -f /usr/local/go/bin/go ]; then
        return 0
    fi
    return 1
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

# 检查 Redis 是否已安装
check_redis_installed() {
    command -v redis-server &> /dev/null
}

# 检查 Go 工具是否已安装
check_go_tool_installed() {
    local tool_name=$1
    local GO_CMD="go"
    
    if [ -f /usr/local/go/bin/go ]; then
        GO_CMD="/usr/local/go/bin/go"
    fi
    
    # 检查 GOPATH/bin 下是否存在该工具
    local GOPATH=$($GO_CMD env GOPATH 2>/dev/null)
    if [ -n "$GOPATH" ] && [ -f "$GOPATH/bin/$tool_name" ]; then
        return 0
    fi
    
    # 检查是否在 PATH 中
    command -v "$tool_name" &> /dev/null
}

# 安装 Go 环境
install_go() {
    print_section "安装 Go 语言环境"
    
    # 检查是否已安装
    if check_go_installed; then
        local CURRENT_VERSION=""
        if command -v go &> /dev/null; then
            CURRENT_VERSION=$(go version | awk '{print $3}' | sed 's/go//')
        elif [ -f /usr/local/go/bin/go ]; then
            CURRENT_VERSION=$(/usr/local/go/bin/go version | awk '{print $3}' | sed 's/go//')
        fi
        print_skip "Go 已安装 (版本: $CURRENT_VERSION)，跳过安装"
        print_info "如需重新安装，请先卸载现有版本"
        return 0
    fi
    
    local GO_LATEST="1.22.0"
    local GO_VERSION=${1:-$GO_LATEST}
    local GO_ARCH=""
    
    # 确定架构
    case $ARCH_TYPE in
        x86_64|amd64)
            GO_ARCH="amd64"
            ;;
        aarch64|arm64)
            GO_ARCH="arm64"
            ;;
        armv7l|armhf)
            GO_ARCH="armv6l"
            ;;
        *)
            print_error "不支持的架构: $ARCH_TYPE"
            return 1
            ;;
    esac
    
    # 确定操作系统
    local GO_OS=""
    case $OS_TYPE in
        ubuntu|debian|linuxmint|pop)
            GO_OS="linux"
            ;;
        rhel|centos|fedora|rocky|almalinux)
            GO_OS="linux"
            ;;
        macos)
            GO_OS="darwin"
            ;;
        *)
            GO_OS="linux"
            ;;
    esac
    
    local GO_PACKAGE="go${GO_VERSION}.${GO_OS}-${GO_ARCH}.tar.gz"
    local GO_URL="https://go.dev/dl/${GO_PACKAGE}"
    
    print_info "准备下载 Go $GO_VERSION ($GO_OS-$GO_ARCH)"
    print_item "下载地址: $GO_URL"
    
    # 创建临时目录
    local TMP_DIR=$(mktemp -d)
    cd "$TMP_DIR"
    
    # 下载 Go
    print_info "正在下载..."
    if command -v wget &> /dev/null; then
        wget -q --show-progress "$GO_URL" -O "$GO_PACKAGE"
    elif command -v curl &> /dev/null; then
        curl -L --progress-bar "$GO_URL" -o "$GO_PACKAGE"
    else
        print_error "需要 wget 或 curl 来下载文件"
        cd - > /dev/null
        rm -rf "$TMP_DIR"
        return 1
    fi
    
    if [ $? -ne 0 ]; then
        print_error "下载失败"
        cd - > /dev/null
        rm -rf "$TMP_DIR"
        return 1
    fi
    
    # 删除旧版本
    print_info "清理旧版本..."
    sudo rm -rf /usr/local/go 2>/dev/null || true
    
    # 解压安装
    print_info "正在安装..."
    sudo tar -C /usr/local -xzf "$GO_PACKAGE"
    
    if [ $? -eq 0 ]; then
        print_success "Go $GO_VERSION 安装成功"
        
        # 配置环境变量
        print_info "配置环境变量..."
        
        local PROFILE_FILE=""
        if [ -f "$HOME/.bashrc" ]; then
            PROFILE_FILE="$HOME/.bashrc"
        elif [ -f "$HOME/.zshrc" ]; then
            PROFILE_FILE="$HOME/.zshrc"
        elif [ -f "$HOME/.profile" ]; then
            PROFILE_FILE="$HOME/.profile"
        fi
        
        if [ -n "$PROFILE_FILE" ]; then
            # 检查是否已配置
            if ! grep -q "export PATH=\$PATH:/usr/local/go/bin" "$PROFILE_FILE"; then
                echo "" >> "$PROFILE_FILE"
                echo "# Go 环境变量" >> "$PROFILE_FILE"
                echo "export PATH=\$PATH:/usr/local/go/bin" >> "$PROFILE_FILE"
                echo "export GOPATH=\$HOME/go" >> "$PROFILE_FILE"
                echo "export PATH=\$PATH:\$GOPATH/bin" >> "$PROFILE_FILE"
                print_success "环境变量已添加到 $PROFILE_FILE"
            else
                print_success "环境变量已存在"
            fi
        fi
        
        # 立即生效
        export PATH=$PATH:/usr/local/go/bin
        export GOPATH=$HOME/go
        export PATH=$PATH:$GOPATH/bin
        
        # 验证安装
        if [ -f /usr/local/go/bin/go ]; then
            local INSTALLED_VERSION=$(/usr/local/go/bin/go version 2>/dev/null | awk '{print $3}')
            print_success "Go 安装验证成功: $INSTALLED_VERSION"
        fi
    else
        print_error "安装失败"
    fi
    
    # 清理
    cd - > /dev/null
    rm -rf "$TMP_DIR"
}

# 安装 GoLand IDE
install_goland() {
    print_section "安装 GoLand IDE"
    
    # 检测 JetBrains Toolbox
    if command -v jetbrains-toolbox &> /dev/null; then
        print_info "检测到 JetBrains Toolbox，使用它安装 GoLand..."
        jetbrains-toolbox install goland
        return $?
    fi
    
    # 手动安装
    local GOLAND_VERSION="2024.1"
    local GOLAND_URL=""
    
    case $OS_TYPE in
        ubuntu|debian|linuxmint|pop)
            print_info "推荐使用 Snap 安装 GoLand"
            print_item "运行: sudo snap install goland --classic"
            ;;
        rhel|centos|fedora|rocky|almalinux)
            print_info "推荐使用 Flatpak 安装 GoLand"
            print_item "运行: flatpak install flathub com.jetbrains.GoLand"
            ;;
        macos)
            print_info "推荐使用 Homebrew 安装 GoLand"
            print_item "运行: brew install --cask goland"
            ;;
        *)
            print_warning "请手动下载 GoLand: https://www.jetbrains.com/go/download/"
            ;;
    esac
    
    print_info ""
    print_info "或者安装 JetBrains Toolbox 进行统一管理:"
    print_item "下载地址: https://www.jetbrains.com/toolbox-app/"
}

# 安装 Go 常用工具
install_go_tools() {
    print_section "安装 Go 常用开发工具"
    
    # 确保 Go 可用
    if ! check_go_installed; then
        print_error "Go 未安装，请先安装 Go"
        return 1
    fi
    
    local GO_CMD="go"
    if [ -f /usr/local/go/bin/go ]; then
        GO_CMD="/usr/local/go/bin/go"
    fi
    
    # 工具列表：工具名 显示名
    declare -A GO_TOOLS=(
        ["gopls"]="Go 语言服务器"
        ["goimports"]="导入管理工具"
        ["dlv"]="Delve 调试器"
        ["staticcheck"]="静态分析工具"
        ["air"]="热重载工具"
        ["goctl"]="go-zero 代码生成器"
        ["wire"]="依赖注入工具"
    )
    
    # 工具安装命令映射
    declare -A GO_TOOL_INSTALL=(
        ["gopls"]="golang.org/x/tools/gopls@latest"
        ["goimports"]="golang.org/x/tools/cmd/goimports@latest"
        ["dlv"]="github.com/go-delve/delve/cmd/dlv@latest"
        ["staticcheck"]="honnef.co/go/tools/cmd/staticcheck@latest"
        ["air"]="github.com/air-verse/air@latest"
        ["goctl"]="github.com/zeromicro/go-zero/tools/goctl@latest"
        ["wire"]="github.com/google/wire/cmd/wire@latest"
    )
    
    print_info "gofmt 已包含在 Go 安装中"
    
    for tool in "${!GO_TOOLS[@]}"; do
        local tool_name="${GO_TOOLS[$tool]}"
        local install_path="${GO_TOOL_INSTALL[$tool]}"
        
        if check_go_tool_installed "$tool"; then
            print_skip "$tool_name ($tool) 已安装"
        else
            print_info "安装 $tool_name ($tool)..."
            $GO_CMD install "$install_path" 2>/dev/null
            if [ $? -eq 0 ]; then
                print_success "$tool_name 安装成功"
            else
                print_warning "$tool_name 安装失败"
            fi
        fi
    done
    
    print_success "Go 工具检查完成"
}

# 安装 Node.js 环境
install_node() {
    print_section "安装 Node.js 环境"
    
    # 检查是否已安装
    if check_node_installed; then
        local CURRENT_VERSION=$(node --version)
        print_skip "Node.js 已安装 (版本: $CURRENT_VERSION)，跳过安装"
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
        print_skip "Bun 已安装 (版本: $CURRENT_VERSION)，跳过安装"
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
        print_skip "MySQL 已安装 (版本: $CURRENT_VERSION)，跳过安装"
        return 0
    fi
    
    case $OS_TYPE in
        ubuntu|debian|linuxmint|pop)
            print_info "使用 apt 安装 MySQL..."
            print_item "运行: sudo apt update && sudo apt install -y mysql-server"
            ;;
        rhel|centos|fedora|rocky|almalinux)
            print_info "使用 yum/dnf 安装 MySQL..."
            print_item "运行: sudo dnf install -y mysql-server"
            ;;
        macos)
            print_info "使用 Homebrew 安装 MySQL..."
            print_item "运行: brew install mysql"
            ;;
        *)
            print_warning "请手动安装 MySQL: https://dev.mysql.com/downloads/"
            ;;
    esac
}

install_redis() {
    print_section "安装 Redis 缓存"
    
    # 检查是否已安装
    if check_redis_installed; then
        local CURRENT_VERSION=$(redis-server --version | awk '{print $3}' | cut -d'=' -f2)
        print_skip "Redis 已安装 (版本: $CURRENT_VERSION)，跳过安装"
        return 0
    fi
    
    case $OS_TYPE in
        ubuntu|debian|linuxmint|pop)
            print_info "使用 apt 安装 Redis..."
            print_item "运行: sudo apt update && sudo apt install -y redis-server"
            ;;
        rhel|centos|fedora|rocky|almalinux)
            print_info "使用 yum/dnf 安装 Redis..."
            print_item "运行: sudo dnf install -y redis"
            ;;
        macos)
            print_info "使用 Homebrew 安装 Redis..."
            print_item "运行: brew install redis"
            ;;
        *)
            print_warning "请手动安装 Redis: https://redis.io/download"
            ;;
    esac
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
    
    # Go
    if check_go_installed; then
        local GO_VER=""
        if command -v go &> /dev/null; then
            GO_VER=$(go version | awk '{print $3}')
        elif [ -f /usr/local/go/bin/go ]; then
            GO_VER=$(/usr/local/go/bin/go version | awk '{print $3}')
        fi
        print_item "Go: $GO_VER ✓"
    else
        print_item "Go: 未安装 ✗"
    fi
    
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
    
    # Docker
    if command -v docker &> /dev/null; then
        print_item "Docker: $(docker --version | awk '{print $3}' | tr -d ',') ✓"
    else
        print_item "Docker: 未安装 -"
    fi
    
    # MySQL
    if check_mysql_installed; then
        print_item "MySQL: $(mysql --version | awk '{print $3}' | tr -d ',') ✓"
    else
        print_item "MySQL: 未安装 -"
    fi
    
    # Redis
    if check_redis_installed; then
        print_item "Redis: $(redis-server --version | awk '{print $3}' | cut -d'=' -f2) ✓"
    else
        print_item "Redis: 未安装 -"
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
    echo "  install-go      安装 Go 语言环境"
    echo "  install-goland  安装 GoLand IDE"
    echo "  install-tools   安装 Go 常用开发工具"
    echo "  install-node    安装 Node.js"
    echo "  install-bun     安装 Bun 运行时"
    echo "  install-mysql   安装 MySQL 数据库"
    echo "  install-redis   安装 Redis 缓存"
    echo "  install-all     一键安装所有环境"
    echo "  report          生成环境报告"
    echo "  help            显示此帮助信息"
    echo ""
    echo -e "${WHITE}特点:${NC}"
    echo "  - 自动检测已安装的服务，跳过重复安装"
    echo "  - 智能识别操作系统和架构"
    echo "  - 支持多种 Linux 发行版和 macOS"
    echo ""
    echo -e "${WHITE}示例:${NC}"
    echo "  $0 detect       # 检测当前环境"
    echo "  $0 install-go   # 安装 Go 语言"
    echo "  $0 install-all  # 一键安装所有环境"
    echo ""
}

# 一键安装所有环境
install_all() {
    print_header "开始一键部署 GoLand 开发环境"
    
    # 1. 检测环境
    detect_os
    detect_dev_tools
    echo ""
    
    # 2. 安装 Go（自动检测是否已安装）
    if check_go_installed; then
        print_info "Go 已安装，跳过"
    else
        read -p "是否安装 Go 语言环境？(y/n): " confirm
        if [[ "$confirm" =~ ^[Yy]$ ]]; then
            install_go
        fi
    fi
    echo ""
    
    # 3. 安装 Go 工具
    if check_go_installed; then
        read -p "是否安装/更新 Go 常用开发工具？(y/n): " confirm
        if [[ "$confirm" =~ ^[Yy]$ ]]; then
            install_go_tools
        fi
    fi
    echo ""
    
    # 4. 安装 Node.js（自动检测是否已安装）
    if check_node_installed; then
        print_info "Node.js 已安装，跳过"
    else
        read -p "是否安装 Node.js？(y/n): " confirm
        if [[ "$confirm" =~ ^[Yy]$ ]]; then
            install_node
        fi
    fi
    echo ""
    
    # 5. 安装 Bun（自动检测是否已安装）
    if check_bun_installed; then
        print_info "Bun 已安装，跳过"
    else
        read -p "是否安装 Bun？(y/n): " confirm
        if [[ "$confirm" =~ ^[Yy]$ ]]; then
            install_bun
        fi
    fi
    echo ""
    
    # 6. 安装 MySQL（自动检测是否已安装）
    if check_mysql_installed; then
        print_info "MySQL 已安装，跳过"
    else
        read -p "是否安装 MySQL？(y/n): " confirm
        if [[ "$confirm" =~ ^[Yy]$ ]]; then
            install_mysql
        fi
    fi
    echo ""
    
    # 7. 安装 Redis（自动检测是否已安装）
    if check_redis_installed; then
        print_info "Redis 已安装，跳过"
    else
        read -p "是否安装 Redis？(y/n): " confirm
        if [[ "$confirm" =~ ^[Yy]$ ]]; then
            install_redis
        fi
    fi
    echo ""
    
    # 8. GoLand IDE
    read -p "是否安装 GoLand IDE？(y/n): " confirm
    if [[ "$confirm" =~ ^[Yy]$ ]]; then
        install_goland
    fi
    echo ""
    
    # 生成报告
    generate_report
    
    print_header "部署完成！"
}

# 主函数
main() {
    case "${1:-help}" in
        detect)
            print_header "环境检测"
            detect_os
            detect_dev_tools
            ;;
        install-go)
            print_header "安装 Go 语言环境"
            detect_os
            install_go "${2:-}"
            ;;
        install-goland)
            print_header "安装 GoLand IDE"
            detect_os
            install_goland
            ;;
        install-tools)
            print_header "安装 Go 开发工具"
            install_go_tools
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
        install-redis)
            print_header "安装 Redis"
            detect_os
            install_redis
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
