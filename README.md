> Api(BackEnd / NodeJs) ve file-upload-app (Frontend / React) klasörlerinden oluşmaktadır.
> Her iki uygulamada npm start ile çalışmaktadır.
> Api klasörü altında bulunan config.js ile işlemler için gerekli olan konfigrasyon verileri girilebilmektedir.


Input_file ve Output_file klasörlerini anlık olarak dinleyen 2 proses bulunmaktadır, input_file icerisine girisi yapilan videolar konfigrasyon icerisindeki islem sayisina ulastiginda, her video parçalanmakta ve ziplenmektedir.

İslem sayisi kada video input_file icerisinden okunur ve okunan bu videolar icin ayri ayri thread isleme alinir. Her thread kendi verisini bolerek Output_file altina kaydeder. Output_file klasorunu dinleyen proses kendisine gelen 5 ayni turdeki veriyi birlestirerek ziplenmektedir.