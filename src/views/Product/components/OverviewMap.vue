<script setup>
import { ref, computed } from 'vue';

const latitude = ref(25.033964);
const longitude = ref(121.564558);

const mapUrl = computed(() => {
    return `https://www.google.com/maps?q=${latitude.value},${longitude.value}&hl=zh-TW&z=15&output=embed`;
});
</script>

<template>
    <div class="map-container">
        <iframe :src="mapUrl" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    </div>
</template>


<style lang="scss" scoped>
.map-container {
    position: relative;
    width: 100%;
    height: 100%;
    border: 1px solid #00000030;
    border-radius: 10px;
    overflow: hidden;

    iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border: 0;
    }
}
</style>