

## About:

center for sivagao, learning crawler, aggregation, api server, chart/vis related project

## Todo:

- 统计些数据： category 流行度， actor 拍片数，哪个系列拍的多，actor 人数分布（最多演员的片）， 有magnet link 多少，等 - 通用的 dashboard/chart home 方案
- 加入 sync/update 的策略（哪些 url 爬过，list 门类页的爬取策略）等
- 更详细/结构化信息的整理（演员，大门类，排名，上线时间等）
- API层加入（rate rating, projection, authentication etc）


## Statistic:

```
allItems = [i for i in db.jp_av.items.find()]
allActorCounter = Counter(sum([i['actor'] for i in allItems], []))
# most_common(10)
風間ゆみ:482
波多野結衣:429
つぼみ:408
さとう遥希:372
川上ゆう:362
結城みさ:354
大槻ひびき:342
吉沢明歩:306
羽月希:287
有村千佳:285

db.jp_av.items.find({downloadurl: {$exists: true}}).skip(0).limit(30)
18k 左右

Counter([i['slug'].split('-')[0] for i in allItems])
[(u'SOE', 687),
 (u'JUC', 619),
 (u'SAMA', 597),
 (u'DV', 572),
 (u'MDYD', 560),
 (u'MIDD', 554),
 (u'IPTD', 540),
 (u'MXGS', 529),
 (u'SPRD', 513),
 (u'RBD', 511),
 (u'DVDES', 482),
 (u'STAR', 453),
 (u'NHDTA', 453),
 (u'XV', 452),
 (u'SDMT', 448),
 (u'PGD', 443),
 (u'IPZ', 438),
 (u'RCT', 390),
 (u'JUX', 390),
 (u'MIGD', 363)]
```
