---
layout: posts
date: '2020-01-24 18:03 +0100'
image: /media//GooglePlay.jpg
disqus: true
published: true
title: Como subir aplicaciones Android a Play Store
description: >-
  Todo lo que necesitas saber sobre firmar las aplicaciones y las
  configuraciones necesarias para hacerla funcionar con Firebase y los distintos
  métodos de login.
tags:
  - android
---
Has desarrollado una app, ya la has probado bien en el emulador o quizás en tu móvil conectándolo por cable a tu ordenador y todo funciona perfecto. Ahora viene el siguiente paso, **publicarla en la Play Store!!**

Puede que ya hayas mirado algo sobre el tema y no te aclares bien o incluso que hayas probado a subirla y que al descargarla veas que no funciona el login o la conexión con Firebase.

Tranquilo, aquí te explicare **todo lo que necesitas saber paso a paso**.

## Crear una cuenta de Play Console

Para subir aplicaciones a la _Play Store_ necesitas tener una **cuenta de desarrollador**, esto cuesta **25 $** y es para toda la vida.

Para ello dirígete a este link [(Play Console)](https://developer.android.com/distribute) y haz click en _Abrir Play Console_. Logueate con tu cuenta de Google, acepta los acuerdos, paga la cuota y rellena la información de la cuenta.

Una vez completado todo, pasas a la consola donde puedes gestionar todas las aplicaciones. Para crear una nueva tan solo debes pulsar en **Crear una aplicación**, elige el idioma predeterminado y el nombre.

## Rellenar ficha de la aplicación

El siguiente paso es rellenar la ficha, esta información será la que se mostrara en _Play Store_.

![]({{site.baseurl}}/media/Firmar1.jpg)

Una cosa importante son las **imágenes necesarias**, las mínimas requeridas son:

- El logo (512x512 pixeles, PNG de 32 bits)
- 2 capturas de pantalla (lo mejor es sacarlas en tu móvil o en el emulador)
- Imagen destacada (1024x500 pixeles, JPG o PNG de 24 bits (no alfa))

Debes guardar la ficha como **borrador** ya que para completarla necesitas tener la clasificación de contenido y esta no se puede hacer hasta no subir la aplicación.

Otros apartados que tienes que rellenar son **Contenido de la aplicación** y **Precio y distribución** en el menú lateral derecho.

## Elegir el método para firmar nuestra aplicación

Aquí es donde se empieza a complicar, Android exige que todas las aplicaciones se firmen digitalmente con un certificado para poder instalarse.

Si ya estas usando alguno de los logins de Google con Firebase puede que algo de esto te suene ya que habrás tenido que generar una clave SHA-1 del certificado e introducirla en la consola de Firebase, pero seguramente lo habrás generado sobre el certificado de la versión Debug.

Ahora debes decidir cómo se firmara tu aplicación, el tipo de archivo que subirás y quien gestionara los archivos de los certificados.

### App Bundle o APK

Esta es la primera elección, es el **tipo de archivo** que exportara Android Studio, has de saber que un archivo **APK** se podría pasar al móvil y al abrirlo se instalaría la aplicación sin necesidad de entrar Play Store. Esto es útil para pasar la app a algún amigo o probarla en más terminales sin tener que subirla.

Un archivo **App Bundle** en cambio no se puede instalar en un móvil, ya que es Google quien, con él, finalmente genera el APK que te descargas. Este método tiene varias ventajas, las más importantes para nosotros son:

- La app ocupara menos espacio para el usuario final.
- Simplifican la gestión de las compilaciones y las versiones al eliminar la necesidad de crear y publicar varios APK.

Esta opción ultima, **App Bundle** es la **recomendada** y más **sencilla**.

### ¿Quién firma la aplicación final?

Si subes un archivo **APK** la aplicación ira firmada por ti y tu serás responsable de controlar el archivo del certificado.

En el caso del **App Bundle** puedes elegir. Por defecto tu subes un App Bundle firmado, esa firma se convierte en la **firma de subida** y para subir una **actualización** debes firmar con el mismo certificado, pero Google al crear el APK final la firma con otro certificado que gestiona el.

Esa es la opción **recomendada**, sin embargo también existe la opción de subir un certificado para que se firme con este.

En el apartado **Firma de aplicaciones** del lateral derecho de Play Console es donde debes elegir quien gestionara el certificado de firma del App Bundle. Elige tu método y dale a seguir.

![]({{site.baseurl}}/media/Firmar2.jpg)

Aquí ya tienes el **SHA-1** necesario para Firebase.

![]({{site.baseurl}}/media/Firmar3.jpg)

## Generar el archivo

Por fin vamos a generar el archivo en **Android Studio**, para ello usa el menú _Build > Generate Signed Bundle or APK_.

Elige entre _App Bundle_ o _APK_.

![]({{site.baseurl}}/media/Firmar4.jpg)

Como es la primera vez, debes generar el certificado, dale a _Create New_.

![]({{site.baseurl}}/media/Firmar5.jpg)

Escoge la **ubicación del archivo** (es importante no perderlo), así como una **contraseña** para dicho certificado. Cada certificado puede contener distintas claves, así que deberás también crear una **clave** con el nombre que quieras (el nombre predeterminado es key0) y otra **contraseña**. También deber rellenar al menos **tu nombre** en el certificado.

Finalmente, selecciona la rama a compilar y donde se guardará el archivo.

Una vez tengas el archivo, dirigete a **Play Console**, en el apartado de **Versiones de la aplicación** debes seleccionar la de **Producion** y darle a _Gestionar_ y después _Crear Versión_.

Aquí es donde puedes **subir el archivo** generado, también darle un nombre a la versión y escribir las novedades si es una actualización.

Una vez todo completado ya puedes rellenar la **Clasificación de contenido** y **Acabar la Ficha** para mandar la aplicación a revisión.

Este proceso tarda unos 4 días, y después ya estará disponible en la Play Store.

## SHA-1 y Hashes para los logins

Para que el login con otros proveedores funcione es necesario vincular estos con el certificado final de la aplicación.

Firebase solicita un SHA-1 en la **Configuración del Proyecto**, lo mejor es tener tanto el de la versión Debug para nuestras pruebas como el final.

![]({{site.baseurl}}/media/Firmar6.jpg)

El final ya lo vimos si lo hacíamos generando un App Bundle, y puedes verlo siempre en **Play Console** en el apartado de **Firma de aplicaciones**.

Para el debug podemos usar la herramienta **singningReport**.

![]({{site.baseurl}}/media/Firmar7.png)

Para el **login con Facebook** necesitamos el Hash del certificado. Si somos nosotros quienes administramos el certificado final podemos seguir los pasos de la [Documentación de Facebook](https://developers.facebook.com/docs/android/getting-started?locale=es_ES), pero si hemos elegido que lo gestione Google no podremos hacer esto.

Yo he encontrado una manera más fácil, simplemente intentar loguearte con Facebook y te saltara un **error** como este.

![Firmar8.jpg]({{site.baseurl}}/media/Firmar8.jpg)

Basta con copiar los **28 caracteres** de las key hash en la **consola de desarrollador de Facebook**.
