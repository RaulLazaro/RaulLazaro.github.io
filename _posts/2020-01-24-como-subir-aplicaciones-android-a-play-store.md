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
  - Android
---
Has desarrollado una app, ya la has probado bien en el emulador o quizas en tu movil conectandolo por cable a tu ordenador y todo funciona perfecto. Ahora viene el siguiente paso, **publicarla en la Play Store!!**

Puede que ya hayas mirado algo sobre el tema y no te aclares bien o incluso que hayas probado a subirla y que al descargarla veas que no funciona el login o la conexion con Firebase.

Tranquilo, aqui te explicare **todo lo que necesitas saber paso a paso**.

## Crear una cuenta de Play Console

Para subir aplicaciones a la _Play Store_ necesitas tener una **cuenta de desarrollador**, esto cuesta **25 $** y es para toda la vida.

Para ello dirigete a este link [(Play Console)](https://developer.android.com/distribute) y haz click en _Abrir Play Console_. Logueate con tu cuenta de Google, acepta los acuerdos, paga la cuota y rellena la información de la cuenta.

Una vez completado todo pasas a la consola donde puedes gestionar todas las aplicaciones. Para crear una nueva tan solo debes pulsar en **Crear una aplicacion**, elige el idioma predeterminado y el nombre.

## Rellenar ficha de la aplicación

El siguiente paso es rellenar la ficha, esta informacion sera la que se mostrara en _Play Store_.

![]({{site.baseurl}}/media/Firmar1.jpg)

Una cosa importante son las **imagenes necesarias**, las minimas requeridas son:

- El logo (512x512 pixeles, PNG de 32 bits)
- 2 capturas de pantalla (lo mejor es sacarlas en tu movil o en el emulador)
- Imagen destacada (1024x500 pixeles, JPG o PNG de 24 bits (no alfa))

Debes guardar la ficha como **borrador** ya que para completarla necesitas tener la clasificación de contenido y esta no se puede hacer hasta no subir la aplicación.

Otros apartados que tienes que rellenar son **Contenido de la aplicación** y **Precio y distribución** en el menu lateral derecho.

## Elegir el metodo para firmar nuestra aplicación

Aqui es donde se empieza a complicar, Android exige que todas las aplicaciones se firmen digitalmente con un certificado para poder instalarse.

Si ya estas usando alguno de los logins de Google con Firebase puede que algo de esto te suene ya que habras tenido que generar una clave SHA-1 del certificado e introducirla en la consola de Firebase, pero seguramente lo habras generado sobre el certificado de la version Debug.

Ahora debes decidir como se firmara tu aplicacion, el tipo de archivo que subiras y quien gestionara los archivos de los certificados.

### App Bundle o APK

Esta es la primera eleccion, es el **tipo de archivo** que exportara Android Studio, has de saber que un archivo **APK** se podria pasar al movil y al abrirlo se instalaria la aplicacion sin necesidad de entrar Play Store. Esto es util para pasar la app a algun amigo o probarla en mas terminales sin tener que subirla.

Un archivo **App Bundle** en cambio no se puede instalar en un movil, ya que es google quien, con el, finalmente genera el APK que te descargas. Este metodo tiene varias ventajas, las mas importantes para nosotros son:

- La app ocupara menos espacio para el usuario final.
- Simplifican la gestión de las compilaciones y las versiones al eliminar la necesidad de crear y publicar varios APK.

Esta opcion ultima, **App Bundle** es la **recomendada** y mas **sencilla**.

### ¿Quien firma la applicacion final?

Si subes un archivo **APK** la aplicacion ira firmada por ti y tu seras responsable de controlar el archivo del certificado.

En el caso del **App Bundle** puedes elegir. Por defecto tu subes un App Bundle firmado, esa firma se convierte en la **firma de subida** y para subir una **actualizacion** debes firmar con el mismo certificado, pero Google al crear el APK final la firma con otro certificado que gestiona el.

Esa es la opcion **recomendada**, sin embargo tambien existe la opcion de subir un certificado para que se firme con este.

En el apartado **Firma de aplicaciones** del lateral derecho de Play Console es donde debes elegir quien gestionara el certificado de firma del App Bundle. Elige tu metodo y dale a seguir.

![]({{site.baseurl}}/media/Firmar2.jpg)

Aqui ya tienes el **SHA-1** necesario para Firebase.

![]({{site.baseurl}}/media/Firmar3.jpg)

## Generar el archivo

Por fin vamos a generar el archivo en **Android Studio**, para ello usa el menú _Build > Generate Signed Bundle or APK_.

Elige entre _App Bundle_ o _APK_.

![]({{site.baseurl}}/media/Firmar4.jpg)

Como es la primera vez, debes generar el certificado, dale a _Create New_.

![]({{site.baseurl}}/media/Firmar5.jpg)

Escoge la **ubicación del archivo** (es importante no perderlo), así como una **contraseña** para dicho certificado. Cada certificado puede contener distintas claves, así que deberás también crear una **clave** con el nombre que quieras (el nombre predeterminado es key0) y otra **contraseña**. Tambien deber rellenar al menos **tu nombre** en el certificado.

Finalmente seleciona la rama a compilar y donde se guardara el archivo.

Una vez tengas el archivo, dirigete a **Play Console**, en el apartado de **Versiones de la aplicación** debes selecionar la de **Producion** y darle a _Gestionar_ y despues _Crear Versión_.

Aqui es donde puedes **subir el archivo** generado, tambien darle un nombre a la version y escribir las novedades si es una actualización.

Una vez todo completado ya puedes rellenar la **Clasificación de contenido** y **Acabar la Ficha** para mandar la aplicacion a revisión.

Este proceso tarda unos 4 dias, y despues ya estara disponible en la Play Store.

## SHA-1 y Hashes para los logins

Para que el login con otros proveedores funcione es necesario vincular estos con el certificado final de la aplicación.

Firebase solicita un SHA-1 en la **Configuración del Proyecto**, lo mejor es tener tanto el de la version Debug para nuestras pruebas como el final.

![]({{site.baseurl}}/media/Firmar6.jpg)

El final ya lo vimos si lo haciamos generando un App Bundle, y puedes verlo siempre en **Play Console** en el apartado de **Firma de aplicaciones**.

Para el debug podemos usar la herramienta **singningReport**.

![]({{site.baseurl}}/media/Firmar7.png)

Para el **login con Facebook** necesitamos el Hash del certificado. Si somos nosotros quienes administramos el certificado final podemos seguir los pasos de la [Documentación de Facebook](https://developers.facebook.com/docs/android/getting-started?locale=es_ES), pero si hemos elegido que lo gestione Google no podremos hacer esto.

Yo he encontrado una manera mas facil, simplemente intentar loguearte con facebook y te saltara un **error** como este.

![Firmar8.jpg]({{site.baseurl}}/media/Firmar8.jpg)

Basta con copiar los **28 caracteres** de las key hash en la **consola de desarrollador de Facebook**.





