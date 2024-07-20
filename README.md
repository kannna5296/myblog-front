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