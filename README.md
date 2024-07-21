# myblog-front


## 作業メモ

Route53とCloudFrontとS3でサイトデプロイする時

- 独自ドメインを決める
  - バケット名とかが決まってくるので
- Route53で独自ドメイン作る
- S3作る
  - 公開設定にする
  - 静的ホスティングの設定ON →ホスティング用のURLが発行される
  - BUCKET POLICY getObject ON（JSONによる）
  - Route53戻ってホスティング用のURLをA レコード（alias ON）として設定
- CloufFrontのディストリビューション作る

### はまりポイント1: ACMによる証明書発行はus-east-1でやらないといけない

Amazon で ACM 証明書を使用するには CloudFront、米国東部 (バージニア北部) リージョンで証明書をリクエストまたはインポートする必要があります。 CloudFront ディストリビューションに関連付けられているこのリージョンの ACM 証明書は、そのディストリビューションに設定されたすべての地理的場所に配布されます。

https://docs.aws.amazon.com/ja_jp/acm/latest/userguide/acm-regions.html

### はまりポイント２： vueと組み合わせる場合、CloudFront側でエラーページ設定が要る

* CloudFront > ディストリビューション > エラーページから「404が帰ってきた場合もs3の/index.html返して,Responseは200OKで」な感じにする
* これやらないとvue routerのページングがちゃんと動かず404になっちゃう
* 多分vue側で404ページ作ってる時とかも必要

### 備忘: ドメイン「example.com」を設定するなら、後々のこと考えて「*.example.com」も一緒に撮った方がベターかも？？


## GPTがしゃべったことメモするだけ
2. S3 バケットの作成と設定
S3 バケットの作成:

AWS Management Consoleにログインし、S3サービスにアクセスします。
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
}
3. CloudFront ディストリビューションの作成
CloudFront ディストリビューションの作成:

AWS Management ConsoleでCloudFrontサービスにアクセスします。

「Create Distribution」ボタンをクリックします。

「Web」を選択し、次の設定を行います：

オリジンドメイン: S3バケットの静的ウェブサイトエンドポイントを選択します。<YOUR_BUCKET_NAME>.s3-website-<REGION>.amazonaws.com の形式です。
オリジンパス: 特に指定がない場合は空白のままにします。
ビヘイビア: 必要に応じてキャッシュポリシーやリダイレクトの設定を行います。
デフォルトキャッシュビヘイビア: 適切なキャッシュ設定を行います。例えば、Cache Based on Selected Request HeadersをNoneにすることを検討します。
ドメイン名の設定:

「Alternative Domain Names (CNAMEs)」に固有のドメイン名（例：www.example.com）を追加します。
「SSL Certificate」セクションで、Custom SSL Certificateを選択し、必要な証明書を指定します。証明書はAWS Certificate Manager (ACM)で取得します。
4. Route 53での設定
Route 53の設定:
AWS Management ConsoleでRoute 53サービスにアクセスします。

「ホストゾーン」を作成するか、既存のホストゾーンを選択します。

「レコードセットを作成」ボタンをクリックし、次の設定を行います：

レコードタイプ: A - IPv4 address
別名: Yes
別名ターゲット: CloudFrontディストリビューションのドメイン名（例：d1234567890abcdef.cloudfront.net）を指定します。

コンポーネントは遅延ローディングが良い
https://qiita.com/s-yoshi210/items/adf3e112e461371b738c


### ACM

AWS Certificate Manager (ACM) を使用してドメイン証明書を発行し、CloudFrontで使用する方法は以下の通りです。ここでは、ドメイン名 myblog-dev.com を例に説明します。

1. ACM での証明書リクエスト
AWS Management Console にログイン:

AWS Management Consoleにログインします。
ACM サービスに移動:

AWS Management Consoleで「Certificate Manager」を検索し、選択します。
証明書のリクエスト:

「証明書のリクエスト」ボタンをクリックします。
証明書のタイプを選択:

「パブリック証明書のリクエスト」を選択し、「次へ」をクリックします。
ドメイン名の入力:

「ドメイン名」フィールドに myblog-dev.com を入力します。
必要に応じてサブドメイン（例：www.myblog-dev.com）も追加できます。
「次へ」をクリックします。
検証方法の選択:

DNS 検証を選択するのが一般的です。これにより、ドメイン所有権の確認をDNSレコードで行います。
「次へ」をクリックします。
DNS レコードの設定:

ACMが提供するDNSレコードを確認し、ドメインのDNS設定に追加します。
DNS レコード:
CNAME レコードが提供されます。これをドメインのDNS設定に追加します。
Route 53 を使用する場合:
「Route 53に自動でDNSレコードを追加」のオプションが表示されることがあります。この場合は、Route 53のゾーンに自動的にレコードが追加されます。
証明書の確認:

DNSレコードが適切に設定され、ドメインの所有権が確認されると、ACMで証明書が発行されます。
証明書のステータスが「発行済み」になるまで待ちます。
2. CloudFront での証明書の設定
CloudFront ディストリビューションの作成/更新:

AWS Management Consoleで「CloudFront」にアクセスします。
「ディストリビューションの作成」を選択するか、既存のディストリビューションを選択して「設定の編集」をクリックします。
証明書の選択:

「SSL証明書」セクションで「カスタム SSL 証明書 (例: *.example.com)」を選択します。
ACMで発行した証明書を選択します。
ドメイン名の設定:

「代替ドメイン名 (CNAMEs)」セクションで、myblog-dev.com とサブドメイン（例：www.myblog-dev.com）を追加します。
変更を保存:

「ディストリビューションの設定を保存」ボタンをクリックして、CloudFrontの設定を保存します。
3. Route 53 でのDNS設定
Route 53 ホストゾーンの設定:

AWS Management Consoleで「Route 53」にアクセスします。
「ホストゾーン」から、myblog-dev.com のホストゾーンを選択します。
Aレコードの設定:

「レコードセットの作成」を選択します。
「レコードタイプ」として A - IPv4 address を選択します。
「別名」オプションを Yes に設定し、「別名ターゲット」にCloudFrontのドメイン名（例：d1234567890abcdef.cloudfront.net）を選択します。
レコードの作成:

設定を保存し、レコードセットを作成します。
まとめ
ACMで証明書をリクエストし、DNS検証を通じてドメインの所有権を確認します。
CloudFrontで証明書を設定し、ディストリビューションに証明書を適用します。
Route 53でDNS設定を行い、CloudFrontディストリビューションを指すAレコードを設定します。
これで、myblog-dev.com ドメインを使用して、HTTPS経由でCloudFrontを通じてS3のコンテンツにアクセスできるようになります。

⭐️⭐️⭐️⭐️⭐️
Amazon で ACM 証明書を使用するには CloudFront、米国東部 (バージニア北部) リージョンで証明書をリクエストまたはインポートする必要があります。 CloudFront ディストリビューションに関連付けられているこのリージョンの ACM 証明書は、そのディストリビューションに設定されたすべての地理的場所に配布されます。