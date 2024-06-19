<template>
  <div class="pdf-container"></div>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted, watch, onBeforeUnmount, defineProps, defineEmits } from 'vue';
import PSPDFKit from "pspdfkit";

const props = defineProps({
  pdfFile: {
    type: String,
    required: true,
  },
});

const pdfContainer = ref(null);
const { emit } = defineEmits(['loaded']); // Define el evento personalizado 'loaded'

onMounted(() => {
  pdfContainer.value = document.querySelector('.pdf-container'); // Actualiza la referencia al elemento

  // Espera a que el contenedor esté disponible
  if (pdfContainer.value) {
    loadPSPDFKit().then((instance) => {
      emit("loaded", instance); // Llama al evento 'loaded' con la instancia de PSPDFKit
    }).catch(error => {
      console.error('Error loading PSPDFKit:', error);
    });
  } else {
    console.error('PDF container element is not available');
  }
});

watch(() => props.pdfFile, (newValue, oldValue) => {
  if (newValue !== oldValue) {
    loadPSPDFKit();
  }
});

const loadPSPDFKit = async () => {
  if (!pdfContainer.value) {
    console.error('PDF container element is not available');
    return;
  }

  // Después de verificar que el contenedor esté disponible, carga PSPDFKit
  PSPDFKit.unload(".pdf-container");
  return PSPDFKit.load({
    document: props.pdfFile, // Utiliza la propiedad `document` para cargar el PDF
    container: pdfContainer.value,
  });
};
const addAnnotation = async () => {
  const instance = await PSPDFKit.load({
    document: pdfFile.value,
    container: '.pdf-container',
  });

  // Obtener el manager de anotaciones
  const annotationManager = instance.annotationManager;

  // Crear una nueva anotación de texto libre
  const annotation = new PSPDFKit.Annotations.FreeTextAnnotation({
    pageIndex: 0, // Página en la que deseas añadir la anotación (indexada desde 0)
    contents: "Texto de la anotación", // Contenido de la anotación
    boundingBox: new PSPDFKit.Geometry.Rect({ // Definir la posición y tamaño de la anotación
      left: 100,
      top: 100,
      width: 200,
      height: 50
    }),
    fontSize: 12, // Tamaño de la fuente
    fontColor: new PSPDFKit.Color({ // Color del texto
      rgb: [0, 0, 0] // Negro
    }),
    backgroundColor: new PSPDFKit.Color({ // Color de fondo de la anotación
      rgb: [255, 255, 255, 0.5] // Blanco con transparencia al 50%
    })
  });

  // Añadir la anotación al documento
  annotationManager.addAnnotation(annotation);

  // Guardar los cambios (opcional, dependiendo de tu flujo de trabajo)
  await instance.saveAnnotations();
};


onBeforeUnmount(() => {
  PSPDFKit.unload(".pdf-container");
});
</script>

<style scoped>
.pdf-container {
  height: 100vh;
}
</style>