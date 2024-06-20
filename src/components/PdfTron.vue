<template>
  <div>
    <div id="webviewer" ref="viewer"></div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted, watch } from 'vue'
import WebViewer from '@pdftron/webviewer'

const viewer = ref(null)
const text = ref('')
const path = `${process.env.BASE_URL}webviewer`

const props = defineProps({
  pdfFile: {
    type: String,
    required: true,
  },
});

onMounted(() => {
  WebViewer({
    path,
    fullAPI: true,
    initialDoc: props.pdfFile
  }, viewer.value).then(function(instance) {
    debugger
    const { UI, Core } = instance;
    const { documentViewer, annotationManager, Tools, Annotations } = Core;

    documentViewer.addEventListener('documentLoaded', () => {
      const freeHandAnnotation = new Annotations.FreeHandAnnotation();
      freeHandAnnotation.PageNumber = 1;
      freeHandAnnotation.X = 100;
      freeHandAnnotation.Y = 150;
      freeHandAnnotation.Width = 200;
      freeHandAnnotation.Height = 50;
      freeHandAnnotation.StrokeThickness = 1;
      freeHandAnnotation.StrokeColor = new Annotations.Color(255, 0, 0);
      annotationManager.addAnnotation(freeHandAnnotation);
      annotationManager.redrawAnnotation(freeHandAnnotation);
    });

    instance.UI.loadDocument(props.pdfFile,{
      documentId: '1',
      filename: 'proyecto-1.pdf'
    })
    viewer.value.instance = instance;
  });
  return viewer
})

watch(() => props.pdfFile, (newValue) => {
  if (viewer.value && viewer.value.instance) {
    viewer.value.instance.UI.loadDocument(newValue, {
      documentId: '1',
      filename: newValue.split('/').pop()
    });
  }
});
</script>

<style scoped>
#webviewer {
  width: 100%;
  height: 90vh;
}

#controls {
  margin: 20px;
}
</style>
