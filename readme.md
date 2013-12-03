GruntJS - příklad použití
==========================
Tento repozitář obsahuje příklad použití Grunt JS pro automatizaci rutinních činností, předvedený na 
setkání GDG SCL Liberec 5.12.

Story
=====
Bylo nebylo Ramesh Nair sepsal docela pěknou javascriptovou kalkulačku viz. http://calc.hiddentao.com/

Na desktopu funguje bezvadně, z mobilu už je to trochu slabší, takže jsem kód trochu přepsal a ovládání pomocí
myši a klávesnice předělal na touch události. Mimo jiné.

Když se mluví o mobilech, dodávme jedním dechem, že na velikosti záleží. Na rozdíl od displeje, chceme mít přenášený kód co nejmenší. Takže proč výsledný javascript trochu nezmenšit? A co je dneska na světě lepší pro zmenšování javascriptu, než [Google Closure compiler](https://developers.google.com/closure/compiler/?hl=cs) v advanced režimu. 

Closure compiler přebírá při spouštění řadu parametrů, navíc ho budu spouštět opakovně. To je úkol jak dělaný pro nějakého pomocníka. A tím je [GruntJS](http://gruntjs.com/ "Grunt JS"). 

Začínáme
========
