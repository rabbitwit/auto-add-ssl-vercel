import Head from 'next/head';
import { getHTML } from '../utils/html';

export default function Home() {
  return (
    <>
      <Head>
        <title>IP6.ARPA域名自动添加SSL证书</title>
        <meta name="description" content="一键为您的 IP6.ARPA 反向解析域名自动申请和配置 Cloudflare 通用 SSL 证书，同时提供 IP6.ARPA 域名生成工具。" />
        <link rel="icon" href="https://tunnelbroker.net/favicon.ico" type="image/ico" />
      </Head>
      <div dangerouslySetInnerHTML={{ __html: getHTML() }} />
    </>
  );
}