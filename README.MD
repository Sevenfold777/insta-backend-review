# Instaclone

## npm init

1. npm init -y
2. git init

## basic set-up

1. npm i apollo-server

   - create server.js
   - gitignore : command pallette에서 node
   - npm i nodemon --save-dev: 자동으로 변경사항 서버에 반영
   - install babel: node 버젼에 구애 받지 않기 위하여(js compiler), nodemon에 대한 것도 설치할 것
   - package.json - scripts "dev" : "" -- babel에 알맞게 저장
   - prisma install - follow documentation at "prisma.io"
   - npm install graphql-tools
   - npm install dotenv - 어디서든 .env에 접근할 수 있도록
   - schema.js: @graphql-tools/schema, merge, load-files --> Divide&Conquer 관리

2. prisma client declaration + export

   - npm i bcrypt: hashing passwords
   - query가 반드시 하나는 존재해야함
   - prisma는 Promise를 반환하므로 반드시 async - await
   - prisma prettier: npm install 해야 사용 가능
   - jsonwebtoken: for issuing login token --> secret key는 .env에 저장

3. Apollo server express

   - SWAP into Apollo Server Express: npm install apollo-server-express apollo-server-core express graphql
   - apollo-server-express docs 참고하여 수정
   - npm i morgan - request log 확인 가능

4. AWS

   - npm i aws-sdk : aws 관련 사용 위하여
   - shared.utils 참고, AWS.S3 사용
   - apollo graphql upload - gql에 scalar Upload 선언해야 작동

5. 기타 추가 사항

   - npm i graphql-upload : for file upload

6. deploy(build)
   - 기존: npm run dev: "nodemon --exec babel-node server --delay 2"
   - nodemon 필요없음 (배포 후 변동 사항 없음)
   - babel-node: production 시 사용하지 않음, 불필요하게 무겁고 메모리 사용이 많음
   - 따라서 babel/cli 사용하여 build: npm install --save-dev @babel/core @babel/cli
   - npm run build: "babel src --out-dir build"
   - node ??/server
   - build 후 npm start ("node build/server") --> regeneratorRuntime Error
   - 해결: npm install --save-dev @babel/plugin-transform-runtime, npm install --save @babel/runtime
