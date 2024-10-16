import { ref } from 'vue'
import { defineStore } from 'pinia'
import { searchAPI, deleteSearchCacheAPI } from '@/apis/search';
import router from "@/router";
import { useRoute } from 'vue-router';

export const useSearchStore = defineStore('Search', () => {
    // 獲取明天和後天的日期
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const dayAfterTomorrow = new Date(today);
    dayAfterTomorrow.setDate(today.getDate() + 2);

    /**
     * destination : 目的地
     * dateRange : (陣列)開始時間跟結束時間
     * adultCount : 成人數量
     * childCount : 兒童數量
     * roomCount : 房間數量
     */
    const searchQuery = ref({
        destination: '台北',
        dateRange: [
            tomorrow.toISOString().split('T')[0], // 明天的日期
            dayAfterTomorrow.toISOString().split('T')[0] // 後天的日期
        ],
        adultCount: 2,
        childCount: 0,
        roomCount: 1,
    });

    // 檢查和設置日期範圍
    const validateDateRange = () => {
        const tomorrowDate = new Date(tomorrow);
        const dayAfterTomorrowDate = new Date(dayAfterTomorrow);

        // 取得當前日期範圍
        const [startDate, endDate] = searchQuery.value.dateRange.map(date => new Date(date));

        // 如果第一個日期小於明天，設置為明天
        if (startDate < tomorrowDate) {
            searchQuery.value.dateRange[0] = tomorrow.toISOString().split('T')[0];
        }

        // 如果第二個日期小於後天，設置為後天
        if (endDate < dayAfterTomorrowDate) {
            searchQuery.value.dateRange[1] = dayAfterTomorrow.toISOString().split('T')[0];
        }
    };

    // 在 store 初始化時進行檢查
    validateDateRange();


    const resultList = ref([]);
    const total = ref(0);
    const page = ref(0);
    const orderBy = ref('price');

    const handleSearch = (query) => {
        searchQuery.value.destination = query.destination;
        searchQuery.value.dateRange = query.dateRange;
        searchQuery.value.adultCount = query.adultCount;
        searchQuery.value.childCount = query.childCount;
        searchQuery.value.roomCount = query.roomCount;

        const startDate = query.dateRange && query.dateRange[0] ? new Date(query.dateRange[0]).toLocaleDateString('en-CA') : '';
        const endDate = query.dateRange && query.dateRange[1] ? new Date(query.dateRange[1]).toLocaleDateString('en-CA') : '';


        router.push({
            path: '/search',  // 目標頁面路徑
            query: {
                destination: query.destination,
                startDate,  // 日期範圍的開始日期
                endDate,    // 日期範圍的結束日期
                adultCount: query.adultCount,
                childCount: query.childCount,
                roomCount: query.roomCount
            }
        }).then(() => {
            // 強制刷新頁面
            window.location.reload();
        });
    }

    const changeOrderBy = async (newOrderBy) => {
        orderBy.value = newOrderBy;
        page.value = 0;
        isProcessing = true;
        const destination = lastQurey.destination;
        const adultCount = lastQurey.adultCount
        const childCount = lastQurey.childCount
        const roomCount = lastQurey.roomCount
        const startDate = lastQurey.startDate.split('T')[0];
        const endDate = lastQurey.endDate.split('T')[0];

        const res = await searchAPI({
            destination,
            adultCount,
            childCount,
            roomCount,
            startDate,
            endDate,
            orderBy: orderBy.value
        })

        resultList.value = res.data;

        total.value = res.total;
        hasMore = resultList.value.length < total.value;
        isProcessing = false;
    }

    let hasMore = true;
    let isProcessing = true;
    const loadMoreResult = async () => {
        if (isProcessing || !hasMore) return;
        isProcessing = true;
        page.value = page.value + 1;

        const destination = lastQurey.destination;
        const adultCount = lastQurey.adultCount
        const childCount = lastQurey.childCount
        const roomCount = lastQurey.roomCount
        const startDate = lastQurey.startDate.split('T')[0];
        const endDate = lastQurey.endDate.split('T')[0];

        const res = await searchAPI({
            destination,
            adultCount,
            childCount,
            roomCount,
            startDate,
            endDate,
            page: page.value,
            size: pageSize,
            orderBy: orderBy.value
        })

        resultList.value.push(...res.data);

        total.value = res.total;
        hasMore = resultList.value.length < total.value;
        isProcessing = false;
    }

    const pageSize = 20;
    const getProductList = async () => {
        const route = useRoute();
        const query = route.query;
        page.value = 0;

        searchQuery.value.destination = query.destination || '';
        searchQuery.value.dateRange = [query.startDate, query.endDate] || [];
        searchQuery.value.adultCount = parseInt(query.adultCount) || 0;
        searchQuery.value.childCount = parseInt(query.childCount) || 0;
        searchQuery.value.roomCount = parseInt(query.roomCount) || 0;

        const startDate = query.startDate ? query.startDate.split('T')[0] : '';
        const endDate = query.endDate ? query.endDate.split('T')[0] : '';

        const res = await searchAPI({
            destination: query.destination,
            adultCount: query.adultCount,
            childCount: query.roomCount,
            roomCount: query.roomCount,
            startDate,
            endDate,
            page: 0,
            size: pageSize,
            orderBy: orderBy.value
        })

        resultList.value = res.data;

        lastQurey.destination = query.destination;
        lastQurey.adultCount = query.adultCount;
        lastQurey.childCount = query.childCount;
        lastQurey.roomCount = query.roomCount;
        lastQurey.startDate = query.startDate;
        lastQurey.endDate = query.endDate;


        total.value = res.total;
        hasMore = resultList.value.length < total.value;
        isProcessing = false;
    }

    const lastQurey = {
        destination: null,
        adultCount: null,
        childCount: null,
        roomCount: null,
        startDate: null,
        endDate: null
    }

    const deleteCache = () => {
        if (lastQurey.destination && lastQurey.adultCount && lastQurey.childCount && lastQurey.roomCount && lastQurey.startDate && lastQurey.endDate) {
            deleteSearchCacheAPI(lastQurey)
        }
    }

    return {
        resultList,
        searchQuery,
        total,
        page,
        handleSearch,
        deleteCache,
        getProductList,
        changeOrderBy,
        loadMoreResult
    }
}
    , {
        // persist: true
    })