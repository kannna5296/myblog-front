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

## GPT
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