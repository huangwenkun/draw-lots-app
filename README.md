# 抽签应用 - 多人实时版

一个基于 Node.js + WebSocket 的多人实时抽签应用。

## 功能特性

- ? 多人实时参与
- ? 设置抽签范围
- ? 固定号码用户
- ? 二维码分享
- ? 实时数据同步
- ? 抽签结果展示

## 本地运行

```bash
npm install
npm start
```

访问 `http://localhost:9999`

## Render 部署

### 方法 1：使用 Blueprint（推荐）

1. 将代码推送到 GitHub
2. 在 Render 中点击 **"New +"** → **"Blueprint"**
3. 选择你的仓库
4. 点击 **"Apply"**

### 方法 2：手动创建 Web Service

1. 点击 **"New +"** → **"Web Service"**
2. 连接你的 GitHub 仓库
3. 配置：
   - 名称：`draw-lots-app`
   - 环境：`Node.js`
   - 构建命令：`npm install`
   - 启动命令：`node server.js`
4. 点击 **"Create Web Service"**

## 文件结构

```
Draw_lots/
├── index.html       # 主页面
├── server.js        # Node.js 服务器
├── package.json     # 依赖配置
├── render.yaml      # Render 部署配置
├── .gitignore       # Git 忽略文件
└── Dockerfile       # Docker 配置
```

## 使用说明

1. 管理员打开应用
2. 设置抽签范围和固定用户
3. 生成二维码分享
4. 参与者扫码参与
5. 达到人数后开始抽签
