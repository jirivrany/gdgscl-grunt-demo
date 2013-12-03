# GruntJS - příklad použití

Tento repozitář obsahuje příklad použití Grunt JS pro automatizaci rutinních činností, předvedený na 
setkání GDG SCL Liberec 5.12.

## Story
Bylo nebylo Ramesh Nair sepsal docela pěknou javascriptovou kalkulačku viz. http://calc.hiddentao.com/

Na desktopu funguje bezvadně, z mobilu už je to trochu slabší, takže jsem kód trochu přepsal a ovládání pomocí
myši a klávesnice předělal na touch události. Mimo jiné.

Když se mluví o mobilech, dodávme jedním dechem, že na velikosti záleží. Na rozdíl od displeje, chceme mít přenášený kód co nejmenší. Takže proč výsledný javascript trochu nezmenšit? A co je dneska na světě lepší pro zmenšování javascriptu, než [Google Closure compiler](https://developers.google.com/closure/compiler/?hl=cs) v advanced režimu. 

Closure compiler přebírá při spouštění řadu parametrů, navíc ho budu spouštět opakovně. To je úkol jak dělaný pro nějakého pomocníka. A tím je [GruntJS](http://gruntjs.com/ "Grunt JS"). 

## Začínáme 

Grunt běží nad nodeJS, stejně jako všechny jeho pluginy. Je tedy potřeba mít nainstalovaný node a pro Closure compiler také Javu. Dále je potřeba nainstalovat Grunt klienta, jako globální npm balíček příkazem:

```bash
npm install -g grunt-cli
```

Dále jsou potřeba dva konfigurační soubory. Package.json nám ohlídá závislosti projektu a Gruntfile.js je hlavním konfiguračním souborem pro jednotlivé úkoly, které bude grunt řešit. Package json vytvoříme v aktuálním adresáři příkazem:

```bash
npm init
```

Gruntfile.js může být prozatím prázdný, naplní ho jednotlivé úkoly. Nejprve ale potřebujeme samotný grunt task aby je měl kdo vykonávat. 

```bash
npm install grunt --save-dev
```

Volba --save-dev je velice užitečná - do konfiguračního souboru package.json nám zaregistruje závislot na gruntjs včetně verze. Takže se o to nemusíme starat. Konfigurační soubor bude vypadat nějak takhle: 

```json
{
  "name": "simplecalc",
  "version": "0.0.1",
  "description": "simple calculator and grunt demo",
  "author": "Jiri Vrany",
  "license": "MIT",
  "devDependencies": {
    "grunt": "~0.4.2"
  }
}
```
Stav projektu na začátku, včetně této konfigurace, najdete v [první commitu](https://github.com/jirivrany/gdgscl-grunt-demo/tree/cb973805a5ab2cc814d7be320a47c605a4d59f8b) do tohoto repozitáře. Commitoval jsem průběžně, takže v [historii repozitáře](https://github.com/jirivrany/gdgscl-grunt-demo/commits/master) můžete sledovat jak se jednotlivé konfigurační soubory v čase měnily. 
