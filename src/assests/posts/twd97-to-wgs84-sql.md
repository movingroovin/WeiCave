---
title: '[SQL] TWD97 轉 WGS84 SQL Server Table-Valued Function'
date: '2021/09/14'
tags: ['Technical', 'SQL']
---

## 緣由
其實常常會碰到資料庫中，座標資料存的是TWD97 XY資料，但是實際在web GIS應用時需要WGS84經緯度格式的狀況。  
解法其實也不難，通常可以在前/後端將算式包裝成function轉換即可(如Reference 1)。  
不過這次遇到的狀況比較特別，專案使用TABLEAU展示地理資訊，使用內建的MAKEPOINT([X TWD97],[Y TWD97],3826)在有一定資料量的時候速度就會明顯變慢，於是決定直接在SQL Server中轉換。

### 建立SQL資料表函式，轉換TWD97成WGS84
```sql
CREATE FUNCTION [dbo].[TWD97toWGS84] 
( 
  @x float, @y float 
) 
RETURNS  
@tblReturn TABLE (lon float, lat float)  

AS 
BEGIN 
  DECLARE @a float, @b float, @lon0 float, @k0 float, @dx int, @dy float, @e float 
  SELECT 
  @a = 6378137.0,  
  @b = 6356752.314245, 
  @lon0 = 121 * PI() / 180, 
  @k0 = 0.9999, 
  @dx = 250000, 
  @dy = 0, 
  @e = POWER((1- POWER(@b,2)/POWER(@a,2)), 0.5) 

  SELECT 
  @x = @x - @dx,  
  @y = @y - @dy 
 
  DECLARE @M float 
  SET @M = @y/@k0 
 
  DECLARE @mu float, @e1 float, @J1 float, @J2 float, @J3 float, @J4 float, @fp float 
  SELECT  
  @mu = @M/(@a*(1.0 - POWER(@e, 2)/4.0 - 3*POWER(@e, 4)/64.0 - 5*POWER(@e, 6)/256.0)), 
  @e1 = (1.0 - POWER((1.0 - POWER(@e, 2)), 0.5)) / (1.0 + POWER((1.0 - POWER(@e, 2)), 0.5)), 
  @J1 = (3*@e1/2 - 27*POWER(@e1, 3)/32.0), 
  @J2 = (21*POWER(@e1, 2)/16 - 55*POWER(@e1, 4)/32.0), 
  @J3 = (151*POWER(@e1, 3)/96.0), 
  @J4 = (1097*POWER(@e1, 4)/512.0), 
  @fp = @mu + @J1*SIN(2*@mu) + @J2*SIN(4*@mu) + @J3*SIN(6*@mu) + @J4*SIN(8*@mu) 
 
  DECLARE  @e2 float, @C1 float, @T1 float, @R1 float, @N1 float, @D float 
  SELECT 
  @e2 = POWER((@e*@a/@b), 2), 
  @C1 = POWER(@e2*COS(@fp), 2), 
  @T1 = POWER(TAN(@fp), 2), 
  @R1 = @a*(1-POWER(@e, 2))/POWER((1-POWER(@e, 2)*POWER(SIN(@fp), 2)), (3.0/2.0)), 
  @N1 = @a/POWER((1-POWER(@e, 2)*POWER(SIN(@fp), 2)), 0.5), 
  @D = @x/(@N1*@k0) 
 
  DECLARE  @Q1 float, @Q2 float, @Q3 float, @Q4 float, @lat float 
  SELECT 
  @Q1 = @N1*TAN(@fp)/@R1, 
  @Q2 = (POWER(@D, 2)/2.0), 
  @Q3 = (5 + 3*@T1 + 10*@C1 - 4*POWER(@C1, 2) - 9*@e2)*POWER(@D, 4)/24.0, 
  @Q4 = (61 + 90*@T1 + 298*@C1 + 45*POWER(@T1, 2) - 3*POWER(@C1, 2) - 252*@e2)*POWER(@D, 6)/720.0, 
  @lat = @fp - @Q1*(@Q2 - @Q3 + @Q4) 
 
  DECLARE @Q5 float, @Q6 float, @Q7 float, @lon float 
  SELECT 
  @Q5 = @D, 
  @Q6 = (1 + 2*@T1 + @C1)*POWER(@D, 3)/6, 
  @Q7 = (5 - 2*@C1 + 28*@T1 - 3*POWER(@C1, 2) + 8*@e2 + 24*POWER(@T1, 2))*POWER(@D, 5)/120.0, 
  @lon = @lon0 + (@Q5 - @Q6 + @Q7)/COS(@fp) 
 
  SET @lat = (@lat * 180) / PI(); --緯度 
  SET @lon = (@lon * 180) / PI(); --經度 
 
  INSERT @tblReturn 
  SELECT @lon, @lat 
  RETURN 
END 
GO 
```


Reference:
1. [ola的家 - TWD97轉經緯度WGS84 經緯度WGS84轉TWD97](http://wangshifuola.blogspot.com/2010/08/twd97wgs84-wgs84twd97.html)
2. [2019 iT 邦幫忙鐵人賽 - Tableau:建立地圖視圖Demo](https://ithelp.ithome.com.tw/articles/10204903)