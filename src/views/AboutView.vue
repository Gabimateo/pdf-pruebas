<template>
  <div id="app">
    <label for="file-upload" class="custom-file-upload">
      Open PDF
    </label>
    <input id="file-upload" type="file" @change="openDocument" class="btn" />
    <PSPDFKitContainer :pdfFile="pdfFile" @loaded="handleLoaded" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import PSPDFKitContainer from "../components/PdfKit.vue";

const pdfFile = ref("/document.pdf");

const handleLoaded = (instance) => {
  console.log("PSPDFKit has loaded: ", instance);
};

const openDocument = (event) => {
  if (pdfFile.value && pdfFile.value.startsWith('blob:')) {
    window.URL.revokeObjectURL(pdfFile.value);
  }
  pdfFile.value = window.URL.createObjectURL(event.target.files[0]);
};
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}

input[type="file"] {
  display: none;
}

.custom-file-upload {
  border: 1px solid #ccc;
  border-radius: 4px;
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  background: #4A8FED;
  padding: 10px;
  color: #fff;
  font: inherit;
  font-size: 16px;
  font-weight: bold;
}
</style>
