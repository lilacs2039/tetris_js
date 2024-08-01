### 基本設計書 - JavaScriptで作成するシンプルなテトリス

---

#### 概要
- **システム名**: シンプルテトリス
- **目的**: ブラウザ上で動作するシンプルなテトリスゲームの作成
- **対象ユーザー**: 一般ユーザー
- **使用技術**: HTML, CSS, JavaScript

---

#### 業務設計

##### システム構成図
```
[ ユーザー ]
     |
     v
[ Webブラウザ ]
     |
     v
[ サーバー (HTML, CSS, JS 配信) ]
```

---

#### 画面設計

##### 画面一覧
| 画面ID | 画面名称      | 説明                             |
| ------ | ------------- | -------------------------------- |
| G001   | ゲーム画面    | テトリスゲームが表示される画面   |
| G002   | ゲームオーバー | ゲームオーバー時のスコア表示画面 |

##### 画面遷移
1. ユーザーがアクセス
2. ゲーム画面 (G001) に遷移
3. ゲームオーバー時、スコア表示画面 (G002) に遷移

---

#### データベース設計
※今回はローカルストレージを利用するため、サーバーサイドのデータベース設計は不要です。

---

#### 機能設計

##### 機能一覧
| 機能ID | 機能名称     | 説明                                              |
| ------ | ------------ | ------------------------------------------------- |
| F001   | テトリス開始 | ゲーム開始の処理                                  |
| F002   | ピース移動   | テトリスピースを左右、下、回転させる処理          |
| F003   | ピース設置   | ピースが底または他のピースに接触した際の設置処理  |
| F004   | ライン消去   | 水平ラインが埋まった際の消去処理                  |
| F005   | スコア計算   | ライン消去に応じたスコアの計算                    |
| F006   | ゲームオーバー| ゲーム終了時の処理とスコア表示                    |

---

#### ファイル

##### ファイル一覧
| No  | ファイル名          | ファイル種別 | 説明                       |
| --- | ------------------- | ------------ | -------------------------- |
| 1   | index.html          | HTML         | メインページ               |
| 2   | styles.css          | CSS          | スタイルシート             |
| 3   | tetris.js           | JavaScript   | テトリスゲームのロジック   |
| 4   | game_over.js        | JavaScript   | ゲームオーバー画面のロジック|

---

#### ネットワーク設計
※シンプルなクライアントサイドのゲームであり、特別なネットワーク機器は不要です。

---

#### テスト設計

##### テストケース
1. **初期表示確認**:
   - ゲーム画面が正しく表示されるか
2. **ピース操作確認**:
   - 左右移動、回転、下移動が正しく動作するか
3. **ライン消去確認**:
   - 水平ラインが埋まった際に正しく消去されるか
4. **スコア計算確認**:
   - ライン消去に応じて正しくスコアが計算されるか
5. **ゲームオーバー確認**:
   - ピースが積み上がってゲームオーバーになった際、正しくスコアが表示されるか

---

#### 外部インターフェース設計図
- 特に外部インターフェースは使用しない。

---

この設計書に基づいて、JavaScriptでシンプルなテトリスゲームを実装することができます。各ファイルの具体的な実装内容については、別途詳細な設計やコード例が必要です。