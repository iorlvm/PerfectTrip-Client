<script setup>
import { useSearchStore } from '@/stores/search';

defineProps({
    dest: Object
})

const searchStore = useSearchStore()

const travelDestSearch = (place) => {
    searchStore.handleSearch({
        destination: place,
        dateRange: searchStore.searchQuery.dateRange,
        adultCount: searchStore.searchQuery.adultCount,
        childCount: searchStore.searchQuery.childCount,
        roomCount: searchStore.searchQuery.roomCount,
    });
}


</script>

<template>
    <div class="dest-card" @click="travelDestSearch(dest.place)" :style="{
        background: `linear-gradient(to bottom, #8c8c8c, rgba(179, 179, 179, 0) 25%), url(${dest.img}) no-repeat center center`,
        backgroundSize: 'cover, cover',
        backgroundBlendMode: 'multiply'
    }">
        <span>{{ dest.place }}</span>
    </div>
</template>


<style lang="scss" scoped>
.dest-card {
    width: 30%;
    padding: 20px 15px;
    color: #fff;
    height: 300px;
    flex-grow: 1;
    background-size: cover;
    background-blend-mode: multiply;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s, box-shadow 0.3s;

    &:hover {
        transform: translateY(-3px);
    }

    span {
        margin: 0;
        font-size: 1.55em;
        font-weight: bold;
        letter-spacing: 2px;
        text-shadow: 1px 1px 3px rgb(0, 0, 0)
    }

    &:nth-child(1),
    &:nth-child(2) {
        width: 40%;
        margin-bottom: 5px;
    }
}
</style>