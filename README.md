# Auto Add SSL Workers (Vercel Version)

这个项目最初由 [eooce](https://github.com/eooce) 开发，用于为 IP6.ARPA 反向解析域名自动申请和配置 Cloudflare 通用 SSL 证书。本人仅将该项目从 Cloudflare Workers 迁移到 Vercel 平台，使其可以在 Vercel 上部署和运行。

## 原始项目

原始项目地址：[https://gist.github.com/eooce/d3549e80a67dd39e47a55f81bae6b802](https://gist.github.com/eooce/d3549e80a67dd39e47a55f81bae6b802)

## 功能特性

- 通过 Web 界面为 IP6.ARPA 域名添加 SSL 证书
- 支持通过 API 接口调用添加 SSL 证书
- 内置 IP6.ARPA 域名生成工具
- 支持多种证书颁发机构 (CA)：
  - SSL.com (默认)
  - Let's Encrypt
  - Google Trust Services
  - Sectigo

## 本地开发

1. 安装依赖：
   ```
   npm install
   ```

2. 启动开发服务器：
   ```
   npm run dev
   ```

3. 访问应用：http://localhost:3000

## 部署到 Vercel

1. 将代码Fork到 GitHub 仓库
2. 在 [Vercel](https://vercel.com) 官网登录并导入项目
3. Vercel 会自动识别为 Next.js 项目并正确配置
4. 点击部署即可

## 使用方法

### Web 界面

访问部署后的网站根路径，通过表单填写 Cloudflare 凭据来添加 SSL 证书。

### API 接口

#### POST 请求

```
POST /api/add-ssl
Content-Type: application/json

{
  "email": "your-cloudflare-email",
  "zoneId": "your-zone-id",
  "apikey": "your-api-key",
  "enabled": true,
  "ca": "ssl_com"
}
```

#### GET 请求

```
GET /api/add-ssl?zoneId=...&email=...&apikey=...&enabled=true&ca=ssl_com
```

## 注意事项

ip6.arpa 域名通常仅支持 `ssl_com` 作为证书颁发机构。

## 联系作者

联系作者：[https://github.com/eooce](https://github.com/eooce)

感谢原始作者的贡献!

## 许可证

本项目遵循原始作者的许可证。