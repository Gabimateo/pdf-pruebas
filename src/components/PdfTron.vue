<template>
  <div>
    <div id="webviewer" ref="viewer"></div>
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
  }, viewer.value)
  return viewer
})
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
