import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSearchStore = defineStore('Search', () => {
    /**
     * destination : 目的地
     * dateRange : (陣列)開始時間跟結束時間
     * adultCount : 成人數量
     * childCount : 兒童數量
     */
    const searchQuery = ref({
        destination: '',
        dateRange: [],
        adultCount: 2,
        childCount: 0,
        roomCount: 1,
    });


    const resultList = ref([]);

    const getProductList = async (query) => {
        searchQuery.value.destination = query.destination;
        searchQuery.value.dateRange = query.dateRange;
        searchQuery.value.adultCount = query.adultCount;
        searchQuery.value.childCount = query.childCount;
        searchQuery.value.roomCount = query.roomCount;
        // TODO: 搜尋 並且 將回傳結果存到productList
    }
    return { resultList, searchQuery, getProductList }

}
    , {
        persist: true
    })