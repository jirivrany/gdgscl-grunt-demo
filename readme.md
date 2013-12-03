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
Stav projektu na začátku, včetně této konfigurace, najdete v [prvním commitu](https://github.com/jirivrany/gdgscl-grunt-demo/tree/cb973805a5ab2cc814d7be320a47c605a4d59f8b) do tohoto repozitáře. Commitoval jsem průběžně, takže v [historii repozitáře](https://github.com/jirivrany/gdgscl-grunt-demo/commits/master) můžete sledovat jak se jednotlivé konfigurační soubory v čase měnily. 

## Nastupuje compiler
[Closure compiler task](https://github.com/gmarty/grunt-closure-compiler) pro grunt se instaluje stejně jako všechny ostatní pomocí npm. Closure compiler je potřeba si stáhnout samostatně. V konfiguračním souboru gruntfile.js pak musíme nastavit správnou cestu ke kompilátoru - closurePath. Celý konfigurační soubor s jedním úkolem pro grunta, vypadá takhle: 

```javascript
module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-closure-compiler');
    
    grunt.initConfig({
        'closure-compiler': {
            frontend: {
                closurePath: 'tools/closure',
                js: 'app/calc.js',
                jsOutputFile: 'dist/calc.js',
                maxBuffer: 500,
                options: {
                    compilation_level: 'ADVANCED_OPTIMIZATIONS',
                    language_in: 'ECMASCRIPT5_STRICT'
                }
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', [
      'closure-compiler',
      ]);
};
```
Grunt pracuje jako NodeJS modul, a celá konfigurace je uzavřena do funkce. Základní konfigurační direktivy jsou loadNpmTask - pro načtení úlohy, initConfig - pro konfigurace a registeTask, pro vytváření komplexnějších úloh složených z několika úkolů. Načítání npm lze automatizovat za pomocí package.json, ale pro začátek je to takto přehlednější. Konfigurace je hotová, takže můžeme překládat. Pokud je soubor calc.js v adresáři app správně anotovaný a přeložitelný, objeví se nám výsledek v adresáři dist. Ale až po té, co pustíme grunt. Protože máme registrovaný výchozí task - default, stačí k tomu jen příkaz:

```bash
grunt
```

Můžeme ale pustit i konkrétní úlohu, v tomto případě tedy closure-compiler protož víc jich zatím nemáme:

```bash
grunt closure-compiler
```

A to je celé. Od této chvíle se zase už zase můžu vesele vrtat ve zdrojáku a nechat closure compiler aby mě hlídal. A nebo můžu použít grunt k tomu, abych měl té automatiky ještě trochu více. 

## Další úlohy

Grunt toho umí opravdu hodně. [Pluginů](http://gruntjs.com/plugins/) pro jednotlivé úlohy bude už více než 100. Jen od samotných vývojářů Grunta - tzv. contrib pluginů - je jich 30. Pro daný úkol - tedy mobilní verzi existujícího skriptu se nabízí použít ještě:

* [grunt-contrib-cssmin](https://github.com/gruntjs/grunt-contrib-cssmin) pro minikaci css
* [grunt-contrib-htmlmin](https://github.com/gruntjs/grunt-contrib-htmlmin) pro minifikaci html
* [grunt-contrib-watch](https://github.com/gruntjs/grunt-contrib-watch) pro opakované spouštění úloh, pokud se změní nějaký hlídaný soubor
* [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint)  pro statickou kontrolu javascriptu

Všechny pluginy je vhodné instalovat s přepínačem --save-dev. Všechny použité mají výbornou dokumentaci a jejich použití je vidět i z finálního konfiguračního souboru v tomto repozitáři. 

Jedním z dalších plusů celého řešení je, že pokud si uděláte klon tohoto repozitáře, stačí v adresáři napsat jen: 


```bash
npm install
```

Grunt a všechny další pluginy se nainstalují tak, jak jim to určil konfigurační soubor. Stačí tedy jen přirad Closure compiler a vše je připraveno k práci - na jiném počítači, u kolegy v týmu a tak dále. 

Grunt je výborný nástroj, který vás odstíní od nudné a rutinní činnosti a umožní vám se soustředit na to, co je na vývoji aplikací zábavné - tedy samotné programování. 

