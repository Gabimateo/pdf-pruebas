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
const emit = defineEmits(['loaded']);

onMounted(() => {
  pdfContainer.value = document.querySelector('.pdf-container'); 
  if (pdfContainer.value) {
    loadPSPDFKit().then((instance) => {
      emit("loaded", instance); }).catch(error => {
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

  PSPDFKit.unload(".pdf-container");
  return PSPDFKit.load({
    document: props.pdfFile, 
    container: pdfContainer.value,
  });
};
const addAnnotation = async () => {
  const instance = await PSPDFKit.load({
    document: pdfFile.value,
    container: '.pdf-container',
  });

  const annotationManager = instance.annotationManager;

  
  const annotation = new PSPDFKit.Annotations.FreeTextAnnotation({
    pageIndex: 0, 
    contents: "Texto de la anotación", 
    boundingBox: new PSPDFKit.Geometry.Rect({ 
      left: 100,
      top: 100,
      width: 200,
      height: 50
    }),
    fontSize: 12, 
    fontColor: new PSPDFKit.Color({ 
      rgb: [0, 0, 0] 
    }),
    backgroundColor: new PSPDFKit.Color({ 
      rgb: [255, 255, 255, 0.5] 
    })
  });

  annotationManager.addAnnotation(annotation);

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