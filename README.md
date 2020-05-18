## [공공데이터포털](https://www.data.go.kr/) 아파트 매매 실거래자료 다운로드 API

### 소개

- 서강대학교 산업수학종합설계 (MAT4330-01) 학기 프로젝트
- 전국 아파트 매매 실거래자료를 통한 미래 아파트 가격 예측 모델 제작

### 개발이유

- 팀에서 데이터 수집 파트를 맡았다. 
- 파일 사이즈가 큰 관계로(1.04GB) 공공데이터 포털에서 API만 제공해준다.
- xml 타입이라서 xml -> json -> csv로 2번 변환해야한다.
- 데이터 양이 너무 많아서(대략 580만건) 수작업이 불가능하다.

### 설명

- 공공데이터포털 아파트 매매 실거래자료를 지역, 연, 월 별로 분류해서 다운받아준다.
- 파일을 열어서 공공데이터포털에서 발급받은 본인의 API key를 입력해야한다. 

### 결과물

- 설정한 경로 안으로 csv 파일이 생성됨 (ex : /Seoul/201209-지역코드.csv)

### 종속성

- [Node.js](https://nodejs.org/)
- [xml-js](https://www.npmjs.com/package/xml-js)
- [jsonexport](https://www.npmjs.com/package/jsonexport)

#### bash

```
# xml-js 설치
npm install -g xml-js

# jsonexport 설치
npm install -g jsonexport
```

### 사용법

```
node xmltojsontocsv.js
```

### 프로젝트 결과

- 학기말 성적 : A+
