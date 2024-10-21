# 流下载

分片下载，或者叫流式传输

```bash
$ nest new download-test -p pnpm
```

- 从服务器下载一个文件的时候，如何知道文件下载完了呢？
  - 一种是 header 里带上 Content-Length，浏览器下载到这个长度就结束。
  - 另一种是设置 transfer-encoding:chunked，它是不固定长度的，服务器不断返回内容，直到返回一个空的内容代表结束。


相比大文件上传需要自己实现分片，大文件下载这个，浏览器和 http 内置了支持，直接指定对应 header 就行，自己不用做很多事情。