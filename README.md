# crypto-watchlist-app


crypto-watchlist-app/   （リポジトリのルートフォルダ）
├── backend/            （Spring Bootプロジェクト）
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/cryptoapp/ （Javaのソースコード）
│   │   │   └── resources/                  （設定ファイル、SQLなど）
│   │   └── test/                            （テストコード）
│   ├── build.gradle または pom.xml           （ビルド設定ファイル）
│   └── application.properties               （アプリケーション設定）
│
├── frontend/           （Next.jsプロジェクト）
│   ├── public/          （画像などの静的ファイル）
│   ├── src/             （画面やロジックのソースコード）
│   │   ├── components/   （Reactコンポーネント）
│   │   ├── pages/        （ページごとのファイル）
│   │   ├── services/     （API通信ロジック）
│   │   └── utils/        （ユーティリティ関数）
│   ├── package.json     （npmパッケージ管理ファイル）
│   └── next.config.js   （Next.jsの設定ファイル）
│
├── README.md            （プロジェクト説明）
├── .gitignore           （Git無視設定）
└── LICENSE（必要なら） （ライセンスファイル）


API 一覧
🔗 エンドポイント
GET /api/coins
ユーザーがウォッチリストに登録している仮想通貨の一覧を取得するAPI。