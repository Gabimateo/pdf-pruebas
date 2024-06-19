<template>
  <div>
    <div id="viewer" ref="viewer"></div>
    <div id="controls">
      <input type="file" @change="loadDocument">
      <input type="text" v-model="text" placeholder="Add text">
      <button @click="addText">Add Text</button>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable */
import { ref, onMounted } from 'vue'
import WebViewer from '@pdftron/webviewer'

const viewer = ref(null)
const text = ref('')
let viewerInstance = null

onMounted(() => {
  console.log('Viewer ref on mount:', viewer.value); // Verifica que el ref esté asignado correctamente

  WebViewer({
    path: '/public/webviewer', // Asegúrate de que la ruta es correcta
    fullAPI: true
  }, viewer.value).then(instance => {
    console.log('WebViewer initialized');

    if (instance) {
      console.log('WebViewer instance initialized:', instance); // Verifica que la instancia se inicializa correctamente
      viewerInstance = instance;

      const { Core, UI } = instance;
      const { documentViewer, annotationManager, Annotations, Tools } = Core;

      // Ejemplo: Ajustar el tema de UI
      UI.setTheme('dark');
    } else {
      console.error('WebViewer instance is null');
    }
  }).catch(error => {
    console.error('Error initializing WebViewer:', error);
  });
});

const loadDocument = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      const arrayBuffer = e.target.result
      if (viewerInstance) {
        viewerInstance.loadDocument(arrayBuffer)
      } else {
        console.error('WebViewer instance is not initialized')
      }
    }
    reader.readAsArrayBuffer(file)
  }
}

const addText = () => {
  if (viewerInstance) {
    const { Annotations, annotationManager } = viewerInstance.Core
    if (text.value) {
      const annotation = new Annotations.FreeTextAnnotation()
      annotation.PageNumber = 1
      annotation.X = 100
      annotation.Y = 150
      annotation.Width = 200
      annotation.Height = 50
      annotation.setPadding(new Annotations.Rect(0, 0, 0, 0))
      annotation.setContents(text.value)
      annotation.FontSize = '20px'
      annotation.TextColor = new Annotations.Color(0, 0, 0)
      annotation.StrokeColor = new Annotations.Color(0, 0, 0)
      annotation.FillColor = new Annotations.Color(255, 255, 255, 0.5)
      annotationManager.addAnnotation(annotation)
      annotationManager.redrawAnnotation(annotation)
    }
  } else {
    console.error('WebViewer instance is not initialized')
  }
}
</script>

<style scoped>
#viewer {
  width: 100%;
  height: 90vh;
}
#controls {
  margin: 20px;
}
</style>
