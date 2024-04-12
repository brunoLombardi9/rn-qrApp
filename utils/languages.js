const languages = [
  {
    name: "spanish",
    routes: [
      {
        title: "Escaner",
        texts: {
          alertTitle: "Código escaneado",
          alertContent: "Contenido:",
          cancelBtn: "Cancelar",
          copyBtn: "Copiar",
          openBtn: "Abrir",
          errorMessage: "No se pudo decodificar un código QR desde la imagen.",
          permissionsDenied:
            "No se encontró permiso para usar la cámara. Por favor, autorize la aplicacion para usar la cámara.",
        },
      },
      {
        title: "Generador",
        texts: {
          downloadBtn: "Descargar",
          shareBtn: "Compartir",
          newQrBtn: "Nuevo QR",
          generateQrBtn: "Generar QR",
          inputPlaceholder: "https://www.misitio.com",
          generateErrorMessage: "Debe ingresar al menos 1 caracter.",
          shareErrorMessage:
            "Hubo un problema al intentar guardar la imagen del código QR.",
          downloadAlertTitle: "Descarga completada",
          downloadAlertContent:
            "La imagen del código QR se ha descargado correctamente.",
          downloadAlertErrorMessage:
            "Hubo un problema al intentar descargar la imagen del código QR.",
          permissionsDenied:
            "No se encontró permiso para usar el almacenamiento. Por favor, autorize la aplicación para usar el almacenamiento.",
        },
      },
      {
        title: "Historial",
        texts: {
          deleteAllAlertTitle: "Esto borrará todo el contenido hasta ahora",
          deleteAllAlertContent: "¿Desea continuar?",
          cancelBtn: "Cancelar",
          deleteAllBtn: "Borrar todo",
          deleteIndividualAlert: "¿Seguro quiere eliminar la siguiente URL? :",
          deleteIndividualAlertBtn: "Borrar",
          noResultText: "No se encontraron resultados",
        },
      },
      {
        title: "Config",
        texts: {
          languageTitle: "Idioma",
          qrOptions: "Opciones de Qr",
          saveOnScannedText: "Guardar cuando se escanea QR",
          saveOnGenerateText: "Guardar cuando se genera QR",
          openOnScannedText: "Abrir cuando se escanea QR",
          themeTitle: "Tema",
        },
      },
    ],
  },
  {
    name: "english",
    routes: [
      {
        title: "Scanner",
        texts: {
          alertTitle: "Code Scanned",
          alertContent: "Content:",
          cancelBtn: "Cancel",
          copyBtn: "Copy",
          openBtn: "Open",
          errorMessage: "Could not decode a QR code from the image.",
          permissionsDenied:
            "Permission to use the camera was not found. Please authorize the application to use the camera.",
        },
      },
      {
        title: "Generator",
        texts: {
          downloadBtn: "Download",
          shareBtn: "Share",
          newQrBtn: "New QR",
          generateQrBtn: "Generate QR",
          inputPlaceholder: "https://www.mysite.com",
          generateErrorMessage: "You must enter at least 1 character.",
          shareErrorMessage:
            "There was a problem trying to save the QR code image.",
          downloadAlertTitle: "Download completed",
          downloadAlertContent:
            "The QR code image has been downloaded successfully.",
          downloadAlertErrorMessage:
            "There was a problem trying to download the QR code image.",
          permissionsDenied:
            "Permission to use the storage was not found. Please authorize the application to use the storage.",
        },
      },
      {
        title: "History",
        texts: {
          deleteAllAlertTitle: "This will delete all content so far",
          deleteAllAlertContent: "Do you want to continue?",
          cancelBtn: "Cancel",
          deleteAllBtn: "Delete all",
          deleteIndividualAlert:
            "Are you sure you want to delete the following URL? :",
          deleteIndividualAlertBtn: "Delete",
          noResultText: "No results found",
        },
      },
      {
        title: "Config",
        texts: {
          languageTitle: "Language",
          qrOptions: "Qr options",
          saveOnScannedText: "Save when QR is scanned",
          saveOnGenerateText: "Save when QR is generated",
          openOnScannedText: "Open when QR is scanned",
          themeTitle: "Theme",
        },
      },
    ],
  },
];

export default languages;
