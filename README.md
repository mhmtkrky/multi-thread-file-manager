> Api(BackEnd / NodeJs) ve file-upload-app (Frontend / React) klasörlerinden oluşmaktadır.
> Her iki uygulamada npm start ile çalışmaktadır.
> Api klasörü altında bulunan config.js ile işlemler için gerekli olan konfigrasyon verileri girilebilmektedir.


> Input_file ve Output_file klasörlerini anlık olarak dinleyen 2 proses bulunmaktadır, input_file icerisine girisi yapilan videolar konfigrasyon icerisindeki islem sayisina ulaştiginda, her video parçalanmakta ve ziplenmektedir.


> İslem sayisi kadar video input_file icerisinden okunur ve okunan bu videolar icin ayri ayri thread isleme alinir. İşleme alınan her dosya için, maximum işlem sayısı kadar thread oluşturulur ve bu threadler buffer size kadar dosyaları parçalar ve Output_file içerisine kaydededer.

>  Output_file klasorunu dinleyen başka bir proses ise kendisine gelen 5 ayni türdeki veriyi birlestirerek ve ilgili dosyaların ziplenmesi için yeni bir thread oluşturur. 

> Bu sayede tüm veriler kendi içinde bölünmekte, diğerleriyle çakışmamaktatır.