# myblog-front

## 作業メモ

Route53 と CloudFront と S3 でサイトデプロイする時

- 独自ドメインを決める
  - バケット名とかが決まってくるので
- Route53 で独自ドメイン作る
- S3 作る
  - 公開設定にする
  - 静的ホスティングの設定 ON → ホスティング用の URL が発行される
  - BUCKET POLICY getObject ON（JSON による）
  - Route53 戻ってホスティング用の URL を A レコード（alias ON）として設定
- CloufFront のディストリビューション作る

### はまりポイント 1: ACM による証明書発行は us-east-1 でやらないといけない

Amazon で ACM 証明書を使用するには CloudFront、米国東部 (バージニア北部) リージョンで証明書をリクエストまたはインポートする必要があります。 CloudFront ディストリビューションに関連付けられているこのリージョンの ACM 証明書は、そのディストリビューションに設定されたすべての地理的場所に配布されます。

https://docs.aws.amazon.com/ja_jp/acm/latest/userguide/acm-regions.html

### はまりポイント２： vue と組み合わせる場合、CloudFront 側でエラーページ設定が要る

- CloudFront > ディストリビューション > エラーページから「404 が帰ってきた場合も s3 の/index.html 返して,Response は 200OK で」な感じにする
- これやらないと vue router のページングがちゃんと動かず 404 になっちゃう
- 多分 vue 側で 404 ページ作ってる時とかも必要

### 備忘: ドメイン「example.com」を設定するなら、後々のこと考えて「\*.example.com」も一緒に撮った方がベターかも？？

## GPT がしゃべったことメモするだけ

2. S3 バケットの作成と設定
   S3 バケットの作成:

AWS Management Console にログインし、S3 サービスにアクセスします。
「バケットを作成」ボタンをクリックし、適切な名前とリージョンを設定して新しいバケットを作成します。
バケット名には、ドメイン名を含めると管理しやすいです（例：www.example.com）。
バケットの公開設定:

作成したバケットに移動し、「プロパティ」タブを選択します。
「静的ウェブサイトホスティング」セクションで、「このバケットを静的ウェブサイトとして使用する」にチェックを入れます。
インデックスドキュメントとして index.html を指定し、エラードキュメントとして 404.html を指定します。
バケットポリシーの設定:

「アクセス権限」タブで「バケットポリシー」を選択し、次のポリシーを追加して、バケット内のファイルへのパブリックアクセスを許可します。
json
コードをコピーする
{
"Version": "2012-10-17",
"Statement": [
{
"Effect": "Allow",
"Principal": "*",
"Action": "s3:GetObject",
"Resource": "arn:aws:s3:::<YOUR_BUCKET_NAME>/*"
}
]
} 3. CloudFront ディストリビューションの作成
CloudFront ディストリビューションの作成:

AWS Management Console で CloudFront サービスにアクセスします。

「Create Distribution」ボタンをクリックします。

「Web」を選択し、次の設定を行います：

オリジンドメイン: S3 バケットの静的ウェブサイトエンドポイントを選択します。<YOUR_BUCKET_NAME>.s3-website-<REGION>.amazonaws.com の形式です。
オリジンパス: 特に指定がない場合は空白のままにします。
ビヘイビア: 必要に応じてキャッシュポリシーやリダイレクトの設定を行います。
デフォルトキャッシュビヘイビア: 適切なキャッシュ設定を行います。例えば、Cache Based on Selected Request Headers を None にすることを検討します。
ドメイン名の設定:

「Alternative Domain Names (CNAMEs)」に固有のドメイン名（例：www.example.com）を追加します。
「SSL Certificate」セクションで、Custom SSL Certificate を選択し、必要な証明書を指定します。証明書は AWS Certificate Manager (ACM)で取得します。 4. Route 53 での設定
Route 53 の設定:
AWS Management Console で Route 53 サービスにアクセスします。

「ホストゾーン」を作成するか、既存のホストゾーンを選択します。

「レコードセットを作成」ボタンをクリックし、次の設定を行います：

レコードタイプ: A - IPv4 address
別名: Yes
別名ターゲット: CloudFront ディストリビューションのドメイン名（例：d1234567890abcdef.cloudfront.net）を指定します。

コンポーネントは遅延ローディングが良い
https://qiita.com/s-yoshi210/items/adf3e112e461371b738c

### ACM

AWS Certificate Manager (ACM) を使用してドメイン証明書を発行し、CloudFront で使用する方法は以下の通りです。ここでは、ドメイン名 myblog-dev.com を例に説明します。

1. ACM での証明書リクエスト
   AWS Management Console にログイン:

AWS Management Console にログインします。
ACM サービスに移動:

AWS Management Console で「Certificate Manager」を検索し、選択します。
証明書のリクエスト:

「証明書のリクエスト」ボタンをクリックします。
証明書のタイプを選択:

「パブリック証明書のリクエスト」を選択し、「次へ」をクリックします。
ドメイン名の入力:

「ドメイン名」フィールドに myblog-dev.com を入力します。
必要に応じてサブドメイン（例：www.myblog-dev.com）も追加できます。
「次へ」をクリックします。
検証方法の選択:

DNS 検証を選択するのが一般的です。これにより、ドメイン所有権の確認を DNS レコードで行います。
「次へ」をクリックします。
DNS レコードの設定:

ACM が提供する DNS レコードを確認し、ドメインの DNS 設定に追加します。
DNS レコード:
CNAME レコードが提供されます。これをドメインの DNS 設定に追加します。
Route 53 を使用する場合:
「Route 53 に自動で DNS レコードを追加」のオプションが表示されることがあります。この場合は、Route 53 のゾーンに自動的にレコードが追加されます。
証明書の確認:

DNS レコードが適切に設定され、ドメインの所有権が確認されると、ACM で証明書が発行されます。
証明書のステータスが「発行済み」になるまで待ちます。 2. CloudFront での証明書の設定
CloudFront ディストリビューションの作成/更新:

AWS Management Console で「CloudFront」にアクセスします。
「ディストリビューションの作成」を選択するか、既存のディストリビューションを選択して「設定の編集」をクリックします。
証明書の選択:

「SSL 証明書」セクションで「カスタム SSL 証明書 (例: \*.example.com)」を選択します。
ACM で発行した証明書を選択します。
ドメイン名の設定:

「代替ドメイン名 (CNAMEs)」セクションで、myblog-dev.com とサブドメイン（例：www.myblog-dev.com）を追加します。
変更を保存:

「ディストリビューションの設定を保存」ボタンをクリックして、CloudFront の設定を保存します。 3. Route 53 での DNS 設定
Route 53 ホストゾーンの設定:

AWS Management Console で「Route 53」にアクセスします。
「ホストゾーン」から、myblog-dev.com のホストゾーンを選択します。
A レコードの設定:

「レコードセットの作成」を選択します。
「レコードタイプ」として A - IPv4 address を選択します。
「別名」オプションを Yes に設定し、「別名ターゲット」に CloudFront のドメイン名（例：d1234567890abcdef.cloudfront.net）を選択します。
レコードの作成:

設定を保存し、レコードセットを作成します。
まとめ
ACM で証明書をリクエストし、DNS 検証を通じてドメインの所有権を確認します。
CloudFront で証明書を設定し、ディストリビューションに証明書を適用します。
Route 53 で DNS 設定を行い、CloudFront ディストリビューションを指す A レコードを設定します。
これで、myblog-dev.com ドメインを使用して、HTTPS 経由で CloudFront を通じて S3 のコンテンツにアクセスできるようになります。

⭐️⭐️⭐️⭐️⭐️
Amazon で ACM 証明書を使用するには CloudFront、米国東部 (バージニア北部) リージョンで証明書をリクエストまたはインポートする必要があります。 CloudFront ディストリビューションに関連付けられているこのリージョンの ACM 証明書は、そのディストリビューションに設定されたすべての地理的場所に配布されます。

## Linter 周り

### こういうエラーにハマった

```
npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree
npm error
npm error While resolving: myblog-front@0.1.0
npm error Found: @typescript-eslint/parser@8.8.0
npm error node_modules/@typescript-eslint/parser
npm error   dev @typescript-eslint/parser@"^8.4.0" from the root project
npm error
npm error Could not resolve dependency:
npm error peer @typescript-eslint/parser@"^6.0.0 || ^6.0.0-alpha" from @typescript-eslint/eslint-plugin@6.21.0
npm error node_modules/@typescript-eslint/eslint-plugin
npm error   dev @typescript-eslint/eslint-plugin@"^6.0.0" from the root project
npm error
npm error Fix the upstream dependency conflict, or retry
npm error this command with --force or --legacy-peer-deps
npm error to accept an incorrect (and potentially broken) dependency resolution.
```

- 「npm install」更新しようとしたらハマった
- plugin 間の依存関係を見ながら install しないといけないっぽい
  - https://www.npmjs.com/package/eslint-plugin-import?activeTab=code　こう言うところで依存金木が見れるはず

### peerDependencies って何

https://zenn.dev/sa2knight/articles/721e33593b6125

> peerDependencies は、あるモジュール X に対するインタフェースを持っており、モジュール X から参照されることを想定するが、モジュール X のどこまでにバージョン互換性を持っているかを表記したものです

とのこと

### prettier と eslint の棲み分け

https://e-joint.jp/blog/2127 だと構文エラー(eslint), 見た目のフォーマット(prettier)らしい

.ignore もできるっぽいので、チームの定義次第で如何様にもできそう（ファイルごとに担当分けるとか）

### eslint/stylelint

eslint は js,stylelint は css のためのもの
