<template>
  <div class="home">
    <PdfTron :pdfFile="pdfFile"/>
  </div>
</template>

<script setup>
/* eslint-disable */
import {ref} from 'vue';
import PdfTron from '@/components/PdfTron.vue';

const pdfFile = ref("/document-2.pdf");
</script>
