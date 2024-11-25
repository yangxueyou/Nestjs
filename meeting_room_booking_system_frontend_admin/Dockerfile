# build stage 第一个阶段把代码复制到容器，执行 npm run build
FROM node as build-stage

WORKDIR /app

COPY package.json ./

RUN npm config set registry https://registry.npmmirror.com/

RUN npm install

COPY . .

RUN npm run build

# production stage 第二个阶段把上个阶段的产物还有 nginx 配置文件复制过来，把 nginx 服务跑起来
FROM nginx as production-stage

COPY --from=build-stage /app/build /usr/share/nginx/html

COPY --from=build-stage /app/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# 这里的 CMD 启动命令看别的 nginx 镜像的启动命令就行