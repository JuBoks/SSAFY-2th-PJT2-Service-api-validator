# 베이스 이미지 선택
FROM deploy_dev_prod_by_docekr_compose-api-validator

# 환경 설정 명령어 실행
RUN apt-get update && apt-get install -y curl sudo

# 작업 디렉터리 설정
WORKDIR /app
COPY ./ /app
RUN npm install

# 앱 소스 복사
COPY . .

# 시작 명령어 설정
CMD ["node", "app"]
